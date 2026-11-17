"use client";

import React, { memo } from "react";

/**
 * High-end studio lighting setup for luxury confectionery visualization.
 * Uses soft directional shadows, warm ambient bounce, and rim light for glaze reflections.
 */
function StudioLightingComponent() {
  return (
    <>
      {/* Warm ambient base */}
      <ambientLight intensity={0.75} color="#FFF8F0" />

      {/* Key Light: Casts soft realistic bakery studio shadows */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.8}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0001}
      />

      {/* Fill Light: Softens dark crevices without casting harsh secondary shadows */}
      <directionalLight position={[-6, 4, -4]} intensity={0.8} color="#E8EEFF" />

      {/* Rim Light / Backlight: Creates shimmering edge highlight on glaze and gold leaf */}
      <directionalLight position={[0, 6, -6]} intensity={1.2} color="#D4AF37" />

      {/* Subtle bottom bounce simulating marble stand reflection */}
      <pointLight position={[0, -1.5, 2]} intensity={0.4} color="#FFF2DB" />
    </>
  );
}

export const StudioLighting = memo(StudioLightingComponent);

