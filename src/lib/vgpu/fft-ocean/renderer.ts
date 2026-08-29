import {
  clock,
  draw,
  effect,
  frame,
  frameLoop,
  sampler,
  surface,
  target,
  type Draw,
  type Effect,
  type Frame,
  type Gpu,
  type ShaderSource,
  type Surface,
  type Target,
  type Texture,
} from "vgpu";

import bloomBlurWgsl from "./bloom-blur.wgsl";
import bloomBrightWgsl from "./bloom-bright.wgsl";
import bloomCompositeWgsl from "./bloom-composite.wgsl";
import {
  oceanCamera,
  oceanCameraFromConfig,
  oceanScreenToWorldXZFromConfig,
  type OceanCameraParams,
  type OceanInteraction,
  type OceanLook,
} from "./camera";
import { getCampusCloud } from "./campus-cloud";
import {
  FACTORY_CLOUD_SIZE,
  getFactoryCloud,
} from "./factory-cloud";
import ifftStageWgsl from "./ifft-stage.wgsl";
import initialSpectrumWgsl from "./initial-spectrum.wgsl";
import noiseWgsl from "./noise.wgsl";
import normalFoamWgsl from "./normal-foam.wgsl";
import {
  createIfftStageTable,
  OCEAN_RESOLUTION,
  type IfftStage,
  type SimulationTargetName,
} from "./ocean-graph";
import particlesWgsl from "./particles.wgsl";
import presentWgsl from "./present.wgsl";
import spectrumWgsl from "./spectrum.wgsl";
import { gaussianCoefficients, OCEAN_TUNING } from "./tuning";
import { getOceanTuning, getHeroDropBlend } from "./tuning-runtime";

type Output = Surface | Target;

interface RendererOptions {
  readonly canvas: HTMLCanvasElement;
  readonly dpr?: number | readonly [number, number];
  readonly alphaMode?: GPUCanvasAlphaMode;
  readonly interaction?: OceanInteraction;
  /** Start morph already engaged so the first frame can be the drop. */
  readonly initialEngage?: number;
  /** 0 = factory cloud, 1 = campus grounds. */
  readonly initialMorphTarget?: number;
  readonly onError?: (error: unknown) => void;
}

const SIM_FORMAT: GPUTextureFormat = "rgba32float";
const HDR_FORMAT: GPUTextureFormat = "rgba16float";
const TRANSPARENT = [0, 0, 0, 0] as const;

