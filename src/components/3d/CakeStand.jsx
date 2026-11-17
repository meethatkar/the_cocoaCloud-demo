"use client";

import React, { memo } from "react";
import * as THREE from "three";

/**
 * Luxury Marble and Brushed Brass Cake Stand
 */
function CakeStandComponent() {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Top marble pedestal platter */}
      <mesh receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.12, 64]} />
        <meshStandardMaterial
          color="#F9F6F0"
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Gold/Brass rim band around platter */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[2.57, 2.57, 0.08, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Central fluted brass stem */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.42, 0.75, 0.55, 32]} />
        <meshStandardMaterial
          color="#C59B27"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Heavy tiered base plate */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.75, 1.85, 0.12, 64]} />
        <meshStandardMaterial
          color="#1A1717"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Outer gold rim on base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.86, 1.86, 0.08, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

export const CakeStand = memo(CakeStandComponent);

