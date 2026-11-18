import * as THREE from "three";

/**
 * Custom GLSL Shader for Artisanal French Buttercream & Fondant.
 * Features:
 * - 3D Simplex noise for organic spatula texture and sponge micro-porosity
 * - Subsurface scattering (SSS) wrap simulation for realistic frosting translucency
 * - Fresnel velvet rim sheen (delicate confectionery glaze)
 * - Vertical ambient occlusion gradient (darker near tier crevices)
 */
export const ButtercreamShader = {
  uniforms: {
    uBaseColor: { value: new THREE.Color("#FAF6F0") },
    uRoughness: { value: 0.42 },
    uTime: { value: 0.0 },
    uLightPos: { value: new THREE.Vector3(5.0, 7.0, 4.0) },
    uLightColor: { value: new THREE.Color("#FFF8F0") },
    uAmbientColor: { value: new THREE.Color("#F1E8DC") },
    uRimColor: { value: new THREE.Color("#FFF2DF") },
    uWrapFactor: { value: 0.45 }, // Subsurface scatter light wrap
  },

  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - 0.5;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      // Subtle organic spatula wave displacement
      float spatulaNoise = snoise(position * 3.5) * 0.018;
      float finePoreNoise = snoise(position * 18.0) * 0.005;
      vec3 displacedPos = position + normal * (spatulaNoise + finePoreNoise);

      vec4 worldPos = modelMatrix * vec4(displacedPos, 1.0);
      vWorldPosition = worldPos.xyz;

      vec4 mvPosition = viewMatrix * worldPos;
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  fragmentShader: /* glsl */ `
    uniform vec3 uBaseColor;
    uniform float uRoughness;
    uniform float uTime;
    uniform vec3 uLightPos;
    uniform vec3 uLightColor;
    uniform vec3 uAmbientColor;
    uniform vec3 uRimColor;
    uniform float uWrapFactor;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    // Procedural noise for microscopic sugar grain sparkles
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewPosition);
      vec3 L = normalize(uLightPos - vWorldPosition);
      vec3 H = normalize(L + V);

      // 1. Subsurface Scattering (SSS) Soft Light Wrap
      // Frosting absorbs light and re-emits a warm, soft diffuse glow
      float NdotL = dot(N, L);
      float wrappedDiff = clamp((NdotL + uWrapFactor) / (1.0 + uWrapFactor), 0.0, 1.0);
      float sssGlow = smoothstep(-0.2, 0.8, NdotL);

      // Warm translucent scatter tone (slightly richer/warmer than base)
      vec3 scatterTone = mix(uBaseColor * 1.15, vec3(1.0, 0.92, 0.85), 0.28);
      vec3 diffuse = mix(scatterTone, uBaseColor, sssGlow) * wrappedDiff;

      // 2. Cook-Torrance Inspired Specular Highlight for Buttercream Sheen
      float NdotH = clamp(dot(N, H), 0.0, 1.0);
      float specPower = mix(128.0, 18.0, uRoughness);
      float spec = pow(NdotH, specPower) * (1.0 - uRoughness * 0.5);

      // 3. Velvet Fresnel Rim Light (Tactile edge glow on frosting folds)
      float NdotV = clamp(dot(N, V), 0.0, 1.0);
      float fresnel = pow(1.0 - NdotV, 2.8);
      vec3 rimLight = uRimColor * fresnel * 0.45;

      // 4. Subtle Micro Sugar Crystal Sparkle
      float sparkle = hash(vUv * 240.0);
      sparkle = smoothstep(0.97, 1.0, sparkle) * spec * 1.5;

      // 5. Crevice Ambient Occlusion Gradient (subtly darker near bottom seam)
      float creviceAO = smoothstep(0.0, 0.25, vUv.y);
      creviceAO = mix(0.85, 1.0, creviceAO);

      // Final Color Blending
      vec3 ambient = uAmbientColor * 0.55 * uBaseColor;
      vec3 directLight = diffuse * uLightColor * 1.25;
      vec3 finalColor = (ambient + directLight) * creviceAO + (spec + sparkle) * uLightColor * 0.35 + rimLight;

      // Gamma correction approximation
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