export function createRenderer({
  canvas,
  dpr = [1, 1.25],
  alphaMode,
  interaction = "morph",
  initialEngage = 0,
  initialMorphTarget = 0,
  onError,
}: RendererOptions) {
  let disposed = false;
  let gpu: Gpu | undefined;
  let output: Surface | undefined;
  let graph: OceanGraph | undefined;
  let factoryTextures: FactoryTextures | undefined;
  let unsubscribeResize: (() => void) | undefined;
  let resizeFrame = 0;
  let resizeGeneration = 0;
  const engage0 = Math.max(0, Math.min(1, initialEngage));
  const target0 = Math.max(0, Math.min(1, initialMorphTarget));
  const pointerTarget = {
    x: 0,
    y: 0,
    engage: engage0,
    morphTarget: target0,
    anchorNx: 0.72,
    anchorNy: 0.44,
  };
  const pointer = {
    x: 0,
    y: 0,
    engage: engage0,
    morphTarget: target0,
    anchorNx: 0.72,
    anchorNy: 0.44,
  };

  function setPointer(x: number, y: number, engage = 0): void {
    pointerTarget.x = x;
    pointerTarget.y = y;
    pointerTarget.engage = engage;
  }

  function setMorphTarget(target: number): void {
    pointerTarget.morphTarget = Math.max(0, Math.min(1, target));
  }

  function setDropAnchor(nx: number, ny: number): void {
    pointerTarget.anchorNx = nx;
    pointerTarget.anchorNy = ny;
  }

  function dispose(): void {
    if (disposed) return;
    disposed = true;
    resizeGeneration++;
    runCleanups([
      () => {
        if (resizeFrame) cancelAnimationFrame(resizeFrame);
      },
      () => unsubscribeResize?.(),
      () => gpu?.dispose(),
    ]);
  }

  function fail(error: unknown): never {
    try {
      dispose();
    } catch {
      // Teardown must not replace the render, resize, or preparation failure.
    }
    onError?.(error);
    throw error;
  }

  const rebuild = async (generation: number) => {
    if (disposed || !gpu || !output || !graph) return;
    if (sameSize(graph.scene.size, output.size)) return;
    const next = await createGraph(
      gpu,
      output,
      `fft-ocean-resize-${generation}`,
      interaction,
      factoryTextures
    );
    if (disposed) return;
    if (generation !== resizeGeneration) {
      try {
        destroyGraph(next);
      } catch {
        // A newer resize owns the renderer; this stale graph is best-effort only.
      }
      return;
    }
    const previous = graph;
    graph = next;
    destroyGraph(previous);
  };

  const scheduleResize = () => {
    if (disposed || resizeFrame) return;
    const generation = ++resizeGeneration;
    resizeFrame = requestAnimationFrame(async () => {
      resizeFrame = 0;
      try {
        await rebuild(generation);
      } catch (error) {
        if (!disposed && generation === resizeGeneration) fail(error);
      }
    });
  };

  const initialize = async () => {
    const { init } = await import("vgpu");
    if (disposed) return;
    const nextGpu = await init();
    if (disposed) {
      nextGpu.dispose();
      return;
    }

    gpu = nextGpu;
    output = surface(gpu, canvas, {
      dpr,
      alphaMode,
      clearColor: alphaMode ? TRANSPARENT : undefined,
    });
    factoryTextures = uploadFactoryTextures(gpu, interaction);
    graph = await createGraph(
      gpu,
      output,
      "fft-ocean-live",
      interaction,
      factoryTextures
    );
    if (disposed) return;

    unsubscribeResize = output.onResize(scheduleResize);

    const time = clock(gpu);
    frameLoop(gpu, (currentFrame) => {
      if (disposed || !graph || !output) return;
      try {
        pointer.x += (pointerTarget.x - pointer.x) * 0.12;
        pointer.y += (pointerTarget.y - pointer.y) * 0.12;
        const engageLerp = interaction === "factory" ? 0.06 : 0.09;
        pointer.engage += (pointerTarget.engage - pointer.engage) * engageLerp;
        pointer.morphTarget +=
          (pointerTarget.morphTarget - pointer.morphTarget) * 0.08;
        pointer.anchorNx += (pointerTarget.anchorNx - pointer.anchorNx) * 0.08;
        pointer.anchorNy += (pointerTarget.anchorNy - pointer.anchorNy) * 0.08;
        const timeSeconds = time.time * OCEAN_TUNING.simulation.timeScale;
        if (interaction === "drop") {
          const morphStrength = dropMorphStrength(pointer);
          const blend = getHeroDropBlend(morphStrength);
          setDropDynamics(graph, timeSeconds, pointer);
          syncBloomUniforms(graph, blend.bloom);
          setDropParticles(graph.particles, output, pointer, morphStrength, blend);
        } else if (interaction === "factory") {
          const morphStrength = Math.max(0, Math.min(1, pointer.engage));
          setFactoryDynamics(graph, timeSeconds, morphStrength);
          syncBloomUniforms(graph, factoryBloom(morphStrength));
          setFactoryParticles(
            graph.particles,
            output,
            pointer,
            morphStrength,
            pointer.morphTarget
          );
        } else if (interaction === "morph") {
          const magnitude = morphPointerMagnitude(pointer);
          setMorphDynamics(graph, timeSeconds, pointer);
          syncBloomUniforms(graph, morphBloom(magnitude));
          setParticleConstants(graph.particles, output, { x: 0, y: 0 }, pointer);
        } else if (interaction === "static") {
          setDynamics(graph, timeSeconds);
          setParticleConstants(graph.particles, output, { x: 0, y: 0 });
        } else {
          setDynamics(graph, timeSeconds);
          setParticleCamera(graph.particles, output, pointer);
        }
        renderGraph(currentFrame, graph, output);
      } catch (error) {
        fail(error);
      }
    });
  };

  const ready = initialize().catch((error: unknown) => {
    if (!disposed) fail(error);
  });

  return { ready, dispose, setPointer, setDropAnchor, setMorphTarget };
}

export async function createGraph(
  gpu: Gpu,
  output: Output,
  label: string,
  interaction: OceanInteraction = "morph",
  factory?: FactoryTextures
): Promise<OceanGraph> {
  const ownedTargets: Target[] = [];
  try {
    const graph = buildGraph(
      gpu,
      output,
      label,
      (value) => {
        ownedTargets.push(value);
        return value;
      },
      factory ?? uploadFactoryTextures(gpu, interaction)
    );
    await prewarm(graph, output);
    return graph;
  } catch (error) {
    try {
      destroyTargets(ownedTargets);
    } catch {
      // Partial-allocation cleanup must not replace the construction failure.
    }
    throw error;
  }
}

