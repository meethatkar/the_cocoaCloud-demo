"use client";

import React, { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { CakeScene } from "./CakeScene";
import { useCanvasConfig } from "@/hooks/useCakeConfig";
import { RotateCw, Eye, Sparkles } from "lucide-react";

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0F0D0D]/80 backdrop-blur-sm z-20">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-[#D4AF37]/10 border-b-[#F3E5AB] animate-spin [animation-duration:1.5s]" />
      </div>
      <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
        Sculpting Confectionery...
      </p>
    </div>
  );
}

function CakeCanvasComponent() {
  const { config, autoRotate, viewAngle, setAutoRotate, setViewAngle } =
    useCanvasConfig();

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[640px] bg-gradient-to-b from-[#181313] via-[#120F0F] to-[#0D0B0B] overflow-hidden rounded-3xl border border-[#D4AF37]/15 shadow-2xl">
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 2.0, 5.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Crisp rendering on high-DPI displays
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
        <div className="flex items-center gap-1.5 p-1 bg-[#1A1616]/80 backdrop-blur-md rounded-full border border-[#D4AF37]/20 pointer-events-auto shadow-lg">
          <button
            type="button"
            onClick={() => setViewAngle("front")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
              viewAngle === "front"
                ? "bg-[#D4AF37] text-[#0F0D0D] shadow-sm"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setViewAngle("isometric")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
              viewAngle === "isometric"
                ? "bg-[#D4AF37] text-[#0F0D0D] shadow-sm"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            45° Iso
          </button>
          <button
            type="button"
            onClick={() => setViewAngle("top")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
              viewAngle === "top"
                ? "bg-[#D4AF37] text-[#0F0D0D] shadow-sm"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Top
          </button>
        </div>

        {/* Right: Auto Rotate & Hint */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border backdrop-blur-md transition-all shadow-lg ${
              autoRotate
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB]"
                : "bg-[#1A1616]/80 border-white/10 text-zinc-400 hover:text-zinc-200"
            }`}
            title="Toggle 360° rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin [animation-duration:6s]" : ""}`} />
            <span>360°</span>
          </button>
        </div>
      </div>

      {/* Top subtle interaction hint */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1616]/60 backdrop-blur-md border border-white/10 text-zinc-400 text-[11px] pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Drag to rotate • Pinch to zoom</span>
      </div>
    </div>
  );
}

export const CakeCanvas = memo(CakeCanvasComponent);

