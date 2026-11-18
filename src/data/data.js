/**
 * Static Data Layer for Cocoa & Cloud Custom Cakes
 * Predefined cake configurations, Mumbai bakery menu, and delivery zones.
 */

export const OCCASIONS_GALLERY = [
  {
    id: "bday-01",
    occasion: "Birthday Special",
    name: "Classic Celebration",
    tagline: "Classic vanilla sponge with strawberry drip, rainbow sprinkles & candles",
    price: 3200,
    config: {
      tiers: 1,
      shape: "Round",
      flavorColor: "#F3E5AB", // Vanilla
      dripColor: "#FF69B4",  // Strawberry Drip
      customText: "Happy Birthday!",
      decorations: ["sprinkles", "candles"],
      weight: 1.5,
    },
    badge: "Most Popular in Mumbai",
    imageAccent: "#F9EDE2",
  },
  {
    id: "anniv-01",
    occasion: "Anniversary Special",
    name: "Red Velvet Heart",
    tagline: "Rich red velvet heart cake with white chocolate drip and sugar roses",
    price: 6800,
    config: {
      tiers: 2,
      shape: "Heart",
      flavorColor: "#8B0000", // Red Velvet
      dripColor: "#FFFFFF",  // White Chocolate
      customText: "Happy Anniversary",
      decorations: ["sugar_roses", "gold_leaf"],
      weight: 3.0,
    },
    badge: "Bestseller for Couples",
    imageAccent: "#F6E3DB",
  },
  {
    id: "wedding-01",
    occasion: "Grand Wedding",
    name: "Grand Tiered White",
    tagline: "Magnificent 3-tier white cream celebration cake with silver pearls",
    price: 12500,
    config: {
      tiers: 3,
      shape: "Round",
      flavorColor: "#FFFAF0", // White Cream
      dripColor: null,
      customText: "Mr. & Mrs.",
      decorations: ["white_fondant_drape", "silver_pearls"],
      weight: 5.0,
    },
    badge: "Wedding Favourite",
    imageAccent: "#EFE8DC",
  },
  {
    id: "noir-01",
    occasion: "Party Special",
    name: "Dark Chocolate Truffle",
    tagline: "Pure Belgian dark chocolate sponge with liquid golden shimmer drip",
    price: 5400,
    config: {
      tiers: 2,
      shape: "Square",
      flavorColor: "#2C1B18", // Dark Chocolate
      dripColor: "#C5A059",  // Gold Drip
      customText: "Congratulations!",
      decorations: ["gold_leaf", "candles"],
      weight: 2.5,
    },
    badge: "Chef's Chocolate Pick",
    imageAccent: "#F1E5D5",
  },
];

export const FLAVOR_PALETTE = [
  {
    id: "vanilla",
    name: "Classic Vanilla",
    hex: "#F3E5AB",
    description: "Soft and fluffy golden sponge infused with natural vanilla cream",
  },
  {
    id: "chocolate",
    name: "Dark Chocolate",
    hex: "#2C1B18",
    description: "Moist chocolate sponge layered with rich dark chocolate ganache",
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    hex: "#8B0000",
    description: "Traditional crimson cocoa cake layered with smooth cream cheese",
  },
  {
    id: "butterscotch",
    name: "Butterscotch Praline",
    hex: "#E5A93C",
    description: "Creamy butterscotch frosting with crunchy caramelized cashew praline",
  },
  {
    id: "pistachio",
    name: "Pistachio Kesar",
    hex: "#8A9A5B",
    description: "Aromatic roasted pistachio sponge infused with subtle saffron cream",
  },
  {
    id: "blueberry",
    name: "Fresh Blueberry",
    hex: "#8B7AA8",
    description: "Light vanilla sponge infused with real wild blueberry compote",
  },
];

export const DRIP_OPTIONS = [
  { id: "none", name: "No Drip", hex: null },
  { id: "dark-choco", name: "Dark Chocolate", hex: "#2C1B18" },
  { id: "strawberry", name: "Strawberry", hex: "#FF69B4" },
  { id: "white-choco", name: "White Chocolate", hex: "#FFFFFF" },
  { id: "gold-shimmer", name: "Golden Shimmer", hex: "#C5A059" },
  { id: "salted-caramel", name: "Butter Caramel", hex: "#C86D51" },
];

