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
        colors: ["#C86D51", "#C5A059", "#F1E8DC", "#FAF6F0"],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSuccess(false);
    }, 2400);
  };

  return (
    <div className="pt-4 border-t border-[#C5A059]/25 space-y-4">
      {/* Weight Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>Cake Weight & Servings</span>
          </label>
          <span className="text-sm font-bold text-[#2C1E18] font-mono bg-white px-2.5 py-0.5 rounded-lg border border-[#C5A059]/30 shadow-xs">
            {weight.toFixed(1)} Kg (~{Math.round(weight * 8)} Servings)
          </span>
        </div>

        <input
          type="range"
          min={weightRange.min}
          max={weightRange.max}
          step={weightRange.step}
          value={weight}
          onChange={(e) => onWeightChange(parseFloat(e.target.value))}
          className="w-full accent-[#C86D51] h-1.5 bg-[#E4D7C8] rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-[#6B574F] font-mono">
          <span>Min: {weightRange.min} kg</span>
          <span>Max: {weightRange.max} kg</span>
        </div>
      </div>

      {/* Price Summary and Action Bar */}
      <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/40 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#6B574F] font-semibold">
            Total Price
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xs text-[#C86D51] font-bold">INR</span>
            <span className="text-3xl font-bold text-[#2C1E18] tracking-tight font-serif-editorial">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-[#6B574F] ml-1">
              (Free Mumbai Delivery)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="p-3 rounded-xl border border-[#C5A059]/30 bg-white text-[#6B574F] hover:text-[#2C1E18] hover:border-[#C86D51] transition-all shadow-xs"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isSuccess}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md ${
              isSuccess
                ? "bg-emerald-700 text-white"
                : "terracotta-gradient-btn hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add Cake to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export const WeightAndPriceCard = memo(WeightAndPriceCardComponent);
