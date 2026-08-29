struct ParticleUniforms {
  view: mat4x4f,
  projection: mat4x4f,
  viewport: vec4f,
  world: vec4f,
  fade: vec4f,
  oceanColor: vec4f,
  neonColor: vec4f,
  foamColor: vec4f,
  morph: vec4f,
  morph2: vec4f,
};

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) pointCoord: vec2f,
  @location(1) foam: f32,
  @location(2) normal: vec3f,
  @location(3) viewDir: vec3f,
  @location(4) height: f32,
  @location(5) fade: f32,
  @location(6) morphBlend: f32,
  @location(7) dropNormal: vec3f,
};

@group(0) @binding(0) var<uniform> u: ParticleUniforms;
@group(0) @binding(1) var u_displacement: texture_2d<f32>;
@group(0) @binding(2) var u_normalFoam: texture_2d<f32>;
@group(0) @binding(3) var u_factoryPos: texture_2d<f32>;
@group(0) @binding(4) var u_factoryNml: texture_2d<f32>;
@group(0) @binding(5) var u_campusPos: texture_2d<f32>;
@group(0) @binding(6) var u_campusNml: texture_2d<f32>;

fn quadCorner(vertexIndex: u32) -> vec2f {
  let cornerIndex = array<u32, 6>(0u, 1u, 2u, 2u, 1u, 3u)[vertexIndex % 6u];
  switch (cornerIndex) {
    case 0u: { return vec2f(-1.0, -1.0); }
    case 1u: { return vec2f( 1.0, -1.0); }
    case 2u: { return vec2f(-1.0,  1.0); }
    default: { return vec2f( 1.0,  1.0); }
  }
}

fn dropHalfWidth(t: f32) -> f32 {
  let maxHw = max(u.world.w, 0.2);
  return mix(0.025, maxHw, pow(clamp(t, 0.0, 1.0), 0.68));
}

fn dropLattice(latticeRef: vec2f) -> vec2f {
  let t = latticeRef.y;
  let hw = dropHalfWidth(t);
  let x = (latticeRef.x * 2.0 - 1.0) * hw * 0.98;
  let y = t * 0.94 - 0.06;
  return vec2f(x, y);
}

fn dropHeight(latticeRef: vec2f) -> f32 {
  let t = clamp(latticeRef.y, 0.0, 1.0);
  let hw = dropHalfWidth(t);
  let nx = latticeRef.x * 2.0 - 1.0;
  let radial = abs(nx);
  let dome = sqrt(max(0.0, 1.0 - radial * radial * 0.78)) * hw;
  let profile = pow(t, 0.48);
  return dome * (0.48 + profile * 1.18);
}

fn dropPosLocal(latticeRef: vec2f) -> vec3f {
  let xz = dropLattice(latticeRef);
  return vec3f(xz.x, dropHeight(latticeRef), xz.y);
}

fn dropNormalLocal(latticeRef: vec2f) -> vec3f {
  let e = vec2f(0.007, 0.007);
  let p = dropPosLocal(latticeRef);
  let px = dropPosLocal(latticeRef + vec2f(e.x, 0.0));
  let py = dropPosLocal(latticeRef + vec2f(0.0, e.y));
  let tx = px - p;
  let ty = py - p;
  return normalize(cross(ty, tx));
}

fn rotateY3(p: vec3f, angle: f32) -> vec3f {
  let c = cos(angle);
  let s = sin(angle);
  return vec3f(p.x * c - p.z * s, p.y, p.x * s + p.z * c);
}

