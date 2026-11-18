/**
 * Static Data Layer for Cocoa & Cloud Parisian Patisserie
 * Predefined cake configurations, Parisian menu, process timeline, and Mumbai delivery zones.
 */

export const OCCASIONS_GALLERY = [
  {
    id: "bday-01",
    occasion: "Anniversaire",
    name: "Classic Celebration",
    tagline: "Golden Tahitian vanilla sponge with blush strawberry coulis & macarons",
    price: 3200,
    config: {
      tiers: 1,
      shape: "Round",
      flavorColor: "#F3E5AB", // Warm Vanilla
      dripColor: "#FF69B4",  // Strawberry Pink Drip
      customText: "Happy Birthday!",
      decorations: ["sprinkles", "candles"],
      weight: 1.5,
    },
    badge: "Boutique Favorite",
    imageAccent: "#F9EDE2",
  },
  {
    id: "anniv-01",
    occasion: "Romance & Fête",
    name: "Elegant Romance",
    tagline: "Velvety crimson heart adorned with delicate sugar florals and burnished gold leaf",
    price: 6800,
    config: {
      tiers: 2,
      shape: "Heart",
      flavorColor: "#8B0000", // Deep Red Velvet
      dripColor: "#FFFFFF",  // White Satin Ganache
      customText: "Happy Anniversary",
      decorations: ["sugar_roses", "gold_leaf"],
      weight: 3.0,
    },
    badge: "Haute Romance",
    imageAccent: "#F6E3DB",
  },
  {
    id: "wedding-01",
    occasion: "Mariage & Gala",
    name: "Grand Tiered White",
    tagline: "Architectural 3-tier champagne genoise with sculpted silk fondant drapery",
    price: 12500,
    config: {
      tiers: 3,
      shape: "Round",
      flavorColor: "#FFFAF0", // Ivory Chiffon
      dripColor: null,
      customText: "Mr. & Mrs.",
      decorations: ["white_fondant_drape", "silver_pearls"],
      weight: 5.0,
    },
    badge: "Couture Wedding",
    imageAccent: "#EFE8DC",
  },
  {
    id: "noir-01",
    occasion: "Soirée Prestige",
    name: "Royal Noir Truffle",
    tagline: "Valrhona 72% dark chocolate ganache layered with hazelnut praliné and burnished gold",
    price: 5400,
    config: {
      tiers: 2,
      shape: "Square",
      flavorColor: "#2C1B18", // Dark Truffle
      dripColor: "#C5A059",  // Burnished Liquid Gold
      customText: "Bonne Fête",
      decorations: ["gold_leaf", "candles"],
      weight: 2.5,
    },
    badge: "Chef's Atelier",
    imageAccent: "#F1E5D5",
  },
];

export const FLAVOR_PALETTE = [
  {
    id: "vanilla-champagne",
    name: "Tahitian Vanilla & Elderflower",
    hex: "#F3E5AB",
    description: "Pure Tahitian vanilla bean chiffon with delicate elderflower syrup",
  },
  {
    id: "dark-cacao",
    name: "Valrhona Noir Truffle",
    hex: "#2C1B18",
    description: "72% Grand Cru dark chocolate ganache with fleur de sel caramel",
  },
  {
    id: "ruby-red-velvet",
    name: "Crimson Framboise Velvet",
    hex: "#8B0000",
    description: "Velvety cacao sponge infused with raspberry coulis & crème fraîche",
  },
  {
    id: "ivory-white",
    name: "Alabaster Crème Chiffon",
    hex: "#FFFAF0",
    description: "Silky white chocolate mousse layered with wild orange blossom water",
  },
  {
    id: "pistachio-matcha",
    name: "Bronte Pistachio & Praliné",
    hex: "#8A9A5B",
    description: "Sicilian green pistachio dacquoise with roasted hazelnut crunch",
  },
  {
    id: "lavender-honey",
    name: "Provence Lavender & Honey",
    hex: "#B5A6C9",
    description: "Organic French lavender petals infused into alpine wild honeycomb",
  },
];

export const DRIP_OPTIONS = [
  { id: "none", name: "No Drip Glaze", hex: null },
  { id: "dark-choco", name: "Valrhona Dark Ganache", hex: "#2C1B18" },
  { id: "strawberry", name: "Framboise Rose Glaze", hex: "#FF69B4" },
  { id: "white-satin", name: "White Satin Ganache", hex: "#FFFFFF" },
  { id: "gold-shimmer", name: "Burnished Liquid Gold", hex: "#C5A059" },
  { id: "salted-caramel", name: "Salted Butter Caramel", hex: "#C86D51" },
];

