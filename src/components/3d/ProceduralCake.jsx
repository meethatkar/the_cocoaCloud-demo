"use client";

import React, { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ActiveDecorations } from "./Decorations";

/**
 * Procedural 3D Cake with Shapes, Tiers, Cloned Materials, Drips, Text Plaque & Decorations
 */
function ProceduralCakeComponent({ config }) {
  const {
    tiers = 1,
    shape = "Round",
    flavorColor = "#F3E5AB",
    dripColor = null,
    customText = "Happy Birthday!",
    decorations = [],
  } = config;

  // Refs for smooth tier entry animation
  const tier2GroupRef = useRef();
  const tier3GroupRef = useRef();

  // Animated tier scale transitions
  useFrame((_, delta) => {
    const targetScale2 = tiers >= 2 ? 1 : 0.001;
    const targetScale3 = tiers >= 3 ? 1 : 0.001;

    if (tier2GroupRef.current) {
      tier2GroupRef.current.scale.y = THREE.MathUtils.damp(
        tier2GroupRef.current.scale.y,
        targetScale2,
        8,
        delta
      );
      tier2GroupRef.current.scale.x = THREE.MathUtils.damp(
        tier2GroupRef.current.scale.x,
        targetScale2,
        8,
        delta
      );
      tier2GroupRef.current.scale.z = THREE.MathUtils.damp(
        tier2GroupRef.current.scale.z,
        targetScale2,
        8,
        delta
      );
      tier2GroupRef.current.visible = tier2GroupRef.current.scale.y > 0.02;
    }

    if (tier3GroupRef.current) {
      tier3GroupRef.current.scale.y = THREE.MathUtils.damp(
        tier3GroupRef.current.scale.y,
        targetScale3,
        8,
        delta
      );
      tier3GroupRef.current.scale.x = THREE.MathUtils.damp(
        tier3GroupRef.current.scale.x,
        targetScale3,
        8,
        delta
      );
      tier3GroupRef.current.scale.z = THREE.MathUtils.damp(
        tier3GroupRef.current.scale.z,
        targetScale3,
        8,
        delta
      );
      tier3GroupRef.current.visible = tier3GroupRef.current.scale.y > 0.02;
    }
  });

  // Base shared material template
  const baseMaterialTemplate = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.38,
      metalness: 0.04,
    });
  }, []);

  // Cloned material instance per flavor selection (to avoid mutating shared materials)
  const cakeMaterial = useMemo(() => {
    const cloned = baseMaterialTemplate.clone();
    cloned.color.set(flavorColor);
    return cloned;
  }, [flavorColor, baseMaterialTemplate]);

  // Cloned drip glaze material
  const dripMaterial = useMemo(() => {
    if (!dripColor) return null;
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(dripColor),
      roughness: 0.12,
      metalness: dripColor === "#D4AF37" ? 0.85 : 0.1,
    });
    return mat;
  }, [dripColor]);

  // Heart 2D Shape generator
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
    shape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 1.0);
    shape.bezierCurveTo(x + 0.65, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
    shape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  // Heart Extrude Geometries for 3 tiers
  const heartExtrudeGeometries = useMemo(() => {
    const extrudeSettings1 = { depth: 0.9, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 0.06, bevelThickness: 0.06 };
    const extrudeSettings2 = { depth: 0.85, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };
    const extrudeSettings3 = { depth: 0.8, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 0.04, bevelThickness: 0.04 };
    return {
      t1: new THREE.ExtrudeGeometry(heartShape, extrudeSettings1),
      t2: new THREE.ExtrudeGeometry(heartShape, extrudeSettings2),
      t3: new THREE.ExtrudeGeometry(heartShape, extrudeSettings3),
    };
  }, [heartShape]);

  // Dimensions
  const t1Height = 0.95;
  const t2Height = 0.85;
  const t3Height = 0.75;

  const t1Y = t1Height / 2;
  const t2Y = t1Height + t2Height / 2;
  const t3Y = t1Height + t2Height + t3Height / 2;

  const topTierY = tiers === 1 ? t1Height : tiers === 2 ? t1Height + t2Height : t1Height + t2Height + t3Height;
  const topRadius = tiers === 1 ? 2.0 : tiers === 2 ? 1.4 : 0.85;

  return (
    <group position={[0, -0.15, 0]}>
      {/* ================= TIER 1 (BASE) ================= */}
      <group name="Tier_1" position={[0, 0, 0]}>
        {shape === "Round" && (
          <mesh position={[0, t1Y, 0]} castShadow receiveShadow material={cakeMaterial}>
            <cylinderGeometry args={[2.0, 2.0, t1Height, 64]} />
          </mesh>
        )}

        {shape === "Square" && (
          <mesh position={[0, t1Y, 0]} castShadow receiveShadow material={cakeMaterial}>
            <boxGeometry args={[3.2, t1Height, 3.2]} />
          </mesh>
        )}

        {shape === "Heart" && (
          <mesh
            geometry={heartExtrudeGeometries.t1}
            position={[-0.45, 0.02, 0.75]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={[3.2, 3.2, 1]}
            castShadow
            receiveShadow
            material={cakeMaterial}
          />
        )}

        {/* Drip Glaze for Tier 1 */}
        {dripColor && dripMaterial && (
          <mesh position={[0, t1Height - 0.02, 0]} castShadow material={dripMaterial}>
            <cylinderGeometry args={[2.02, 2.02, 0.16, 64]} />
          </mesh>
        )}

        {/* Front Calligraphy Inscription Plaque */}
        <group position={[0, t1Y, shape === "Square" ? 1.63 : 2.03]}>
          {/* Gold plaque frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.44, 0.04]} />
            <meshStandardMaterial
              color="#221A15"
              roughness={0.25}
              metalness={0.4}
            />
          </mesh>

          {/* Gold filigree rim */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.54, 0.48, 0.015]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* 3D Calligraphy Inscription */}
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.11}
            color="#F3E5AB"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
          >
            {customText || "Cocoa & Cloud"}
          </Text>
        </group>
      </group>

      {/* ================= TIER 2 (MIDDLE) ================= */}
      <group ref={tier2GroupRef} name="Tier_2" position={[0, 0, 0]}>
        {shape === "Round" && (
          <mesh position={[0, t2Y, 0]} castShadow receiveShadow material={cakeMaterial}>
            <cylinderGeometry args={[1.4, 1.4, t2Height, 64]} />
          </mesh>
        )}

        {shape === "Square" && (
          <mesh position={[0, t2Y, 0]} castShadow receiveShadow material={cakeMaterial}>
            <boxGeometry args={[2.3, t2Height, 2.3]} />
          </mesh>
        )}

        {shape === "Heart" && (
          <mesh
            geometry={heartExtrudeGeometries.t2}
            position={[-0.32, t1Height + 0.02, 0.55]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={[2.3, 2.3, 1]}
            castShadow
            receiveShadow
            material={cakeMaterial}
          />
        )}

        {/* Drip Glaze for Tier 2 */}
        {dripColor && dripMaterial && (
          <mesh position={[0, t1Height + t2Height - 0.02, 0]} castShadow material={dripMaterial}>
            <cylinderGeometry args={[1.42, 1.42, 0.15, 64]} />
          </mesh>
        )}
      </group>

      {/* ================= TIER 3 (TOP) ================= */}
      <group ref={tier3GroupRef} name="Tier_3" position={[0, 0, 0]}>
        {shape === "Round" && (
          <mesh position={[0, t3Y, 0]} castShadow receiveShadow material={cakeMaterial}>
            <cylinderGeometry args={[0.85, 0.85, t3Height, 64]} />
          </mesh>
        )}

        {shape === "Square" && (
          <mesh position={[0, t3Y, 0]} castShadow receiveShadow material={cakeMaterial}>
            <boxGeometry args={[1.4, t3Height, 1.4]} />
          </mesh>
        )}

        {shape === "Heart" && (
          <mesh
            geometry={heartExtrudeGeometries.t3}
            position={[-0.2, t1Height + t2Height + 0.02, 0.35]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={[1.5, 1.5, 1]}
            castShadow
            receiveShadow
            material={cakeMaterial}
          />
        )}

        {/* Drip Glaze for Tier 3 */}
        {dripColor && dripMaterial && (
          <mesh
            position={[0, t1Height + t2Height + t3Height - 0.02, 0]}
            castShadow
            material={dripMaterial}
          >
            <cylinderGeometry args={[0.87, 0.87, 0.14, 64]} />
          </mesh>
        )}
      </group>

      {/* ================= ARTISANAL DECORATIONS ================= */}
      <ActiveDecorations
        decorations={decorations}
        topTierY={topTierY}
        topRadius={topRadius}
        tierCount={tiers}
        midTierY={t1Height}
        midRadius={1.4}
        baseRadius={2.0}
      />
    </group>
  );
}

export const ProceduralCake = memo(ProceduralCakeComponent);

