"use client";

import React, { useState } from "react";
import { useCakeStore } from "@/state/useCakeStore";
import { X, Trash2, Calendar, MapPin, CheckCircle, ShieldCheck, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const isCartOpen = useCakeStore((state) => state.isCartOpen);
  const setIsCartOpen = useCakeStore((state) => state.setIsCartOpen);
  const cart = useCakeStore((state) => state.cart);
  const removeFromCart = useCakeStore((state) => state.removeFromCart);

  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("Evening (4 PM - 8 PM)");
  const [pincode, setPincode] = useState("400050");
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#FFFFFF", "#FF69B4"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120E0E] border-l border-[#D4AF37]/25 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-lg font-bold text-white font-serif-luxury">
                Your Tasting Box ({cart.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderPlaced ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white font-serif-luxury">
                  Order In Production!
                </h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Your 3D CAD blueprints have been transmitted to our Bandra kitchen studio. Our master pâtissier will contact you within 30 minutes for final embellishment approvals.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderPlaced(false);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0F0D0D] font-bold text-xs uppercase tracking-wider"
                  >
                    Return to Studio
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <p className="text-sm text-zinc-400">
                  Your tasting box is currently empty.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-[#D4AF37] underline uppercase tracking-wider font-semibold"
                >
                  Configure a cake now
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#1A1515] border border-white/10 space-y-2 relative"
                    >
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 text-zinc-500 hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="text-sm font-bold text-white font-serif-luxury pr-6">
                        {item.name}
                      </div>

                      <div className="text-xs text-zinc-400 space-y-1">
                        <div>
                          • {item.config.tiers} Tier(s) • {item.config.shape} •{" "}
                          {item.config.weight} kg
                        </div>
                        {item.config.customText && (
                          <div className="italic text-[#F3E5AB]">
                            Plaque: “{item.config.customText}”
                          </div>
                        )}
                        {item.config.decorations.length > 0 && (
                          <div className="text-[11px] text-zinc-400">
                            Embellishments: {item.config.decorations.join(", ")}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-white/5">
                        <span className="text-[11px] text-zinc-400">Item Total</span>
                        <span className="text-base font-bold text-[#D4AF37] font-serif-luxury">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Scheduling for Mumbai */}
                <div className="p-4 rounded-2xl bg-[#181313] border border-white/10 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Mumbai Chilled Slot Booking</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-[#110D0D] border border-white/10 rounded-lg p-2 text-zinc-200 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">
                        Mumbai PIN Code
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 400050"
                        className="w-full bg-[#110D0D] border border-white/10 rounded-lg p-2 text-zinc-200 text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Temperature Slot
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full bg-[#110D0D] border border-white/10 rounded-lg p-2 text-zinc-200 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>Morning (10 AM - 1 PM)</option>
                      <option>Afternoon (1 PM - 4 PM)</option>
                      <option>Evening (4 PM - 8 PM)</option>
                      <option>Late Night Banquet (9 PM - 11 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Insulated shock-proof packaging with food-grade dry refrigeration.</span>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!orderPlaced && cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#151111] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase tracking-wider">
                  Order Investment
                </span>
                <span className="text-2xl font-bold text-white font-serif-luxury">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA8010] text-[#0F0D0D] font-bold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all"
              >
                Confirm Bespoke Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

