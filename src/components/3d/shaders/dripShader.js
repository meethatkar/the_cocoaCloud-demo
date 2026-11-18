import * as THREE from "three";

/**
 * Custom GLSL Shader for Glossy Ganache & Liquid Gold Glaze Drip.
 * Features:
 * - High-index Fresnel reflections for wet syrup glaze
 * - Height-based thickness attenuation (translucent glaze rim, dense droplet body)
 * - Metallic sheen mode for 24K Burnished Liquid Gold
 */
export const DripShader = {
  uniforms: {
    uColor: { value: new THREE.Color("#C86D51") },
    uTime: { value: 0.0 },
    uLightPos: { value: new THREE.Vector3(5.0, 7.0, 4.0) },
    uLightColor: { value: new THREE.Color("#FFF8F0") },
    uIsGold: { value: 0.0 }, // 1.0 if burnished gold
  },

  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;

      vec4 mvPosition = viewMatrix * worldPos;
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  fragmentShader: /* glsl */ `
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform vec3 uLightPos;
    uniform vec3 uLightColor;
    uniform float uIsGold;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewPosition);
      vec3 L = normalize(uLightPos - vWorldPosition);
      vec3 H = normalize(L + V);

      float NdotL = clamp(dot(N, L), 0.0, 1.0);
      float NdotH = clamp(dot(N, H), 0.0, 1.0);
      float NdotV = clamp(dot(N, V), 0.0, 1.0);

      // 1. Wet mirror glaze specular highlight (sharp gloss)
      float spec = pow(NdotH, 80.0) * 1.8;
      float softSpec = pow(NdotH, 16.0) * 0.4;

      // 2. Strong Fresnel reflection for liquid syrup viscosity
      float fresnel = pow(1.0 - NdotV, 3.5);

      // 3. Branchless metallic gold vs rich chocolate/fruit ganache using step & mix
      float isGoldFlag = step(0.5, uIsGold);

      // Gold Response
      vec3 goldHighlights = mix(vec3(1.0, 0.95, 0.75), uColor, 0.2);
      vec3 ambientGold = uColor * 0.45;
      vec3 diffGold = uColor * NdotL * 0.9;
      vec3 specGold = goldHighlights * (spec + softSpec * 1.2);
      vec3 rimGold = goldHighlights * fresnel * 0.9;
      vec3 goldFinal = ambientGold + diffGold + specGold + rimGold;

      // Ganache Response
      float thickness = smoothstep(0.0, 0.6, vUv.y);
      vec3 subsurfaceGlaze = mix(uColor * 1.3, uColor, thickness);
      vec3 diffuse = subsurfaceGlaze * (NdotL * 0.85 + 0.25);
      vec3 specular = uLightColor * (spec + softSpec);
      vec3 rim = vec3(1.0, 0.96, 0.9) * fresnel * 0.65;
      vec3 ganacheFinal = diffuse + specular + rim;

      vec3 finalColor = mix(ganacheFinal, goldFinal, isGoldFlag);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};
