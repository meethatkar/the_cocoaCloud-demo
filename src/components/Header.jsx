"use client";

import React, { useState, useEffect } from "react";
import { useCakeStore } from "@/state/useCakeStore";
import { ShoppingBag, Sparkles, Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useCakeStore((state) => state.cart);
  const toggleCart = useCakeStore((state) => state.toggleCart);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0F0D0D]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Bakery Brand Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF0D4] p-0.5 shadow-md shadow-[#D4AF37]/20 group-hover:rotate-12 transition-transform duration-300">
            <div className="w-full h-full bg-[#141010] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <span className="block text-lg font-bold tracking-wider text-white font-serif-luxury">
              COCOA & CLOUD
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] -mt-1 font-sans">
              Haute Patisserie • Mumbai
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-zinc-300">
          <button
            type="button"
            onClick={() => scrollTo("builder")}
            className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#D4AF37] after:transition-all"
          >
            Build Your Cake
          </button>
          <button
            type="button"
            onClick={() => scrollTo("occasions")}
            className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#D4AF37] after:transition-all"
          >
            Occasions
          </button>
          <button
            type="button"
            onClick={() => scrollTo("process")}
            className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#D4AF37] after:transition-all"
          >
            Our Process
          </button>
          <button
            type="button"
            onClick={() => scrollTo("zones")}
            className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#D4AF37] after:transition-all"
          >
            Mumbai Zones
          </button>
        </nav>

        {/* Right Actions: Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleCart}
            className="relative p-2.5 rounded-full bg-[#1A1616]/80 border border-[#D4AF37]/30 text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] transition-all shadow-md"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0F0D0D] text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141010]/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 px-6 py-6 space-y-4">
          <button
            type="button"
            onClick={() => scrollTo("builder")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-zinc-200 py-2 border-b border-white/5"
          >
            Build Your Cake
          </button>
          <button
            type="button"
            onClick={() => scrollTo("occasions")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-zinc-200 py-2 border-b border-white/5"
          >
            Occasions
          </button>
          <button
            type="button"
            onClick={() => scrollTo("process")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-zinc-200 py-2 border-b border-white/5"
          >
            Our Process
          </button>
          <button
            type="button"
            onClick={() => scrollTo("zones")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-zinc-200 py-2"
          >
            Mumbai Delivery Zones
          </button>
        </div>
      )}
    </header>
  );
}