export const SHAPE_OPTIONS = [
  { id: "Round", label: "Round Cake", icon: "circle", desc: "Classic round shape" },
  { id: "Square", label: "Square Cake", icon: "square", desc: "Modern square cut" },
  { id: "Heart", label: "Heart Cake", icon: "heart", desc: "Romantic heart shape" },
];

export const DECORATIONS_CATALOG = [
  {
    id: "candles",
    name: "Birthday Candles",
    description: "Set of sparkling golden birthday candles with warm glow",
    price: 300,
    icon: "flame",
  },
  {
    id: "sprinkles",
    name: "Rainbow Sprinkles",
    description: "Colourful crunchy sugar confetti spread over the top",
    price: 250,
    icon: "sparkles",
  },
  {
    id: "sugar_roses",
    name: "Sugar Rose Flowers",
    description: "Handcrafted edible red sugar roses on the cake",
    price: 850,
    icon: "flower",
  },
  {
    id: "gold_leaf",
    name: "24K Edible Gold Leaf",
    description: "Real edible 24K gold foil flakes on the borders",
    price: 1100,
    icon: "gem",
  },
  {
    id: "white_fondant_drape",
    name: "Satin Fondant Ribbon",
    description: "Smooth white fondant ribbon wrapped around the tier",
    price: 950,
    icon: "wind",
  },
  {
    id: "silver_pearls",
    name: "Silver Sugar Balls",
    description: "Shimmering edible silver pearls lining the bottom ring",
    price: 450,
    icon: "circle-dot",
  },
];

export const PROCESS_TIMELINE = [
  {
    step: "01",
    title: "Customize in 3D",
    subtitle: "Select Flavours & Tiers",
    description:
      "Pick your cake size, sponge flavor, chocolate drip, and message right here in interactive 3D.",
    icon: "palette",
  },
  {
    step: "02",
    title: "Freshly Baked in Mumbai",
    subtitle: "Pure Butter & Top Ingredients",
    description:
      "Our chefs bake each cake fresh to order using pure dairy butter, premium cocoa, and zero preservatives.",
    icon: "flame",
  },
  {
    step: "03",
    title: "Refrigerated AC Delivery",
    subtitle: "Safe Mumbai Doorstep Delivery",
    description:
      "Delivered in custom temperature-controlled refrigerated vans across Mumbai to keep your cake 100% fresh.",
    icon: "truck",
  },
];

export const MUMBAI_DELIVERY_ZONES = [
  { zone: "Bandra & Khar West", pin: "400050 / 400052", leadTime: "Same-Day / 3 hrs" },
  { zone: "Juhu & Vile Parle", pin: "400049 / 400056", leadTime: "Same-Day / 3 hrs" },
  { zone: "Lower Parel & Worli", pin: "400013 / 400018", leadTime: "Express Delivery" },
  { zone: "Colaba & Nariman Point", pin: "400005 / 400021", leadTime: "Express Delivery" },
  { zone: "BKC & Santacruz", pin: "400051 / 400054", leadTime: "Same-Day / 3 hrs" },
  { zone: "Powai & Chandivali", pin: "400076 / 400072", leadTime: "Scheduled Delivery" },
  { zone: "Andheri Lokhandwala & Oshiwara", pin: "400053", leadTime: "Express Delivery" },
  { zone: "Chembur & Ghatkopar", pin: "400071 / 400077", leadTime: "Scheduled Delivery" },
];

export const BAKERY_TESTIMONIALS = [
  {
    quote: "The 3D customizer was super easy to use! We ordered the 2-tier chocolate truffle cake for our anniversary in Bandra, and it looked exactly like the 3D model and tasted heavenly.",
    author: "Rohan & Sneha Kapoor",
    event: "Anniversary in Bandra West",
    rating: 5,
  },
  {
    quote: "Best cake in Mumbai! The butterscotch praline flavor was fresh, crunchy, and not overly sweet. Everyone at the party loved the custom birthday plaque.",
    author: "Kavita Shah",
    event: "Birthday Party in Juhu",
    rating: 5,
  },
];
