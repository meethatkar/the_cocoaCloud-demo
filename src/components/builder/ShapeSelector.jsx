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
        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
          <span>Cake Geometry & Silhouette</span>
        </label>
        <span className="text-xs text-zinc-400 font-mono">{shape}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {SHAPE_OPTIONS.map((item) => {
          const isSelected = shape === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                  : "bg-[#181414]/70 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              <div
                className={`mb-1.5 p-2 rounded-full ${
                  isSelected ? "bg-[#D4AF37]/25 text-[#F3E5AB]" : "bg-white/5 text-zinc-400"
                }`}
              >
                {getIcon(item.id)}
              </div>
              <div className="text-xs font-medium text-white">{item.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const ShapeSelector = memo(ShapeSelectorComponent);

