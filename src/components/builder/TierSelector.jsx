"use client";

import React, { memo } from "react";
import { Layers } from "lucide-react";

function TierSelectorComponent({ tiers, onChange }) {
  const options = [
    { value: 1, label: "1 Tier", desc: "Small Party • 1.0 - 2.5 kg" },
    { value: 2, label: "2 Tiers", desc: "Medium Party • 2.5 - 4.5 kg" },
    { value: 3, label: "3 Tiers", desc: "Grand Party • 4.5 - 8.0 kg" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Number of Tiers (Layers)</span>
        </label>
        <span className="text-xs text-[#6B574F] font-medium">
          {tiers} {tiers === 1 ? "Tier" : "Tiers"} Selected
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const isSelected = tiers === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-[#FAF6F0] border-[#C86D51] text-[#2C1E18] shadow-md ring-2 ring-[#C86D51]/30"
                  : "bg-[#FAF6F0]/60 border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51]/40 hover:text-[#2C1E18] hover:bg-[#FAF6F0]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#C86D51] rounded-bl-md" />
              )}
              <div className="text-lg font-bold text-[#2C1E18] font-serif-editorial">
                {opt.value}
              </div>
              <div className="text-xs font-semibold text-[#C86D51]">
                {opt.label}
              </div>
              <div className="text-[10px] text-[#6B574F] mt-1 line-clamp-1">
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
