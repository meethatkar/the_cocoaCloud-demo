"use client";

import React from "react";
import { CakeCanvas } from "../3d/CakeCanvas";
import { TierSelector } from "./TierSelector";
import { ShapeSelector } from "./ShapeSelector";
import { FlavorPalette } from "./FlavorPalette";
import { DripSelector } from "./DripSelector";
import { PlaqueTextInput } from "./PlaqueTextInput";
import { DecorationsSelector } from "./DecorationsSelector";
import { WeightAndPriceCard } from "./WeightAndPriceCard";
import { useCakeConfig } from "@/hooks/useCakeConfig";
import { Sparkles, Compass } from "lucide-react";

export function CakeBuilderSection() {
  const {
    config,
    price,
    weightRange,
    setTiers,
    setShape,
    setFlavorColor,
    setDripColor,
    setCustomText,
    setWeight,
    toggleDecoration,
    resetConfig,
    addToCart,
  } = useCakeConfig();

  return (
    <section id="builder" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header Info Banner */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive 3D Confectionery Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-luxury">
            Sculpt Your Signature Cake
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">
            Inspect real-time structural tiers, cloned artisanal frostings, and gold foil finishes rendered in WebGL.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Real-time Mumbai Kitchen Sync</span>
        </div>
      </div>

      {/* Split-Screen Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Full-Height 3D WebGL Canvas */}
        <div className="lg:col-span-7 sticky top-24 z-10 w-full h-[520px] sm:h-[580px] lg:h-[720px]">
          <CakeCanvas />
        </div>

        {/* Right Side: Scrollable UI Control Panel */}
        <div className="lg:col-span-5 bg-[#141010]/85 backdrop-blur-xl border border-[#D4AF37]/20 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 max-h-[720px] overflow-y-auto">
          {/* Step 1: Tiers */}
          <TierSelector tiers={config.tiers} onChange={setTiers} />

          {/* Step 2: Shape */}
          <ShapeSelector shape={config.shape} onChange={setShape} />

          {/* Step 3: Flavors & Colors */}
          <FlavorPalette
            flavorColor={config.flavorColor}
            onChange={setFlavorColor}
          />

          {/* Step 4: Drip / Glaze */}
          <DripSelector dripColor={config.dripColor} onChange={setDripColor} />

          {/* Step 5: Custom Plaque Text */}
          <PlaqueTextInput
            customText={config.customText}
            onChange={setCustomText}
          />

          {/* Step 6: Decorations */}
          <DecorationsSelector
            decorations={config.decorations}
            onToggle={toggleDecoration}
          />

          {/* Step 7: Weight Slider, Price & Add To Box */}
          <WeightAndPriceCard
            weight={config.weight}
            weightRange={weightRange}
            onWeightChange={setWeight}
            price={price}
            onAddToCart={addToCart}
            onReset={resetConfig}
          />
        </div>
      </div>
    </section>
  );
}

