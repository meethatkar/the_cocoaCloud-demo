"use client";

import React from "react";
import { Sparkles, ChevronRight, Award, Flower2 } from "lucide-react";

export function Hero() {
  const scrollToBuilder = () => {
    const el = document.getElementById("builder");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToOccasions = () => {
    const el = document.getElementById("occasions");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center overflow-hidden">
      {/* Background soft champagne glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-[#F1E8DC] blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Top Parisian badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 shadow-sm mb-6">
        <Flower2 className="w-3.5 h-3.5 text-[#C86D51]" />
        <span className="text-xs uppercase tracking-widest text-[#2C1E18] font-semibold">
          Parisian Haute Pâtisserie & Bespoke 3D Studio
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#2C1E18] max-w-4xl font-serif-editorial leading-[1.12] mb-6">
        Artisanal Cakes, <br />
        <span className="italic font-normal text-[#C86D51]">sculpted in real-time 3D.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#6B574F] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        Where French confectionery heritage meets interactive 3D architecture. Design bespoke celebration cakes with delicate sugar florals, Valrhona cacao, and edible burnished gold leaf.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
        <button
          type="button"
          onClick={scrollToBuilder}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full terracotta-gradient-btn font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enter The 3D Atelier</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={scrollToOccasions}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 text-[#2C1E18] hover:border-[#C86D51] hover:text-[#C86D51] font-semibold text-sm tracking-wide transition-all shadow-sm"
        >
          <span>Curated Occasions Gallery</span>
        </button>
      </div>

      {/* Trust & Craft Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-[#C5A059]/20 text-left">
        <div className="p-3 bg-[#F1E8DC]/50 rounded-2xl border border-[#C5A059]/20">
          <div className="text-base font-bold text-[#2C1E18] font-serif-editorial">AOP Charentes</div>
          <div className="text-xs text-[#6B574F] mt-0.5">Pure French cultured butter & Valrhona cacao</div>
        </div>
        <div className="p-3 bg-[#F1E8DC]/50 rounded-2xl border border-[#C5A059]/20">
          <div className="text-base font-bold text-[#2C1E18] font-serif-editorial">WebGL & Draco</div>
          <div className="text-xs text-[#6B574F] mt-0.5">Real-time photorealistic CAD visualization</div>
        </div>
        <div className="p-3 bg-[#F1E8DC]/50 rounded-2xl border border-[#C5A059]/20">
          <div className="text-base font-bold text-[#2C1E18] font-serif-editorial">Delicate Florals</div>
          <div className="text-xs text-[#6B574F] mt-0.5">Handmade sugar clay petals & burnished gold</div>
        </div>
        <div className="p-3 bg-[#F1E8DC]/50 rounded-2xl border border-[#C5A059]/20">
          <div className="text-base font-bold text-[#2C1E18] font-serif-editorial">Chilled Transit</div>
          <div className="text-xs text-[#6B574F] mt-0.5">4°C refrigerated white-glove fleet in Mumbai</div>
        </div>
      </div>
    </section>
  );
}
