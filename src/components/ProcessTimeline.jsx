"use client";

import React from "react";
import { PROCESS_TIMELINE, BAKERY_TESTIMONIALS } from "@/data/data";
import { Palette, Flame, Truck, Star } from "lucide-react";

export function ProcessTimeline() {
  const getStepIcon = (icon) => {
    switch (icon) {
      case "palette":
        return <Palette className="w-5 h-5 text-[#C86D51]" />;
      case "flame":
        return <Flame className="w-5 h-5 text-[#C86D51]" />;
      case "truck":
        return <Truck className="w-5 h-5 text-[#C86D51]" />;
      default:
        return <Palette className="w-5 h-5 text-[#C86D51]" />;
    }
  };

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[#C86D51] font-semibold">
          De l&apos;Atelier à la Table
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2C1E18] font-serif-editorial mt-2">
          The Three-Stage Journey
        </h2>
        <p className="mt-3 text-sm text-[#6B574F]">
          How our culinary artisans translate your interactive 3D model into an edible Parisian masterpiece.
        </p>
      </div>

      {/* 3-Step Horizontal / Vertical Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-20">
        {PROCESS_TIMELINE.map((item) => (
          <div
            key={item.step}
            className="p-8 rounded-[30px] bg-[#F1E8DC]/80 border border-[#C5A059]/30 hover:border-[#C86D51]/50 transition-all duration-300 relative group flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            {/* Step Watermark Number */}
            <div className="absolute top-6 right-8 text-5xl font-bold text-[#C5A059]/20 font-serif-editorial group-hover:text-[#C86D51]/25 transition-colors pointer-events-none">
              {item.step}
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#C5A059]/30 flex items-center justify-center mb-6 shadow-xs">
                {getStepIcon(item.icon)}
              </div>

              <div className="text-xs uppercase tracking-widest text-[#C86D51] font-bold mb-1">
                {item.subtitle}
              </div>

              <h3 className="text-xl font-bold text-[#2C1E18] font-serif-editorial mb-3">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B574F] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C5A059]/20 flex items-center gap-2 text-[11px] font-medium text-[#2C1E18]">
              <span>Étape {item.step} sur 03</span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Banner in Soft Champagne */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-[#F1E8DC] border border-[#C5A059]/35 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/30">
          {BAKERY_TESTIMONIALS.map((t, i) => (
            <div key={i} className={`${i > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
              <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                {[...Array(t.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#2C1E18] italic font-serif-editorial leading-relaxed mb-4">
                “{t.quote}”
              </p>
              <div>
                <div className="text-xs font-bold text-[#2C1E18] uppercase tracking-wider">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#C86D51] font-medium">{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
