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
        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Artisanal Flavor & Sponge</span>
        </label>
        <span className="text-xs text-[#F3E5AB] font-medium">
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
              className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white ring-1 ring-[#D4AF37]/40 shadow-sm"
                  : "bg-[#181414]/70 border-white/10 text-zinc-300 hover:border-white/20"
              }`}
            >
              {/* Color swatch circle */}
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 border border-white/30 shadow-inner"
                style={{ backgroundColor: flavor.hex }}
              />
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate">
                  {flavor.name}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  {flavor.hex}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeFlavor && (
        <p className="text-[11px] text-zinc-400 italic bg-[#151212] px-3 py-2 rounded-lg border border-white/5">
          “{activeFlavor.description}”
        </p>
      )}
    </div>
  );
}

export const FlavorPalette = memo(FlavorPaletteComponent);

