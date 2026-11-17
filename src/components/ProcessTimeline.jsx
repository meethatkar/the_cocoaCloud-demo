"use client";

import React from "react";
import { PROCESS_TIMELINE, BAKERY_TESTIMONIALS } from "@/data/data";
import { Palette, Flame, Truck, Star, Quote } from "lucide-react";

export function ProcessTimeline() {
  const getStepIcon = (icon) => {
    switch (icon) {
      case "palette":
        return <Palette className="w-5 h-5 text-[#D4AF37]" />;
      case "flame":
        return <Flame className="w-5 h-5 text-[#D4AF37]" />;
      case "truck":
        return <Truck className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Palette className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          From Blueprint to Banquet
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-luxury mt-2">
          The Three-Stage Journey
        </h2>
        <p className="mt-3 text-sm text-zinc-400">
          How our culinary architects turn your interactive 3D model into an edible work of art.
        </p>
      </div>

      {/* 3-Step Horizontal / Vertical Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-24">
        {PROCESS_TIMELINE.map((item, idx) => (
          <div
            key={item.step}
            className="p-8 rounded-3xl bg-[#151212]/90 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 relative group flex flex-col justify-between"
          >
            {/* Step Watermark Number */}
            <div className="absolute top-6 right-8 text-5xl font-black text-white/5 font-serif-luxury group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none">
              {item.step}
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                {getStepIcon(item.icon)}
              </div>

              <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">
                {item.subtitle}
              </div>

              <h3 className="text-xl font-bold text-white font-serif-luxury mb-3">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#F3E5AB]">
              <span>Stage {item.step} of 03</span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1C1616] via-[#161212] to-[#241A18] border border-[#D4AF37]/25 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {BAKERY_TESTIMONIALS.map((t, i) => (
            <div key={i} className={`${i > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
              <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
                {[...Array(t.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-zinc-200 italic font-serif-luxury leading-relaxed mb-4">
                “{t.quote}”
              </p>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#D4AF37]">{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

