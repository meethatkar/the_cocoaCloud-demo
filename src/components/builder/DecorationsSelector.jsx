"use client";

import React, { memo } from "react";
import { DECORATIONS_CATALOG } from "@/data/data";
import { Sparkles, Flame, Flower, Gem, Wind, CircleDot } from "lucide-react";

function DecorationsSelectorComponent({ decorations = [], onToggle }) {
  const getIcon = (icon) => {
    switch (icon) {
      case "flame":
        return <Flame className="w-4 h-4 text-amber-400" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      case "flower":
        return <Flower className="w-4 h-4 text-rose-400" />;
      case "gem":
        return <Gem className="w-4 h-4 text-yellow-400" />;
      case "wind":
        return <Wind className="w-4 h-4 text-sky-200" />;
      case "circle-dot":
        return <CircleDot className="w-4 h-4 text-slate-300" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
          <span>Artisanal Embellishments</span>
        </label>
        <span className="text-xs text-zinc-400 font-mono">
          {decorations.length} Active
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
              className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-sm ring-1 ring-[#D4AF37]/30"
                  : "bg-[#181414]/70 border-white/10 text-zinc-300 hover:border-white/20"
              }`}
            >
              <div
                className={`p-2 rounded-lg flex-shrink-0 ${
                  isSelected ? "bg-[#D4AF37]/20" : "bg-white/5"
                }`}
              >
                {getIcon(item.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-white">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#F3E5AB]">
                    +₹{item.price}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
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

