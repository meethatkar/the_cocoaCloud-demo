"use client";

import React from "react";
import { OCCASIONS_GALLERY } from "@/data/data";
import { useCakeStore } from "@/state/useCakeStore";
import { Sparkles, ArrowRight, Check } from "lucide-react";

export function OccasionsGallery() {
  const selectedPresetId = useCakeStore((state) => state.selectedPresetId);
  const loadPreset = useCakeStore((state) => state.loadPreset);

  const handleSelect = (id) => {
    loadPreset(id);
    const builderEl = document.getElementById("builder");
    if (builderEl) {
      const top = builderEl.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="occasions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Haute Collections</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-luxury">
          Signature Occasion Presets
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400">
          Click any bespoke configuration to load its exact 3D architecture, flavor profile, and custom decorations into the interactive builder.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {OCCASIONS_GALLERY.map((item) => {
          const isSelected = selectedPresetId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative group ${
                isSelected
                  ? "bg-[#1E1818] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10 ring-1 ring-[#D4AF37]/50"
                  : "bg-[#151212]/80 border-white/10 hover:border-[#D4AF37]/40 hover:bg-[#181414]"
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#F3E5AB]">
                  {item.occasion}
                </span>
                {item.badge && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4AF37]">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-serif-luxury mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                  {item.tagline}
                </p>
              </div>

              {/* Specs Pill Overview */}
              <div className="space-y-2 mb-6 pt-4 border-t border-white/5 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Architecture</span>
                  <span className="text-zinc-200 font-medium">
                    {item.config.tiers} {item.config.tiers === 1 ? "Tier" : "Tiers"} • {item.config.shape}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Target Weight</span>
                  <span className="text-zinc-200 font-mono font-medium">
                    {item.config.weight} Kg
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Sponge & Frosting</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: item.config.flavorColor }}
                    />
                    {item.config.dripColor && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: item.config.dripColor }}
                        title="Drip Glaze"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-zinc-400">Investment</span>
                  <span className="text-xl font-bold text-white font-serif-luxury">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? "bg-[#D4AF37] text-[#0F0D0D]"
                      : "bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0F0D0D]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Loaded in 3D</span>
                    </>
                  ) : (
                    <>
                      <span>Customize in 3D</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