fn rotateX3(p: vec3f, angle: f32) -> vec3f {
  let c = cos(angle);
  let s = sin(angle);
  return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

@vertex fn vs_main(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32,
) -> VertexOut {
  let resolution = max(1u, u32(u.viewport.w));
  let i = instanceIndex % resolution;
  let j = instanceIndex / resolution;
  let particleRef = vec2f(f32(i), f32(j)) / f32(resolution);
  let texCoord = vec2u(i, j);

  let disp = textureLoad(u_displacement, texCoord, 0).xyz * u.world.y;
  let nf = textureLoad(u_normalFoam, texCoord, 0);

  let halfWorld = u.world.x * 0.5;
  let base = vec3f(
    particleRef.x * u.world.x - halfWorld,
    0.0,
    particleRef.y * u.world.x - halfWorld,
  );
  var pos = base + disp;

  let morphStrength = clamp(u.morph.z, 0.0, 1.0);
  var dropN = nf.xyz;
  if (morphStrength > 0.001) {
    let eased = morphStrength * morphStrength * (3.0 - 2.0 * morphStrength);
    // Factory cloud size is packed in world.w (256); drop half-width stays < 2.
    if (u.world.w > 8.0) {
      let factorySize = max(u.world.w, 1.0);
      let fi = min(u32(particleRef.x * factorySize), u32(factorySize) - 1u);
      let fj = min(u32(particleRef.y * factorySize), u32(factorySize) - 1u);
      let factoryP = textureLoad(u_factoryPos, vec2u(fi, fj), 0);
      let factoryN = textureLoad(u_factoryNml, vec2u(fi, fj), 0);
      let campusP = textureLoad(u_campusPos, vec2u(fi, fj), 0);
      let campusN = textureLoad(u_campusNml, vec2u(fi, fj), 0);
      let targetBlend = clamp(u.morph2.y, 0.0, 1.0);
      let cloudP = mix(factoryP.xyz, campusP.xyz, targetBlend);
      let cloudN = mix(factoryN.xyz, campusN.xyz, targetBlend);
      let cell = vec2f(f32(fi), f32(fj)) / factorySize;
      let cloudScale = max(u.morph.w, 0.05);
      let jitter = (particleRef - cell) * 0.42 * cloudScale;
      let targetPos = cloudP * cloudScale + vec3f(jitter.x, 0.0, jitter.y);
      pos = mix(pos, targetPos, eased);
      pos += disp * eased * 0.045;
      dropN = mix(nf.xyz, normalize(cloudN + vec3f(0.0, 0.0001, 0.0)), eased);
    } else {
      let dropCenter = u.morph.xy;
      let dropRadius = max(u.morph.w, 1.0);
      let depth = max(u.morph2.z, 0.1);

      let scaleZ = max(u.fade.w, 0.05);
      var local = dropPosLocal(particleRef) * dropRadius;
      local = vec3f(local.x, local.y * depth, local.z * scaleZ);
      local = rotateY3(local, u.morph2.x);
      local = rotateX3(local, u.morph2.y);

      dropN = dropNormalLocal(particleRef);
      dropN = rotateY3(dropN, u.morph2.x);
      dropN = rotateX3(dropN, u.morph2.y);

      let targetPos = vec3f(dropCenter.x + local.x, local.y, dropCenter.y + local.z);
      pos = mix(pos, targetPos, eased);
    }
  }

  let mv = u.view * vec4f(pos, 1.0);
  let viewDir = -mv.xyz;
  let dist = -mv.z;
  let f = 1.0 - smoothstep(u.fade.x, u.fade.y, dist);
  let fade = pow(clamp(f, 0.0, 1.0), u.fade.z);

  let projected = u.projection * mv;
  let ndc = projected.xy / projected.w;

  let corner = quadCorner(vertexIndex);
  let pointSizePx = 2.0 * u.world.z * u.viewport.z;
  let clipOffset = corner * (pointSizePx / u.viewport.xy) * projected.w;
  let clip = vec4f(ndc * projected.w + clipOffset, projected.z, projected.w);

  var out: VertexOut;
  out.position = clip;
  out.pointCoord = corner * 0.5 + vec2f(0.5);
  out.foam = nf.w;
  out.normal = nf.xyz;
  out.viewDir = viewDir;
  out.height = disp.y;
  out.fade = fade;
  out.morphBlend = morphStrength;
  out.dropNormal = dropN;
  return out;
}

@fragment fn fs_main(in: VertexOut) -> @location(0) vec4f {
  let cc = in.pointCoord - vec2f(0.5);
  let d2 = dot(cc, cc);
  if (d2 > 0.25) {
    discard;
  }

  let v = normalize(in.viewDir);
  let dropBlend = smoothstep(0.08, 0.72, in.morphBlend);
  let n = normalize(mix(in.normal, in.dropNormal, dropBlend));
  let ndv = clamp(dot(n, v), 0.0, 1.0);
  let fresnel = pow(1.0 - ndv, 4.0);

  let foam = clamp(in.foam, 0.0, 1.0);
  let crest = smoothstep(-0.5, 1.5, in.height);

  var color = u.oceanColor.rgb * 0.5;
  color += u.neonColor.rgb * crest * 0.22;
  color += u.neonColor.rgb * fresnel * 0.05;
  color = mix(color, u.foamColor.rgb, foam);

  if (dropBlend > 0.01) {
    let key = normalize(vec3f(-0.28, 0.88, 0.38));
    let fill = normalize(vec3f(0.62, 0.18, -0.22));
    let wrap = clamp(dot(n, key) * 0.55 + 0.45, 0.0, 1.0);
    let fillLit = clamp(dot(n, fill), 0.0, 1.0);
    let halfDir = normalize(key + v);
    let spec = pow(clamp(dot(n, halfDir), 0.0, 1.0), 22.0) * u.morph2.w;
    let rim = pow(1.0 - ndv, 2.4);

    let body = u.oceanColor.rgb * 0.42 + u.neonColor.rgb * 0.58;
    var lit = body * (0.18 + wrap * 0.92 + fillLit * 0.32);
    lit += u.foamColor.rgb * spec * 1.55;
    lit += u.neonColor.rgb * rim * 0.85;

    color = mix(color, lit, dropBlend);
  }

  var alpha = 0.016 + crest * 0.032 + fresnel * 0.02;
  alpha = mix(alpha, 1.0, foam);
  let factoryGlow = select(1.0, 0.42, u.world.w > 8.0);
  alpha += dropBlend * (0.28 + fresnel * 0.32 + u.morph2.w * 0.1) * factoryGlow;
  color *= in.fade;
  alpha *= in.fade;
  return vec4f(color, clamp(alpha, 0.0, 1.0));
}
