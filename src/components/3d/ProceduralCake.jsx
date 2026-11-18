"use client";

import React, { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ActiveDecorations } from "./Decorations";
import { ButtercreamShader } from "./shaders/buttercreamShader";
import { DripShader } from "./shaders/dripShader";
import { PipedBorderRing, SculptedDripRing, FrenchMacaron } from "./PipedBorders";

/**
 * Enhanced Photorealistic 3D Cake with Custom GLSL Shaders,
 * Artisanal Piped Borders, Sculpted Ganache Drips & French Macarons.
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

  // Custom GLSL Buttercream Shader Material with Subsurface Scattering & Spatula Noise
  const buttercreamMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uBaseColor: { value: new THREE.Color(flavorColor) },
        uRoughness: { value: 0.42 },
        uTime: { value: 0.0 },
        uLightPos: { value: new THREE.Vector3(5.0, 7.0, 4.0) },
        uLightColor: { value: new THREE.Color("#FFF8F0") },
        uAmbientColor: { value: new THREE.Color("#F1E8DC") },
        uRimColor: { value: new THREE.Color("#FFF2DF") },
        uWrapFactor: { value: 0.45 },
      },
      vertexShader: ButtercreamShader.vertexShader,
      fragmentShader: ButtercreamShader.fragmentShader,
    });
  }, [flavorColor]);

  // Custom GLSL Drip / Liquid Gold Shader Material
  const dripShaderMaterial = useMemo(() => {
    if (!dripColor) return null;
    const isGold =
      dripColor.toLowerCase() === "#c5a059" ||
      dripColor.toLowerCase() === "#d4af37";

    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(dripColor) },
        uTime: { value: 0.0 },
        uLightPos: { value: new THREE.Vector3(5.0, 7.0, 4.0) },
        uLightColor: { value: new THREE.Color("#FFF8F0") },
        uIsGold: { value: isGold ? 1.0 : 0.0 },
      },
      vertexShader: DripShader.vertexShader,
      fragmentShader: DripShader.fragmentShader,
      side: THREE.DoubleSide,
    });
  }, [dripColor]);

  // Cream border piping material (cloned from buttercream with slightly lighter tone)
  const pipedBorderMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(flavorColor).lerp(new THREE.Color("#FFFFFF"), 0.15),
      roughness: 0.35,
      metalness: 0.02,
    });
    return mat;
  }, [flavorColor]);

  // Animated tier scale transitions & shader uniforms time update
  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    if (buttercreamMaterial && buttercreamMaterial.uniforms) {
      buttercreamMaterial.uniforms.uTime.value = time;
    }
    if (dripShaderMaterial && dripShaderMaterial.uniforms) {
      dripShaderMaterial.uniforms.uTime.value = time;
    }

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
          <>
            <mesh position={[0, t1Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
              <cylinderGeometry args={[2.0, 2.0, t1Height, 64]} />
            </mesh>
            {/* Artisanal Piped Pearl Borders at Base and Rim */}
            <PipedBorderRing radius={2.02} y={0.03} beadCount={52} beadRadius={0.07} material={pipedBorderMaterial} />
            <PipedBorderRing radius={2.0} y={t1Height} beadCount={48} beadRadius={0.065} material={pipedBorderMaterial} />
          </>
        )}

        {shape === "Square" && (
          <mesh position={[0, t1Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
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
            material={buttercreamMaterial}
          />
        )}

        {/* Sculpted Undulating Ganache Drip for Tier 1 */}
        {dripColor && dripShaderMaterial && shape === "Round" && (
          <SculptedDripRing radius={2.01} y={t1Height} dripCount={22} material={dripShaderMaterial} />
        )}

        {/* Front Calligraphy Inscription Plaque */}
        <group position={[0, t1Y, shape === "Square" ? 1.63 : 2.03]}>
          {/* Burnished Gold plaque frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.44, 0.04]} />
            <meshStandardMaterial
              color="#2C1E18"
              roughness={0.25}
              metalness={0.2}
            />
          </mesh>

          {/* Burnished gold filigree rim */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.54, 0.48, 0.015]} />
            <meshStandardMaterial
              color="#C5A059"
              roughness={0.25}
              metalness={0.85}
            />
          </mesh>

          {/* 3D Calligraphy Inscription */}
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.11}
            color="#FAF6F0"
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
          <>
            <mesh position={[0, t2Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
              <cylinderGeometry args={[1.4, 1.4, t2Height, 64]} />
            </mesh>
            <PipedBorderRing radius={1.41} y={t1Height + 0.02} beadCount={36} beadRadius={0.06} material={pipedBorderMaterial} />
            <PipedBorderRing radius={1.4} y={t1Height + t2Height} beadCount={34} beadRadius={0.055} material={pipedBorderMaterial} />
          </>
        )}

        {shape === "Square" && (
          <mesh position={[0, t2Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
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
            material={buttercreamMaterial}
          />
        )}

        {/* Sculpted Undulating Ganache Drip for Tier 2 */}
        {dripColor && dripShaderMaterial && shape === "Round" && (
          <SculptedDripRing radius={1.41} y={t1Height + t2Height} dripCount={16} material={dripShaderMaterial} />
        )}
      </group>

      {/* ================= TIER 3 (TOP) ================= */}
      <group ref={tier3GroupRef} name="Tier_3" position={[0, 0, 0]}>
        {shape === "Round" && (
          <>
            <mesh position={[0, t3Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
              <cylinderGeometry args={[0.85, 0.85, t3Height, 64]} />
            </mesh>
            <PipedBorderRing radius={0.86} y={t1Height + t2Height + 0.02} beadCount={24} beadRadius={0.05} material={pipedBorderMaterial} />
            <PipedBorderRing radius={0.85} y={t1Height + t2Height + t3Height} beadCount={22} beadRadius={0.05} material={pipedBorderMaterial} />
          </>
        )}

        {shape === "Square" && (
          <mesh position={[0, t3Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
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
            material={buttercreamMaterial}
          />
        )}

        {/* Sculpted Undulating Ganache Drip for Tier 3 */}
        {dripColor && dripShaderMaterial && shape === "Round" && (
          <SculptedDripRing
            radius={0.86}
            y={t1Height + t2Height + t3Height}
            dripCount={12}
            material={dripShaderMaterial}
          />
        )}
      </group>

      {/* ================= SIGNATURE FRENCH MACARONS ACCENTS ================= */}
      <group>
        {/* Tier 1 Ledge Macarons */}
        <FrenchMacaron
          position={[1.65, t1Height + 0.02, 0.4]}
          rotation={[0.1, 0.6, -0.2]}
          shellColor="#E8B4B8"
          fillingColor="#2C1E18"
          scale={0.9}
        />
        <FrenchMacaron
          position={[-1.6, t1Height + 0.02, -0.45]}
          rotation={[-0.1, 1.2, 0.25]}
          shellColor="#C2D5A8"
          fillingColor="#FFFFFF"
          scale={0.85}
        />
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
