"use client";

import React, { memo } from "react";
import { FLAVOR_PALETTE } from "@/data/data";
import { Sparkles } from "lucide-react";

function FlavorPaletteComponent({ flavorColor, onChange }) {
  const activeFlavor =
    FLAVOR_PALETTE.find((f) => f.hex.toLowerCase() === (flavorColor || "").toLowerCase()) ||
    FLAVOR_PALETTE[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>French Flavour & Ganache Sponge</span>
        </label>
        <span className="text-xs text-[#2C1E18] font-serif-editorial font-bold">
          {activeFlavor?.name}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {FLAVOR_PALETTE.map((flavor) => {
          const isSelected =
            (flavorColor || "").toLowerCase() === flavor.hex.toLowerCase();
          return (
            <button
              key={flavor.id}
              type="button"
              onClick={() => onChange(flavor.hex)}
              className={`flex items-center gap-2.5 p-2 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-[#FAF6F0] border-[#C86D51] text-[#2C1E18] shadow-sm ring-2 ring-[#C86D51]/30"
                  : "bg-[#FAF6F0]/60 border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51]/40 hover:bg-[#FAF6F0]"
              }`}
            >
              {/* Color swatch circle with subtle gold border */}
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
                style={{ backgroundColor: flavor.hex }}
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#2C1E18] truncate">
                  {flavor.name}
                </div>
                <div className="text-[10px] text-[#6B574F] font-mono">
                  {flavor.hex}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeFlavor && (
        <p className="text-[11px] text-[#6B574F] italic bg-[#FAF6F0] px-3.5 py-2.5 rounded-xl border border-[#C5A059]/20 font-serif-editorial">
          “{activeFlavor.description}”
        </p>
      )}
    </div>
  );
}

export const FlavorPalette = memo(FlavorPaletteComponent);
