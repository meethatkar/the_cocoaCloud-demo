"use client";

import React from "react";
import { Sparkles, ArrowDown, ChevronRight, Award } from "lucide-react";

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
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Top artisanal badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1616] border border-[#D4AF37]/35 shadow-lg shadow-[#D4AF37]/5 mb-6 animate-fade-in">
        <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="text-xs uppercase tracking-widest text-[#F3E5AB] font-medium">
          Mumbai’s Premier Haute Confectionery Studio
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl font-serif-luxury leading-[1.1] mb-6">
        Architectural Cakes, <br />
        <span className="gold-gradient-text">Designed in 3D.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        Experience bespoke celebratory cakes sculpted layer by layer. Customize multi-tier structures, single-origin cacao ganache, and edible 24k gold leaf in real-time WebGL.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
        <button
          type="button"
          onClick={scrollToBuilder}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA8010] text-[#0F0D0D] font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#D4AF37]/20 hover:brightness-110 active:scale-95 transition-all group"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch 3D Studio</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={scrollToOccasions}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#1A1616]/80 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D4AF37]/40 font-semibold text-sm tracking-wide transition-all backdrop-blur-md"
        >
          <span>Explore Curated Occasions</span>
        </button>
      </div>

      {/* Trust & Craft Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-6 border-t border-white/10 text-left">
        <div className="p-3">
          <div className="text-lg font-bold text-[#F3E5AB] font-serif-luxury">100% Pure</div>
          <div className="text-xs text-zinc-400 mt-0.5">French AOP Butter & Belgian Cacao</div>
        </div>
        <div className="p-3">
          <div className="text-lg font-bold text-[#F3E5AB] font-serif-luxury">Draco 3D</div>
          <div className="text-xs text-zinc-400 mt-0.5">WebGL Real-Time Visualization</div>
        </div>
        <div className="p-3">
          <div className="text-lg font-bold text-[#F3E5AB] font-serif-luxury">Chilled Transit</div>
          <div className="text-xs text-zinc-400 mt-0.5">Custom Refrigerated Vans in Mumbai</div>
        </div>
        <div className="p-3">
          <div className="text-lg font-bold text-[#F3E5AB] font-serif-luxury">Le Cordon Bleu</div>
          <div className="text-xs text-zinc-400 mt-0.5">Master Chef Certified Handcrafting</div>
        </div>
      </div>
    </section>
  );
}

