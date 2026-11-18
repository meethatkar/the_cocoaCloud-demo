"use client";

import React, { memo, useMemo } from "react";
import * as THREE from "three";

/**
 * Piped French Shell / Pearl Border along tier rims
 */
export const PipedBorderRing = memo(function PipedBorderRing({
  radius = 2.0,
  y = 0.0,
  beadCount = 48,
  beadRadius = 0.075,
  material,
}) {
  const beads = useMemo(() => {
    const list = [];
    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      list.push({ x, z, rotY: -angle + Math.PI / 2 });
    }
    return list;
  }, [radius, beadCount]);

  return (
    <group position={[0, y, 0]}>
      {beads.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, 0, b.z]}
          rotation={[0, b.rotY, 0.2]}
          material={material}
          castShadow
        >
          {/* Star-tip sculpted shell shape */}
          <sphereGeometry args={[beadRadius, 12, 10]} />
        </mesh>
      ))}
    </group>
  );
});

/**
 * French Macaron confection (dome, pied/ruffle, creamy ganache layer)
 */
export const FrenchMacaron = memo(function FrenchMacaron({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.0,
  shellColor = "#E8C5B0", // Soft rose / champagne macaron
  fillingColor = "#2C1E18", // Valrhona ganache
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Top Cookie Dome */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={shellColor} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Top Pied / Ruffled foot */}
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.165, 0.16, 0.02, 16]} />
        <meshStandardMaterial color={shellColor} roughness={0.65} />
      </mesh>

      {/* Creamy Ganache Filling Layer */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
        <meshStandardMaterial color={fillingColor} roughness={0.2} />
      </mesh>

      {/* Bottom Pied / Ruffled foot */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.16, 0.165, 0.02, 16]} />
        <meshStandardMaterial color={shellColor} roughness={0.65} />
      </mesh>
      {/* Bottom Cookie Dome */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={shellColor} roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  );
});

/**
 * Organic Undulating Ganache Drip Ring with Varied Teardrop Lengths
 */
export const SculptedDripRing = memo(function SculptedDripRing({
  radius = 2.0,
  y = 1.0,
  dripCount = 20,
  material,
}) {
  const drips = useMemo(() => {
    const list = [];
    for (let i = 0; i < dripCount; i++) {
      const angle = (i / dripCount) * Math.PI * 2;
      const x = Math.cos(angle) * (radius + 0.015);
      const z = Math.sin(angle) * (radius + 0.015);

      // Procedural varied drip length using sine harmonics
      const lengthFactor =
        0.18 +
        Math.abs(Math.sin(i * 1.7)) * 0.22 +
        Math.cos(i * 3.1) * 0.08;

      list.push({
        x,
        z,
        length: Math.max(0.12, lengthFactor),
        bulbSize: 0.045 + Math.sin(i * 2.3) * 0.015,
        rotY: -angle,
      });
    }
    return list;
  }, [radius, dripCount]);

  return (
    <group position={[0, y, 0]}>
      {/* Top smooth collar rim */}
      <mesh material={material} position={[0, 0.02, 0]}>
        <torusGeometry args={[radius, 0.055, 16, 64]} />
      </mesh>

      {/* Individual cascading drip strands and droplet bulbs */}
      {drips.map((d, idx) => (
        <group key={idx} position={[d.x, 0, d.z]}>
          {/* Drip strand */}
          <mesh
            position={[0, -d.length / 2, 0]}
            material={material}
            castShadow
          >
            <cylinderGeometry args={[0.028, 0.038, d.length, 12]} />
          </mesh>

          {/* Heavy droplet bulb at the bottom of the drip */}
          <mesh
            position={[0, -d.length, 0]}
            material={material}
            castShadow
          >
            <sphereGeometry args={[d.bulbSize, 14, 14]} />
          </mesh>
        </group>
      ))}
    </group>
  );
});

