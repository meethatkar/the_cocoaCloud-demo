"use client";

import React, { memo, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Animated Candles with dynamic light flicker
 */
function Candles({ topTierY = 2.1, topTierRadius = 0.85 }) {
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
    [-0.32, topTierY, 0.22],
    [0.32, topTierY, -0.22],
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
            {/* Candle wax stick (Burnished Gold wax) */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.5, 16]} />
              <meshStandardMaterial
                color="#C5A059"
                roughness={0.25}
                metalness={0.75}
              />
            </mesh>

            {/* Wick */}
            <mesh position={[0, 0.52, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.06, 8]} />
              <meshBasicMaterial color="#1A1A1A" />
            </mesh>

            {/* Flame cone with emissive glow */}
            <mesh ref={flameRef} position={[0, 0.6, 0]}>
              <coneGeometry args={[0.045, 0.14, 16]} />
              <meshBasicMaterial color="#FFB300" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Colorful & chocolate sprinkles scattered on the top tier
 */
function Sprinkles({ topTierY = 2.1, radius = 0.8 }) {
  const sprinkleData = useMemo(() => {
    const items = [];
    const colors = ["#FF69B4", "#4FC3F7", "#FFD54F", "#81C784", "#BA68C8", "#FFFFFF", "#4A2E18"];
    const count = 75;

    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(Math.random()) * (radius * 0.85);
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const rotY = Math.random() * Math.PI;
      const rotZ = (Math.random() - 0.5) * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      items.push({ x, z, rotY, rotZ, color });
    }
    return items;
  }, [radius]);

  return (
    <group position={[0, topTierY + 0.015, 0]}>
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
}

/**
 * Sculpted Handcrafted Sugar Roses
 */
function SugarRoses({ tierY = 1.0, tierRadius = 1.4 }) {
  const rosePositions = [
    [tierRadius * 0.85, tierY + 0.06, tierRadius * 0.4],
    [-tierRadius * 0.85, tierY + 0.06, tierRadius * 0.35],
    [0, tierY + 0.06, -tierRadius * 0.9],
  ];

  return (
    <group>
      {rosePositions.map((pos, idx) => (
        <group key={idx} position={pos} scale={0.75}>
          {/* Central bud */}
          <mesh position={[0, 0.08, 0]} castShadow>
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
              position={[Math.cos(angle) * 0.08, 0.06, Math.sin(angle) * 0.08]}
              rotation={[0.3, angle, 0.4]}
              castShadow
            >
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#E85D75" roughness={0.35} />
            </mesh>
          ))}

          {/* Mint sugar leaf */}
          <mesh position={[0.12, 0.02, 0.05]} rotation={[-0.2, 0.5, 0.4]}>
            <coneGeometry args={[0.07, 0.2, 4]} />
            <meshStandardMaterial color="#4A7C59" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * 24K Edible Gold Leaf Flakes
 */
function GoldLeaf({ tierHeights = [0.6, 1.6, 2.4], baseRadii = [2.0, 1.4, 0.85] }) {
  const flakes = useMemo(() => {
    const list = [];
    tierHeights.forEach((y, tIdx) => {
      const r = baseRadii[tIdx] * 1.008;
      const count = 5 + tIdx * 2;
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2 + (tIdx * 0.8);
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const flakeY = y + (Math.random() - 0.5) * 0.4;
        const scale = 0.08 + Math.random() * 0.1;
        const rotY = Math.atan2(x, z);
        list.push({ x, y: flakeY, z, rotY, scale });
      }
    });
    return list;
  }, [tierHeights, baseRadii]);

  return (
    <group>
      {flakes.map((f, i) => (
        <mesh
          key={i}
          position={[f.x, f.y, f.z]}
          rotation={[0.2, f.rotY, (Math.random() - 0.5) * 0.5]}
        >
          <planeGeometry args={[f.scale, f.scale * 1.2]} />
          <meshStandardMaterial
            color="#C5A059"
            metalness={0.9}
            roughness={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Satin Fondant Drapery Ribbon (Smooth ribbon band, no protruding half-torus loop)
 */
function FondantDrape({ tierY = 1.15, radius = 1.42 }) {
  return (
    <group position={[0, tierY - 0.1, 0]}>
      {/* Elegant satin ribbon sash wrapping gently along the tier contour */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[radius + 0.02, radius + 0.025, 0.12, 48, 1, true]} />
        <meshStandardMaterial
          color="#FFFBF2"
          roughness={0.25}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * French Silver Dragee Pearls lining tier bases
 */
function SilverPearls({ tierBaseY = 0.02, radius = 2.02 }) {
  const pearls = useMemo(() => {
    const list = [];
    const count = Math.floor(radius * 24);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push([Math.cos(angle) * radius, tierBaseY, Math.sin(angle) * radius]);
    }
    return list;
  }, [radius, tierBaseY]);

  return (
    <group>
      {pearls.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color="#E0E0E0"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export const ActiveDecorations = memo(function ActiveDecorations({
  decorations = [],
  topTierY = 2.2,
  topRadius = 0.85,
  tierCount = 1,
  midTierY = 1.15,
  midRadius = 1.4,
  baseRadius = 2.0,
}) {
  const hasCandles = decorations.includes("candles");
  const hasSprinkles = decorations.includes("sprinkles");
  const hasSugarRoses = decorations.includes("sugar_roses");
  const hasGoldLeaf = decorations.includes("gold_leaf");
  const hasFondantDrape = decorations.includes("white_fondant_drape");
  const hasSilverPearls = decorations.includes("silver_pearls");

  return (
    <group>
      {hasCandles && <Candles topTierY={topTierY} topTierRadius={topRadius} />}
      {hasSprinkles && <Sprinkles topTierY={topTierY} radius={topRadius} />}
      {hasSugarRoses && <SugarRoses tierY={tierCount >= 2 ? midTierY : topTierY} tierRadius={tierCount >= 2 ? midRadius : topRadius} />}
      {hasGoldLeaf && <GoldLeaf />}
      {hasFondantDrape && <FondantDrape tierY={tierCount >= 2 ? midTierY : topTierY} radius={tierCount >= 2 ? midRadius : topRadius} />}
      {hasSilverPearls && <SilverPearls tierBaseY={0.02} radius={baseRadius + 0.02} />}
      {hasSilverPearls && tierCount >= 2 && <SilverPearls tierBaseY={midTierY - 0.45} radius={midRadius + 0.02} />}
      {hasSilverPearls && tierCount >= 3 && <SilverPearls tierBaseY={topTierY - 0.45} radius={topRadius + 0.02} />}
    </group>
  );
});