function buildGraph(
  gpu: Gpu,
  output: Output,
  label: string,
  own: (value: Target) => Target,
  factory: FactoryTextures
) {
  const resolution = OCEAN_RESOLUTION;
  const createTarget = (
    name: string,
    size: readonly [number, number],
    format: GPUTextureFormat
  ) => own(target(gpu, { size, format, label: `${label}-${name}` }));
  const simulationTarget = (name: string) =>
    createTarget(name, [resolution, resolution], SIM_FORMAT);
  const simulation = {
    noise: simulationTarget("noise"),
    h0: simulationTarget("h0"),
    spectrum: simulationTarget("spectrum"),
    ping: simulationTarget("ping"),
    pong: simulationTarget("pong"),
    normalFoam: simulationTarget("normal-foam"),
  };
  const sizes = bloomSizes(output.size);
  const scene = createTarget("scene", normalizedSize(output.size), HDR_FORMAT);
  const bright = createTarget("bright", sizes[0]!, HDR_FORMAT);
  const composite = createTarget("composite", sizes[0]!, HDR_FORMAT);
  const linearSampler = sampler(gpu, {
    minFilter: "linear",
    magFilter: "linear",
  });

  const noiseEffect = configuredEffect(gpu, noiseWgsl, `${label}-noise`);
  const initialSpectrum = configuredEffect(
    gpu,
    initialSpectrumWgsl,
    `${label}-initial-spectrum`,
    {
      u: {
        resolution,
        size: OCEAN_TUNING.simulation.oceanSize,
        windSpeed: OCEAN_TUNING.simulation.windSpeed,
        windAngle: OCEAN_TUNING.simulation.windAngle,
        amplitude: OCEAN_TUNING.simulation.amplitude,
      },
      u_noise: simulation.noise,
    }
  );
  const evolveSpectrum = configuredEffect(
    gpu,
    spectrumWgsl,
    `${label}-spectrum`,
    {
      u: {
        resolution,
        size: OCEAN_TUNING.simulation.oceanSize,
        time: 0,
        choppiness: OCEAN_TUNING.simulation.choppiness,
      },
      u_initialSpectrum: simulation.h0,
    }
  );

  const simulationTargets: Record<SimulationTargetName, Target> = {
    spectrum: simulation.spectrum,
    ping: simulation.ping,
    pong: simulation.pong,
  };
  const ifft = createIfftStageTable().map((spec: IfftStage) => ({
    spec,
    effect: configuredEffect(
      gpu,
      ifftStageWgsl,
      `${label}-ifft-${spec.index}-${spec.horizontal ? "h" : "v"}`,
      {
        u: {
          resolution,
          subtransformSize: spec.subtransformSize,
          horizontal: spec.horizontal ? 1 : 0,
        },
        u_input: simulationTargets[spec.input],
      }
    ),
    output: simulationTargets[spec.output],
  }));
  const displacement = ifft.at(-1)!.output;
  const normals = configuredEffect(
    gpu,
    normalFoamWgsl,
    `${label}-normal-foam`,
    {
      u: {
        resolution,
        worldSize: OCEAN_TUNING.simulation.worldSize,
        displacementScale: OCEAN_TUNING.simulation.displacementScale,
        foamThreshold: OCEAN_TUNING.simulation.foamThreshold,
      },
      u_displacement: displacement,
    }
  );
  const particles = draw(gpu, {
    shader: particlesWgsl,
    vertices: 6,
    instances: resolution * resolution,
    blend: {
      color: { src: "src-alpha", dst: "one" },
      alpha: { src: "one", dst: "one" },
    },
    label: `${label}-particles`,
  }).set({
    u_displacement: displacement,
    u_normalFoam: simulation.normalFoam,
    u_factoryPos: factory.pos,
    u_factoryNml: factory.nml,
    u_campusPos: factory.campusPos,
    u_campusNml: factory.campusNml,
  });
  setParticleConstants(particles, output);
  const brightEffect = configuredEffect(
    gpu,
    bloomBrightWgsl,
    `${label}-bloom-bright`,
    {
      uniforms: {
        luminosityThreshold: OCEAN_TUNING.bloom.threshold,
        smoothWidth: OCEAN_TUNING.bloom.smoothWidth,
      },
      tDiffuse: scene,
      linearSampler,
    }
  );

  let bloomInput = bright;
  const levels = sizes.map((size, index) => {
    const horizontal = createTarget(`bloom-h${index}`, size, HDR_FORMAT);
    const vertical = createTarget(`bloom-v${index}`, size, HDR_FORMAT);
    const radius = OCEAN_TUNING.bloom.kernelRadii[index]!;
    const horizontalEffect = makeBlur(
      gpu,
      `${label}-blur-h${index}`,
      bloomInput,
      horizontal,
      linearSampler,
      [1, 0],
      radius
    );
    const verticalEffect = makeBlur(
      gpu,
      `${label}-blur-v${index}`,
      horizontal,
      vertical,
      linearSampler,
      [0, 1],
      radius
    );
    bloomInput = vertical;
    return { horizontal, vertical, horizontalEffect, verticalEffect };
  });
  const compositeEffect = configuredEffect(
    gpu,
    bloomCompositeWgsl,
    `${label}-bloom-composite`,
    {
      uniforms: {
        bloomStrength: OCEAN_TUNING.bloom.strength,
        bloomRadius: OCEAN_TUNING.bloom.radius,
        bloomFactors0: [1, 0.8, 0.6, 0.4],
        bloomFactors1: [0.2, 0, 0, 0],
      },
      blurTexture1: levels[0]!.vertical,
      blurTexture2: levels[1]!.vertical,
      blurTexture3: levels[2]!.vertical,
      blurTexture4: levels[3]!.vertical,
      blurTexture5: levels[4]!.vertical,
      linearSampler,
    }
  );
  const present = configuredEffect(gpu, presentWgsl, `${label}-present`, {
    sceneHDR: scene,
    bloomTexture: composite,
    linearSampler,
  });
  return {
    simulation,
    scene,
    bloom: { bright, composite, levels },
    effects: {
      noise: noiseEffect,
      initialSpectrum,
      evolveSpectrum,
      normals,
      bright: brightEffect,
      composite: compositeEffect,
      present,
    },
    ifft,
    particles,
    needsInitialSpectrum: true,
  };
}

