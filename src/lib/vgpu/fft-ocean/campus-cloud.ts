/** Baked Bemta–Sarora grounds for the Final CTA campus morph. */

export const CAMPUS_CLOUD_SIZE = 256 as const;

type Vec3 = [number, number, number]

type Triangle = {
  a: Vec3
  b: Vec3
  c: Vec3
  n: Vec3
  area: number
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function scale(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s]
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / len, v[1] / len, v[2] / len]
}

function pushTri(tris: Triangle[], a: Vec3, b: Vec3, c: Vec3) {
  const ab = sub(b, a)
  const ac = sub(c, a)
  const n = cross(ab, ac)
  const area = Math.hypot(n[0], n[1], n[2]) * 0.5
  if (area < 1e-8) return
  tris.push({ a, b, c, n: normalize(n), area })
}

function addBox(
  tris: Triangle[],
  cx: number,
  cy: number,
  cz: number,
  sx: number,
  sy: number,
  sz: number
) {
  const hx = sx * 0.5
  const hy = sy * 0.5
  const hz = sz * 0.5
  const p: Vec3[] = [
    [cx - hx, cy - hy, cz - hz],
    [cx + hx, cy - hy, cz - hz],
    [cx + hx, cy + hy, cz - hz],
    [cx - hx, cy + hy, cz - hz],
    [cx - hx, cy - hy, cz + hz],
    [cx + hx, cy - hy, cz + hz],
    [cx + hx, cy + hy, cz + hz],
    [cx - hx, cy + hy, cz + hz],
  ]
  const faces = [
    [0, 1, 2, 3],
    [5, 4, 7, 6],
    [4, 0, 3, 7],
    [1, 5, 6, 2],
    [3, 2, 6, 7],
    [4, 5, 1, 0],
  ]
  for (const [a, b, c, d] of faces) {
    pushTri(tris, p[a]!, p[b]!, p[c]!)
    pushTri(tris, p[a]!, p[c]!, p[d]!)
  }
}

function addShed(
  tris: Triangle[],
  cx: number,
  cz: number,
  width: number,
  depth: number,
  wallH: number,
  roofH: number
) {
  addBox(tris, cx, wallH * 0.5, cz, width, wallH, depth)
  const ridge = wallH + roofH
  const hw = width * 0.5
  const hd = depth * 0.5
  const peakF: Vec3 = [cx, ridge, cz - hd]
  const peakB: Vec3 = [cx, ridge, cz + hd]
  const fl: Vec3 = [cx - hw, wallH, cz - hd]
  const fr: Vec3 = [cx + hw, wallH, cz - hd]
  const bl: Vec3 = [cx - hw, wallH, cz + hd]
  const br: Vec3 = [cx + hw, wallH, cz + hd]
  pushTri(tris, fl, peakF, fr)
  pushTri(tris, bl, br, peakB)
  pushTri(tris, fl, bl, peakB)
  pushTri(tris, fl, peakB, peakF)
  pushTri(tris, fr, peakF, peakB)
  pushTri(tris, fr, peakB, br)
}

/** Long warehouse, admin block, MSME sheds, road, and gate — from the campus photos. */
function buildGroundsMesh(): Triangle[] {
  const tris: Triangle[] = []
  addBox(tris, 0, 0.12, 0, 118, 0.24, 62)

  addShed(tris, -10, -14, 54, 20, 7.2, 3.6)
  addBox(tris, -10, 1.1, -3, 48, 0.35, 2.2)

  addShed(tris, 32, -16, 16, 13, 5.8, 2.8)
  addShed(tris, 48, -16, 14, 12, 5.4, 2.6)

  addBox(tris, -40, 4.6, 10, 18, 9.2, 16)
  addBox(tris, -40, 2.4, -2, 12, 4.8, 10)
  addBox(tris, -40, 9.8, 10, 8, 1.4, 6)

  addBox(tris, 4, 0.22, 8, 78, 0.44, 4.2)
  addBox(tris, 22, 0.28, 20, 16, 0.56, 8)

  addBox(tris, 16, 2.4, 18, 1.1, 4.8, 1.1)
  addBox(tris, 28, 2.4, 18, 1.1, 4.8, 1.1)
  addBox(tris, 22, 5.1, 18, 14, 0.45, 3.2)

  return tris
}

function sampleCloud(tris: Triangle[], count: number) {
  const areas = tris.map((t) => t.area)
  const prefix = new Float64Array(areas.length)
  let sum = 0
  for (let i = 0; i < areas.length; i++) {
    sum += areas[i]!
    prefix[i] = sum
  }

  const pick = (rand: number) => {
    const x = rand * sum
    let lo = 0
    let hi = prefix.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (prefix[mid]! < x) lo = mid + 1
      else hi = mid
    }
    return tris[lo]!
  }

  let seed = 0x5c0a11e5
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }

  const points: { p: Vec3; n: Vec3 }[] = []
  for (let i = 0; i < count; i++) {
    const tri = pick(rand())
    let u = rand()
    let v = rand()
    if (u + v > 1) {
      u = 1 - u
      v = 1 - v
    }
    const w = 1 - u - v
    const p = add(add(scale(tri.a, w), scale(tri.b, u)), scale(tri.c, v))
    points.push({ p, n: tri.n })
  }

  points.sort((a, b) => a.p[2] - b.p[2] || a.p[0] - b.p[0])
  return points
}

export type CampusCloud = {
  size: number
  positions: Float32Array
  normals: Float32Array
}

let cached: CampusCloud | null = null

export function getCampusCloud(): CampusCloud {
  if (cached) return cached

  const size = CAMPUS_CLOUD_SIZE
  const count = size * size
  const points = sampleCloud(buildGroundsMesh(), count)

  let minX = Infinity
  let maxX = -Infinity
  let minZ = Infinity
  let maxZ = -Infinity
  for (const { p } of points) {
    minX = Math.min(minX, p[0])
    maxX = Math.max(maxX, p[0])
    minZ = Math.min(minZ, p[2])
    maxZ = Math.max(maxZ, p[2])
  }
  const cx = (minX + maxX) * 0.5
  const cz = (minZ + maxZ) * 0.5
  const extent = Math.max(maxX - minX, maxZ - minZ) || 1
  const world = 118 / extent

  const positions = new Float32Array(count * 4)
  const normals = new Float32Array(count * 4)
  for (let i = 0; i < count; i++) {
    const { p, n } = points[i]!
    const o = i * 4
    positions[o] = (p[0] - cx) * world
    positions[o + 1] = p[1] * world
    positions[o + 2] = (p[2] - cz) * world
    positions[o + 3] = 1
    normals[o] = n[0]
    normals[o + 1] = n[1]
    normals[o + 2] = n[2]
    normals[o + 3] = 1
  }

  cached = { size, positions, normals }
  return cached
}
