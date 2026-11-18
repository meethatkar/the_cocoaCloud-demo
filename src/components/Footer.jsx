"use client";

import React from "react";
import { MUMBAI_DELIVERY_ZONES } from "@/data/data";
import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer id="zones" className="bg-[#F1E8DC]/90 border-t border-[#C5A059]/35 pt-16 pb-12 text-[#6B574F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mumbai Delivery Network Grid */}
        <div className="mb-14 pb-12 border-b border-[#C5A059]/25">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C86D51] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Chilled White-Glove Fleet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#2C1E18] font-serif-editorial">
                Active Mumbai Delivery Zones
              </h3>
            </div>
            <p className="text-xs text-[#6B574F] max-w-md">
              Custom air-suspended refrigerated vans maintain a strict 4°C to 7°C climate from our Bandra atelier to your celebration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MUMBAI_DELIVERY_ZONES.map((zone, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 hover:border-[#C86D51]/50 transition-all text-left shadow-xs"
              >
                <div className="text-xs font-bold text-[#2C1E18] truncate font-serif-editorial">
                  {zone.zone}
                </div>
                <div className="text-[11px] font-mono text-[#C86D51] mt-0.5">
                  PIN: {zone.pin}
                </div>
                <div className="text-[10px] text-[#6B574F] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
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
              <div className="w-8 h-8 rounded-full bg-white border border-[#C5A059]/40 flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-[#C86D51]" />
              </div>
              <span className="text-lg font-bold text-[#2C1E18] font-serif-editorial tracking-tight">
                Cocoa & Cloud
              </span>
            </div>
            <p className="text-[#6B574F] leading-relaxed">
              Haute pâtisserie & architectural confection. Harmonizing Parisian boutique traditions with real-time 3D CAD visualization.
            </p>
            <div className="text-[11px] text-[#C86D51] font-medium">
              FSSAI Lic. No: 11523998000451
            </div>
          </div>

          {/* Kitchen Studio Address */}
          <div className="space-y-3">
            <h4 className="text-[#2C1E18] font-semibold uppercase tracking-wider text-[11px]">
              Atelier & Flagship Studio
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C86D51] flex-shrink-0 mt-0.5" />
              <span>
                Studio 4B, Pali Hill Heritage Lane, <br />
                Near Union Park, Bandra West, <br />
                Mumbai, Maharashtra 400050
              </span>
            </div>
          </div>

          {/* Hours & Enquiries */}
          <div className="space-y-3">
            <h4 className="text-[#2C1E18] font-semibold uppercase tracking-wider text-[11px]">
              Tasting Consultations
            </h4>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C86D51] flex-shrink-0" />
              <span>Tuesday – Sunday: 10:00 AM – 8:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C86D51] flex-shrink-0" />
              <span className="font-mono">+91 (022) 2640-COCOA</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C86D51] flex-shrink-0" />
              <span>concierge@cocoacloudbakery.com</span>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="space-y-3">
            <h4 className="text-[#2C1E18] font-semibold uppercase tracking-wider text-[11px]">
              Artisanal Standards
            </h4>
            <ul className="space-y-1.5 text-[#6B574F]">
              <li>• Pure Valrhona & Belgian Cacao Grand Cru</li>
              <li>• Certified 24K Edible Burnished Gold Leaf</li>
              <li>• French AOP Charentes-Poitou Butter</li>
              <li>• Zero Artificial Emulsifiers or Preservatives</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B574F] gap-4">
          <div>
            © 2026 Cocoa & Cloud Luxury Patisserie Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#2C1E18] transition-colors">Charte de Confidentialité</a>
            <a href="#" className="hover:text-[#2C1E18] transition-colors">Haute Service Terms</a>
            <a href="#" className="hover:text-[#2C1E18] transition-colors">Draco 3D License</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
