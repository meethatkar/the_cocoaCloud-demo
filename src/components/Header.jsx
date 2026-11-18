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
      if (window.scrollY > 30) {
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
          ? "bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#C5A059]/30 py-3 shadow-[0_4px_20px_-4px_rgba(44,30,24,0.08)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Bakery Brand Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-9 h-9 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-[#C86D51]" />
          </div>
          <div>
            <span className="block text-xl font-bold tracking-tight text-[#2C1E18] font-serif-editorial">
              Cocoa & Cloud
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] -mt-1 font-sans font-medium">
              Custom Cakes • Mumbai
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-[#6B574F]">
          <button
            type="button"
            onClick={() => scrollTo("builder")}
            className="hover:text-[#C86D51] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C86D51] after:transition-all"
          >
            Design in 3D
          </button>
          <button
            type="button"
            onClick={() => scrollTo("occasions")}
            className="hover:text-[#C86D51] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C86D51] after:transition-all"
          >
            Occasions
          </button>
          <button
            type="button"
            onClick={() => scrollTo("process")}
            className="hover:text-[#C86D51] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C86D51] after:transition-all"
          >
            How We Bake
          </button>
          <button
            type="button"
            onClick={() => scrollTo("zones")}
            className="hover:text-[#C86D51] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C86D51] after:transition-all"
          >
            Mumbai Delivery
          </button>
        </nav>

        {/* Right Actions: Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleCart}
            className="relative p-2.5 rounded-full bg-[#F1E8DC] border border-[#C5A059]/40 text-[#2C1E18] hover:border-[#C86D51] hover:text-[#C86D51] transition-all shadow-sm"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C86D51] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-[#F1E8DC] border border-[#C5A059]/30 text-[#2C1E18]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#C5A059]/30 px-6 py-6 space-y-4 shadow-xl">
          <button
            type="button"
            onClick={() => scrollTo("builder")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-[#2C1E18] py-2 border-b border-[#F1E8DC]"
          >
            Design in 3D
          </button>
          <button
            type="button"
            onClick={() => scrollTo("occasions")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-[#2C1E18] py-2 border-b border-[#F1E8DC]"
          >
            Occasions
          </button>
          <button
            type="button"
            onClick={() => scrollTo("process")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-[#2C1E18] py-2 border-b border-[#F1E8DC]"
          >
            How We Bake
          </button>
          <button
            type="button"
            onClick={() => scrollTo("zones")}
            className="block w-full text-left text-sm uppercase tracking-wider font-semibold text-[#2C1E18] py-2"
          >
            Mumbai Delivery
          </button>
        </div>
      )}
    </header>
  );
}
