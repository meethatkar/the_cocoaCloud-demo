"use client";

import React, { memo } from "react";

/**
 * Parisian Boutique Marble and Burnished Gold Pedestal
 */
function CakeStandComponent() {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Top warm alabaster marble pedestal platter */}
      <mesh receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.12, 64]} />
        <meshStandardMaterial
          color="#FAF6F0"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Burnished gold rim band around platter */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[2.57, 2.57, 0.08, 64]} />
        <meshStandardMaterial
          color="#C5A059"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Central fluted burnished brass stem */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.42, 0.75, 0.55, 32]} />
        <meshStandardMaterial
          color="#B89246"
          roughness={0.28}
          metalness={0.78}
        />
      </mesh>

      {/* Tiered base plate in Soft Champagne stone */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.75, 1.85, 0.12, 64]} />
        <meshStandardMaterial
          color="#F1E8DC"
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Outer burnished gold rim on base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.86, 1.86, 0.08, 64]} />
        <meshStandardMaterial
          color="#C5A059"
          roughness={0.22}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

export const CakeStand = memo(CakeStandComponent);
