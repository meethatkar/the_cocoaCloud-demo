"use client";

import React, { memo } from "react";
import { PenTool } from "lucide-react";

function PlaqueTextInputComponent({ customText, onChange }) {
  const quickSuggestions = [
    "Happy Birthday!",
    "Happy Anniversary",
    "Congratulations!",
    "Best Wishes",
    "Forever & Always",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5" />
          <span>Name / Message on Cake</span>
        </label>
        <span className="text-[11px] text-[#6B574F] font-mono">
          {(customText || "").length}/28 chars
        </span>
      </div>

      <div className="relative">
        <input
          type="text"
          maxLength={28}
          value={customText || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Happy Birthday Rahul!"
          className="w-full bg-[#FAF6F0] border border-[#C5A059]/40 rounded-2xl px-4 py-3 text-sm text-[#2C1E18] placeholder-[#9E897F] focus:outline-none focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/30 transition-all font-medium"
        />
      </div>

      {/* Quick suggestions pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {quickSuggestions.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => onChange(text)}
            className="text-[11px] px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51] hover:text-[#C86D51] transition-all font-medium"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export const PlaqueTextInput = memo(PlaqueTextInputComponent);
