"use client";

import React, { memo } from "react";
import { Circle, Square, Heart } from "lucide-react";
import { SHAPE_OPTIONS } from "@/data/data";

function ShapeSelectorComponent({ shape, onChange }) {
  const getIcon = (type) => {
    switch (type) {
      case "Square":
        return <Square className="w-4 h-4" />;
      case "Heart":
        return <Heart className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-2">
          <span>Cake Geometry & Silhouette</span>
        </label>
        <span className="text-xs text-[#6B574F] font-serif-editorial italic">
          {shape} Silhouette
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {SHAPE_OPTIONS.map((item) => {
          const isSelected = shape === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                isSelected
                  ? "bg-[#FAF6F0] border-[#C86D51] text-[#2C1E18] shadow-md ring-2 ring-[#C86D51]/30"
                  : "bg-[#FAF6F0]/60 border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51]/40 hover:text-[#2C1E18] hover:bg-[#FAF6F0]"
              }`}
            >
              <div
                className={`mb-1.5 p-2 rounded-full ${
                  isSelected ? "bg-[#C86D51]/15 text-[#C86D51]" : "bg-black/5 text-[#6B574F]"
                }`}
              >
                {getIcon(item.id)}
              </div>
              <div className="text-xs font-semibold text-[#2C1E18]">
                {item.label}
              </div>
              <div className="text-[10px] text-[#6B574F] mt-0.5 line-clamp-1">
                {item.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const ShapeSelector = memo(ShapeSelectorComponent);
