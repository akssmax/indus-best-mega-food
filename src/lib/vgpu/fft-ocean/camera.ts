import { OCEAN_TUNING } from "./tuning";

export interface OceanLook {
  readonly x: number;
  readonly y: number;
}

const YAW_RANGE = (22 * Math.PI) / 180;
const PITCH_RANGE = (12 * Math.PI) / 180;

/** Cinematic camera; `look` is a -1..1 pointer offset that yaws and pitches the rig. */
export function oceanCamera(
  size: readonly [number, number],
  look: OceanLook = { x: 0, y: 0 }
) {
  const { eye, target, pitchDegrees, fovDegrees, near, far } =
    OCEAN_TUNING.camera;
  const yaw = look.x * YAW_RANGE;
  const extraPitch = -look.y * PITCH_RANGE;
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
