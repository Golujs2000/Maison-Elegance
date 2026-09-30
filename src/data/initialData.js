// Initial curated luxury furniture data
export const INITIAL_CATEGORIES = [
  {
    id: "cat-living",
    name: "Living Room",
    slug: "living-room",
    description: "Architectural silhouettes and plush comfort crafted for conversational living.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    productCount: 4
  },
  {
    id: "cat-dining",
    name: "Dining & Entertaining",
    slug: "dining",
    description: "Solid oak and marble dining centerpieces meant for gathering and celebration.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
    productCount: 3
  },
  {
    id: "cat-bedroom",
    name: "Bedroom Suites",
    slug: "bedroom",
    description: "Sanctuaries of serene indulgence with bouclé upholstery and canaletto walnut.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    productCount: 3
  },
  {
    id: "cat-office",
    name: "Executive Office",
    slug: "office",
    description: "Distinguished desks and ergonomic armchairs tailored for inspired productivity.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
    productCount: 2
  },
  {
    id: "cat-lighting",
    name: "Lighting & Decor",
    slug: "lighting-decor",
    description: "Sculptural brass sconces, alabaster pendants, and bespoke ceramic artifacts.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80",
    productCount: 2
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Aurelia Bouclé Curved Sectional",
    slug: "aurelia-boucle-curved-sectional",
    sku: "ME-SEC-001",
    description: "The Aurelia Curved Sectional embraces organic flowing curves upholstered in cloud-like Italian wool bouclé. Supported by recessed matte brass plinths, its expansive seating offers an inviting, sculptured presence that transforms the contemporary living salon.",
    price: 185000,
    discountPrice: 169000,
    category: "living-room",
    categoryName: "Living Room",
    material: "Italian Wool Bouclé, FSC-certified Solid Ash, Brushed Brass Plinth",
    dimensions: "320 cm W × 165 cm D × 74 cm H",
    weight: "88 kg",
    warranty: "5-Year Structural Frame & Cushion Core Warranty",
    careInstructions: "Professional dry clean only. Rotate cushions periodically. Blot spills immediately with clean dry cotton cloth.",
    stock: 7,
    lowStockThreshold: 3,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      },
      {
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        source: "url"
      }
    ],
    variants: [
      { color: "Alabaster Cream", colorHex: "#F2EFE9", size: "3-Piece Right Facing", priceAdjustment: 0 },
      { color: "Oatmeal Beige", colorHex: "#D8CFBC", size: "3-Piece Right Facing", priceAdjustment: 5000 },
      { color: "Charcoal Slate", colorHex: "#393836", size: "4-Piece Grand Sectional", priceAdjustment: 24000 }
    ],
    tags: ["best-seller", "new-arrival"],
    isFeatured: true,
    status: "active",
    sortOrder: 1,
    createdAt: "2026-03-01T10:00:00.000Z"
  },
  {
    id: "prod-2",
    name: "Solano Carrara Marble Dining Table",
    slug: "solano-carrara-marble-dining-table",
    sku: "ME-DIN-002",
    description: "Carved from a singular slab of honed Italian Carrara marble with distinctive grey-veining patterns, the Solano Dining Table balances massive presence upon two fluted solid white oak pedestal columns.",
    price: 142000,
    discountPrice: 129000,
    category: "dining",
    categoryName: "Dining & Entertaining",
    material: "Honed Italian Carrara Marble, Quarter-Sawn White Oak",
    dimensions: "240 cm L × 105 cm W × 76 cm H (Seats 8-10)",
    weight: "145 kg",
    warranty: "10-Year Craftsmanship Guarantee against stone delamination",
    careInstructions: "Sealed with food-safe stone protector. Clean with pH-neutral stone soap. Always use coasters and trivets for hot items.",
    stock: 4,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Carrara White & Natural Oak", colorHex: "#EFECE8", size: "240 cm (Seats 8)", priceAdjustment: 0 },
      { color: "Nero Marquina & Smoked Oak", colorHex: "#2B2A29", size: "280 cm (Seats 10)", priceAdjustment: 32000 }
    ],
    tags: ["best-seller", "trending"],
    isFeatured: true,
    status: "active",
    sortOrder: 2,
    createdAt: "2026-03-05T10:00:00.000Z"
  },
  {
    id: "prod-3",
    name: "Belgravia Fluted Velvet Lounge Chair",
    slug: "belgravia-fluted-velvet-lounge-chair",
    sku: "ME-ARM-003",
    description: "The Belgravia Lounge Chair combines mid-century French geometry with opulent vertical channels. Finished in liquid-resistant cotton velvet on sculpted brushed champagne legs.",
    price: 48000,
    discountPrice: 42500,
    category: "living-room",
    categoryName: "Living Room",
    material: "Belgian Cotton Velvet, High-Resilience Dunlop Foam, Warm Brass Hardware",
    dimensions: "84 cm W × 88 cm D × 78 cm H",
    weight: "24 kg",
    warranty: "3-Year Upholstery and Frame Guarantee",
    careInstructions: "Gently brush velvet pile in natural direction with a soft bristle brush. Professional spot clean.",
    stock: 2,
    lowStockThreshold: 5,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Deep Olive Velvet", colorHex: "#414833", size: "Standard", priceAdjustment: 0 },
      { color: "Tuscan Terracotta", colorHex: "#A44A3F", size: "Standard", priceAdjustment: 0 },
      { color: "Champagne Pearl", colorHex: "#E7DEC8", size: "Standard", priceAdjustment: 2000 }
    ],
    tags: ["sale", "limited-edition"],
    isFeatured: true,
    status: "active",
    sortOrder: 3,
    createdAt: "2026-03-08T10:00:00.000Z"
  },
  {
    id: "prod-4",
    name: "Kyoto Low-Platform Oak Bed Suite",
    slug: "kyoto-low-platform-oak-bed-suite",
    sku: "ME-BED-004",
    description: "Drawing inspiration from Japanese minimalist ryokans, the Kyoto Platform Bed showcases continuous dovetail joinery in American white oak with floating cantilevered bedside nightstands.",
    price: 135000,
    discountPrice: null,
    category: "bedroom",
    categoryName: "Bedroom Suites",
    material: "Quarter-Sawn American White Oak, Natural Matte Hardwax Finish",
    dimensions: "215 cm W × 225 cm L × 82 cm H (Headboard)",
    weight: "92 kg",
    warranty: "15-Year Solid Wood Joinery Warranty",
    careInstructions: "Wipe with damp microfiber cloth. Re-apply natural wood wax annually to retain silky sheen.",
    stock: 6,
    lowStockThreshold: 3,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Natural Muted Oak", colorHex: "#D9C9A8", size: "King (76x80 in)", priceAdjustment: 0 },
      { color: "Smoked Espresso Oak", colorHex: "#372F29", size: "King (76x80 in)", priceAdjustment: 8000 },
      { color: "Natural Muted Oak", colorHex: "#D9C9A8", size: "Super King (84x84 in)", priceAdjustment: 15000 }
    ],
    tags: ["new-arrival"],
    isFeatured: true,
    status: "active",
    sortOrder: 4,
    createdAt: "2026-03-10T10:00:00.000Z"
  },
  {
    id: "prod-5",
    name: "Sovereign Executive Walnut Writing Desk",
    slug: "sovereign-executive-walnut-writing-desk",
    sku: "ME-DSK-005",
    description: "Designed for distinguished workspaces, the Sovereign Desk is handcrafted from matched French walnut burls with hand-stitched saddle leather writing pad and concealed wire routing bays.",
    price: 112000,
    discountPrice: 98000,
    category: "office",
    categoryName: "Executive Office",
    material: "Solid French Walnut, Full Grain Saddle Leather, Antique Brass Pulls",
    dimensions: "180 cm W × 85 cm D × 76 cm H",
    weight: "74 kg",
    warranty: "7-Year Warranty on wood construction and metal runners",
    careInstructions: "Treat leather insert with neutral leather cream. Keep away from humidifiers and direct radiant heaters.",
    stock: 1,
    lowStockThreshold: 3,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      }
    ],
    variants: [
      { color: "Walnut & Cognac Leather", colorHex: "#5B3826", size: "180 cm", priceAdjustment: 0 },
      { color: "Ebonized Ash & Black Leather", colorHex: "#1E1E1E", size: "180 cm", priceAdjustment: 5000 }
    ],
    tags: ["best-seller"],
    isFeatured: false,
    status: "active",
    sortOrder: 5,
    createdAt: "2026-03-12T10:00:00.000Z"
  },
  {
    id: "prod-6",
    name: "Nuvola Sculptural Travertine Coffee Table",
    slug: "nuvola-sculptural-travertine-coffee-table",
    sku: "ME-TBL-006",
    description: "A testament to tectonic harmony, Nuvola features two asymmetrical honed Roman travertine elements interlocking to form an organic centerpiece for elevated lounging spaces.",
    price: 64000,
    discountPrice: 56000,
    category: "living-room",
    categoryName: "Living Room",
    material: "Unfilled Honed Roman Travertine Stone",
    dimensions: "130 cm L × 80 cm W × 36 cm H",
    weight: "65 kg",
    warranty: "5-Year Natural Stone Stability Guarantee",
    careInstructions: "Dust regularly. Wipe spills immediately. Avoid acidic liquids like citrus juice or wine directly on stone.",
    stock: 5,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Roman Beige Travertine", colorHex: "#D8CCA8", size: "Standard (130cm)", priceAdjustment: 0 }
    ],
    tags: ["trending", "new-arrival"],
    isFeatured: true,
    status: "active",
    sortOrder: 6,
    createdAt: "2026-03-14T10:00:00.000Z"
  },
  {
    id: "prod-7",
    name: "Lumière Brass & Alabaster Pendant Chandelier",
    slug: "lumiere-brass-alabaster-pendant-chandelier",
    sku: "ME-LGT-007",
    description: "Suspended spheres of hand-turned Spanish alabaster cast a diffuse, amber glow. Articulated arms in spun solid brass create a balanced mobile sculpture above dining tables or foyers.",
    price: 52000,
    discountPrice: 47000,
    category: "lighting-decor",
    categoryName: "Lighting & Decor",
    material: "Spanish White Alabaster, Solid Spun Brass, Warm LED 2700K Dimmable",
    dimensions: "110 cm Diameter × 80 cm Drop (Adjustable Stem to 160 cm)",
    weight: "14 kg",
    warranty: "3-Year Complete Electrical & Finish Warranty",
    careInstructions: "Wipe brass with dry microfiber only. Never use chemical brass cleaners on lacquered surfaces.",
    stock: 8,
    lowStockThreshold: 3,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      }
    ],
    variants: [
      { color: "Antiqued Warm Brass", colorHex: "#C49A45", size: "5-Globe Cluster", priceAdjustment: 0 },
      { color: "Burnished Bronze", colorHex: "#4C3829", size: "5-Globe Cluster", priceAdjustment: 3000 }
    ],
    tags: ["new-arrival"],
    isFeatured: false,
    status: "active",
    sortOrder: 7,
    createdAt: "2026-03-15T10:00:00.000Z"
  },
  {
    id: "prod-8",
    name: "Monolith Cane & Ash Credenza",
    slug: "monolith-cane-and-ash-credenza",
    sku: "ME-STG-008",
    description: "A sideboard celebrated for its architectural balance, featuring woven rattan cane sliding panels set inside an ebonized ash case with push-to-open soft-close Blum hardware.",
    price: 89000,
    discountPrice: null,
    category: "dining",
    categoryName: "Dining & Entertaining",
    material: "FSC Ash Wood, Natural Hand-woven Rattan Cane, Brushed Brass Base",
    dimensions: "195 cm W × 48 cm D × 78 cm H",
    weight: "62 kg",
    warranty: "5-Year Cabinetry Mechanism Guarantee",
    careInstructions: "Dust cane with soft brush attachment on low vacuum setting.",
    stock: 0,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      }
    ],
    variants: [
      { color: "Ebonized Ash & Natural Cane", colorHex: "#222120", size: "195 cm", priceAdjustment: 0 },
      { color: "Bleached Ash & Natural Cane", colorHex: "#D8CEBE", size: "195 cm", priceAdjustment: 0 }
    ],
    tags: ["limited-edition"],
    isFeatured: false,
    status: "active",
    sortOrder: 8,
    createdAt: "2026-03-18T10:00:00.000Z"
  },
  {
    id: "prod-9",
    name: "Verona Fluted Walnut Round Dining Table",
    slug: "verona-fluted-walnut-round-dining-table",
    sku: "ME-TBL-009",
    description: "The Verona Dining Table celebrates convivial dining with a hand-matched sunburst Canaletto walnut top resting upon a monolithic fluted pedestal base trimmed with recessed brushed champagne brass.",
    price: 118000,
    discountPrice: 104000,
    category: "dining",
    categoryName: "Dining & Entertaining",
    material: "Solid American Canaletto Walnut, Champagne Brass Plinth Ring",
    dimensions: "150 cm Diameter × 76 cm H (Comfortably Seats 6-8)",
    weight: "82 kg",
    warranty: "10-Year Solid Hardwood Joint & Stability Guarantee",
    careInstructions: "Wipe with soft lint-free cloth along wood grain. Use natural beeswax polish twice a year.",
    stock: 5,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Canaletto Walnut", colorHex: "#4A2F1B", size: "150 cm (Seats 6)", priceAdjustment: 0 },
      { color: "Smoked Espresso Oak", colorHex: "#2D2621", size: "170 cm (Seats 8)", priceAdjustment: 18000 }
    ],
    tags: ["best-seller", "trending"],
    isFeatured: true,
    status: "active",
    sortOrder: 9,
    createdAt: "2026-03-20T10:00:00.000Z"
  },
  {
    id: "prod-10",
    name: "Paloma Bouclé Swivel Accent Chair",
    slug: "paloma-boucle-swivel-accent-chair",
    sku: "ME-CHR-010",
    description: "The iconic silhouette featured in our atelier showroom. Paloma envelops you in tactile heavyweight Italian wool bouclé with a fluid, silent 360-degree ball-bearing swivel mechanism resting on a concealed weighted base.",
    price: 54000,
    discountPrice: 48000,
    category: "living-room",
    categoryName: "Living Room",
    material: "Italian Wool Bouclé, Kiln-Dried Hardwood Frame, High-Resilience Cold-Cure Foam",
    dimensions: "86 cm W × 84 cm D × 74 cm H (Seat Height 44 cm)",
    weight: "28 kg",
    warranty: "5-Year Swivel Mechanism & Structural Frame Warranty",
    careInstructions: "Blot spills immediately with clean dry cloth. Steam clean lightly or professional dry clean only.",
    stock: 6,
    lowStockThreshold: 3,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Alabaster Ivory Bouclé", colorHex: "#F5F2EB", size: "Standard Swivel", priceAdjustment: 0 },
      { color: "Warm Terracotta Tweed", colorHex: "#A85842", size: "Standard Swivel", priceAdjustment: 2500 },
      { color: "Charcoal Chenille", colorHex: "#353432", size: "Standard Swivel", priceAdjustment: 2000 }
    ],
    tags: ["best-seller", "new-arrival"],
    isFeatured: true,
    status: "active",
    sortOrder: 10,
    createdAt: "2026-03-21T10:00:00.000Z"
  },
  {
    id: "prod-11",
    name: "Marcel Woven Cane & Teak Dining Chairs (Pair)",
    slug: "marcel-woven-cane-teak-dining-chairs",
    sku: "ME-CHR-011",
    description: "Curated as a pair, the Marcel Dining Chair marries mid-century French geometry with hand-woven octagonal rattan webbing and solid Indonesian Grade-A teak framing.",
    price: 38000,
    discountPrice: 34000,
    category: "dining",
    categoryName: "Dining & Entertaining",
    material: "Solid Grade-A Teak, Hand-Woven Natural Rattan Cane, Concealed Mortise Joinery",
    dimensions: "52 cm W × 56 cm D × 84 cm H (Seat Height 46 cm)",
    weight: "14 kg (Pair)",
    warranty: "5-Year Solid Wood Frame Warranty",
    careInstructions: "Dust cane with soft brush. Wipe teak with slightly damp cloth and condition with teak oil yearly.",
    stock: 8,
    lowStockThreshold: 4,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Natural Golden Teak", colorHex: "#C29665", size: "Pair of 2", priceAdjustment: 0 },
      { color: "Ebonized Black Teak", colorHex: "#222120", size: "Pair of 2", priceAdjustment: 3000 }
    ],
    tags: ["trending"],
    isFeatured: true,
    status: "active",
    sortOrder: 11,
    createdAt: "2026-03-22T10:00:00.000Z"
  },
  {
    id: "prod-12",
    name: "Nordic Fluted White Oak Executive Study Desk",
    slug: "nordic-fluted-white-oak-executive-study-desk",
    sku: "ME-DSK-012",
    description: "Tailored for inspired contemporary work retreats, this desk combines quarter-sawn American white oak with seamless fluted tambour drawer faces, magnetic wire concealment channels, and soft-touch brass drawer pulls.",
    price: 86000,
    discountPrice: 74000,
    category: "office",
    categoryName: "Executive Office",
    material: "Quarter-Sawn American White Oak, Solid Brass Pulls, Soft-Close German Undermount Slides",
    dimensions: "160 cm W × 72 cm D × 76 cm H",
    weight: "58 kg",
    warranty: "7-Year Structural & Hardware Warranty",
    careInstructions: "Clean with soft dry cloth. Keep away from direct harsh moisture or open radiators.",
    stock: 4,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Natural Scandinavian Oak", colorHex: "#DEC8A5", size: "160 cm", priceAdjustment: 0 },
      { color: "Smoked Espresso Oak", colorHex: "#393028", size: "180 cm Grand", priceAdjustment: 12000 }
    ],
    tags: ["new-arrival", "best-seller"],
    isFeatured: true,
    status: "active",
    sortOrder: 12,
    createdAt: "2026-03-23T10:00:00.000Z"
  },
  {
    id: "prod-13",
    name: "Siena Nesting Travertine End & Side Tables",
    slug: "siena-nesting-travertine-end-side-tables",
    sku: "ME-TBL-013",
    description: "A sculptural duo of tiered accent tables cut from honed Roman beige travertine slabs with bullnose curved edges and brushed matte brass cylindrical plinths.",
    price: 42000,
    discountPrice: 37500,
    category: "living-room",
    categoryName: "Living Room",
    material: "Roman Honed Travertine Stone, Solid Spun Brass Base",
    dimensions: "Large: 52 cm Dia × 50 cm H; Small: 42 cm Dia × 44 cm H",
    weight: "36 kg (Set of 2)",
    warranty: "5-Year Natural Stone Stability Guarantee",
    careInstructions: "Wipe with damp cloth and mild stone cleaner. Avoid direct acidic citrus or chemical solvents.",
    stock: 7,
    lowStockThreshold: 3,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
        source: "url"
      }
    ],
    variants: [
      { color: "Roman Beige & Warm Brass", colorHex: "#D8CCA8", size: "Set of 2 Nesting", priceAdjustment: 0 },
      { color: "Silver Travertine & Dark Bronze", colorHex: "#B8B3A8", size: "Set of 2 Nesting", priceAdjustment: 4000 }
    ],
    tags: ["trending"],
    isFeatured: false,
    status: "active",
    sortOrder: 13,
    createdAt: "2026-03-24T10:00:00.000Z"
  },
  {
    id: "prod-14",
    name: "Atelier Ribbed Leather Executive Desk Chair",
    slug: "atelier-ribbed-leather-executive-desk-chair",
    sku: "ME-CHR-014",
    description: "Engineered for uncompromising ergonomic elegance, the Atelier Chair pairs channel-quilted Italian top-grain saddle leather with polished champagne bronze 5-star swivel castors and synchro-tilt recline.",
    price: 62000,
    discountPrice: 54000,
    category: "office",
    categoryName: "Executive Office",
    material: "Full-Grain Italian Aniline Leather, Die-Cast Aluminum, High-Density Cold-Cure Foam",
    dimensions: "66 cm W × 66 cm D × 94-104 cm H (Adjustable)",
    weight: "22 kg",
    warranty: "5-Year Pneumatic Cylinder & Frame Guarantee",
    careInstructions: "Condition leather semi-annually with neutral leather balsam. Wipe metal components with microfiber.",
    stock: 5,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "/leather-desk-chair.jpg",
        source: "url",
        isPrimary: true
      },
      {
        type: "image",
        url: "/leather-chair-detail.jpg",
        source: "url"
      }
    ],
    variants: [
      { color: "Vintage Saddle Cognac", colorHex: "#7A4222", size: "Standard Executive", priceAdjustment: 0 },
      { color: "Obsidian Black Leather", colorHex: "#1C1B1A", size: "Standard Executive", priceAdjustment: 0 },
      { color: "Ivory Bone Leather", colorHex: "#EAE6DE", size: "Standard Executive", priceAdjustment: 3500 }
    ],
    tags: ["best-seller"],
    isFeatured: true,
    status: "active",
    sortOrder: 14,
    createdAt: "2026-03-25T10:00:00.000Z"
  },
  {
    id: "prod-15",
    name: "Kyoto Fluted Oak Architectural Console Table",
    slug: "kyoto-fluted-oak-architectural-console-table",
    sku: "ME-TBL-015",
    description: "A commanding entryway or living room statement featuring slender fluted solid oak architectural pillars supporting an organic chamfered solid timber tabletop with two soft-closing hidden drawers.",
    price: 58000,
    discountPrice: 49000,
    category: "living-room",
    categoryName: "Living Room",
    material: "FSC American White Oak, Natural Matte Hardwax Oil, Concealed Drawer Glides",
    dimensions: "160 cm W × 38 cm D × 82 cm H",
    weight: "34 kg",
    warranty: "10-Year Solid Timber Frame Warranty",
    careInstructions: "Dust regularly. Blot liquids immediately with clean absorbent dry cloth.",
    stock: 4,
    lowStockThreshold: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1200&q=80",
        source: "url",
        isPrimary: true
      }
    ],
    variants: [
      { color: "Natural Blonde Oak", colorHex: "#E0D0B4", size: "160 cm", priceAdjustment: 0 },
      { color: "Smoked Canaletto Oak", colorHex: "#3E342B", size: "160 cm", priceAdjustment: 4000 }
    ],
    tags: ["new-arrival"],
    isFeatured: false,
    status: "active",
    sortOrder: 15,
    createdAt: "2026-03-26T10:00:00.000Z"
  }
];

export const INITIAL_SETTINGS = {
  whatsappNumber: "+919876543210",
  whatsappMessage: "Hello Maison Élégance Team, I am interested in inquiring about:",
  storeName: "Maison Élégance",
  storeTagline: "Timeless Architecture for Contemporary Living",
  storeAddress: "Nala Road, Patna, Bihar 800003, India",
  storeEmail: "contact@maisonelegance.com",
  storePhone: "+91 (0612) 268 4500",
  currency: "₹",
  lowStockThreshold: 4,
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    pinterest: "https://pinterest.com"
  }
};
