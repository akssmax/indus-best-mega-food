import { OCEAN_TUNING } from "./tuning";
import type { OceanCameraParams } from "./camera";

export type HeroDropPhase = "initial" | "hover";

type Vec3 = readonly [number, number, number];
type Vec4 = readonly [number, number, number, number];

export type HeroDropPhasePatch = {
  camera?: Partial<OceanCameraParams> & {
    eye?: Vec3;
    target?: Vec3;
  };
  particles?: Partial<(typeof OCEAN_TUNING)["particles"]> & {
    oceanColor?: Vec4;
    neonColor?: Vec4;
    foamColor?: Vec4;
  };
  bloom?: Partial<(typeof OCEAN_TUNING)["bloom"]>;
  lookStrengthX?: number;
  lookStrengthY?: number;
  dropMorph?: Partial<(typeof OCEAN_TUNING)["dropMorph"]> & {
    bodyColor?: Vec4;
    highlightColor?: Vec4;
    rimColor?: Vec4;
  };
  dropCamera?: Partial<(typeof OCEAN_TUNING)["dropCamera"]> & {
    eye?: Vec3;
    target?: Vec3;
  };
};

export type HeroDropAnchorPatch = Pick<
  (typeof OCEAN_TUNING)["dropMorph"],
  "cornerInsetPx" | "anchorOffsetX" | "anchorOffsetY"
>;

type HeroDropState = {
  initial: HeroDropPhasePatch;
  hover: HeroDropPhasePatch;
  anchor: Partial<HeroDropAnchorPatch>;
};

let heroDropState: HeroDropState = {
  initial: {},
  hover: {},
  anchor: {},
};

function vec4(base: Vec4, next?: Vec4): Vec4 {
  return (next ?? base) as Vec4;
}

function vec3(base: Vec3, next?: Vec3): Vec3 {
  return (next ?? base) as Vec3;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function lerpVec4(a: Vec4, b: Vec4, t: number): Vec4 {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
    lerp(a[3], b[3], t),
  ];
}

function lerpCamera(a: OceanCameraParams, b: OceanCameraParams, t: number) {
  return {
    eye: lerpVec3(a.eye, b.eye, t),
    target: lerpVec3(a.target, b.target, t),
    pitchDegrees: lerp(a.pitchDegrees, b.pitchDegrees, t),
    fovDegrees: lerp(a.fovDegrees, b.fovDegrees, t),
    near: a.near,
    far: a.far,
    yawRange: lerp(a.yawRange, b.yawRange, t),
    pitchRange: lerp(a.pitchRange, b.pitchRange, t),
  };
}

/** Static defaults — used by morph/camera modes (page headers, etc.). */
export function getOceanTuning() {
  return {
    simulation: { ...OCEAN_TUNING.simulation },
    particles: { ...OCEAN_TUNING.particles },
    dropCamera: { ...OCEAN_TUNING.dropCamera },
    camera: { ...OCEAN_TUNING.camera },
    bloom: { ...OCEAN_TUNING.bloom },
    dropMorph: { ...OCEAN_TUNING.dropMorph },
  };
}

export function getHeroDropAnchor() {
  const base = OCEAN_TUNING.heroDrop.anchor;
  const a = heroDropState.anchor;
  return {
    cornerInsetPx: a.cornerInsetPx ?? base.cornerInsetPx,
    anchorOffsetX: a.anchorOffsetX ?? base.anchorOffsetX,
    anchorOffsetY: a.anchorOffsetY ?? base.anchorOffsetY,
  };
}

function resolveInitialPhase() {
  const o = heroDropState.initial;
  const base = OCEAN_TUNING.heroDrop.initial;
  const c = base.camera;
  const p = base.particles;
  const b = base.bloom;
  return {
    camera: {
      eye: vec3(c.eye, o.camera?.eye ?? o.dropCamera?.eye),
      target: vec3(c.target, o.camera?.target ?? o.dropCamera?.target),
      pitchDegrees: o.camera?.pitchDegrees ?? c.pitchDegrees,
      fovDegrees: o.camera?.fovDegrees ?? c.fovDegrees,
      near: c.near,
      far: c.far,
      yawRange: o.camera?.yawRange ?? c.yawRange,
      pitchRange: o.camera?.pitchRange ?? c.pitchRange,
    } satisfies OceanCameraParams,
    lookStrengthX: o.lookStrengthX ?? base.lookStrengthX,
    lookStrengthY: o.lookStrengthY ?? base.lookStrengthY,
    particles: {
      pointSize: o.particles?.pointSize ?? p.pointSize,
      oceanColor: vec4(p.oceanColor, o.particles?.oceanColor),
      neonColor: vec4(p.neonColor, o.particles?.neonColor),
      foamColor: vec4(p.foamColor, o.particles?.foamColor),
    },
    bloom: {
      strength: o.bloom?.strength ?? b.strength,
      threshold: o.bloom?.threshold ?? b.threshold,
      smoothWidth: OCEAN_TUNING.bloom.smoothWidth,
      radius: OCEAN_TUNING.bloom.radius,
      levels: OCEAN_TUNING.bloom.levels,
      kernelRadii: OCEAN_TUNING.bloom.kernelRadii,
    },
  };
}

