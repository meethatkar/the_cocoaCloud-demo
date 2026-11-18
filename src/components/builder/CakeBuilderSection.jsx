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
import { Sparkles, Compass, ShoppingBag, Scale } from "lucide-react";

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
    <section id="builder" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Header Info Banner */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 text-[#C86D51] text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive 3D Atelier • Studio de Pâtisserie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2C1E18] font-serif-editorial">
            Sculpt Your Signature Cake
          </h2>
          <p className="mt-2 text-sm text-[#6B574F] max-w-xl">
            Inspect real-time structural tiers, cloned French ganache glazes, and burnished gold leaf rendered in high-fidelity WebGL.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B574F] bg-[#F1E8DC] border border-[#C5A059]/30 px-4 py-2 rounded-full shadow-xs">
          <Sparkles className="w-4 h-4 text-[#C86D51]" />
          <span>Live Pâtisserie CAD Synchronized</span>
        </div>
      </div>

      {/* Split-Screen Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        {/* Left Side: Full-Height 3D WebGL Canvas */}
        <div className="lg:col-span-7 sticky top-24 z-10 w-full h-[520px] sm:h-[580px] lg:h-[720px] flex flex-col justify-between">
          <CakeCanvas />

          {/* Signature UI Element: Glassmorphic Floating Summary Bar */}
          <div className="mt-4 p-4 rounded-2xl glass-floating-bar flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-bold">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6B574F] font-semibold">
                  Live Blueprint
                </div>
                <div className="text-xs font-bold text-[#2C1E18]">
                  {config.tiers} {config.tiers === 1 ? "Tier" : "Tiers"} • {config.shape} • {config.weight} kg
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#6B574F] font-semibold">
                  Investment
                </div>
                <div className="text-base font-bold text-[#2C1E18] font-serif-editorial">
                  ₹{price.toLocaleString("en-IN")}
                </div>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full terracotta-gradient-btn text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable UI Control Panel in Soft Champagne (#F1E8DC) */}
        <div className="lg:col-span-5 bg-[#F1E8DC]/90 backdrop-blur-xl border border-[#C5A059]/35 rounded-[32px] p-6 sm:p-7 shadow-xl space-y-6 max-h-[780px] overflow-y-auto">
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

          {/* Step 6: Decorations & Florals */}
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
