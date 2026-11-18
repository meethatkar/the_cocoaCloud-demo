"use client";

import React, { memo } from "react";
import { DECORATIONS_CATALOG } from "@/data/data";
import { Sparkles, Flame, Flower, Gem, Wind, CircleDot } from "lucide-react";

function DecorationsSelectorComponent({
  decorations = [],
  shape = "Round",
  onToggle,
}) {
  const getIcon = (icon, isDisabled) => {
    const iconColor = isDisabled ? "text-[#6B574F]/40" : "";
    switch (icon) {
      case "flame":
        return <Flame className={`w-4 h-4 ${iconColor || "text-[#C86D51]"}`} />;
      case "sparkles":
        return <Sparkles className={`w-4 h-4 ${iconColor || "text-[#C5A059]"}`} />;
      case "flower":
        return <Flower className={`w-4 h-4 ${iconColor || "text-[#C86D51]"}`} />;
      case "gem":
        return <Gem className={`w-4 h-4 ${iconColor || "text-[#C5A059]"}`} />;
      case "wind":
        return <Wind className={`w-4 h-4 ${iconColor || "text-[#6B574F]"}`} />;
      case "circle-dot":
        return <CircleDot className={`w-4 h-4 ${iconColor || "text-[#C5A059]"}`} />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
          <span>Toppings & Decorations</span>
        </label>
        <span className="text-xs text-[#6B574F] font-medium">
          {decorations.length} Selected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {DECORATIONS_CATALOG.map((item) => {
          const isRibbon = item.id === "white_fondant_drape";
          const isDisabled = isRibbon && shape === "Heart";
          const isSelected = !isDisabled && decorations.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onToggle(item.id)}
              title={
                isDisabled
                  ? "Satin ribbon is not available for heart shaped cakes"
                  : item.description
              }
              className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                isDisabled
                  ? "opacity-45 cursor-not-allowed bg-[#FAF6F0]/30 border-dashed border-[#C5A059]/25 text-[#6B574F]/60"
                  : isSelected
                  ? "bg-[#FAF6F0] border-[#C86D51] text-[#2C1E18] shadow-sm ring-2 ring-[#C86D51]/30"
                  : "bg-[#FAF6F0]/60 border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51]/40 hover:bg-[#FAF6F0]"
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  isDisabled
                    ? "bg-black/5 opacity-50"
                    : isSelected
                    ? "bg-[#C86D51]/15"
                    : "bg-black/5"
                }`}
              >
                {getIcon(item.icon, isDisabled)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-xs font-semibold ${
                      isDisabled ? "text-[#6B574F]/70" : "text-[#2C1E18]"
                    }`}
                  >
                    {item.name}
                  </span>
                  {isDisabled ? (
                    <span className="text-[10px] text-[#6B574F]/70 font-medium italic">
                      Round/Square only
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-[#C86D51] font-bold">
                      +₹{item.price}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#6B574F] mt-0.5 line-clamp-1">
                  {isDisabled
                    ? "Not available for Heart shape cakes"
                    : item.description}
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
