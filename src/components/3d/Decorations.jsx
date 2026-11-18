"use client";

import React, { memo, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Animated Birthday Candles with dynamic flame flicker, centered on top tier
 */
const Candles = memo(function Candles({ topTierY = 2.1 }) {
  const flame1Ref = useRef();
  const flame2Ref = useRef();
  const flame3Ref = useRef();
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 12;
    const flicker1 = 0.9 + Math.sin(t) * 0.15 + Math.cos(t * 2.3) * 0.1;
    const flicker2 = 0.9 + Math.sin(t + 1.5) * 0.15;
    const flicker3 = 0.9 + Math.cos(t + 2.8) * 0.15;

    if (flame1Ref.current) flame1Ref.current.scale.set(flicker1, flicker1 * 1.2, flicker1);
    if (flame2Ref.current) flame2Ref.current.scale.set(flicker2, flicker2 * 1.2, flicker2);
    if (flame3Ref.current) flame3Ref.current.scale.set(flicker3, flicker3 * 1.2, flicker3);

    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + Math.sin(t * 1.8) * 0.3;
    }
  });

  const candlePositions = [
    [0, topTierY, 0],
    [-0.22, topTierY, 0.16],
    [0.22, topTierY, -0.16],
  ];

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={[0, topTierY + 0.65, 0]}
        color="#FFA726"
        intensity={1.2}
        distance={3.5}
        decay={2}
      />

      {candlePositions.map((pos, idx) => {
        const flameRef = idx === 0 ? flame1Ref : idx === 1 ? flame2Ref : flame3Ref;
        return (
          <group key={idx} position={pos}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.5, 16]} />
              <meshStandardMaterial
                color="#C5A059"
                roughness={0.25}
                metalness={0.75}
              />
            </mesh>

            <mesh position={[0, 0.52, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.06, 8]} />
              <meshBasicMaterial color="#1A1A1A" />
            </mesh>

            <mesh ref={flameRef} position={[0, 0.6, 0]}>
              <coneGeometry args={[0.045, 0.14, 16]} />
              <meshBasicMaterial color="#FFB300" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
});

/**
 * Shape-Aware Rainbow Sprinkles distributed evenly across top tier
 */
