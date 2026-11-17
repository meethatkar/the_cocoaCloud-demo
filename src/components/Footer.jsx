"use client";

import React from "react";
import { MUMBAI_DELIVERY_ZONES } from "@/data/data";
import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="zones"
      className="bg-[#0B0909] border-t border-[#D4AF37]/20 pt-16 pb-12 text-zinc-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mumbai Delivery Network Grid */}
        <div className="mb-14 pb-12 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Chilled White-Glove Logistics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury">
                Active Mumbai Delivery Zones
              </h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Specialized air-suspended refrigerated vans maintain a strict 4°C
              to 7°C climate from our Bandra kitchen to your venue.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MUMBAI_DELIVERY_ZONES.map((zone, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#141010] border border-white/5 hover:border-[#D4AF37]/30 transition-all text-left"
              >
                <div className="text-xs font-bold text-zinc-200 truncate">
                  {zone.zone}
                </div>
                <div className="text-[11px] font-mono text-[#D4AF37] mt-0.5">
                  PIN: {zone.pin}
                </div>
                <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{zone.leadTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bakery Overview Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-xs">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-base font-bold text-white font-serif-luxury tracking-wider">
                COCOA & CLOUD
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Bespoke confectionery architecture. Blending modern 3D CAD
              visualization with classical French pastry craftsmanship.
            </p>
            <div className="text-[11px] text-[#D4AF37]">
              FSSAI Lic. No: 11523998000451
            </div>
          </div>

          {/* Kitchen Studio Address */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Atelier & Flagship Studio
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>
                Studio 4B, Pali Hill Heritage Lane, <br />
                Near Union Park, Bandra West, <br />
                Mumbai, Maharashtra 400050
              </span>
            </div>
          </div>

          {/* Hours & Enquiries */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Tasting Consultations
            </h4>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Tuesday – Sunday: 10:00 AM – 8:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span className="font-mono">+91 (022) 2640-COCOA</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>concierge@cocoacloudbakery.com</span>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Artisanal Standards
            </h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li>• Pure Belgian Callebaut & Valrhona Cacao</li>
              <li>• Certified 24K Edible Gold Leaf</li>
              <li>• AOP Charentes-Poitou Butter</li>
              <li>• Zero Artificial Preservatives or Emulsifiers</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <div>
            © 2026 Cocoa & Cloud Luxury Patisserie Private Limited. All rights
            reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Charter
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Haute Service
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Draco 3D License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
