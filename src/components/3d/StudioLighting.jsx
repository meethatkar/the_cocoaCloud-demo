"use client";

import React, { memo } from "react";

/**
 * Parisian Pâtisserie Studio Lighting Rig.
 * Calibrated specifically for custom GLSL subsurface scattering (SSS)
 * and glossy ganache Fresnel highlights.
 */
function StudioLightingComponent() {
  return (
    <>
      {/* Warm ambient base */}
      <ambientLight intensity={0.8} color="#FFF8F0" />

      {/* Key Light: High-precision softbox with realistic soft shadows */}
      <directionalLight
        position={[5.5, 7.5, 4.5]}
        intensity={2.1}
        color="#FFF9F2"
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

      {/* Fill Light: Soft champagne bounce to soften shaded crevices */}
      <directionalLight position={[-5.5, 4.0, -3.5]} intensity={0.75} color="#F1E8DC" />

      {/* Rim Light: Burnished gold backlight grazing icing edges and drips */}
      <directionalLight position={[0, 6.0, -5.5]} intensity={1.35} color="#C5A059" />

      {/* Warm upward bounce from the alabaster pedestal */}
      <pointLight position={[0, -0.8, 1.8]} intensity={0.45} color="#FAF6F0" />
    </>
  );
}

export const StudioLighting = memo(StudioLightingComponent);
