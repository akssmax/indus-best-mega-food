import { OCEAN_TUNING } from "./tuning";
import { getHeroDropHoverCamera } from "./tuning-runtime";

export interface OceanLook {
  readonly x: number;
  readonly y: number;
}

export type OceanInteraction =
  | "camera"
  | "morph"
  | "drop"
  | "factory"
  | "handshake"
  | "static";

export type OceanCameraProfile = "default" | "drop";

export type OceanCameraParams = {
  eye: readonly [number, number, number];
  target: readonly [number, number, number];
  pitchDegrees: number;
  fovDegrees: number;
  near: number;
  far: number;
  yawRange: number;
  pitchRange: number;
};

const DEFAULT_CAMERA: OceanCameraParams = {
  ...OCEAN_TUNING.camera,
  yawRange: 22,
  pitchRange: 12,
};

function cameraConfig(profile: OceanCameraProfile): OceanCameraParams {
  if (profile === "drop") {
    return getHeroDropHoverCamera();
  }
  return DEFAULT_CAMERA;
}

function lookRanges(config: OceanCameraParams) {
  return {
    yaw: (config.yawRange * Math.PI) / 180,
    pitch: (config.pitchRange * Math.PI) / 180,
  };
}

/** Cinematic camera; `look` is a -1..1 pointer offset that yaws and pitches the rig. */
export function oceanCamera(
  size: readonly [number, number],
  look: OceanLook = { x: 0, y: 0 },
  profile: OceanCameraProfile = "default"
) {
  return oceanCameraFromConfig(size, look, cameraConfig(profile));
}

export function oceanCameraFromConfig(
  size: readonly [number, number],
  look: OceanLook,
  config: OceanCameraParams
) {
  const { eye, target, pitchDegrees, fovDegrees, near, far } = config;
  const { yaw: yawRange, pitch: pitchRange } = lookRanges(config);
  const yaw = look.x * yawRange;
  const extraPitch = -look.y * pitchRange;
  const angle =
    Math.atan2(eye[1] - target[1], eye[2] - target[2]) -
    (pitchDegrees * Math.PI) / 180 +
    extraPitch;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const f = 1 / Math.tan((fovDegrees * Math.PI) / 360);
  const ty = -(c * eye[1] - s * eye[2]);
  const tz = -(s * eye[1] + c * eye[2]);

  const view = new Float32Array(16);
  view[0] = cy;
  view[2] = -sy;
  view[4] = sy * s;
  view[5] = c;
  view[6] = cy * s;
  view[8] = sy * c;
  view[9] = -s;
  view[10] = cy * c;
  view[12] = sy * tz;
  view[13] = ty;
  view[14] = cy * tz;
  view[15] = 1;

  const projection = new Float32Array(16);
  projection[0] = f / (size[0] / Math.max(1, size[1]));
  projection[5] = f;
  projection[10] = far / (near - far);
  projection[11] = -1;
  projection[14] = (far * near) / (near - far);
  return { view, projection };
}

function multiplyMat4(
  a: Float32Array,
  b: Float32Array
): Float32Array {
  const out = new Float32Array(16);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      out[col * 4 + row] =
        a[row] * b[col * 4 + 0] +
        a[4 + row] * b[col * 4 + 1] +
        a[8 + row] * b[col * 4 + 2] +
        a[12 + row] * b[col * 4 + 3];
    }
  }
  return out;
}

function transformPoint(
  m: Float32Array,
  x: number,
  y: number,
  z: number,
  w: number
): [number, number, number, number] {
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12] * w,
    m[1] * x + m[5] * y + m[9] * z + m[13] * w,
    m[2] * x + m[6] * y + m[10] * z + m[14] * w,
    m[3] * x + m[7] * y + m[11] * z + m[15] * w,
  ];
}

/** Inverts a column-major 4×4 matrix (gl-matrix layout). */
function invertMat4(m: Float32Array): Float32Array | null {
  const out = new Float32Array(16);
  const a00 = m[0],
    a01 = m[1],
    a02 = m[2],
    a03 = m[3];
  const a10 = m[4],
    a11 = m[5],
    a12 = m[6],
    a13 = m[7];
  const a20 = m[8],
    a21 = m[9],
    a22 = m[10],
    a23 = m[11];
  const a30 = m[12],
    a31 = m[13],
    a32 = m[14],
    a33 = m[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  let det =
    b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (Math.abs(det) < 1e-8) return null;
  det = 1 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}

/**
 * Raycasts a normalised hero-section point (0–1, origin top-left) onto the ocean
 * plane and returns world XZ for the hit. Used to pin the brand drop morph.
 */
export function oceanScreenToWorldXZ(
  size: readonly [number, number],
  nx: number,
  ny: number,
  planeY = 0,
  profile: OceanCameraProfile = "default"
): [number, number] | null {
  const { view, projection } = oceanCamera(size, { x: 0, y: 0 }, profile);
  const viewProjection = multiplyMat4(projection, view);
  const inverse = invertMat4(viewProjection);
  if (!inverse) return null;

  const ndcX = nx * 2 - 1;
  const ndcY = 1 - ny * 2;

  const unproject = (ndcZ: number) => {
    const p = transformPoint(inverse, ndcX, ndcY, ndcZ, 1);
    const w = p[3] || 1;
    return [p[0] / w, p[1] / w, p[2] / w] as const;
  };

  const near = unproject(0);
  const far = unproject(1);
  const dirX = far[0] - near[0];
  const dirY = far[1] - near[1];
  const dirZ = far[2] - near[2];
  if (Math.abs(dirY) < 1e-6) return null;

  const t = (planeY - near[1]) / dirY;
  return [near[0] + dirX * t, near[2] + dirZ * t];
}

/** Raycast using an explicit camera rig (matches live drop renderer framing). */
export function oceanScreenToWorldXZFromConfig(
  size: readonly [number, number],
  nx: number,
  ny: number,
  planeY: number,
  config: OceanCameraParams,
  look: OceanLook = { x: 0, y: 0 }
): [number, number] | null {
  const { view, projection } = oceanCameraFromConfig(size, look, config);
  const viewProjection = multiplyMat4(projection, view);
  const inverse = invertMat4(viewProjection);
  if (!inverse) return null;

  const ndcX = nx * 2 - 1;
  const ndcY = 1 - ny * 2;

  const unproject = (ndcZ: number) => {
    const p = transformPoint(inverse, ndcX, ndcY, ndcZ, 1);
    const w = p[3] || 1;
    return [p[0] / w, p[1] / w, p[2] / w] as const;
  };

  const near = unproject(0);
  const far = unproject(1);
  const dirX = far[0] - near[0];
  const dirY = far[1] - near[1];
  const dirZ = far[2] - near[2];
  if (Math.abs(dirY) < 1e-6) return null;

  const t = (planeY - near[1]) / dirY;
  return [near[0] + dirX * t, near[2] + dirZ * t];
}
