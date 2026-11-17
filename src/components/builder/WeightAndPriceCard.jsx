"use client";

import React, { memo, useState } from "react";
import confetti from "canvas-confetti";
import { ShoppingBag, Scale, CheckCircle2, RotateCcw } from "lucide-react";

function WeightAndPriceCardComponent({
  weight,
  weightRange,
  onWeightChange,
  price,
  onAddToCart,
  onReset,
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart();
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#D4AF37", "#F3E5AB", "#FF69B4", "#FFFFFF"],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSuccess(false);
    }, 2400);
  };

  return (
    <div className="pt-4 border-t border-[#D4AF37]/20 space-y-4">
      {/* Weight Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Target Weight</span>
          </label>
          <span className="text-sm font-bold text-white font-mono bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
            {weight.toFixed(1)} Kg
          </span>
        </div>

        <input
          type="range"
          min={weightRange.min}
          max={weightRange.max}
          step={weightRange.step}
          value={weight}
          onChange={(e) => onWeightChange(parseFloat(e.target.value))}
          className="w-full accent-[#D4AF37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>Min: {weightRange.min} kg</span>
          <span>Max: {weightRange.max} kg</span>
        </div>
      </div>

      {/* Price Summary and Action Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E1818] via-[#1A1414] to-[#251A18] border border-[#D4AF37]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
            Estimated Investment
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xs text-[#D4AF37] font-semibold">INR</span>
            <span className="text-3xl font-extrabold text-white tracking-tight font-serif-luxury">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-zinc-400 ml-1">
              (incl. Luxury Box & Delivery)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="p-3 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
            title="Reset configuration"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isSuccess}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
              isSuccess
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA8010] text-[#0F0D0D] hover:brightness-110 active:scale-[0.98]"
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to Box!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Tasting Box</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export const WeightAndPriceCard = memo(WeightAndPriceCardComponent);

