import { create } from "zustand";
import { OCCASIONS_GALLERY } from "@/data/data";
import {
  calculateCakePrice,
  getWeightRangeForTiers,
} from "@/services/pricingService";

const initialConfig = {
  tiers: 1,
  shape: "Round",
  flavorColor: "#F3E5AB",
  dripColor: "#FF69B4",
  customText: "Happy Birthday!",
  decorations: ["sprinkles", "candles"],
  weight: 1.5,
};

export const useCakeStore = create((set, get) => ({
  // Core Configuration State
  config: { ...initialConfig },
  selectedPresetId: "bday-01",

  // Camera & Viewer preferences
  autoRotate: true,
  viewAngle: "front", // 'front' | 'top' | 'isometric'

  // Cart & Order State
  cart: [],
  isCartOpen: false,

  // Setters & Actions
  setTiers: (tiers) => {
    const validTiers = Math.min(3, Math.max(1, Number(tiers)));
    const { min, max, default: defWeight } = getWeightRangeForTiers(validTiers);
    const currentWeight = get().config.weight;
    const adjustedWeight =
      currentWeight < min || currentWeight > max ? defWeight : currentWeight;

    set((state) => ({
      config: {
        ...state.config,
        tiers: validTiers,
        weight: adjustedWeight,
      },
      selectedPresetId: null,
    }));
  },

  setShape: (shape) => {
    set((state) => {
      let updatedDecorations = state.config.decorations || [];
      // Ribbon is not supported on Heart shape
      if (shape === "Heart") {
        updatedDecorations = updatedDecorations.filter(
          (id) => id !== "white_fondant_drape"
        );
      }
      return {
        config: { ...state.config, shape, decorations: updatedDecorations },
        selectedPresetId: null,
      };
    });
  },

  setFlavorColor: (flavorColor) => {
    set((state) => ({
      config: { ...state.config, flavorColor },
      selectedPresetId: null,
    }));
  },

  setDripColor: (dripColor) => {
    set((state) => ({
      config: { ...state.config, dripColor },
      selectedPresetId: null,
    }));
  },

  setCustomText: (customText) => {
    set((state) => ({
      config: { ...state.config, customText },
      selectedPresetId: null,
    }));
  },

  setWeight: (weight) => {
    set((state) => ({
      config: { ...state.config, weight: Number(weight) },
      selectedPresetId: null,
    }));
  },

  toggleDecoration: (decorationId) => {
    set((state) => {
      // Ribbon addon is disabled for Heart shape
      if (decorationId === "white_fondant_drape" && state.config.shape === "Heart") {
        return state;
      }
      const current = state.config.decorations || [];
      const exists = current.includes(decorationId);
      const updated = exists
        ? current.filter((id) => id !== decorationId)
        : [...current, decorationId];

      return {
        config: { ...state.config, decorations: updated },
        selectedPresetId: null,
      };
    });
  },

  // Load Predefined Occasion Preset
  loadPreset: (presetId) => {
    const found = OCCASIONS_GALLERY.find((p) => p.id === presetId);
    if (found) {
      set({
        config: { ...found.config },
        selectedPresetId: presetId,
      });
    }
  },

  // Reset to default
  resetConfig: () => {
    set({
      config: { ...initialConfig },
      selectedPresetId: "bday-01",
    });
  },

  // Viewer controls
  setAutoRotate: (val) => set({ autoRotate: val }),
  setViewAngle: (val) => set({ viewAngle: val }),

  // Cart operations
  addToCart: () => {
    const state = get();
    const price = calculateCakePrice(state.config);
    const item = {
      id: "cake-" + Date.now(),
      config: { ...state.config },
      price,
      name: state.selectedPresetId
        ? OCCASIONS_GALLERY.find((p) => p.id === state.selectedPresetId)
            ?.name || "Bespoke Cake"
        : "Bespoke Cake",
      timestamp: new Date().toISOString(),
    };

    set((s) => ({
      cart: [item, ...s.cart],
      isCartOpen: true,
    }));

    return item;
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== itemId),
    }));
  },

  toggleCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }));
  },
  setIsCartOpen: (open) => set({ isCartOpen: open }),
}));