const Sprinkles = memo(function Sprinkles({ topTierY = 2.1, shape = "Round", topRadius = 0.85 }) {
  const sprinkleData = useMemo(() => {
    const items = [];
    const colors = ["#FF69B4", "#4FC3F7", "#FFD54F", "#81C784", "#BA68C8", "#FFFFFF", "#4A2E18"];
    const count = 75;

    for (let i = 0; i < count; i++) {
      let x = 0;
      let z = 0;

      if (shape === "Square") {
        // Uniform distribution over square top
        const half = topRadius * 0.9;
        x = (Math.random() * 2 - 1) * half;
        z = (Math.random() * 2 - 1) * half;
      } else if (shape === "Heart") {
        // Rejection sample inside heart
        let valid = false;
        let attempts = 0;
        while (!valid && attempts < 20) {
          attempts++;
          const rx = (Math.random() * 2 - 1) * topRadius * 0.9;
          const rz = (Math.random() * 2 - 1) * topRadius * 0.9;
          if (rx * rx + rz * rz < topRadius * topRadius) {
            x = rx;
            z = rz - 0.05;
            valid = true;
          }
        }
      } else {
        // Round
        const r = Math.sqrt(Math.random()) * (topRadius * 0.82);
        const theta = Math.random() * Math.PI * 2;
        x = Math.cos(theta) * r;
        z = Math.sin(theta) * r;
      }

      const rotY = Math.random() * Math.PI;
      const rotZ = (Math.random() - 0.5) * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      items.push({ x, z, rotY, rotZ, color });
    }
    return items;
  }, [topTierY, shape, topRadius]);

  return (
    <group position={[0, topTierY + 0.02, 0]}>
      {sprinkleData.map((item, i) => (
        <mesh
          key={i}
          position={[item.x, 0, item.z]}
          rotation={[0, item.rotY, item.rotZ]}
          castShadow
        >
          <cylinderGeometry args={[0.015, 0.015, 0.09, 8]} />
          <meshStandardMaterial color={item.color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
});

/**
 * Shape-Aware Sugar Roses - Exactly 4 Roses on the 4 Corners for Square
 */
const SugarRoses = memo(function SugarRoses({
  shape = "Round",
  topTierY = 0.95,
  tierCount = 1,
  t1Height = 0.95,
}) {
  const rosePositions = useMemo(() => {
    // Height where roses sit (on step if multi-tier, or on top surface if single tier)
    const yPos = (tierCount >= 2 ? t1Height : topTierY) + 0.05;

    if (shape === "Square") {
      // EXACTLY 4 ROSES on the 4 corners of the square cake
      const corner = tierCount >= 2 ? 1.05 : 1.48;
      return [
        [corner, yPos, corner],
        [-corner, yPos, corner],
        [corner, yPos, -corner],
        [-corner, yPos, -corner],
      ];
    }

    if (shape === "Heart") {
      // 4 Roses along the romantic lobes, front curve and sides
      const s = tierCount >= 2 ? 0.75 : 1.1;
      return [
        [0.85 * s, yPos, 0.25 * s],
        [-0.85 * s, yPos, 0.25 * s],
        [0, yPos, 0.95 * s],
        [0, yPos, -0.6 * s],
      ];
    }

    // Round: 4 symmetrically spaced roses
    const r = tierCount >= 2 ? 1.45 : 1.75;
    return [
      [r * 0.7, yPos, r * 0.7],
      [-r * 0.7, yPos, r * 0.7],
      [-r * 0.7, yPos, -r * 0.7],
      [r * 0.7, yPos, -r * 0.7],
    ];
  }, [shape, topTierY, tierCount, t1Height]);

  return (
    <group>
      {rosePositions.map((pos, idx) => (
        <group key={idx} position={pos} scale={0.85}>
          {/* Central bud */}
          <mesh position={[0, 0.09, 0]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#D9435E"
              roughness={0.4}
              bumpScale={0.05}
            />
          </mesh>

          {/* Rose outer petals */}
          {[0, 1.2, 2.4, 3.6, 4.8].map((angle, pIdx) => (
            <mesh
              key={pIdx}
              position={[Math.cos(angle) * 0.08, 0.07, Math.sin(angle) * 0.08]}
              rotation={[0.3, angle, 0.4]}
              castShadow
            >
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#E85D75" roughness={0.35} />
            </mesh>
          ))}

          {/* Green sugar leaf */}
          <mesh position={[0.12, 0.03, 0.05]} rotation={[-0.2, 0.5, 0.4]}>
            <coneGeometry args={[0.07, 0.2, 4]} />
            <meshStandardMaterial color="#4A7C59" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
});

/**
 * 24K Edible Gold Leaf Flakes - SYNCHRONIZED WITH TIERS & SHAPES, SITS OUTSIDE WALLS
 */
const GoldLeaf = memo(function GoldLeaf({
  tiers = 1,
  shape = "Round",
  t1Height = 0.95,
  t2Height = 0.85,
  t3Height = 0.75,
}) {
  const flakes = useMemo(() => {
    const list = [];
    const tierData = [
      { y: t1Height * 0.5, hRadius: 1.68, rRadius: 2.08, sHalf: 1.69 },
      { y: t1Height + t2Height * 0.5, hRadius: 1.18, rRadius: 1.48, sHalf: 1.22 },
      { y: t1Height + t2Height + t3Height * 0.5, hRadius: 0.75, rRadius: 0.92, sHalf: 0.76 },
    ];

    const activeTiers = tierData.slice(0, tiers);

    activeTiers.forEach((td, tIdx) => {
      const count = 10 + tIdx * 2;

      for (let i = 0; i < count; i++) {
        let x = 0;
        let z = 0;
        let rotY = 0;

        if (shape === "Square") {
          // Place on the 4 outer walls with slight outward offset
          const half = td.sHalf;
          const side = i % 4;
          const posAlong = ((Math.random() - 0.5) * 1.6) * (half * 0.8);

          if (side === 0) {
            x = posAlong;
            z = half + 0.02;
            rotY = 0;
          } else if (side === 1) {
            x = half + 0.02;
            z = posAlong;
            rotY = Math.PI / 2;
          } else if (side === 2) {
            x = posAlong;
            z = -half - 0.02;
            rotY = Math.PI;
          } else {
            x = -half - 0.02;
            z = posAlong;
            rotY = -Math.PI / 2;
          }
        } else if (shape === "Heart") {
          // Outward normal on heart perimeter
          const theta = (i / count) * Math.PI * 2;
          const hx = (16 * Math.pow(Math.sin(theta), 3)) / 16;
          const hy =
            (13 * Math.cos(theta) -
              5 * Math.cos(2 * theta) -
              2 * Math.cos(3 * theta) -
              Math.cos(4 * theta) +
              2.5) /
            16;
          const scale = td.hRadius * 1.05;
          x = hx * scale;
          z = -hy * scale;
          rotY = Math.atan2(x, z);
        } else {
          // Round
          const theta = (i / count) * Math.PI * 2 + tIdx * 0.7;
          x = Math.cos(theta) * td.rRadius;
          z = Math.sin(theta) * td.rRadius;
          rotY = Math.atan2(x, z);
        }

        const flakeY = td.y + (Math.random() - 0.5) * 0.35;
        const scale = 0.09 + Math.random() * 0.07;
        list.push({ x, y: flakeY, z, rotY, scale });
      }
    });

    return list;
  }, [tiers, shape, t1Height, t2Height, t3Height]);

  return (
    <group>
      {flakes.map((f, i) => (
        <mesh
          key={i}
          position={[f.x, f.y, f.z]}
          rotation={[0.1, f.rotY, (Math.random() - 0.5) * 0.6]}
        >
          <planeGeometry args={[f.scale, f.scale * 1.2]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#4A3B12"
            emissiveIntensity={0.3}
            metalness={0.92}
            roughness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
});

/**
 * Shape-Aware Silver Pearls along base of all visible tiers (PROUDLY VISIBLE OUTSIDE WALLS)
 */
const SilverPearls = memo(function SilverPearls({
  tiers = 1,
  shape = "Square",
  t1Height = 0.95,
  t2Height = 0.85,
}) {
  const pearlsList = useMemo(() => {
    const all = [];

    const getPerimeterForTier = (tIdx, baseY) => {
      const pts = [];

      if (shape === "Square") {
        // Size: T1=3.2 (half 1.6), T2=2.25 (half 1.125), T3=1.35 (half 0.675)
        // Outer placement offset so pearls sit outside the bevel:
        const half = tIdx === 0 ? 1.70 : tIdx === 1 ? 1.22 : 0.78;
        const countPerSide = tIdx === 0 ? 12 : tIdx === 1 ? 8 : 6;

        for (let side = 0; side < 4; side++) {
          for (let i = 0; i < countPerSide; i++) {
            const t = (i / countPerSide) * 2 - 1; // -1 to 1
            const coord = t * (half - 0.1);
            if (side === 0) pts.push([coord, baseY, half]);
            else if (side === 1) pts.push([half, baseY, coord]);
            else if (side === 2) pts.push([coord, baseY, -half]);
            else pts.push([-half, baseY, coord]);
          }
        }
      } else if (shape === "Heart") {
        const scale = (tIdx === 0 ? 1.95 : tIdx === 1 ? 1.35 : 0.85) * 1.05;
        const count = tIdx === 0 ? 48 : tIdx === 1 ? 34 : 22;
        for (let i = 0; i < count; i++) {
          const t = (i / count) * Math.PI * 2;
          const x = (16 * Math.pow(Math.sin(t), 3) / 16) * scale;
          const y = ((13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t) + 2.5) / 16) * scale;
          pts.push([x, baseY, -y]);
        }
      } else {
        // Round
        const r = tIdx === 0 ? 2.08 : tIdx === 1 ? 1.48 : 0.92;
        const count = tIdx === 0 ? 48 : tIdx === 1 ? 34 : 22;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          pts.push([Math.cos(a) * r, baseY, Math.sin(a) * r]);
        }
      }

      return pts;
    };

    // Tier 1 Base
    all.push(...getPerimeterForTier(0, 0.035));

    // Tier 2 Base
    if (tiers >= 2) {
      all.push(...getPerimeterForTier(1, t1Height + 0.035));
    }

    // Tier 3 Base
    if (tiers >= 3) {
      all.push(...getPerimeterForTier(2, t1Height + t2Height + 0.035));
    }

    return all;
  }, [tiers, shape, t1Height, t2Height]);

  return (
    <group>
      {pearlsList.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.042, 12, 12]} />
          <meshStandardMaterial
            color="#EFEFEF"
            metalness={0.96}
            roughness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
});

/**
 * Shape-Aware Satin Fondant Ribbon hugging the outer walls
 */
const FondantRibbon = memo(function FondantRibbon({
  shape = "Round",
  tierY = 0.5,
}) {
  const beads = useMemo(() => {
    const list = [];
    if (shape === "Square") {
      const half = 1.685;
      const count = 48;
      for (let i = 0; i < count; i++) {
        const side = Math.floor(i / 12);
        const t = ((i % 12) / 12) * 2 - 1;
        const coord = t * (half - 0.1);
        if (side === 0) list.push([coord, tierY, half]);
        else if (side === 1) list.push([half, tierY, coord]);
        else if (side === 2) list.push([coord, tierY, -half]);
        else list.push([-half, tierY, coord]);
      }
    } else if (shape === "Heart") {
      const scale = 1.95 * 1.04;
      const count = 48;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const x = (16 * Math.pow(Math.sin(t), 3) / 16) * scale;
        const y = ((13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t) + 2.5) / 16) * scale;
        list.push([x, tierY, -y]);
      }
    } else {
      const r = 2.065;
      const count = 48;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        list.push([Math.cos(a) * r, tierY, Math.sin(a) * r]);
      }
    }
    return list;
  }, [shape, tierY]);

  return (
    <group>
      {beads.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.035, 10, 8]} />
          <meshStandardMaterial
            color="#FFFBF2"
            roughness={0.25}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
});

export const ActiveDecorations = memo(function ActiveDecorations({
  decorations = [],
  topTierY = 2.2,
  topRadius = 0.85,
  tierCount = 1,
  shape = "Round",
  t1Height = 0.95,
  t2Height = 0.85,
  t3Height = 0.75,
}) {
  const hasCandles = decorations.includes("candles");
  const hasSprinkles = decorations.includes("sprinkles");
  const hasSugarRoses = decorations.includes("sugar_roses");
  const hasGoldLeaf = decorations.includes("gold_leaf");
  const hasFondantDrape = decorations.includes("white_fondant_drape");
  const hasSilverPearls = decorations.includes("silver_pearls");

  return (
    <group>
      {hasCandles && <Candles topTierY={topTierY} />}

      {hasSprinkles && (
        <Sprinkles
          topTierY={topTierY}
          shape={shape}
          topRadius={topRadius}
        />
      )}

      {hasSugarRoses && (
        <SugarRoses
          shape={shape}
          topTierY={topTierY}
          tierCount={tierCount}
          t1Height={t1Height}
        />
      )}

      {hasGoldLeaf && (
        <GoldLeaf
          tiers={tierCount}
          shape={shape}
          t1Height={t1Height}
          t2Height={t2Height}
          t3Height={t3Height}
        />
      )}

      {hasFondantDrape && (
        <FondantRibbon
          shape={shape}
          tierY={tierCount >= 2 ? t1Height - 0.2 : t1Height * 0.5}
        />
      )}

      {hasSilverPearls && (
        <SilverPearls
          tiers={tierCount}
          shape={shape}
          t1Height={t1Height}
          t2Height={t2Height}
        />
      )}
    </group>
  );
});