export type OceanGraph = ReturnType<typeof buildGraph>;

function configuredEffect(
  gpu: Gpu,
  shader: string | ShaderSource,
  label: string,
  bindings?: Record<string, unknown>
): Effect {
  const configured = effect(gpu, shader, { label });
  return bindings ? configured.set(bindings) : configured;
}

function makeBlur(
  gpu: Gpu,
  label: string,
  source: Target,
  output: Target,
  linearSampler: GPUSampler,
  direction: readonly [number, number],
  kernelRadius: number
): Effect {
  const blur = effect(gpu, bloomBlurWgsl, { label });
  const coefficients = gaussianCoefficients(kernelRadius);
  blur.set({
    uniforms: {
      direction,
      invSize: output.texelSize,
      gaussianCoefficients0: coefficients.slice(0, 4),
      gaussianCoefficients1: coefficients.slice(4, 8),
      gaussianCoefficients2: coefficients.slice(8, 12),
      gaussianCoefficients3: coefficients.slice(12, 16),
      gaussianCoefficients4: coefficients.slice(16, 20),
      gaussianCoefficients5: coefficients.slice(20, 24),
    },
    colorTexture: source,
    linearSampler,
  });
  return blur;
}

async function prewarm(graph: OceanGraph, output: Output): Promise<void> {
  const results = await Promise.allSettled([
    graph.effects.noise.compile(graph.simulation.noise),
    graph.effects.initialSpectrum.compile(graph.simulation.h0),
    graph.effects.evolveSpectrum.compile(graph.simulation.spectrum),
    ...graph.ifft.map(({ effect, output }) => effect.compile(output)),
    graph.effects.normals.compile(graph.simulation.normalFoam),
    graph.particles.compile(graph.scene),
    graph.effects.bright.compile(graph.bloom.bright),
    ...graph.bloom.levels.flatMap((level) => [
      level.horizontalEffect.compile(level.horizontal),
      level.verticalEffect.compile(level.vertical),
    ]),
    graph.effects.composite.compile(graph.bloom.composite),
    graph.effects.present.compile({ colors: [output.format] }),
  ]);
  const failure = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );
  if (failure) throw failure.reason;
}

