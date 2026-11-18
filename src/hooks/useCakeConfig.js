import { useCakeStore } from "@/state/useCakeStore";
import { calculateCakePrice, getWeightRangeForTiers } from "@/services/pricingService";
import { useMemo } from "react";

/**
 * Custom hook providing memoized configuration and price calculations
 */
export function useCakeConfig() {
  const config = useCakeStore((state) => state.config);
  const selectedPresetId = useCakeStore((state) => state.selectedPresetId);
  const setTiers = useCakeStore((state) => state.setTiers);
  const setShape = useCakeStore((state) => state.setShape);
  const setFlavorColor = useCakeStore((state) => state.setFlavorColor);
  const setDripColor = useCakeStore((state) => state.setDripColor);
  const setCardStyle = useCakeStore((state) => state.setCardStyle);
  const setGreetingText = useCakeStore((state) => state.setGreetingText);
  const setPipedMessage = useCakeStore((state) => state.setPipedMessage);
  const setWeight = useCakeStore((state) => state.setWeight);
  const toggleDecoration = useCakeStore((state) => state.toggleDecoration);
  const loadPreset = useCakeStore((state) => state.loadPreset);
  const resetConfig = useCakeStore((state) => state.resetConfig);
  const addToCart = useCakeStore((state) => state.addToCart);

  // Memoize price calculation to eliminate needless computational overhead
  const price = useMemo(() => {
    return calculateCakePrice(config);
  }, [config]);

  // Memoize weight constraints
  const weightRange = useMemo(() => {
    return getWeightRangeForTiers(config.tiers);
  }, [config.tiers]);

  return {
    config,
    selectedPresetId,
    price,
    weightRange,
    setTiers,
    setShape,
    setFlavorColor,
    setDripColor,
    setCardStyle,
    setGreetingText,
    setPipedMessage,
    setWeight,
    toggleDecoration,
    loadPreset,
    resetConfig,
    addToCart,
  };
}

/**
 * Lightweight selector for 3D Canvas only
 */
export function useCanvasConfig() {
  const config = useCakeStore((state) => state.config);
  const autoRotate = useCakeStore((state) => state.autoRotate);
  const viewAngle = useCakeStore((state) => state.viewAngle);
  const setAutoRotate = useCakeStore((state) => state.setAutoRotate);
  const setViewAngle = useCakeStore((state) => state.setViewAngle);

  return {
    config,
    autoRotate,
    viewAngle,
    setAutoRotate,
    setViewAngle,
  };
}

