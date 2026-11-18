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
    <section id="process" className="py-24 2xl:py-32 px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-[1900px] mx-auto w-full">
      {/* Section Title */}
      <div className="text-center max-w-2xl 2xl:max-w-3xl mx-auto mb-16 2xl:mb-24">
        <span className="text-xs 2xl:text-sm uppercase tracking-widest text-[#C86D51] font-semibold">
          De l&apos;Atelier à la Table
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-medium tracking-tight text-[#2C1E18] font-serif-editorial mt-2">
          The Three-Stage Journey
        </h2>
        <p className="mt-3 text-sm 2xl:text-lg text-[#6B574F]">
          How our culinary artisans translate your interactive 3D model into an edible Parisian masterpiece.
        </p>
      </div>

      {/* 3-Step Horizontal / Vertical Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-12 relative mb-20 2xl:mb-28">
        {PROCESS_TIMELINE.map((item) => (
          <div
            key={item.step}
            className="p-8 2xl:p-12 rounded-[30px] 2xl:rounded-[40px] bg-[#F1E8DC]/80 border border-[#C5A059]/30 hover:border-[#C86D51]/50 transition-all duration-300 relative group flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            {/* Step Watermark Number */}
            <div className="absolute top-6 2xl:top-8 right-8 2xl:right-12 text-5xl 2xl:text-7xl font-bold text-[#C5A059]/20 font-serif-editorial group-hover:text-[#C86D51]/25 transition-colors pointer-events-none">
              {item.step}
            </div>

            <div>
              <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-2xl 2xl:rounded-3xl bg-white border border-[#C5A059]/30 flex items-center justify-center mb-6 2xl:mb-8 shadow-xs">
                {getStepIcon(item.icon)}
              </div>

              <div className="text-xs 2xl:text-sm uppercase tracking-widest text-[#C86D51] font-bold mb-1">
                {item.subtitle}
              </div>

              <h3 className="text-xl 2xl:text-2xl font-bold text-[#2C1E18] font-serif-editorial mb-3 2xl:mb-4">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm 2xl:text-base text-[#6B574F] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 2xl:mt-8 pt-4 2xl:pt-6 border-t border-[#C5A059]/20 flex items-center gap-2 text-[11px] 2xl:text-xs font-medium text-[#2C1E18]">
              <span>Étape {item.step} sur 03</span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Banner in Soft Champagne */}
      <div className="p-8 sm:p-12 2xl:p-16 rounded-[32px] 2xl:rounded-[44px] bg-[#F1E8DC] border border-[#C5A059]/35 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-14 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/30">
          {BAKERY_TESTIMONIALS.map((t, i) => (
            <div key={i} className={`${i > 0 ? "pt-6 md:pt-0 md:pl-8 2xl:md:pl-14" : ""}`}>
              <div className="flex items-center gap-1 text-[#C5A059] mb-3 2xl:mb-4">
                {[...Array(t.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 2xl:w-5 2xl:h-5 fill-[#C5A059]" />
                ))}
              </div>
              <p className="text-sm sm:text-base 2xl:text-xl text-[#2C1E18] italic font-serif-editorial leading-relaxed mb-4 2xl:mb-6">
                “{t.quote}”
              </p>
              <div>
                <div className="text-xs 2xl:text-sm font-bold text-[#2C1E18] uppercase tracking-wider">
                  {t.author}
                </div>
                <div className="text-[11px] 2xl:text-xs text-[#C86D51] font-medium">{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