function resolveHoverPhase() {
  const o = heroDropState.hover;
  const base = OCEAN_TUNING.heroDrop.hover;
  const d = OCEAN_TUNING.dropMorph;
  const dc = base.camera;
  const b = base.bloom;
  const anchor = getHeroDropAnchor();
  return {
    camera: {
      eye: vec3(dc.eye, o.dropCamera?.eye),
      target: vec3(dc.target, o.dropCamera?.target),
      pitchDegrees: o.dropCamera?.pitchDegrees ?? dc.pitchDegrees,
      fovDegrees: o.dropCamera?.fovDegrees ?? dc.fovDegrees,
      near: dc.near,
      far: dc.far,
      yawRange: o.dropCamera?.yawRange ?? dc.yawRange,
      pitchRange: o.dropCamera?.pitchRange ?? dc.pitchRange,
    } satisfies OceanCameraParams,
    lookStrengthX: o.dropMorph?.lookStrengthX ?? base.lookStrengthX,
    lookStrengthY: o.dropMorph?.lookStrengthY ?? base.lookStrengthY,
    particles: {
      pointSize: o.particles?.pointSize ?? base.particles.pointSize,
      oceanColor: vec4(d.bodyColor, o.dropMorph?.bodyColor),
      neonColor: vec4(d.rimColor, o.dropMorph?.rimColor),
      foamColor: vec4(d.highlightColor, o.dropMorph?.highlightColor),
    },
    bloom: {
      strength: o.bloom?.strength ?? b.strength,
      threshold: o.bloom?.threshold ?? b.threshold,
      smoothWidth: OCEAN_TUNING.bloom.smoothWidth,
      radius: OCEAN_TUNING.bloom.radius,
      levels: OCEAN_TUNING.bloom.levels,
      kernelRadii: OCEAN_TUNING.bloom.kernelRadii,
    },
    dropMorph: {
      ...d,
      ...o.dropMorph,
      ...anchor,
      bodyColor: vec4(d.bodyColor, o.dropMorph?.bodyColor),
      highlightColor: vec4(d.highlightColor, o.dropMorph?.highlightColor),
      rimColor: vec4(d.rimColor, o.dropMorph?.rimColor),
    },
  };
}

/** Blended hero-drop tuning for the live renderer (initial → hover by morph strength). */
export function getHeroDropBlend(morphStrength: number) {
  const initial = resolveInitialPhase();
  const hover = resolveHoverPhase();
  const t = Math.max(0, Math.min(1, morphStrength));

  return {
    camera: lerpCamera(initial.camera, hover.camera, t),
    lookStrengthX: lerp(initial.lookStrengthX, hover.lookStrengthX, t),
    lookStrengthY: lerp(initial.lookStrengthY, hover.lookStrengthY, t),
    particles: {
      pointSize: lerp(initial.particles.pointSize, hover.particles.pointSize, t),
      oceanColor: lerpVec4(
        initial.particles.oceanColor,
        hover.particles.oceanColor,
        t
      ),
      neonColor: lerpVec4(initial.particles.neonColor, hover.particles.neonColor, t),
      foamColor: lerpVec4(initial.particles.foamColor, hover.particles.foamColor, t),
      fadeNear: OCEAN_TUNING.particles.fadeNear,
      fadeFar: OCEAN_TUNING.particles.fadeFar,
      fadePower: OCEAN_TUNING.particles.fadePower,
    },
    bloom: {
      strength: lerp(initial.bloom.strength, hover.bloom.strength, t),
      threshold: lerp(initial.bloom.threshold, hover.bloom.threshold, t),
      smoothWidth: OCEAN_TUNING.bloom.smoothWidth,
      radius: OCEAN_TUNING.bloom.radius,
    },
    dropMorph: hover.dropMorph,
    simulation: OCEAN_TUNING.simulation,
  };
}

export function getHeroDropHoverCamera() {
  return resolveHoverPhase().camera;
}

export function patchHeroDropTuning(
  phase: HeroDropPhase,
  patch: HeroDropPhasePatch
): void {
  const current = heroDropState[phase];
  heroDropState = {
    ...heroDropState,
    [phase]: {
      ...current,
      ...patch,
      camera: patch.camera
        ? { ...current.camera, ...patch.camera }
        : current.camera,
      particles: patch.particles
        ? { ...current.particles, ...patch.particles }
        : current.particles,
      bloom: patch.bloom ? { ...current.bloom, ...patch.bloom } : current.bloom,
      dropMorph: patch.dropMorph
        ? { ...current.dropMorph, ...patch.dropMorph }
        : current.dropMorph,
      dropCamera: patch.dropCamera
        ? { ...current.dropCamera, ...patch.dropCamera }
        : current.dropCamera,
    },
  };
}

export function patchHeroDropAnchor(patch: Partial<HeroDropAnchorPatch>): void {
  heroDropState = {
    ...heroDropState,
    anchor: { ...heroDropState.anchor, ...patch },
  };
}

export function resetHeroDropTuning(): void {
  heroDropState = { initial: {}, hover: {}, anchor: {} };
}

export function exportHeroDropSnapshot() {
  return JSON.stringify(
    {
      initial: resolveInitialPhase(),
      hover: resolveHoverPhase(),
      anchor: getHeroDropAnchor(),
    },
    null,
    2
  );
}

/** @deprecated Hero tuner only — does not affect page headers. */
export function resetOceanTuningOverrides(): void {
  resetHeroDropTuning();
}

/** @deprecated Use exportHeroDropSnapshot */
export function exportOceanTuningSnapshot(): string {
  return exportHeroDropSnapshot();
}

/** @deprecated Use patchHeroDropTuning */
export function patchOceanTuning(patch: HeroDropPhasePatch): void {
  patchHeroDropTuning("hover", patch);
}
