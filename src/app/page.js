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
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#2C1E18] flex flex-col overflow-x-hidden selection:bg-[#C86D51] selection:text-[#FAF6F0]">
      {/* 1. Header with transparent-to-solid scroll effect */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Highlight Section (Occasions Gallery with Arch-shaped frames) */}
        <OccasionsGallery />

        {/* 4. Main Section: The 3D Custom Cake Builder with Glassmorphic Floating Summary Bar */}
        <CakeBuilderSection />

        {/* 5. Feedback / Process Timeline Section */}
        <ProcessTimeline />
      </main>

      {/* 6. Footer with Mumbai Delivery Zones */}
      <Footer />

      {/* Global Slide-Out Tasting Boîte / Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
