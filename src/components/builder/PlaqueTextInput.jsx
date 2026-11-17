"use client";

import React, { memo } from "react";
import { PenTool } from "lucide-react";

function PlaqueTextInputComponent({ customText, onChange }) {
  const quickSuggestions = [
    "Happy Birthday!",
    "Happy Anniversary",
    "Mr. & Mrs.",
    "Bonne Fête",
    "Forever & Always",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
          <PenTool className="w-3.5 h-3.5" />
          <span>Calligraphy Plaque Inscription</span>
        </label>
        <span className="text-[11px] text-zinc-400 font-mono">
          {(customText || "").length}/28 chars
        </span>
      </div>

      <div className="relative">
        <input
          type="text"
          maxLength={28}
          value={customText || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Happy 30th Birthday Aria!"
          className="w-full bg-[#151212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
        />
      </div>

      {/* Quick suggestions pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {quickSuggestions.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => onChange(text)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:border-[#D4AF37]/50 hover:text-white transition-all"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export const PlaqueTextInput = memo(PlaqueTextInputComponent);

