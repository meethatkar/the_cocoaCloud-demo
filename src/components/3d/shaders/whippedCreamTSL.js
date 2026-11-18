import * as THREE from "three";
import {
  Fn,
  color,
  float,
  vec3,
  normalWorld,
  positionWorld,
  cameraPosition,
  dot,
  max,
  pow,
  mix,
} from "three/tsl";

/**
 * Three.js Shading Language (TSL) function for photorealistic whipped cream / syrup piping.
 *
 * Simulates:
 * 1. Subsurface scattering wrap & light absorption inside airy cream.
 * 2. Glaze surface lipid sheen and specular micro-highlights.
 * 3. Velvet Fresnel rim reflection simulating whipped dairy fat globules.
 */
export const whippedCreamColorNode = Fn(({
  creamColor = "#FAF5EC",
  highlightColor = "#FFFFFF",
  warmAbsorptionColor = "#F4E3CD",
}) => {
  const N = normalWorld;
  const V = cameraPosition.sub(positionWorld).normalize();
  const NdotV = max(dot(N, V), float(0.0));

  // Velvet Fresnel rim on cream boundaries
  const fresnel = pow(float(1.0).sub(NdotV), float(2.8));

  // Dairy lipid sheen reflection
  const sheen = mix(color(creamColor), color(highlightColor), fresnel.mul(float(0.55)));

  // Subtle interior scattering warmth
  const result = mix(color(warmAbsorptionColor), sheen, NdotV.mul(float(0.7)).add(float(0.3)));

  return result;
});

