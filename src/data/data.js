/**
 * Static Data Layer for Cocoa & Cloud Luxury Patisserie
 * Predefined cake configurations, bakery menu, process timeline, and Mumbai delivery zones.
 */

export const OCCASIONS_GALLERY = [
  {
    id: "bday-01",
    occasion: "Birthday",
    name: "Classic Celebration",
    tagline: "Golden vanilla sponge with blush strawberry glaze",
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
    badge: "Most Popular",
  },
  {
    id: "anniv-01",
    occasion: "Anniversary",
    name: "Elegant Romance",
    tagline: "Deep red velvet heart adorned with edible 24k gold leaf and roses",
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
    badge: "Romantic Pick",
  },
  {
    id: "wedding-01",
    occasion: "Wedding",
    name: "Grand Tiered White",
    tagline: "Spectacular three-tiered champagne chiffon with handcrafted fondant drapery",
    price: 12500,
    config: {
      tiers: 3,
      shape: "Round",
      flavorColor: "#FFFAF0", // Floral White Ivory
      dripColor: null,       // Clean architectural tiers
      customText: "Mr. & Mrs.",
      decorations: ["white_fondant_drape", "silver_pearls"],
      weight: 5.0,
    },
    badge: "Haute Couture",
  },
  {
    id: "noir-01",
    occasion: "Gala & Soirée",
    name: "Royal Noir Truffle",
    tagline: "70% Single-origin Ecuadorian dark chocolate with gold dust",
    price: 5400,
    config: {
      tiers: 2,
      shape: "Square",
      flavorColor: "#2C1B18", // Dark Truffle
      dripColor: "#D4AF37",  // Liquid Gold Glaze
      customText: "Bonne Fête",
      decorations: ["gold_leaf", "candles"],
      weight: 2.5,
    },
    badge: "Chef's Signature",
  },
];

export const FLAVOR_PALETTE = [
  {
    id: "vanilla-champagne",
    name: "Champagne Vanilla",
    hex: "#F3E5AB",
    description: "Madagascar Bourbon vanilla with subtle notes of elderflower",
    textColor: "#2B1A09",
  },
  {
    id: "dark-cacao",
    name: "Ecuadorian Dark Cacao",
    hex: "#2C1B18",
    description: "70% velvety dark chocolate truffle with roasted hazelnut",
    textColor: "#FFF0D4",
  },
  {
    id: "ruby-red-velvet",
    name: "Royal Red Velvet",
    hex: "#8B0000",
    description: "Rich crimson cocoa cake infused with cream cheese frosting",
    textColor: "#FFFFFF",
  },
  {
    id: "ivory-white",
    name: "Silk Ivory Cream",
    hex: "#FFFAF0",
    description: "Delicate white chocolate mousse with wild orange blossom",
    textColor: "#2B1A09",
  },
  {
    id: "pistachio-matcha",
    name: "Sicilian Pistachio",
    hex: "#8A9A5B",
    description: "Bronte pistachio paste layered with matcha genoise",
    textColor: "#FFFFFF",
  },
  {
    id: "lavender-honey",
    name: "Provence Lavender",
    hex: "#B5A6C9",
    description: "French lavender essence with organic wild honeycomb",
    textColor: "#1F1426",
  },
];

export const DRIP_OPTIONS = [
  { id: "none", name: "No Drip Glaze", hex: null },
  { id: "dark-choco", name: "Dark Chocolate Ganache", hex: "#1C110A" },
  { id: "strawberry", name: "Berry Strawberry Glaze", hex: "#FF69B4" },
  { id: "white-satin", name: "White Satin Ganache", hex: "#FFFFFF" },
  { id: "gold-shimmer", name: "24K Liquid Gold", hex: "#D4AF37" },
  { id: "salted-caramel", name: "Salted Caramel Drip", hex: "#C68B59" },
];

