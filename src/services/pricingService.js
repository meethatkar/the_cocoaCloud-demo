import { DECORATIONS_CATALOG } from "@/data/data";

/**
 * Service to calculate real-time pricing for bespoke custom cakes
 */
export function calculateCakePrice(config) {
  if (!config) return 2500;

  const baseRatePerKg = 1800; // Base INR per kg for artisan sponge and fillings
  let total = config.weight * baseRatePerKg;

  // Tier structural support premium
  if (config.tiers === 2) total += 900;
  if (config.tiers === 3) total += 2200;

  // Shape craft complexity
  if (config.shape === "Heart") total += 600;
  if (config.shape === "Square") total += 400;

  // Drip glaze addition
  if (config.dripColor) {
    total += 350;
  }

  // Custom calligraphy inscription card or piped cream
  if (config.greetingText && config.greetingText.trim().length > 0) {
    total += 200;
  }
  if (config.pipedMessage && config.pipedMessage.trim().length > 0) {
    total += 150;
  }

  // Decorations
  if (Array.isArray(config.decorations)) {
    config.decorations.forEach((decId) => {
      const match = DECORATIONS_CATALOG.find((d) => d.id === decId);
      if (match) {
        total += match.price;
      }
    });
  }

  return Math.round(total);
}

/**
 * Compute suggested weight bounds given tier count
 */
export function getWeightRangeForTiers(tiers) {
  switch (tiers) {
    case 1:
      return { min: 1.0, max: 2.5, step: 0.5, default: 1.5 };
    case 2:
      return { min: 2.5, max: 4.5, step: 0.5, default: 3.0 };
    case 3:
      return { min: 4.5, max: 8.0, step: 0.5, default: 5.0 };
    default:
      return { min: 1.0, max: 5.0, step: 0.5, default: 1.5 };
  }
}

