"use client";

import React, { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ActiveDecorations } from "./Decorations";
import { ButtercreamShader } from "./shaders/buttercreamShader";
import { DripShader } from "./shaders/dripShader";
import { PipedBorderRing, PipedPathBorder, SculptedDripRing, FrenchMacaron } from "./PipedBorders";

/**
 * Enhanced Photorealistic 3D Cake with Custom GLSL Shaders,
 * Centered Beveled Geometries (Round, Square, Heart),
 * and Multi-Shape Piped Borders & Decorations.
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

  // Custom GLSL Buttercream Shader Material with Subsurface Scattering
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

  // Cream border piping material
  const pipedBorderMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(flavorColor).lerp(new THREE.Color("#FFFFFF"), 0.15),
      roughness: 0.35,
      metalness: 0.02,
    });
  }, [flavorColor]);

  // Dimensions
  const t1Height = 0.95;
  const t2Height = 0.85;
  const t3Height = 0.75;

  const t1Y = t1Height / 2;
  const t2Y = t1Height + t2Height / 2;
  const t3Y = t1Height + t2Height + t3Height / 2;

  const topTierY =
    tiers === 1
      ? t1Height
      : tiers === 2
      ? t1Height + t2Height
      : t1Height + t2Height + t3Height;
  const topRadius = tiers === 1 ? 2.0 : tiers === 2 ? 1.4 : 0.85;

  // -------------------------------------------------------------
  // 1. MATHEMATICALLY CENTERED HEART GEOMETRIES (Tiers 1, 2, 3)
  // -------------------------------------------------------------
  const { heartGeoms, heartPerimeterPoints } = useMemo(() => {
    const makeHeartShapeAndPoints = (scale, count = 48) => {
      const shape = new THREE.Shape();
      const points = [];
      const steps = 100;

      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        const px = (x / 16) * scale;
        const py = ((y + 2.5) / 16) * scale;

        if (i === 0) shape.moveTo(px, py);
        else shape.lineTo(px, py);
      }

      // Sample evenly for perimeter piped pearls
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);
        // Note: Extrude geometry rotated by [-Math.PI / 2, 0, 0] maps Y to -Z
        const px = (x / 16) * scale;
        const pz = -((y + 2.5) / 16) * scale;
        points.push({ x: px, z: pz });
      }

      return { shape, points };
    };

    const h1 = makeHeartShapeAndPoints(1.95, 48);
    const h2 = makeHeartShapeAndPoints(1.35, 36);
    const h3 = makeHeartShapeAndPoints(0.85, 24);

    const ext1 = new THREE.ExtrudeGeometry(h1.shape, {
      depth: t1Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    ext1.center(); // Center bounding box to (0,0,0)

    const ext2 = new THREE.ExtrudeGeometry(h2.shape, {
      depth: t2Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    ext2.center();

    const ext3 = new THREE.ExtrudeGeometry(h3.shape, {
      depth: t3Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    ext3.center();

    return {
      heartGeoms: { t1: ext1, t2: ext2, t3: ext3 },
      heartPerimeterPoints: { t1: h1.points, t2: h2.points, t3: h3.points },
    };
  }, [t1Height, t2Height, t3Height]);

  // -------------------------------------------------------------
  // 2. ARCHITECTURAL ROUNDED SQUARE GEOMETRIES (Tiers 1, 2, 3)
  // -------------------------------------------------------------
  const { squareGeoms, squarePerimeterPoints } = useMemo(() => {
    const makeRoundedSquare = (size, radius, count = 48) => {
      const shape = new THREE.Shape();
      const h = size / 2;
      shape.moveTo(-h + radius, -h);
      shape.lineTo(h - radius, -h);
      shape.absarc(h - radius, -h + radius, radius, -Math.PI / 2, 0, false);
      shape.lineTo(h, h - radius);
      shape.absarc(h - radius, h - radius, radius, 0, Math.PI / 2, false);
      shape.lineTo(-h + radius, h);
      shape.absarc(-h + radius, h - radius, radius, Math.PI / 2, Math.PI, false);
      shape.lineTo(-h, -h + radius);
      shape.absarc(-h + radius, -h + radius, radius, Math.PI, Math.PI * 1.5, false);

      // Sample perimeter points for piping
      const points = [];
      const perimeter = (size - 2 * radius) * 4 + 2 * Math.PI * radius;
      for (let i = 0; i < count; i++) {
        const u = i / count;
        const pt = shape.getPointAt(u);
        // Note: Extrude geometry rotated by [-Math.PI / 2, 0, 0] maps Y to -Z
        points.push({ x: pt.x, z: -pt.y });
      }

      return { shape, points };
    };

    const s1 = makeRoundedSquare(3.2, 0.45, 48);
    const s2 = makeRoundedSquare(2.25, 0.35, 36);
    const s3 = makeRoundedSquare(1.35, 0.25, 24);

    const ext1 = new THREE.ExtrudeGeometry(s1.shape, {
      depth: t1Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    ext1.center();

    const ext2 = new THREE.ExtrudeGeometry(s2.shape, {
      depth: t2Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    ext2.center();

    const ext3 = new THREE.ExtrudeGeometry(s3.shape, {
      depth: t3Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    ext3.center();

    return {
      squareGeoms: { t1: ext1, t2: ext2, t3: ext3 },
      squarePerimeterPoints: { t1: s1.points, t2: s2.points, t3: s3.points },
    };
  }, [t1Height, t2Height, t3Height]);

  // Smooth animation and shader uniforms clock
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

  // Plaque Z offset based on shape
  const plaqueZ = shape === "Square" ? 1.68 : shape === "Heart" ? 1.72 : 2.03;

  return (
    <group position={[0, -0.15, 0]}>
      {/* ================= TIER 1 (BASE) ================= */}
      <group name="Tier_1" position={[0, 0, 0]}>
        {/* ROUND TIER 1 */}
        {shape === "Round" && (
          <>
            <mesh position={[0, t1Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
              <cylinderGeometry args={[2.0, 2.0, t1Height, 64]} />
            </mesh>
            <PipedBorderRing radius={2.02} y={0.03} beadCount={52} beadRadius={0.07} material={pipedBorderMaterial} />
            <PipedBorderRing radius={2.0} y={t1Height} beadCount={48} beadRadius={0.065} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <SculptedDripRing radius={2.01} y={t1Height} dripCount={22} material={dripShaderMaterial} />
            )}
          </>
        )}

        {/* SQUARE TIER 1 (Beveled & Centered) */}
        {shape === "Square" && (
          <>
            <mesh
              geometry={squareGeoms.t1}
              position={[0, t1Y, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              material={buttercreamMaterial}
            />
            <PipedPathBorder points={squarePerimeterPoints.t1} y={0.03} beadRadius={0.068} material={pipedBorderMaterial} />
            <PipedPathBorder points={squarePerimeterPoints.t1} y={t1Height} beadRadius={0.065} material={pipedBorderMaterial} />
          </>
        )}

        {/* HEART TIER 1 (Mathematically Centered & Beveled) */}
        {shape === "Heart" && (
          <>
            <mesh
              geometry={heartGeoms.t1}
              position={[0, t1Y, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              material={buttercreamMaterial}
            />
            <PipedPathBorder points={heartPerimeterPoints.t1} y={0.03} beadRadius={0.068} material={pipedBorderMaterial} />
            <PipedPathBorder points={heartPerimeterPoints.t1} y={t1Height} beadRadius={0.065} material={pipedBorderMaterial} />
          </>
        )}

        {/* Front Calligraphy Inscription Plaque */}
        <group position={[0, t1Y, plaqueZ]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.44, 0.04]} />
            <meshStandardMaterial color="#2C1E18" roughness={0.25} metalness={0.2} />
          </mesh>

          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.54, 0.48, 0.015]} />
            <meshStandardMaterial color="#C5A059" roughness={0.25} metalness={0.85} />
          </mesh>

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
        {/* ROUND TIER 2 */}
        {shape === "Round" && (
          <>
            <mesh position={[0, t2Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
              <cylinderGeometry args={[1.4, 1.4, t2Height, 64]} />
            </mesh>
            <PipedBorderRing radius={1.41} y={t1Height + 0.02} beadCount={36} beadRadius={0.06} material={pipedBorderMaterial} />
            <PipedBorderRing radius={1.4} y={t1Height + t2Height} beadCount={34} beadRadius={0.055} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <SculptedDripRing radius={1.41} y={t1Height + t2Height} dripCount={16} material={dripShaderMaterial} />
            )}
          </>
        )}

        {/* SQUARE TIER 2 (Beveled & Centered) */}
        {shape === "Square" && (
          <>
            <mesh
              geometry={squareGeoms.t2}
              position={[0, t2Y, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              material={buttercreamMaterial}
            />
            <PipedPathBorder points={squarePerimeterPoints.t2} y={t1Height + 0.02} beadRadius={0.058} material={pipedBorderMaterial} />
            <PipedPathBorder points={squarePerimeterPoints.t2} y={t1Height + t2Height} beadRadius={0.055} material={pipedBorderMaterial} />
          </>
        )}

        {/* HEART TIER 2 (Mathematically Centered & Beveled) */}
        {shape === "Heart" && (
          <>
            <mesh
              geometry={heartGeoms.t2}
              position={[0, t2Y, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              material={buttercreamMaterial}
            />
            <PipedPathBorder points={heartPerimeterPoints.t2} y={t1Height + 0.02} beadRadius={0.058} material={pipedBorderMaterial} />
            <PipedPathBorder points={heartPerimeterPoints.t2} y={t1Height + t2Height} beadRadius={0.055} material={pipedBorderMaterial} />
          </>
        )}
      </group>

      {/* ================= TIER 3 (TOP) ================= */}
      <group ref={tier3GroupRef} name="Tier_3" position={[0, 0, 0]}>
        {/* ROUND TIER 3 */}
        {shape === "Round" && (
          <>
            <mesh position={[0, t3Y, 0]} castShadow receiveShadow material={buttercreamMaterial}>
              <cylinderGeometry args={[0.85, 0.85, t3Height, 64]} />
            </mesh>
            <PipedBorderRing radius={0.86} y={t1Height + t2Height + 0.02} beadCount={24} beadRadius={0.05} material={pipedBorderMaterial} />
            <PipedBorderRing radius={0.85} y={t1Height + t2Height + t3Height} beadCount={22} beadRadius={0.05} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <SculptedDripRing
                radius={0.86}
                y={t1Height + t2Height + t3Height}
                dripCount={12}
                material={dripShaderMaterial}
              />
            )}
          </>
        )}

        {/* SQUARE TIER 3 (Beveled & Centered) */}
        {shape === "Square" && (
          <>
            <mesh
              geometry={squareGeoms.t3}
              position={[0, t3Y, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              material={buttercreamMaterial}
            />
            <PipedPathBorder points={squarePerimeterPoints.t3} y={t1Height + t2Height + 0.02} beadRadius={0.048} material={pipedBorderMaterial} />
            <PipedPathBorder points={squarePerimeterPoints.t3} y={t1Height + t2Height + t3Height} beadRadius={0.048} material={pipedBorderMaterial} />
          </>
        )}

        {/* HEART TIER 3 (Mathematically Centered & Beveled) */}
        {shape === "Heart" && (
          <>
            <mesh
              geometry={heartGeoms.t3}
              position={[0, t3Y, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              material={buttercreamMaterial}
            />
            <PipedPathBorder points={heartPerimeterPoints.t3} y={t1Height + t2Height + 0.02} beadRadius={0.048} material={pipedBorderMaterial} />
            <PipedPathBorder points={heartPerimeterPoints.t3} y={t1Height + t2Height + t3Height} beadRadius={0.048} material={pipedBorderMaterial} />
          </>
        )}
      </group>

      {/* ================= FRENCH MACARONS (Safely Placed on Platter) ================= */}
      <group>
        <FrenchMacaron
          position={[1.82, 0.04, 0.85]}
          rotation={[0.1, 0.6, -0.15]}
          shellColor="#E8B4B8"
          fillingColor="#2C1E18"
          scale={0.9}
        />
        <FrenchMacaron
          position={[-1.8, 0.04, 0.8]}
          rotation={[-0.1, 1.2, 0.2]}
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
