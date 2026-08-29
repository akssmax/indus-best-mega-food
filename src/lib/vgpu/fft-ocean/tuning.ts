/**
 * Canonical parameter table copied from front/fft-ocean-1 DEFAULT_SETTINGS,
 * then eased for a cream hero: slower wind, aqua highlights, cinematic camera.
 */
export const OCEAN_TUNING = {
  simulation: {
    oceanSize: 200,
    worldSize: 400,
    timeScale: 0.45,
    spectrumTimeScale: 0.5,
    windSpeed: 12.9,
    windAngle: 4.83,
    amplitude: 1.3,
    choppiness: 1.51,
    displacementScale: 0.005,
    foamThreshold: 0,
  },
  /** Pointer hover response for morph mode (page headers + campus hero). */
  morphResponse: {
    magnitudeScale: 0.62,
    choppinessGain: 0.48,
    choppinessSwirl: 0.16,
    timeScaleGain: 0.1,
    timeScaleSwirl: 0.04,
    displacementGain: 0.42,
    displacementSwirl: 0.07,
    pointSizeGain: 0.22,
    pointSizeSwirl: 0.05,
    bloomThresholdGain: 0.1,
    bloomStrengthReduction: 0.18,
  },
  particles: {
    pointSize: 0.7,
    fadeNear: 60,
    fadeFar: 250,
    fadePower: 3.2,
    oceanColor: [
      0.003035269835488375, 0.003035269835488375, 0.003035269835488375, 0,
    ] as const,
    neonColor: [0.38, 0.68, 0.64, 0] as const,
    foamColor: [0.82, 0.78, 0.72, 0] as const,
  },
  /** Closer rig for the hero brand drop — shows volume and specular highlights. */
  dropCamera: {
    eye: [16, 24, 74] as const,
    target: [8, 9, 38] as const,
    pitchDegrees: -18,
    fovDegrees: 64,
    near: 0.1,
    far: 2000,
    yawRange: 22,
    pitchRange: 16,
  },
  camera: {
    // Gallery rig from the fft-ocean example — horizon in the upper third.
    eye: [0, 30, 90] as const,
    target: [0, 5, 55] as const,
    pitchDegrees: -10,
    fovDegrees: 90,
    near: 0.1,
    far: 2000,
  },
  /** 3/4 factory rig for Final CTA — closer, lower FOV, little look swim. */
  factoryCamera: {
    eye: [46, 32, 58] as const,
    target: [0, 7, 0] as const,
    pitchDegrees: -12,
    fovDegrees: 52,
    near: 0.1,
    far: 2000,
    yawRange: 8,
    pitchRange: 6,
  },
  factoryMorph: {
    scale: 1.48,
    specular: 1.12,
    lookStrengthX: 0.12,
    lookStrengthY: 0.1,
    bodyColor: [0.08, 0.22, 0.2, 0] as const,
    highlightColor: [0.62, 0.52, 0.28, 0] as const,
    rimColor: [0.34, 0.64, 0.6, 0] as const,
  },
  /** Wider, slightly higher rig so the campus grounds read as a site. */
  campusCamera: {
    eye: [38, 42, 78] as const,
    target: [0, 5, 0] as const,
    pitchDegrees: -16,
    fovDegrees: 56,
    near: 0.1,
    far: 2000,
    yawRange: 10,
    pitchRange: 7,
  },
  campusMorph: {
    scale: 1.35,
    specular: 0.95,
    lookStrengthX: 0.1,
    lookStrengthY: 0.08,
    bodyColor: [0.06, 0.18, 0.16, 0] as const,
    highlightColor: [0.52, 0.58, 0.48, 0] as const,
    rimColor: [0.28, 0.56, 0.62, 0] as const,
  },
  bloom: {
    threshold: 0.52,
    smoothWidth: 0.012,
    strength: 0.028,
    radius: 0.32,
    levels: 5,
    kernelRadii: [6, 10, 14, 18, 22] as const,
  },
  dropMorph: {
    radius: 34,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    tipOffset: 0.06,
    halfWidth: 0.44,
    cornerInsetPx: 41,
    depthScale: 1.85,
    specular: 2.05,
    anchorOffsetX: 0.65,
    anchorOffsetY: 0.2,
    tiltStrengthX: 0.42,
    tiltStrengthY: 0.32,
    proximityRadius: 1.35,
    lookStrengthX: 0.45,
    lookStrengthY: 0.35,
    /** Drop body / highlight / rim (RGBA, alpha unused). */
    bodyColor: [0.1, 0.38, 0.34, 0] as const,
    highlightColor: [0.78, 0.62, 0.26, 0] as const,
    rimColor: [0.42, 0.82, 0.74, 0] as const,
  },
  /** Campus hero drop only — initial/hover phases; page headers use `camera` + `particles` above. */
  heroDrop: {
    initial: {
      camera: {
        eye: [2, 60, 120] as const,
        target: [8, 0, 80] as const,
        pitchDegrees: -33,
        fovDegrees: 110,
        near: 0.1,
        far: 2000,
        yawRange: 32,
        pitchRange: 5,
      },
      lookStrengthX: 0.28,
      lookStrengthY: 0.45,
      particles: {
        pointSize: 1.2,
        oceanColor: [0, 0.35, 0.003035269835488375, 0] as const,
        neonColor: [0.47, 0.68, 0.6, 0] as const,
        foamColor: [0.82, 0.78, 0.72, 0] as const,
      },
      bloom: {
        strength: 0.036,
        threshold: 0.41,
      },
    },
    hover: {
      camera: {
        eye: [20, 28, 72] as const,
        target: [24, 11, 40] as const,
        pitchDegrees: -16,
        fovDegrees: 62,
        near: 0.1,
        far: 2000,
        yawRange: 18,
        pitchRange: 12,
      },
      lookStrengthX: 0.28,
      lookStrengthY: 0.22,
      particles: {
        pointSize: 0.95,
      },
      bloom: {
        strength: 0.068,
        threshold: 0.34,
      },
    },
    anchor: {
      cornerInsetPx: 0,
      anchorOffsetX: 0.58,
      anchorOffsetY: 0.32,
    },
  },
} as const;

/** Matches front's `gaussianCoefficients`: sigma=radius/3, no normalization pass. */
export function gaussianCoefficients(kernelRadius: number): readonly number[] {
  return Array.from({ length: 24 }, (_, index) =>
    index < kernelRadius
      ? (0.39894 * Math.exp((-0.5 * index * index) / (kernelRadius / 3) ** 2)) /
        (kernelRadius / 3)
      : 0
  );
}
