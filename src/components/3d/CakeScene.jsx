"use client";

import React, { memo, useRef, useEffect } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { StudioLighting } from "./StudioLighting";
import { CakeStand } from "./CakeStand";
import { GLBModelWrapper } from "./GLBModelWrapper";
import { useDracoLoader } from "@/hooks/useDracoLoader";

function CakeSceneComponent({ config, autoRotate = true, viewAngle = "front" }) {
  const controlsRef = useRef();
  const { modelAvailable } = useDracoLoader();

  // Adjust camera position when view angle preset changes
  useEffect(() => {
    if (!controlsRef.current) return;

    if (viewAngle === "top") {
      controlsRef.current.setAzimuthalAngle(0);
      controlsRef.current.setPolarAngle(0.2);
    } else if (viewAngle === "isometric") {
      controlsRef.current.setAzimuthalAngle(Math.PI / 4);
      controlsRef.current.setPolarAngle(Math.PI / 3.2);
    } else {
      // front
      controlsRef.current.setAzimuthalAngle(0);
      controlsRef.current.setPolarAngle(Math.PI / 2.3);
    }
  }, [viewAngle]);

  return (
    <>
      {/* Studio Lighting Rig */}
      <StudioLighting />

      {/* Interactive Cake Scene Group */}
      <group position={[0, -0.2, 0]}>
        {/* Luxury Marble Pedestal Stand */}
        <CakeStand />

        {/* Dynamic 3D Cake (GLB Model with Procedural Fallback) */}
        <GLBModelWrapper config={config} modelAvailable={modelAvailable} />

        {/* Soft Realistic Contact Shadows on Ground */}
        <ContactShadows
          position={[0, -0.68, 0]}
          opacity={0.4}
          scale={7}
          blur={1.8}
          far={3.5}
          color="#3A281E"
        />
      </group>

      {/* Camera Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3.8}
        maxDistance={8.5}
        minPolarAngle={Math.PI / 6} // Prevent dipping directly above
        maxPolarAngle={Math.PI / 2.05} // Prevent dipping below ground table
        dampingFactor={0.06}
        autoRotate={autoRotate}
        autoRotateSpeed={1.0}
      />
    </>
  );
}

export const CakeScene = memo(CakeSceneComponent);

