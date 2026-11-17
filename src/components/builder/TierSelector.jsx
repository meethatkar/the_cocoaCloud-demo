"use client";

import React, { memo } from "react";
import { Layers } from "lucide-react";

function TierSelectorComponent({ tiers, onChange }) {
  const options = [
    { value: 1, label: "Single Tier", desc: "Intimate Parties • 1.0 - 2.5 kg" },
    { value: 2, label: "Two Tiers", desc: "Milestone Galas • 2.5 - 4.5 kg" },
    { value: 3, label: "Three Tiers", desc: "Grand Weddings • 4.5 - 8.0 kg" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Architectural Tiers</span>
        </label>
        <span className="text-xs text-zinc-400 font-mono">
          {tiers} {tiers === 1 ? "Tier" : "Tiers"} Selected
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = tiers === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                  : "bg-[#181414]/70 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37] rounded-bl-md" />
              )}
              <div className="text-base font-bold text-white mb-0.5">
                {opt.value}
              </div>
              <div className="text-xs font-medium text-[#F3E5AB]">
                {opt.label}
              </div>
              <div className="text-[10px] text-zinc-400 mt-1 line-clamp-1">
                {opt.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const TierSelector = memo(TierSelectorComponent);

