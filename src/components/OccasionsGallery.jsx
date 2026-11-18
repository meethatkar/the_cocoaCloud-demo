"use client";

import React from "react";
import { OCCASIONS_GALLERY } from "@/data/data";
import { useCakeStore } from "@/state/useCakeStore";
import { Sparkles, ArrowRight, Check, Heart, Cake } from "lucide-react";

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
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 text-[#C86D51] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Collection • Prêt-à-Fêter</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2C1E18] font-serif-editorial">
          Signature Occasion Presets
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#6B574F]">
          Select an architectural blueprint to load its tiers, delicate florals, and ganache profile directly into our 3D atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {OCCASIONS_GALLERY.map((item) => {
          const isSelected = selectedPresetId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-[28px] p-6 border transition-all duration-300 flex flex-col justify-between relative group ${
                isSelected
                  ? "bg-[#F1E8DC] border-[#C86D51] shadow-xl shadow-[#C86D51]/10 ring-2 ring-[#C86D51]/40"
                  : "bg-[#F1E8DC]/60 border-[#C5A059]/25 hover:border-[#C86D51]/50 hover:bg-[#F1E8DC] hover:shadow-lg"
              }`}
            >
              {/* Signature Parisian Arch-Shaped Frame Showcase (border-radius: 50% 50% 0 0) */}
              <div className="relative mb-5 flex flex-col items-center">
                <div
                  className="w-full h-36 border border-[#C5A059]/30 flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    borderRadius: "50% 50% 12px 12px",
                    backgroundColor: item.imageAccent || "#F5EBE1",
                  }}
                >
                  {/* Subtle inner concentric arch line */}
                  <div
                    className="absolute inset-2 border border-[#C5A059]/20 pointer-events-none"
                    style={{ borderRadius: "50% 50% 8px 8px" }}
                  />

                  {/* Stylized Icon Representation */}
                  <div className="p-3.5 rounded-full bg-white/70 shadow-sm border border-[#C5A059]/25 mb-1 text-[#C86D51]">
                    {item.config.shape === "Heart" ? (
                      <Heart className="w-6 h-6 fill-[#C86D51]/20 text-[#C86D51]" />
                    ) : (
                      <Cake className="w-6 h-6 text-[#C86D51]" />
                    )}
                  </div>

                  {/* Tiers & Shape badge */}
                  <span className="text-[11px] font-serif-editorial italic text-[#2C1E18]">
                    {item.config.tiers} {item.config.tiers === 1 ? "Tier" : "Tiers"} • {item.config.shape}
                  </span>

                  {/* Color Swatch Dot */}
                  <div className="absolute bottom-2 flex items-center gap-1.5 bg-white/80 px-2 py-0.5 rounded-full border border-black/5 shadow-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: item.config.flavorColor }}
                    />
                    {item.config.dripColor && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: item.config.dripColor }}
                      />
                    )}
                  </div>
                </div>

                {/* Badge */}
                <div className="w-full flex items-center justify-between mt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-[#C5A059]/30 text-[#C86D51]">
                    {item.occasion}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#C5A059]">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mb-5">
                <h3 className="text-xl font-bold text-[#2C1E18] font-serif-editorial mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#6B574F] leading-relaxed min-h-[34px]">
                  {item.tagline}
                </p>
              </div>

              {/* Specs Pill Overview */}
              <div className="space-y-1.5 mb-5 pt-3 border-t border-[#C5A059]/20 text-xs">
                <div className="flex items-center justify-between text-[#6B574F]">
                  <span>Plaque Inscription</span>
                  <span className="text-[#2C1E18] font-medium italic truncate max-w-[140px]">
                    “{item.config.customText}”
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#6B574F]">
                  <span>Weight Scale</span>
                  <span className="text-[#2C1E18] font-mono font-medium">
                    {item.config.weight} Kg
                  </span>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-[#6B574F] uppercase tracking-wider">
                    Investment
                  </span>
                  <span className="text-xl font-bold text-[#2C1E18] font-serif-editorial">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? "bg-[#C86D51] text-white shadow-md shadow-[#C86D51]/30"
                      : "bg-white text-[#2C1E18] border border-[#C5A059]/40 hover:bg-[#C86D51] hover:text-white hover:border-[#C86D51]"
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