export const SHAPE_OPTIONS = [
  { id: "Round", label: "Classic Round", icon: "circle" },
  { id: "Square", label: "Architectural Square", icon: "square" },
  { id: "Heart", label: "Romantic Heart", icon: "heart" },
];

export const DECORATIONS_CATALOG = [
  {
    id: "candles",
    name: "Golden Candles",
    description: "Artisanal slim candles with dynamic flickering glow",
    price: 300,
    icon: "flame",
  },
  {
    id: "sprinkles",
    name: "Confetti Sprinkles",
    description: "Handcrafted sugar pearls and multi-color dragees",
    price: 250,
    icon: "sparkles",
  },
  {
    id: "sugar_roses",
    name: "Handmade Sugar Roses",
    description: "Petal-by-petal sugar clay roses with organic coloring",
    price: 850,
    icon: "flower",
  },
  {
    id: "gold_leaf",
    name: "24K Edible Gold Leaf",
    description: "Delicate Italian gold leaf foil flakes dusted along edges",
    price: 1100,
    icon: "gem",
  },
  {
    id: "white_fondant_drape",
    name: "Satin Fondant Drape",
    description: "Sculpted edible fabric drapery cascading along tiers",
    price: 950,
    icon: "wind",
  },
  {
    id: "silver_pearls",
    name: "Silver Dragee Pearls",
    description: "French silver dragees framing each tier foundation",
    price: 450,
    icon: "circle-dot",
  },
];

export const PROCESS_TIMELINE = [
  {
    step: "01",
    title: "Bespoke 3D Design",
    subtitle: "Custom Architectural Layout",
    description:
      "Craft your multi-tier masterpiece in real-time 3D. Choose shapes, flavors, luxury glazes, and personalized calligraphy plaques.",
    icon: "palette",
  },
  {
    step: "02",
    title: "Artisanal Baking",
    subtitle: "French Technique, Pure Butter",
    description:
      "Our Le Cordon Bleu trained pastry chefs handcraft every sponge from scratch using pure AOP butter, single-origin cacao, and organic botanicals.",
    icon: "flame",
  },
  {
    step: "03",
    title: "Chilled White-Glove Delivery",
    subtitle: "Specialized Shockproof Transit",
    description:
      "Delivered in custom temperature-controlled refrigerated containers across Mumbai to ensure zero melting and flawless structural perfection.",
    icon: "truck",
  },
];

export const MUMBAI_DELIVERY_ZONES = [
  { zone: "Bandra West & Khar", pin: "400050 / 400052", leadTime: "Same-Day / 4 hrs" },
  { zone: "Juhu & Vile Parle", pin: "400049 / 400056", leadTime: "Same-Day / 4 hrs" },
  { zone: "Lower Parel & Worli", pin: "400013 / 400018", leadTime: "Express Delivery" },
  { zone: "Colaba & Nariman Point", pin: "400005 / 400021", leadTime: "Express Delivery" },
  { zone: "BKC & Santacruz", pin: "400051 / 400054", leadTime: "Same-Day / 3 hrs" },
  { zone: "Powai & Hiranandani", pin: "400076", leadTime: "Scheduled Morning/Eve" },
  { zone: "Andheri Lokhandwala", pin: "400053", leadTime: "Express Delivery" },
  { zone: "Chembur & Ghatkopar", pin: "400071 / 400077", leadTime: "Scheduled Delivery" },
];

export const BAKERY_TESTIMONIALS = [
  {
    quote: "The 3D builder let us preview our 3-tier wedding cake down to the exact satin drape and calligraphy plaque. It arrived in Bandra in museum-grade perfection!",
    author: "Ananya & Rohan Singhania",
    event: "Bespoke Wedding Cake at Taj Lands End",
    rating: 5,
  },
  {
    quote: "The dark cacao flavor with 24k gold leaf was pure decadence. Easily the most stunning birthday cake Mumbai has ever witnessed.",
    author: "Kabir Mehta",
    event: "30th Birthday Gala, Worli",
    rating: 5,
  },
];

