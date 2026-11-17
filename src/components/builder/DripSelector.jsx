"use client";

import React, { memo } from "react";
import { DRIP_OPTIONS } from "@/data/data";
import { Droplet } from "lucide-react";

function DripSelectorComponent({ dripColor, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
          <Droplet className="w-3.5 h-3.5" />
          <span>Glaze & Ganache Cascade (Drip)</span>
        </label>
        <span className="text-xs text-zinc-400 font-mono">
          {dripColor ? "Active" : "None"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {DRIP_OPTIONS.map((item) => {
          const isSelected = dripColor === item.hex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.hex)}
              className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white ring-1 ring-[#D4AF37]/40"
                  : "bg-[#181414]/70 border-white/10 text-zinc-300 hover:border-white/20"
              }`}
            >
              {item.hex ? (
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 border border-white/20 shadow-sm"
                  style={{ backgroundColor: item.hex }}
                />
              ) : (
                <div className="w-5 h-5 rounded-full flex-shrink-0 border border-dashed border-zinc-500 flex items-center justify-center text-[10px] text-zinc-500">
                  ✕
                </div>
              )}
              <span className="text-xs font-medium truncate">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const DripSelector = memo(DripSelectorComponent);

