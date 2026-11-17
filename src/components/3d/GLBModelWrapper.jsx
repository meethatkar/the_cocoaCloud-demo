"use client";

import React, { memo, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CAKE_MODEL_URL, DRACO_DECODER_PATH } from "@/services/gltfLoaderService";
import { ProceduralCake } from "./ProceduralCake";

/**
 * GLB Model Wrapper Component.
 *
 * PRODUCTION SETUP NOTE:
 * 1. Place your exported 3D model at: `public/models/cake.glb`
 * 2. Ensure child meshes in the GLTF are named:
 *    - 'Tier_1' (Base tier mesh)
 *    - 'Tier_2' (Middle tier mesh)
 *    - 'Tier_3' (Top tier mesh)
 *    - 'Plaque' (Front inscription mesh for Decal / CanvasTexture)
 * 3. The loader uses Draco compression decoder via Google's static Draco CDN.
 */
function ProductionGLBModel({ config }) {
  // Load GLTF with Draco compression decoder
  const { scene } = useGLTF(CAKE_MODEL_URL, DRACO_DECODER_PATH);
  const clonedSceneRef = useRef();

  useEffect(() => {
    if (!scene) return;

    // 1. Tiers Visibility Control
    const tier1 = scene.getObjectByName("Tier_1");
    const tier2 = scene.getObjectByName("Tier_2");
    const tier3 = scene.getObjectByName("Tier_3");

    if (tier1) tier1.visible = config.tiers >= 1;
    if (tier2) tier2.visible = config.tiers >= 2;
    if (tier3) tier3.visible = config.tiers >= 3;

    // 2. Clone materials to prevent mutating shared instances
    scene.traverse((child) => {
      if (child.isMesh && child.name.startsWith("Tier_")) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // Clone material before setting flavor color
          child.material = child.material.clone();
          if (child.material.color && config.flavorColor) {
            child.material.color.set(config.flavorColor);
          }
        }
      }
    });
  }, [scene, config.tiers, config.flavorColor]);

  return <primitive object={scene} />;
}

/**
 * Smart Model Loader that uses GLB if available, or renders the high-fidelity
 * Procedural Cake to ensure zero broken scenes during local development / testing.
 */
function GLBModelWrapperComponent({ config, modelAvailable = false }) {
  if (modelAvailable) {
    try {
      return <ProductionGLBModel config={config} />;
    } catch {
      // Fallback if loading GLB fails
      return <ProceduralCake config={config} />;
    }
  }

  // Fallback to procedural cake
  return <ProceduralCake config={config} />;
}

export const GLBModelWrapper = memo(GLBModelWrapperComponent);

