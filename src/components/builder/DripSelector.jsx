"use client";

import React, { memo } from "react";
import { DRIP_OPTIONS } from "@/data/data";
import { Droplet } from "lucide-react";

function DripSelectorComponent({ dripColor, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-2">
          <Droplet className="w-3.5 h-3.5" />
          <span>Glaze Cascade & Drip Finish</span>
        </label>
        <span className="text-xs text-[#6B574F] font-medium">
          {dripColor ? "Active Finish" : "Naked Edge"}
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
              className={`flex items-center gap-2 p-2 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-[#FAF6F0] border-[#C86D51] text-[#2C1E18] shadow-sm ring-2 ring-[#C86D51]/30"
                  : "bg-[#FAF6F0]/60 border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51]/40 hover:bg-[#FAF6F0]"
              }`}
            >
              {item.hex ? (
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
                  style={{ backgroundColor: item.hex }}
                />
              ) : (
                <div className="w-5 h-5 rounded-full flex-shrink-0 border border-dashed border-[#6B574F] flex items-center justify-center text-[10px] text-[#6B574F]">
                  ✕
                </div>
              )}
              <span className="text-xs font-semibold text-[#2C1E18] truncate">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const DripSelector = memo(DripSelectorComponent);
