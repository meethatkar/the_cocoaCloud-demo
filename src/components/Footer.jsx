"use client";

import React from "react";
import { MUMBAI_DELIVERY_ZONES } from "@/data/data";
import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer id="zones" className="bg-[#F1E8DC]/90 border-t border-[#C5A059]/35 pt-16 2xl:pt-24 pb-12 2xl:pb-16 text-[#6B574F]">
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Mumbai Delivery Network Grid */}
        <div className="mb-14 2xl:mb-20 pb-12 2xl:pb-16 border-b border-[#C5A059]/25">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 2xl:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs 2xl:text-sm font-semibold uppercase tracking-widest text-[#C86D51] mb-2">
                <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                <span>Chilled White-Glove Fleet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#2C1E18] font-serif-editorial">
                Active Mumbai Delivery Zones
              </h3>
            </div>
            <p className="text-xs 2xl:text-sm text-[#6B574F] max-w-md 2xl:max-w-lg">
              Custom air-suspended refrigerated vans maintain a strict 4°C to 7°C climate from our Bandra atelier to your celebration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-6">
            {MUMBAI_DELIVERY_ZONES.map((zone, idx) => (
              <div
                key={idx}
                className="p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl bg-[#FAF6F0] border border-[#C5A059]/30 hover:border-[#C86D51]/50 transition-all text-left shadow-xs"
              >
                <div className="text-xs 2xl:text-base font-bold text-[#2C1E18] truncate font-serif-editorial">
                  {zone.zone}
                </div>
                <div className="text-[11px] 2xl:text-sm font-mono text-[#C86D51] mt-0.5">
                  PIN: {zone.pin}
                </div>
                <div className="text-[10px] 2xl:text-xs text-[#6B574F] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-emerald-600" />
                  <span>{zone.leadTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bakery Overview Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 2xl:gap-16 mb-12 2xl:mb-16 text-xs 2xl:text-sm">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-white border border-[#C5A059]/40 flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C86D51]" />
              </div>
              <span className="text-lg 2xl:text-2xl font-bold text-[#2C1E18] font-serif-editorial tracking-tight">
                Cocoa & Cloud
              </span>
            </div>
            <p className="text-[#6B574F] leading-relaxed 2xl:text-base">
              Haute pâtisserie & architectural confection. Harmonizing Parisian boutique traditions with real-time 3D CAD visualization.
            </p>
            <div className="text-[11px] 2xl:text-xs text-[#C86D51] font-medium">
              FSSAI Lic. No: 11523998000451
            </div>
          </div>

          {/* Kitchen Studio Address */}
          <div className="space-y-3">
            <h4 className="text-[#2C1E18] font-semibold uppercase tracking-wider text-[11px] 2xl:text-xs">
              Atelier & Flagship Studio
            </h4>
            <div className="flex items-start gap-2 2xl:text-sm">
              <MapPin className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C86D51] flex-shrink-0 mt-0.5" />
              <span>
                Studio 4B, Pali Hill Heritage Lane, <br />
                Near Union Park, Bandra West, <br />
                Mumbai, Maharashtra 400050
              </span>
            </div>
          </div>

          {/* Hours & Enquiries */}
          <div className="space-y-3">
            <h4 className="text-[#2C1E18] font-semibold uppercase tracking-wider text-[11px] 2xl:text-xs">
              Tasting Consultations
            </h4>
            <div className="flex items-center gap-2 2xl:text-sm">
              <Clock className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C86D51] flex-shrink-0" />
              <span>Tuesday – Sunday: 10:00 AM – 8:30 PM</span>
            </div>
            <div className="flex items-center gap-2 2xl:text-sm">
              <Phone className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C86D51] flex-shrink-0" />
              <span className="font-mono">+91 (022) 2640-COCOA</span>
            </div>
            <div className="flex items-center gap-2 2xl:text-sm">
              <Mail className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C86D51] flex-shrink-0" />
              <span>concierge@cocoacloudbakery.com</span>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="space-y-3">
            <h4 className="text-[#2C1E18] font-semibold uppercase tracking-wider text-[11px] 2xl:text-xs">
              Artisanal Standards
            </h4>
            <ul className="space-y-1.5 text-[#6B574F] 2xl:text-sm">
              <li>• Pure Valrhona & Belgian Cacao Grand Cru</li>
              <li>• Certified 24K Edible Burnished Gold Leaf</li>
              <li>• French AOP Charentes-Poitou Butter</li>
              <li>• Zero Artificial Emulsifiers or Preservatives</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 2xl:pt-10 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] 2xl:text-sm text-[#6B574F] gap-4">
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
