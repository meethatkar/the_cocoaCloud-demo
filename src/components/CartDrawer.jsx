"use client";

import React, { useState } from "react";
import { useCakeStore } from "@/state/useCakeStore";
import { X, Trash2, Calendar, CheckCircle, ShieldCheck, ShoppingBag } from "lucide-react";
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
        colors: ["#C86D51", "#C5A059", "#F1E8DC", "#FAF6F0"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C1E18]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md 2xl:max-w-xl bg-[#FAF6F0] border-l border-[#C5A059]/40 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 2xl:p-8 border-b border-[#C5A059]/25 flex items-center justify-between bg-[#F1E8DC]">
            <div className="flex items-center gap-2 2xl:gap-3">
              <ShoppingBag className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#C86D51]" />
              <h3 className="text-lg 2xl:text-2xl font-bold text-[#2C1E18] font-serif-editorial">
                Your Tasting Boîte ({cart.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 2xl:p-2.5 rounded-full text-[#6B574F] hover:text-[#2C1E18] hover:bg-black/5 transition-all"
            >
              <X className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 2xl:p-8 space-y-6 2xl:space-y-8">
            {orderPlaced ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-[#2C1E18] font-serif-editorial">
                  Order In Atelier Production!
                </h4>
                <p className="text-xs text-[#6B574F] max-w-xs mx-auto leading-relaxed">
                  Your 3D CAD blueprints have been transmitted to our Bandra kitchen studio. Our master pâtissier will contact you within 30 minutes for final embellishment approvals.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderPlaced(false);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full terracotta-gradient-btn text-xs font-semibold uppercase tracking-wider"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#C5A059] mx-auto" />
                <p className="text-sm text-[#6B574F]">
                  Your tasting boîte is currently empty.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-[#C86D51] underline uppercase tracking-wider font-semibold"
                >
                  Configure a custom cake
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#F1E8DC] border border-[#C5A059]/30 space-y-2 relative shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 text-[#6B574F] hover:text-[#C86D51] transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="text-sm font-bold text-[#2C1E18] font-serif-editorial pr-6">
                        {item.name}
                      </div>

                      <div className="text-xs text-[#6B574F] space-y-1">
                        <div>
                          • {item.config.tiers} Tier(s) • {item.config.shape} •{" "}
                          {item.config.weight} kg
                        </div>
                        {item.config.greetingText && (
                          <div className="italic text-[#2C1E18] font-serif-editorial">
                            {item.config.cardStyle === "top_card"
                              ? "Top Pick Topper: "
                              : "Bottom Plaque: "}
                            “{item.config.greetingText}”
                          </div>
                        )}
                        {item.config.pipedMessage && (
                          <div className="text-[11px] text-[#C86D51] font-medium">
                            Whipped Name: “{item.config.pipedMessage}”
                          </div>
                        )}
                        {item.config.decorations.length > 0 && (
                          <div className="text-[11px] text-[#6B574F]">
                            Embellishments: {item.config.decorations.join(", ")}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-[#C5A059]/20">
                        <span className="text-[11px] text-[#6B574F]">Item Total</span>
                        <span className="text-base font-bold text-[#2C1E18] font-serif-editorial">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Scheduling for Mumbai */}
                <div className="p-4 rounded-2xl bg-[#F1E8DC] border border-[#C5A059]/30 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#C86D51] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Mumbai Chilled Slot Booking</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-[#6B574F] block mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#C5A059]/30 rounded-lg p-2 text-[#2C1E18] text-xs focus:outline-none focus:border-[#C86D51]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#6B574F] block mb-1">
                        Mumbai PIN Code
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 400050"
                        className="w-full bg-[#FAF6F0] border border-[#C5A059]/30 rounded-lg p-2 text-[#2C1E18] text-xs font-mono focus:outline-none focus:border-[#C86D51]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#6B574F] block mb-1">
                      Temperature Slot
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#C5A059]/30 rounded-lg p-2 text-[#2C1E18] text-xs focus:outline-none focus:border-[#C86D51]"
                    >
                      <option>Morning (10 AM - 1 PM)</option>
                      <option>Afternoon (1 PM - 4 PM)</option>
                      <option>Evening (4 PM - 8 PM)</option>
                      <option>Late Night Soirée (9 PM - 11 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#6B574F]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Insulated shock-proof packaging with food-grade dry refrigeration.</span>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!orderPlaced && cart.length > 0 && (
            <div className="p-6 border-t border-[#C5A059]/25 bg-[#F1E8DC] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B574F] uppercase tracking-wider font-semibold">
                  Order Investment
                </span>
                <span className="text-2xl font-bold text-[#2C1E18] font-serif-editorial">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-4 rounded-full terracotta-gradient-btn font-semibold text-xs tracking-wider uppercase shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
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
