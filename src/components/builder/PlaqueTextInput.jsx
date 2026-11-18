"use client";

import React, { memo } from "react";
import { CreditCard, Sparkles, Wand2, X } from "lucide-react";

const FIXED_GREETINGS = [
  "Happy Birthday!",
  "Happy Anniversary",
  "Congratulations!",
  "Best Wishes",
  "Forever & Always",
  "Warm Hugs & Love",
];

const QUICK_NAMES_SUGGESTIONS = [
  "Aarav",
  "Ananya",
  "Rohan",
  "Priya & Rahul",
  "Diya",
  "Mom & Dad",
  "Little Princess",
];

function PlaqueTextInputComponent({
  cardStyle = "bottom_card",
  greetingText = "Happy Birthday!",
  pipedMessage = "",
  onCardStyleChange,
  onGreetingTextChange,
  onPipedMessageChange,
}) {
  return (
    <div className="space-y-4">
      {/* SECTION 1: MANDATORY CARD SELECTION (Bottom Card OR Top Pick Card) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs 2xl:text-sm uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>Greeting Card (Select One)</span>
          </label>
          <span className="text-[11px] 2xl:text-xs text-[#6B574F] font-medium bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#C5A059]/30">
            Card Plaque
          </span>
        </div>

        {/* 2-Way Selection: Bottom Card vs Top Card */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onCardStyleChange("bottom_card")}
            className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              cardStyle === "bottom_card"
                ? "bg-[#C86D51]/10 border-[#C86D51] text-[#2C1E18] shadow-xs"
                : "bg-[#FAF6F0] border-[#C5A059]/30 text-[#6B574F] hover:border-[#C5A059]"
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs 2xl:text-sm font-bold font-serif-editorial">
              <CreditCard className="w-4 h-4 text-[#C86D51]" />
              <span>Bottom Card</span>
            </div>
            <p className="text-[10px] 2xl:text-[11px] text-[#6B574F] mt-1 leading-tight">
              Front base plaque with 24K gold filigree
            </p>
          </button>

          <button
            type="button"
            onClick={() => onCardStyleChange("top_card")}
            className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              cardStyle === "top_card"
                ? "bg-[#C86D51]/10 border-[#C86D51] text-[#2C1E18] shadow-xs"
                : "bg-[#FAF6F0] border-[#C5A059]/30 text-[#6B574F] hover:border-[#C5A059]"
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs 2xl:text-sm font-bold font-serif-editorial">
              <Sparkles className="w-4 h-4 text-[#C86D51]" />
              <span>Top Pick Card</span>
            </div>
            <p className="text-[10px] 2xl:text-[11px] text-[#6B574F] mt-1 leading-tight">
              Inserted topper placed at the right & back
            </p>
          </button>
        </div>

        {/* Fixed Greetings Grid */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-semibold text-[#6B574F] uppercase tracking-wider">
            Card Message:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {FIXED_GREETINGS.map((text) => {
              const isSelected = greetingText === text;
              return (
                <button
                  key={text}
                  type="button"
                  onClick={() => onGreetingTextChange(text)}
                  className={`text-xs px-2.5 py-1.5 rounded-xl text-left border transition-all truncate font-medium ${
                    isSelected
                      ? "bg-[#2C1E18] text-[#FAF6F0] border-[#2C1E18] shadow-xs font-semibold"
                      : "bg-[#FAF6F0] border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51] hover:text-[#2C1E18]"
                  }`}
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: OPTIONAL HAND-PIPED WHIPPED CREAM MESSAGE */}
      <div className="pt-3 border-t border-[#C5A059]/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs 2xl:text-sm uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>Whipped Cream / Syrup Name</span>
            <span className="text-[10px] font-normal lowercase bg-[#F1E8DC] border border-[#C5A059]/40 px-2 py-0.2 rounded-full text-[#6B574F]">
              optional
            </span>
          </label>
          <span className="text-[11px] 2xl:text-xs text-[#6B574F] font-mono">
            {(pipedMessage || "").length}/20 chars
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            maxLength={20}
            value={pipedMessage || ""}
            onChange={(e) => onPipedMessageChange(e.target.value)}
            placeholder="Type name (e.g. Rahul, Ananya, Diya)..."
            className="w-full bg-[#FAF6F0] border border-[#C5A059]/40 rounded-2xl px-4 py-2.5 text-sm text-[#2C1E18] placeholder-[#9E897F] focus:outline-none focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/30 transition-all font-medium pr-10"
          />
          {pipedMessage && pipedMessage.length > 0 && (
            <button
              type="button"
              onClick={() => onPipedMessageChange("")}
              className="absolute right-3 text-[#6B574F] hover:text-[#C86D51] transition-colors p-1"
              title="Clear whipped cream message"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Name Suggestions */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {QUICK_NAMES_SUGGESTIONS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onPipedMessageChange(name)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#C5A059]/30 text-[#6B574F] hover:border-[#C86D51] hover:text-[#C86D51] transition-all font-medium"
            >
              + {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const PlaqueTextInput = memo(PlaqueTextInputComponent);
