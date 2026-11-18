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
    setCardStyle,
    setGreetingText,
    setPipedMessage,
    setWeight,
    toggleDecoration,
    resetConfig,
    addToCart,
  } = useCakeConfig();

  return (
    <section id="builder" className="py-20 2xl:py-28 px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-[1900px] mx-auto w-full relative">
      {/* Header Info Banner */}
      <div className="mb-10 2xl:mb-14 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 2xl:px-5 py-1 2xl:py-1.5 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 text-[#C86D51] text-xs 2xl:text-sm font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>Interactive 3D Cake Studio • Mumbai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-medium tracking-tight text-[#2C1E18] font-serif-editorial">
            Design Your Custom Cake
          </h2>
          <p className="mt-2 text-sm 2xl:text-base text-[#6B574F] max-w-xl 2xl:max-w-2xl">
            Choose your cake size, sponge flavor, chocolate drip, and custom birthday or anniversary message in 3D.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs 2xl:text-sm text-[#6B574F] bg-[#F1E8DC] border border-[#C5A059]/30 px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-full shadow-xs">
          <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C86D51]" />
          <span>Freshly Baked in Mumbai</span>
        </div>
      </div>

      {/* Split-Screen Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-12 items-start relative">
        {/* Left Side: Full-Height 3D WebGL Canvas */}
        <div className="lg:col-span-7 sticky top-24 z-10 w-full h-[520px] sm:h-[580px] lg:h-[720px] 2xl:h-[860px] flex flex-col justify-between">
          <CakeCanvas />

          {/* Floating Summary Bar */}
          <div className="mt-4 p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl glass-floating-bar flex items-center justify-between gap-4 text-xs 2xl:text-sm">
            <div className="flex items-center gap-3 2xl:gap-4">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-bold">
                <Scale className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </div>
              <div>
                <div className="text-[10px] 2xl:text-xs uppercase tracking-wider text-[#6B574F] font-semibold">
                  Cake Summary
                </div>
                <div className="text-xs 2xl:text-sm font-bold text-[#2C1E18]">
                  {config.tiers} {config.tiers === 1 ? "Tier" : "Tiers"} • {config.shape} • {config.weight} kg
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 2xl:gap-6">
              <div className="text-right">
                <div className="text-[10px] 2xl:text-xs uppercase tracking-wider text-[#6B574F] font-semibold">
                  Total Price
                </div>
                <div className="text-base 2xl:text-2xl font-bold text-[#2C1E18] font-serif-editorial">
                  ₹{price.toLocaleString("en-IN")}
                </div>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="hidden sm:flex items-center gap-1.5 px-4 2xl:px-6 py-2 2xl:py-3 rounded-full terracotta-gradient-btn text-xs 2xl:text-sm font-semibold uppercase tracking-wider shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable UI Control Panel */}
        <div className="lg:col-span-5 bg-[#F1E8DC]/90 backdrop-blur-xl border border-[#C5A059]/35 rounded-[32px] 2xl:rounded-[40px] p-6 sm:p-7 2xl:p-9 shadow-xl space-y-6 2xl:space-y-8 max-h-[780px] 2xl:max-h-[860px] overflow-y-auto">
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
            cardStyle={config.cardStyle}
            greetingText={config.greetingText}
            pipedMessage={config.pipedMessage}
            onCardStyleChange={setCardStyle}
            onGreetingTextChange={setGreetingText}
            onPipedMessageChange={setPipedMessage}
          />

          {/* Step 6: Decorations & Florals */}
          <DecorationsSelector
            decorations={config.decorations}
            shape={config.shape}
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
