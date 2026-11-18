"use client";

import React, { memo } from "react";
import { DECORATIONS_CATALOG } from "@/data/data";
import { Sparkles, Flame, Flower, Gem, Wind, CircleDot } from "lucide-react";

function DecorationsSelectorComponent({ decorations = [], onToggle }) {
  const getIcon = (icon) => {
    switch (icon) {
      case "flame":
        return <Flame className="w-4 h-4 text-[#C86D51]" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-[#C5A059]" />;
      case "flower":
        return <Flower className="w-4 h-4 text-[#C86D51]" />;
      case "gem":
        return <Gem className="w-4 h-4 text-[#C5A059]" />;
      case "wind":
        return <Wind className="w-4 h-4 text-[#6B574F]" />;
      case "circle-dot":
        return <CircleDot className="w-4 h-4 text-[#C5A059]" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-2">
          <span>Artisanal Embellishments & Florals</span>
        </label>
        <span className="text-xs text-[#6B574F] font-medium">
          {decorations.length} Selected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {DECORATIONS_CATALOG.map((item) => {
          const isSelected = decorations.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-[#FAF6F0] border-[#C86D51] text-[#2C1E18] shadow-sm ring-2 ring-[#C86D51]/30"
                  : "bg-[#FAF6F0]/60 border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51]/40 hover:bg-[#FAF6F0]"
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  isSelected ? "bg-[#C86D51]/15" : "bg-black/5"
                }`}
              >
                {getIcon(item.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-[#2C1E18]">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#C86D51] font-bold">
                    +₹{item.price}
                  </span>
                </div>
                <p className="text-[10px] text-[#6B574F] mt-0.5 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const DecorationsSelector = memo(DecorationsSelectorComponent);
