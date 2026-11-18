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
 * and Multi-Shape Synchronized Piped Borders, Drips & Decorations.
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
    // Exact analytical centroid offset of parametric heart: y(t) ranges from -17 to 11.92306
    const yCenter = -2.53847;

    const makeHeartShapeAndPoints = (scale, count = 48) => {
      const shape = new THREE.Shape();
      const points = [];
      const steps = 120;

      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const sinT = Math.sin(t);
        const cosT = Math.cos(t);
        const x = Math.pow(sinT, 3) * scale;
        const rawY =
          13 * cosT -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);
        const y = ((rawY - yCenter) / 16) * scale;

        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const sinT = Math.sin(t);
        const cosT = Math.cos(t);
        const x = Math.pow(sinT, 3) * scale;
        const rawY =
          13 * cosT -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);
        const z = -((rawY - yCenter) / 16) * scale;

        // Tangent & Normal vectors in 3D XZ plane
        const dx = 3 * sinT * sinT * cosT * scale;
        const dRawY =
          -13 * sinT +
          10 * Math.sin(2 * t) +
          6 * Math.sin(3 * t) +
          4 * Math.sin(4 * t);
        const dz = -(dRawY / 16) * scale;
        let nx = dz;
        let nz = -dx;
        const len = Math.hypot(nx, nz);
        if (len > 0.0001) {
          nx /= len;
          nz /= len;
        }

        // Sit right on the outer bevel perimeter
        const px = x + nx * 0.055;
        const pz = z + nz * 0.055;
        points.push({ x: px, z: pz, nx, nz });
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
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    ext1.center();

    const ext2 = new THREE.ExtrudeGeometry(h2.shape, {
      depth: t2Height,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.045,
      bevelThickness: 0.045,
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

      const points = [];
      // Offset by 1.045 so points lie outside the 0.06 bevel
      const outerScale = 1.045;
      for (let i = 0; i < count; i++) {
        const u = i / count;
        const pt = shape.getPointAt(u);
        points.push({ x: pt.x * outerScale, z: -pt.y * outerScale });
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

  // Smooth tier animations & shader uniforms time
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

  // Plaque Z offset: sits right on the front face, clearly visible
  const plaqueZ = shape === "Square" ? 1.72 : shape === "Heart" ? 1.74 : 2.08;

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
            <PipedBorderRing radius={2.04} y={0.03} beadCount={52} beadRadius={0.07} material={pipedBorderMaterial} />
            <PipedBorderRing radius={2.04} y={t1Height + 0.01} beadCount={48} beadRadius={0.065} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <SculptedDripRing radius={2.04} y={t1Height} dripCount={22} material={dripShaderMaterial} />
            )}
          </>
        )}

        {/* SQUARE TIER 1 */}
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
            <PipedPathBorder points={squarePerimeterPoints.t1} y={0.03} beadRadius={0.07} material={pipedBorderMaterial} />
            <PipedPathBorder points={squarePerimeterPoints.t1} y={t1Height + 0.01} beadRadius={0.065} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <group position={[0, t1Height, 0]}>
                {[-1.2, -0.6, 0, 0.6, 1.2].map((coord, i) => {
                  const half = 1.685;
                  const dLen = 0.16 + (i % 3) * 0.07;
                  return (
                    <React.Fragment key={i}>
                      {/* Front */}
                      <group position={[coord, 0, half]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.026, 0.036, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.046, 10, 10]} />
                        </mesh>
                      </group>
                      {/* Right */}
                      <group position={[half, 0, coord]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.026, 0.036, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.046, 10, 10]} />
                        </mesh>
                      </group>
                      {/* Back */}
                      <group position={[coord, 0, -half]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.026, 0.036, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.046, 10, 10]} />
                        </mesh>
                      </group>
                      {/* Left */}
                      <group position={[-half, 0, coord]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.026, 0.036, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.046, 10, 10]} />
                        </mesh>
                      </group>
                    </React.Fragment>
                  );
                })}
              </group>
            )}
          </>
        )}

        {/* HEART TIER 1 */}
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
            <PipedPathBorder points={heartPerimeterPoints.t1} y={0.03} beadRadius={0.07} material={pipedBorderMaterial} />
            <PipedPathBorder points={heartPerimeterPoints.t1} y={t1Height + 0.01} beadRadius={0.065} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <group position={[0, t1Height, 0]}>
                {heartPerimeterPoints.t1.filter((_, i) => i % 2 === 0).map((pt, i) => (
                  <group key={i} position={[pt.x, 0, pt.z]}>
                    <mesh position={[0, -0.09, 0]} material={dripShaderMaterial} castShadow>
                      <cylinderGeometry args={[0.026, 0.036, 0.18, 8]} />
                    </mesh>
                    <mesh position={[0, -0.18, 0]} material={dripShaderMaterial} castShadow>
                      <sphereGeometry args={[0.046, 10, 10]} />
                    </mesh>
                  </group>
                ))}
              </group>
            )}
          </>
        )}

        {/* Front Calligraphy Inscription Plaque */}
        <group
          position={
            shape === "Square"
              ? [0, t1Y, 1.72]
              : shape === "Heart"
              ? [0.42, t1Y, 1.34]
              : [0, t1Y, 2.08]
          }
          rotation={
            shape === "Heart"
              ? [0, 0.893, 0]
              : [0, 0, 0]
          }
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[shape === "Heart" ? 1.22 : 1.5, 0.44, 0.04]} />
            <meshStandardMaterial color="#2C1E18" roughness={0.25} metalness={0.2} />
          </mesh>

          <mesh position={[0, 0, 0.021]}>
            <boxGeometry args={[shape === "Heart" ? 1.26 : 1.54, 0.48, 0.015]} />
            <meshStandardMaterial color="#C5A059" roughness={0.25} metalness={0.85} />
          </mesh>

          <Text
            position={[0, 0, 0.035]}
            fontSize={shape === "Heart" ? 0.095 : 0.11}
            color="#FAF6F0"
            anchorX="center"
            anchorY="middle"
            maxWidth={shape === "Heart" ? 1.15 : 1.4}
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
            <PipedBorderRing radius={1.44} y={t1Height + 0.02} beadCount={36} beadRadius={0.06} material={pipedBorderMaterial} />
            <PipedBorderRing radius={1.44} y={t1Height + t2Height + 0.01} beadCount={34} beadRadius={0.055} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <SculptedDripRing radius={1.44} y={t1Height + t2Height} dripCount={16} material={dripShaderMaterial} />
            )}
          </>
        )}

        {/* SQUARE TIER 2 */}
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
            <PipedPathBorder points={squarePerimeterPoints.t2} y={t1Height + 0.02} beadRadius={0.06} material={pipedBorderMaterial} />
            <PipedPathBorder points={squarePerimeterPoints.t2} y={t1Height + t2Height + 0.01} beadRadius={0.055} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <group position={[0, t1Height + t2Height, 0]}>
                {[-0.8, -0.4, 0, 0.4, 0.8].map((coord, i) => {
                  const half = 1.21;
                  const dLen = 0.14 + (i % 3) * 0.06;
                  return (
                    <React.Fragment key={i}>
                      <group position={[coord, 0, half]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.024, 0.032, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.04, 10, 10]} />
                        </mesh>
                      </group>
                      <group position={[half, 0, coord]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.024, 0.032, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.04, 10, 10]} />
                        </mesh>
                      </group>
                      <group position={[coord, 0, -half]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.024, 0.032, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.04, 10, 10]} />
                        </mesh>
                      </group>
                      <group position={[-half, 0, coord]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.024, 0.032, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.04, 10, 10]} />
                        </mesh>
                      </group>
                    </React.Fragment>
                  );
                })}
              </group>
            )}
          </>
        )}

        {/* HEART TIER 2 */}
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
            <PipedPathBorder points={heartPerimeterPoints.t2} y={t1Height + 0.02} beadRadius={0.06} material={pipedBorderMaterial} />
            <PipedPathBorder points={heartPerimeterPoints.t2} y={t1Height + t2Height + 0.01} beadRadius={0.055} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <group position={[0, t1Height + t2Height, 0]}>
                {heartPerimeterPoints.t2.filter((_, i) => i % 2 === 0).map((pt, i) => (
                  <group key={i} position={[pt.x, 0, pt.z]}>
                    <mesh position={[0, -0.08, 0]} material={dripShaderMaterial} castShadow>
                      <cylinderGeometry args={[0.024, 0.032, 0.16, 8]} />
                    </mesh>
                    <mesh position={[0, -0.16, 0]} material={dripShaderMaterial} castShadow>
                      <sphereGeometry args={[0.04, 10, 10]} />
                    </mesh>
                  </group>
                ))}
              </group>
            )}
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
            <PipedBorderRing radius={0.88} y={t1Height + t2Height + 0.02} beadCount={24} beadRadius={0.05} material={pipedBorderMaterial} />
            <PipedBorderRing radius={0.88} y={t1Height + t2Height + t3Height + 0.01} beadCount={22} beadRadius={0.05} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <SculptedDripRing
                radius={0.88}
                y={t1Height + t2Height + t3Height}
                dripCount={12}
                material={dripShaderMaterial}
              />
            )}
          </>
        )}

        {/* SQUARE TIER 3 */}
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
            <PipedPathBorder points={squarePerimeterPoints.t3} y={t1Height + t2Height + 0.02} beadRadius={0.05} material={pipedBorderMaterial} />
            <PipedPathBorder points={squarePerimeterPoints.t3} y={t1Height + t2Height + t3Height + 0.01} beadRadius={0.05} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <group position={[0, t1Height + t2Height + t3Height, 0]}>
                {[-0.45, 0, 0.45].map((coord, i) => {
                  const half = 0.76;
                  const dLen = 0.12 + (i % 2) * 0.05;
                  return (
                    <React.Fragment key={i}>
                      <group position={[coord, 0, half]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.02, 0.028, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.035, 10, 10]} />
                        </mesh>
                      </group>
                      <group position={[half, 0, coord]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.02, 0.028, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.035, 10, 10]} />
                        </mesh>
                      </group>
                      <group position={[coord, 0, -half]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.02, 0.028, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.035, 10, 10]} />
                        </mesh>
                      </group>
                      <group position={[-half, 0, coord]}>
                        <mesh position={[0, -dLen / 2, 0]} material={dripShaderMaterial} castShadow>
                          <cylinderGeometry args={[0.02, 0.028, dLen, 8]} />
                        </mesh>
                        <mesh position={[0, -dLen, 0]} material={dripShaderMaterial} castShadow>
                          <sphereGeometry args={[0.035, 10, 10]} />
                        </mesh>
                      </group>
                    </React.Fragment>
                  );
                })}
              </group>
            )}
          </>
        )}

        {/* HEART TIER 3 */}
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
            <PipedPathBorder points={heartPerimeterPoints.t3} y={t1Height + t2Height + 0.02} beadRadius={0.05} material={pipedBorderMaterial} />
            <PipedPathBorder points={heartPerimeterPoints.t3} y={t1Height + t2Height + t3Height + 0.01} beadRadius={0.05} material={pipedBorderMaterial} />
            {dripColor && dripShaderMaterial && (
              <group position={[0, t1Height + t2Height + t3Height, 0]}>
                {heartPerimeterPoints.t3.filter((_, i) => i % 2 === 0).map((pt, i) => (
                  <group key={i} position={[pt.x, 0, pt.z]}>
                    <mesh position={[0, -0.07, 0]} material={dripShaderMaterial} castShadow>
                      <cylinderGeometry args={[0.02, 0.028, 0.14, 8]} />
                    </mesh>
                    <mesh position={[0, -0.14, 0]} material={dripShaderMaterial} castShadow>
                      <sphereGeometry args={[0.034, 10, 10]} />
                    </mesh>
                  </group>
                ))}
              </group>
            )}
          </>
        )}
      </group>

      {/* ================= FRENCH MACARONS (Safely Placed on Platter) ================= */}
      <group>
        <FrenchMacaron
          position={[1.88, 0.04, 0.95]}
          rotation={[0.1, 0.6, -0.15]}
          shellColor="#E8B4B8"
          fillingColor="#2C1E18"
          scale={0.9}
        />
        <FrenchMacaron
          position={[-1.86, 0.04, 0.9]}
          rotation={[-0.1, 1.2, 0.2]}
          shellColor="#C2D5A8"
          fillingColor="#FFFFFF"
          scale={0.85}
        />
      </group>

      {/* ================= FULLY SYNCHRONIZED ARTISANAL DECORATIONS ================= */}
      <ActiveDecorations
        decorations={decorations}
        topTierY={topTierY}
        topRadius={
          shape === "Square"
            ? (tiers === 1 ? 1.6 : tiers === 2 ? 1.15 : 0.72)
            : shape === "Heart"
            ? (tiers === 1 ? 1.95 : tiers === 2 ? 1.35 : 0.85)
            : topRadius
        }
        tierCount={tiers}
        shape={shape}
        t1Height={t1Height}
        t2Height={t2Height}
        t3Height={t3Height}
      />
    </group>
  );
}

export const ProceduralCake = memo(ProceduralCakeComponent);
