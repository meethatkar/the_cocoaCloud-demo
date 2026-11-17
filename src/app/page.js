"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OccasionsGallery } from "@/components/OccasionsGallery";
import { CakeBuilderSection } from "@/components/builder/CakeBuilderSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Initialize GSAP scroll animations
  useScrollAnimation();

  return (
    <div className="relative min-h-screen bg-[#0F0D0D] text-[#F5F2EB] flex flex-col overflow-x-hidden">
      {/* 1. Header with transparent-to-solid scroll effect */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Highlight Section (Occasions Gallery) */}
        <OccasionsGallery />

        {/* 4. Main Section: The 3D Custom Cake Builder */}
        <CakeBuilderSection />

        {/* 5. Feedback / Process Timeline Section */}
        <ProcessTimeline />
      </main>

      {/* 6. Footer with Mumbai Delivery Zones */}
      <Footer />

      {/* Global Slide-Out Tasting Box / Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