type FactoryTextures = {
  pos: Texture
  nml: Texture
  campusPos: Texture
  campusNml: Texture
}

function writeRgba32Texture(
  gpu: Gpu,
  texture: Texture,
  data: Float32Array,
  size: number
): void {
  const bytesPerRow = Math.max(256, size * 16)
  let src = data
  if (size === 1 && data.byteLength < bytesPerRow) {
    src = new Float32Array(bytesPerRow / 4)
    src.set(data.subarray(0, 4))
  }
  gpu.gpu.queue.writeTexture(
    { texture: texture.gpu },
    src,
    { bytesPerRow },
    { width: size, height: size }
  )
}

function makeCloudTexture(gpu: Gpu, size: number, label: string): Texture {
  return gpu.device.createTexture({
    size: [size, size],
    format: SIM_FORMAT,
    usage: ["copy_dst", "texture_binding"],
    label,
  })
}

function uploadFactoryTextures(
  gpu: Gpu,
  interaction: OceanInteraction
): FactoryTextures {
  const size = interaction === "factory" ? FACTORY_CLOUD_SIZE : 1
  const pos = makeCloudTexture(gpu, size, "factory-pos")
  const nml = makeCloudTexture(gpu, size, "factory-nml")
  const campusPos = makeCloudTexture(gpu, size, "campus-pos")
  const campusNml = makeCloudTexture(gpu, size, "campus-nml")
  if (interaction === "factory") {
    const factory = getFactoryCloud()
    const campus = getCampusCloud()
    writeRgba32Texture(gpu, pos, factory.positions, size)
    writeRgba32Texture(gpu, nml, factory.normals, size)
    writeRgba32Texture(gpu, campusPos, campus.positions, size)
    writeRgba32Texture(gpu, campusNml, campus.normals, size)
  } else {
    const dummy = new Float32Array(4)
    writeRgba32Texture(gpu, pos, dummy, 1)
    writeRgba32Texture(gpu, nml, dummy, 1)
    writeRgba32Texture(gpu, campusPos, dummy, 1)
    writeRgba32Texture(gpu, campusNml, dummy, 1)
  }
  return { pos, nml, campusPos, campusNml }
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpVec3(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function lerpVec4(
  a: readonly [number, number, number, number],
  b: readonly [number, number, number, number],
  t: number
): [number, number, number, number] {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
    lerp(a[3], b[3], t),
  ]
}

function lerpCamera(
  a: OceanCameraParams,
  b: OceanCameraParams,
  t: number
): OceanCameraParams {
  return {
    eye: lerpVec3(a.eye, b.eye, t),
    target: lerpVec3(a.target, b.target, t),
    pitchDegrees: lerp(a.pitchDegrees, b.pitchDegrees, t),
    fovDegrees: lerp(a.fovDegrees, b.fovDegrees, t),
    near: a.near,
    far: a.far,
    yawRange: lerp(a.yawRange, b.yawRange, t),
    pitchRange: lerp(a.pitchRange, b.pitchRange, t),
  }
}

function setFactoryDynamics(
  graph: OceanGraph,
  timeSeconds: number,
  engage: number
): void {
  const t = Math.max(0, Math.min(1, engage))
  const tuning = OCEAN_TUNING.simulation
  graph.effects.evolveSpectrum.set({
    u: {
      time: timeSeconds * tuning.spectrumTimeScale * (1 - t * 0.35),
      choppiness: tuning.choppiness * (1 - t * 0.72),
    },
  })
}

function factoryBloom(engage: number) {
  const t = Math.max(0, Math.min(1, engage))
  const bloom = getOceanTuning().bloom
  return {
    strength: bloom.strength * (1 - t * 0.22),
    threshold: bloom.threshold + t * 0.06,
    smoothWidth: bloom.smoothWidth,
  }
}

function setFactoryParticles(
  particles: Draw,
  output: Output,
  state: OceanLook & { engage: number },
  morphStrength: number,
  targetBlend = 0
): void {
  const tuning = getOceanTuning()
  const factory = OCEAN_TUNING.factoryMorph
  const campus = OCEAN_TUNING.campusMorph
  const blend = Math.max(0, Math.min(1, targetBlend))
  const eased = morphStrength * morphStrength * (3 - 2 * morphStrength)
  const idleCamera: OceanCameraParams = {
    ...OCEAN_TUNING.camera,
    yawRange: 22,
    pitchRange: 12,
  }
  const shapeCamera = lerpCamera(
    OCEAN_TUNING.factoryCamera,
    OCEAN_TUNING.campusCamera,
    blend
  )
  const lookX = lerp(factory.lookStrengthX, campus.lookStrengthX, blend)
  const lookY = lerp(factory.lookStrengthY, campus.lookStrengthY, blend)
  const camera = oceanCameraFromConfig(
    output.size,
    {
      x: state.x * lookX * morphStrength,
      y: state.y * lookY * morphStrength,
    },
    lerpCamera(idleCamera, shapeCamera, eased)
  )
  const calm = 1 - morphStrength * 0.88
  const body = lerpVec4(factory.bodyColor, campus.bodyColor, blend)
  const rim = lerpVec4(factory.rimColor, campus.rimColor, blend)
  const highlight = lerpVec4(
    factory.highlightColor,
    campus.highlightColor,
    blend
  )
  const shapeScale = lerp(factory.scale, campus.scale, blend)
  const specular = lerp(factory.specular, campus.specular, blend)
  particles.set({
    u: {
      view: camera.view,
      projection: camera.projection,
      viewport: [output.size[0], output.size[1], 1, OCEAN_RESOLUTION],
      world: [
        tuning.simulation.worldSize,
        tuning.simulation.displacementScale * calm,
        tuning.particles.pointSize * (1 - morphStrength * 0.1),
        FACTORY_CLOUD_SIZE,
      ],
      fade: [
        tuning.particles.fadeNear,
        tuning.particles.fadeFar,
        tuning.particles.fadePower,
        0,
      ],
      oceanColor: lerpVec4(tuning.particles.oceanColor, body, eased),
      neonColor: lerpVec4(tuning.particles.neonColor, rim, eased),
      foamColor: lerpVec4(tuning.particles.foamColor, highlight, eased),
      morph: [0, 0, morphStrength, shapeScale],
      morph2: [0, blend, 1, specular * morphStrength],
    },
  })
}

function setDynamics(graph: OceanGraph, timeSeconds: number): void {
  graph.effects.evolveSpectrum.set({
    u: { time: timeSeconds * OCEAN_TUNING.simulation.spectrumTimeScale },
  });
}

function morphPointerMagnitude(pointer: OceanLook): number {
  const { magnitudeScale } = OCEAN_TUNING.morphResponse;
  const raw = Math.min(1, Math.hypot(pointer.x, pointer.y) * magnitudeScale);
  return raw * raw * (3 - 2 * raw);
}

function setMorphDynamics(
  graph: OceanGraph,
  timeSeconds: number,
  pointer: OceanLook
): void {
  const tuning = OCEAN_TUNING.simulation;
  const response = OCEAN_TUNING.morphResponse;
  const magnitude = morphPointerMagnitude(pointer);
  const swirl =
    Math.sin(pointer.x * 2.35) * Math.cos(pointer.y * 1.85) * magnitude;
  const choppiness =
    tuning.choppiness + magnitude * response.choppinessGain + swirl * response.choppinessSwirl;
  const timeScale =
    tuning.spectrumTimeScale *
    (1 + magnitude * response.timeScaleGain + Math.abs(swirl) * response.timeScaleSwirl);

  graph.effects.evolveSpectrum.set({
    u: {
      time: timeSeconds * timeScale,
      choppiness,
    },
  });
}

function setDropDynamics(
  graph: OceanGraph,
  timeSeconds: number,
  state: OceanLook & { engage: number }
): void {
  const tuning = getOceanTuning().simulation;
  const engage = Math.max(0, Math.min(1, state.engage));
  const magnitude = engage * Math.min(1, Math.hypot(state.x, state.y) * 0.85);
  const ripple = Math.sin(state.x * 3.1 + state.y * 2.4) * magnitude * 0.18;

  graph.effects.evolveSpectrum.set({
    u: {
      time: timeSeconds * tuning.spectrumTimeScale * (1 + engage * 0.12),
      choppiness: tuning.choppiness + engage * 0.55 + ripple,
    },
  });
}

function morphBloom(magnitude: number) {
  const bloom = getOceanTuning().bloom;
  const response = OCEAN_TUNING.morphResponse;
  return {
    strength: bloom.strength * (1 - magnitude * response.bloomStrengthReduction),
    threshold: bloom.threshold + magnitude * response.bloomThresholdGain,
    smoothWidth: bloom.smoothWidth,
  };
}

function syncBloomUniforms(
  graph: OceanGraph,
  bloom: { strength: number; threshold: number; smoothWidth: number }
): void {
  graph.effects.bright.set({
    uniforms: {
      luminosityThreshold: bloom.threshold,
      smoothWidth: bloom.smoothWidth,
    },
  });
  graph.effects.composite.set({
    uniforms: {
      bloomStrength: bloom.strength,
      bloomRadius: getOceanTuning().bloom.radius,
      bloomFactors0: [1, 0.8, 0.6, 0.4],
      bloomFactors1: [0.2, 0, 0, 0],
    },
  });
}

function dropCenterFromSectionUV(
  size: readonly [number, number],
  nx: number,
  ny: number,
  radius: number,
  drop: ReturnType<typeof getHeroDropBlend>["dropMorph"],
  camera: ReturnType<typeof getHeroDropBlend>["camera"],
  look: OceanLook = { x: 0, y: 0 }
): readonly [number, number] {
  const { tipOffset } = drop;
  const hit = oceanScreenToWorldXZFromConfig(size, nx, ny, 0, camera, look);
  if (!hit) {
    return [(nx - 0.5) * 160, 40 - ny * 80];
  }
  const [tipX, tipZ] = hit;
  // Lattice tip sits slightly above local origin; keep the tip on the screen UV.
  return [tipX, tipZ + tipOffset * radius];
}

function dropMorphStrength(
  state: OceanLook & { engage: number; anchorNx: number; anchorNy: number }
): number {
  const engage = Math.max(0, Math.min(1, state.engage));
  if (engage < 0.001) return 0;
  if (engage > 0.95) return 1;

  const anchorX = state.anchorNx * 2 - 1;
  const anchorY = state.anchorNy * 2 - 1;
  const dist = Math.hypot(state.x - anchorX, state.y - anchorY);
  const proximityRadius = getHeroDropBlend(1).dropMorph.proximityRadius;
  const proximity = Math.max(0, 1 - dist / proximityRadius);
  return engage * (0.35 + proximity * 0.65);
}

function setDropParticles(
  particles: Draw,
  output: Output,
  state: OceanLook & { engage: number; anchorNx: number; anchorNy: number },
  morphStrength: number,
  blend: ReturnType<typeof getHeroDropBlend>
): void {
  const drop = blend.dropMorph;
  const framingLook = { x: 0, y: 0 };
  const camera = oceanCameraFromConfig(output.size, framingLook, blend.camera);
  const scale = Math.max(drop.scale ?? 1, 0.05);
  const scaleX = Math.max(drop.scaleX ?? 1, 0.05);
  const scaleY = Math.max(drop.scaleY ?? 1, 0.05);
  const scaleZ = Math.max(drop.scaleZ ?? 1, 0.05);
  const radius = drop.radius * scale;
  const depthScale = drop.depthScale * scaleY;
  const specular = drop.specular;
  const [centerX, centerZ] = dropCenterFromSectionUV(
    output.size,
    state.anchorNx,
    state.anchorNy,
    radius,
    drop,
    blend.camera,
    framingLook
  );
  const calm = 1 - morphStrength * 0.92;
  const anchorX = state.anchorNx * 2 - 1;
  const anchorY = state.anchorNy * 2 - 1;
  const tiltX = (state.x - anchorX) * drop.tiltStrengthX * morphStrength;
  const tiltY = -(state.y - anchorY) * drop.tiltStrengthY * morphStrength;

  particles.set({
    u: {
      view: camera.view,
      projection: camera.projection,
      viewport: [output.size[0], output.size[1], 1, OCEAN_RESOLUTION],
      world: [
        blend.simulation.worldSize,
        blend.simulation.displacementScale * calm,
        blend.particles.pointSize * (1 + morphStrength * 0.38),
        drop.halfWidth * scaleX,
      ],
      fade: [
        blend.particles.fadeNear,
        blend.particles.fadeFar,
        blend.particles.fadePower,
        scaleZ,
      ],
      oceanColor: blend.particles.oceanColor,
      neonColor: blend.particles.neonColor,
      foamColor: blend.particles.foamColor,
      morph: [centerX, centerZ, morphStrength, radius],
      morph2: [tiltX, tiltY, depthScale, specular * morphStrength],
    },
  });
}

function setParticleConstants(
  particles: Draw,
  output: Output,
  look: OceanLook = { x: 0, y: 0 },
  morphPointer?: OceanLook
): void {
  const camera = oceanCamera(output.size, look);
  const tuning = getOceanTuning();
  const response = OCEAN_TUNING.morphResponse;
  const magnitude = morphPointer
    ? morphPointerMagnitude(morphPointer)
    : 0;
  const swirl = morphPointer
    ? Math.sin(morphPointer.x * 2.35) *
      Math.cos(morphPointer.y * 1.85) *
      magnitude
    : 0;
  const displacementScale =
    tuning.simulation.displacementScale *
    (1 + magnitude * response.displacementGain + swirl * response.displacementSwirl);
  const pointSize =
    tuning.particles.pointSize *
    (1 + magnitude * response.pointSizeGain + Math.abs(swirl) * response.pointSizeSwirl);
  particles.set({
    u: {
      view: camera.view,
      projection: camera.projection,
      viewport: [output.size[0], output.size[1], 1, OCEAN_RESOLUTION],
      world: [
        tuning.simulation.worldSize,
        displacementScale,
        pointSize,
        0,
      ],
      fade: [
        tuning.particles.fadeNear,
        tuning.particles.fadeFar,
        tuning.particles.fadePower,
        0,
      ],
      oceanColor: tuning.particles.oceanColor,
      neonColor: tuning.particles.neonColor,
      foamColor: tuning.particles.foamColor,
      morph: [0, 0, 0, 0],
      morph2: [0, 0, 0, 0],
    },
  });
}

function setParticleCamera(
  particles: Draw,
  output: Output,
  look: OceanLook
): void {
  setParticleConstants(particles, output, look);
}

export type { OceanInteraction } from "./camera";

export function renderAt(
  gpu: Gpu,
  graph: OceanGraph,
  output: Target,
  time: number
): void {
  setDynamics(graph, time);
  frame(gpu, (currentFrame) => renderGraph(currentFrame, graph, output));
}

export function renderGraph(
  currentFrame: Frame,
  graph: OceanGraph,
  output: Output
): void {
  const pass = (target: Output, drawable: Draw | Effect) =>
    currentFrame.pass({ target, clear: TRANSPARENT }, (encoder) =>
      encoder.draw(drawable)
    );
  if (graph.needsInitialSpectrum) {
    pass(graph.simulation.noise, graph.effects.noise);
    pass(graph.simulation.h0, graph.effects.initialSpectrum);
    graph.needsInitialSpectrum = false;
  }
  pass(graph.simulation.spectrum, graph.effects.evolveSpectrum);
  for (const stage of graph.ifft) {
    pass(stage.output, stage.effect);
  }
  pass(graph.simulation.normalFoam, graph.effects.normals);
  pass(graph.scene, graph.particles);
  pass(graph.bloom.bright, graph.effects.bright);
  for (const level of graph.bloom.levels) {
    pass(level.horizontal, level.horizontalEffect);
    pass(level.vertical, level.verticalEffect);
  }
  pass(graph.bloom.composite, graph.effects.composite);
  pass(output, graph.effects.present);
}

export function bloomSizes(
  size: readonly [number, number]
): [number, number][] {
  let width = Math.max(1, Math.round(size[0] / 2));
  let height = Math.max(1, Math.round(size[1] / 2));
  return Array.from({ length: OCEAN_TUNING.bloom.levels }, () => {
    const level: [number, number] = [width, height];
    width = Math.max(1, Math.round(width / 2));
    height = Math.max(1, Math.round(height / 2));
    return level;
  });
}

export function destroyGraph(graph: OceanGraph): void {
  destroyTargets([
    ...Object.values(graph.simulation),
    graph.scene,
    graph.bloom.bright,
    graph.bloom.composite,
    ...graph.bloom.levels.flatMap((level) => [
      level.horizontal,
      level.vertical,
    ]),
  ]);
}

function destroyTargets(targets: readonly Target[]): void {
  runCleanups(
    [...targets].reverse().map((value) => () => value.color.destroy())
  );
}

function runCleanups(cleanups: readonly (() => void)[]): void {
  let firstError: unknown;
  let failed = false;
  for (const cleanup of cleanups) {
    try {
      cleanup();
    } catch (error) {
      if (!failed) firstError = error;
      failed = true;
    }
  }
  if (failed) throw firstError;
}

function normalizedSize(size: readonly [number, number]): [number, number] {
  return [Math.max(1, Math.floor(size[0])), Math.max(1, Math.floor(size[1]))];
}

function sameSize(a: readonly number[], b: readonly number[]): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