export const SHAPE_OPTIONS = [
  { id: "Round", label: "Classic Round", icon: "circle", desc: "Timeless Parisian silhouette" },
  { id: "Square", label: "Architectural Square", icon: "square", desc: "Contemporary Haussmannian edges" },
  { id: "Heart", label: "Romantic Heart", icon: "heart", desc: "Sculpted French romance" },
];

export const DECORATIONS_CATALOG = [
  {
    id: "candles",
    name: "Artisanal Wax Candles",
    description: "Slim burnished wax tapers with gentle flickering warmth",
    price: 300,
    icon: "flame",
  },
  {
    id: "sprinkles",
    name: "Pastel Sugar Pearls",
    description: "Handcrafted Parisian dragees in rose, cream & lavender",
    price: 250,
    icon: "sparkles",
  },
  {
    id: "sugar_roses",
    name: "Delicate Sugar Florals",
    description: "Handcrafted garden roses sculpted petal by petal",
    price: 850,
    icon: "flower",
  },
  {
    id: "gold_leaf",
    name: "Burnished 24K Gold Leaf",
    description: "Italian edible gold leaf delicately hand-dusted on borders",
    price: 1100,
    icon: "gem",
  },
  {
    id: "white_fondant_drape",
    name: "Satin Silk Fondant Drape",
    description: "Edible sugar fabric drapery cascading along tiers",
    price: 950,
    icon: "wind",
  },
  {
    id: "silver_pearls",
    name: "French Silver Dragees",
    description: "Shimmering sugar pearls framing each tier foundation",
    price: 450,
    icon: "circle-dot",
  },
];

export const PROCESS_TIMELINE = [
  {
    step: "01",
    title: "Atelier 3D Conception",
    subtitle: "Custom Architectural Layout",
    description:
      "Sculpt your celebratory cake in real-time 3D. Harmonize shapes, French ganache glazes, and personalized calligraphy plaques.",
    icon: "palette",
  },
  {
    step: "02",
    title: "Pâtisserie Handcrafting",
    subtitle: "Pure AOP Butter & Grand Cru Cacao",
    description:
      "Le Cordon Bleu certified pastry chefs bake and sculpt every tier from scratch using cultured butter, Valrhona cacao, and fresh botanical essences.",
    icon: "flame",
  },
  {
    step: "03",
    title: "Chilled White-Glove Delivery",
    subtitle: "Climate-Controlled Mumbai Fleet",
    description:
      "Handled with care in specialized temperature-controlled (4°C - 7°C) refrigerated transit across Mumbai to ensure museum-grade perfection.",
    icon: "truck",
  },
];

export const MUMBAI_DELIVERY_ZONES = [
  { zone: "Bandra West & Khar", pin: "400050 / 400052", leadTime: "Same-Day / 3 hrs" },
  { zone: "Juhu & Vile Parle", pin: "400049 / 400056", leadTime: "Same-Day / 3 hrs" },
  { zone: "Lower Parel & Worli", pin: "400013 / 400018", leadTime: "Express Delivery" },
  { zone: "Colaba & Nariman Point", pin: "400005 / 400021", leadTime: "Express Delivery" },
  { zone: "BKC & Santacruz", pin: "400051 / 400054", leadTime: "Same-Day / 3 hrs" },
  { zone: "Powai & Hiranandani", pin: "400076", leadTime: "Scheduled Delivery" },
  { zone: "Andheri Lokhandwala", pin: "400053", leadTime: "Express Delivery" },
  { zone: "Chembur & Ghatkopar", pin: "400071 / 400077", leadTime: "Scheduled Delivery" },
];

export const BAKERY_TESTIMONIALS = [
  {
    quote: "The 3D builder let us visualize our two-tiered heart anniversary cake down to the exact sugar florals and calligraphy. Arrived in Bandra like an edible sculpture from a Rue Saint-Honoré boutique.",
    author: "Camille & Vikram Oberoi",
    event: "Anniversary Celebration, Taj Mahal Palace",
    rating: 5,
  },
  {
    quote: "The Valrhona chocolate with burnished gold leaf was pure decadence. The tactile Parisian aesthetic of Cocoa & Cloud made ordering feel so intimate and luxurious.",
    author: "Zoya Merchant",
    event: "Soirée Privée, Worli Sea Face",
    rating: 5,
  },
];
