"use client";

import React, { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CakeScene } from "./CakeScene";
import { useCanvasConfig } from "@/hooks/useCakeConfig";
import { RotateCw, Sparkles } from "lucide-react";

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF6F0]/85 backdrop-blur-sm z-20">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/30 border-t-[#C86D51] animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-[#C5A059]/20 border-b-[#C5A059] animate-spin [animation-duration:1.5s]" />
      </div>
      <p className="text-xs uppercase tracking-widest text-[#2C1E18] font-medium font-serif-editorial">
        Sculpting Confectionery...
      </p>
    </div>
  );
}

function CakeCanvasComponent() {
  const { config, autoRotate, viewAngle, setAutoRotate, setViewAngle } =
    useCanvasConfig();

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[640px] bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE1] to-[#EBE0D2] overflow-hidden rounded-[32px] border border-[#C5A059]/35 shadow-[0_12px_40px_-15px_rgba(44,30,24,0.12)]">
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 2.0, 5.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CakeScene
            config={config}
            autoRotate={autoRotate}
            viewAngle={viewAngle}
          />
        </Suspense>
      </Canvas>

      {/* Floating 3D Viewport Controls */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
        {/* Left: View Angle Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF6F0]/90 backdrop-blur-md rounded-full border border-[#C5A059]/40 pointer-events-auto shadow-md">
          <button
            type="button"
            onClick={() => setViewAngle("front")}
            className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
              viewAngle === "front"
                ? "bg-[#C86D51] text-white shadow-sm"
                : "text-[#6B574F] hover:text-[#2C1E18]"
            }`}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setViewAngle("isometric")}
            className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
              viewAngle === "isometric"
                ? "bg-[#C86D51] text-white shadow-sm"
                : "text-[#6B574F] hover:text-[#2C1E18]"
            }`}
          >
            45° Iso
          </button>
          <button
            type="button"
            onClick={() => setViewAngle("top")}
            className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
              viewAngle === "top"
                ? "bg-[#C86D51] text-white shadow-sm"
                : "text-[#6B574F] hover:text-[#2C1E18]"
            }`}
          >
            Top
          </button>
        </div>

        {/* Right: Auto Rotate Toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full border backdrop-blur-md transition-all shadow-md ${
              autoRotate
                ? "bg-[#C86D51] border-[#C86D51] text-white"
                : "bg-[#FAF6F0]/90 border-[#C5A059]/40 text-[#6B574F] hover:text-[#2C1E18]"
            }`}
            title="Toggle 360° rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin [animation-duration:6s]" : ""}`} />
            <span>360°</span>
          </button>
        </div>
      </div>

      {/* Top subtle interaction hint */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0]/85 backdrop-blur-md border border-[#C5A059]/30 text-[#6B574F] text-[11px] pointer-events-none shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
        <span>Drag to rotate • Pinch to zoom</span>
      </div>
    </div>
  );
}

export const CakeCanvas = memo(CakeCanvasComponent);
