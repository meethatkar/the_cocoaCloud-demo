import { useGLTF } from "@react-three/drei";

/**
 * Draco decoder configuration and GLTF model preload service.
 * Standard path for Draco decoders via CDN or local public directory.
 */
export const DRACO_DECODER_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

/**
 * Location where the production 3D cake model should be stored:
 * /public/models/cake.glb
 *
 * To supply your custom 3D model:
 * 1. Export your 3-tier cake model from Blender / Cinema4D as GLB with Draco compression.
 * 2. Name the child meshes: 'Tier_1', 'Tier_2', 'Tier_3', 'Plaque', 'Decorations'.
 * 3. Save it to `public/models/cake.glb`.
 */
export const CAKE_MODEL_URL = "/models/cake.glb";

/**
 * Preload GLTF model with Draco compression enabled
 */
export function preloadCakeModel() {
  if (typeof window !== "undefined") {
    try {
      // Configure useGLTF preload with Draco decoder URL
      useGLTF.preload(CAKE_MODEL_URL, DRACO_DECODER_PATH);
    } catch {
      // Safe fallback if model is not yet placed in public/
    }
  }
}

/**
 * Helper to safely clone materials and preserve PBR maps while setting color
 */
export function applyMaterialColor(mesh, hexColor) {
  if (!mesh || !mesh.material) return;

  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map((mat) => {
      const cloned = mat.clone();
      if (hexColor && cloned.color) cloned.color.set(hexColor);
      return cloned;
    });
  } else {
    mesh.material = mesh.material.clone();
    if (hexColor && mesh.material.color) {
      mesh.material.color.set(hexColor);
    }
  }
}

