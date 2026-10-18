import { unsplash } from "../utils/images.js";
import { journalPath } from "../constants/routes.js";

export const JOURNAL_CATEGORIES = [
  "All Stories",
  "Colour Guides",
  "Artisan Stories",
  "How It's Made",
  "Decor Ideas",
  "Care Tips"
];

export const JOURNAL_SWATCHES = [
  { code: "DMC 844", name: "Beaver Gray", hex: "#3F3A38", role: "Primary Text & Dark Accents" },
  { code: "DMC 900", name: "Burnt Orange", hex: "#C8421F", role: "Buttons & Warm Focus" },
  { code: "DMC 436", name: "Tan", hex: "#C08F4A", role: "Craft Accents & Eyebrows" },
  { code: "DMC 352", name: "Light Coral", hex: "#EE8F80", role: "Tags & Playful Highlights" },
  { code: "DMC 3866", name: "Mocha", hex: "#F0EBE3", role: "Warm Living Background" },
  { code: "DMC 597", name: "Turquoise", hex: "#5C9FAE", role: "Interactive Links & Cooling Notes" }
];

export const JOURNAL_POSTS = [
  {
    slug: "decorating-with-burnt-orange-and-turquoise",
    to: journalPath("decorating-with-burnt-orange-and-turquoise"),
    label: "Colour",
    category: "Colour Guides",
    title: "Decorating with Burnt Orange and Turquoise",
    excerpt: "How two complementary DMC shades create dynamic, warm harmony in a neutral room without overpowering your living space.",
    date: "October 12, 2026",
    readMinutes: 6,
    featured: true,
    author: {
      name: "Meera Rathore",
      role: "Design Lead · Jaipur",
      avatar: unsplash("photo-1573497019940-1c28c88b4f3e", 200)
    },
    cover: unsplash("photo-1528459801416-a9e53bbf4e17", 1200),
    alt: "Spools of hand-dyed yarn in burnt orange, turquoise, and mocha",
    tags: ["Colour Theory", "DMC 900", "DMC 597", "Living Room", "Styling"],
    productIds: ["wh-001", "wh-004", "wh-002"],
    swatches: [
      { code: "DMC 900", name: "Burnt Orange", hex: "#C8421F" },
      { code: "DMC 597", name: "Turquoise", hex: "#5C9FAE" },
      { code: "DMC 3866", name: "Mocha", hex: "#F0EBE3" },
      { code: "DMC 844", name: "Beaver Gray", hex: "#3F3A38" }
    ],
    toc: [
      { id: "natural-contrast", title: "The Chemistry of Sun and Water" },
      { id: "anchor-and-accent", title: "The 60-30-10 Palette Rule" },
      { id: "tactile-materials", title: "Why Natural Fibres Tame Bold Pigments" },
      { id: "curating-your-room", title: "3 Ways to Style It Today" }
    ],
    sections: [
      {
        id: "natural-contrast",
        heading: "The Chemistry of Sun and Water",
        paragraphs: [
          "Few colour pairings carry as much natural tension as terracotta earth and desert water. In traditional Kutch embroidery and Rajasthani architecture, burnt orange and mineral turquoise have coexisted for centuries, evoking baked clay pots against sky reflection.",
          "When translating this heritage into contemporary home interiors, the goal is never to shock the eye. Rather, it is to generate energy through deliberate balance: burnt orange provides grounding warmth, while turquoise introduces refreshing aeration."
        ],
        quote: "Colour in a home should feel like seasonal weather — grounding when you rest, invigorating when morning light pours through.",
        quoteAuthor: "Meera Rathore, Head of Design"
      },
      {
        id: "anchor-and-accent",
        heading: "The 60-30-10 Palette Rule",
        paragraphs: [
          "To keep a space sophisticated, avoid splitting hues 50/50. We recommend our signature WovenHaat distribution: 60% Mocha background (#F0EBE3) across walls, large upholstery, and floors; 30% Burnt Orange (#C8421F) in rugs and statement cushions; and 10% Turquoise (#5C9FAE) in secondary ceramics, table runners, or accent trims.",
          "Because both colors are rendered using matte natural dyes on combed cotton or deshi wool, they reflect light softly without the plastic sheen of synthetic acrylics."
        ]
      },
      {
        id: "tactile-materials",
        heading: "Why Natural Fibres Tame Bold Pigments",
        paragraphs: [
          "A saturated hue looks harsh on synthetic polyester because the light bounces directly off uniform plastic strands. On a handloom pit loom, each thread of organic cotton and hand-spun wool has subtle microscopic variations.",
          "These slight irregularities absorb light unevenly, softening the overall intensity into a rich, lived-in patina that ages gracefully over years of use."
        ],
        image: unsplash("photo-1600166898405-da9535204843", 900),
        imageCaption: "Handwoven wool rug pairing burnt orange jaal motifs with neutral mocha base"
      },
      {
        id: "curating-your-room",
        heading: "3 Ways to Style It Today",
        paragraphs: [
          "1. Ground with Terracotta: Place a dense flatweave or high-low wool rug under your sofa to anchor the room.",
          "2. Layer Pillows in Triads: Combine a solid coral cushion, a textured mocha woven throw, and an embroidered turquoise lumbar pillow.",
          "3. Complementary Ceramics: Accent dark wood shelving with unglazed terracotta planters and turquoise glazed stoneware."
        ]
      }
    ]
  },
  {
    slug: "how-a-pit-loom-works",
    to: journalPath("how-a-pit-loom-works"),
    label: "Craft",
    category: "How It's Made",
    title: "How a Handloom Rug Is Made: Fibre to Finish",
    excerpt: "Step inside our Panipat and Bhujodi weaving halls to witness the rhythm of pedaling, shuttle throws, and hand-tied selvedges.",
    date: "October 04, 2026",
    readMinutes: 8,
    featured: false,
    author: {
      name: "Rameshbhai Patel",
      role: "Master Weaver · Bhujodi",
      avatar: unsplash("photo-1507003211169-0a1dd7228f2d", 200)
    },
    cover: unsplash("photo-1591195853828-11db59a44f6b", 1200),
    alt: "Weaver working at an authentic wooden pit loom in Bhujodi",
    tags: ["Pit Loom", "Panipat", "Slow Living", "Organic Cotton"],
    productIds: ["wh-001", "wh-003", "wh-005"],
    swatches: [
      { code: "DMC 436", name: "Tan", hex: "#C08F4A" },
      { code: "DMC 844", name: "Beaver Gray", hex: "#3F3A38" }
    ],
    toc: [
      { id: "the-warp-foundation", title: "Setting the Warp: 1,400 Parallel Lines" },
      { id: "wooden-pit-mechanics", title: "The Pit Loom's Ergonomic Secret" },
      { id: "interlocking-weft", title: "Interlocking the Weft by Hand" },
      { id: "hand-finishing", title: "The 12-Point Finishing Inspection" }
    ],
    sections: [
      {
        id: "the-warp-foundation",
        heading: "Setting the Warp: 1,400 Parallel Lines",
        paragraphs: [
          "Before a single thread is woven, days are spent preparing the warp. Over a thousand individual strands of high-twist organic cotton are wound around wooden warping drums, aligned with mathematical precision.",
          "Even a millimeter of tension discrepancy can cause a rug to buckle months after manufacture. Our master warpers test tension purely through thumb sensitivity developed across decades."
        ]
      },
      {
        id: "wooden-pit-mechanics",
        heading: "The Pit Loom's Ergonomic Secret",
        paragraphs: [
          "A pit loom gets its name from the trench dug into the floor beneath the weaver. This allows the foot treadles to sit comfortably at floor level while keeping the heavy timber reed low and cool.",
          "Unlike electric power looms that shake violently, the pit loom operates to a serene rhythmic clack: left foot down, wooden shuttle sliding across, beater arm pulled snug, right foot down."
        ],
        quote: "A power loom weaves with electricity; a pit loom weaves with the artisan's breath and heartbeat.",
        quoteAuthor: "Rameshbhai Patel, Master Weaver"
      },
      {
        id: "interlocking-weft",
        heading: "Interlocking the Weft by Hand",
        paragraphs: [
          "Extra-weft patterning is where human artistry outclasses machinery. Every floral jaal or geometric diamond is inserted with individual small wooden bobbins by hand.",
          "Because the artisan monitors the tension with every pass, the weave retains structural memory: it settles flat on your hardwood or stone floor without curling corners."
        ],
        image: unsplash("photo-1596755094514-f87e34085b2c", 900),
        imageCaption: "Raw organic cotton fibers being spun into yarn on traditional charkhas"
      },
      {
        id: "hand-finishing",
        heading: "The 12-Point Finishing Inspection",
        paragraphs: [
          "When a rug is cut from the loom, its journey is only half complete. It is washed in natural rainwater, sun-dried on open Haryana terraces, and hand-fringed by skilled women artisans in our Panipat studio before receiving its certification wax seal."
        ]
      }
    ]
  },
  {
    slug: "meet-the-weavers-of-bhujodi",
    to: journalPath("meet-the-weavers-of-bhujodi"),
    label: "Artisans",
    category: "Artisan Stories",
    title: "Meet the Weavers of Bhujodi: 5 Generations of Warp and Weft",
    excerpt: "How 14 families in Kutch have preserved centuries-old extra-weft geometric weaving through community fair-trade co-ops.",
    date: "September 28, 2026",
    readMinutes: 7,
    featured: false,
    author: {
      name: "Meera Rathore",
      role: "Design Lead · Jaipur",
      avatar: unsplash("photo-1573497019940-1c28c88b4f3e", 200)
    },
    cover: unsplash("photo-1600607686527-6fb886090705", 1200),
    alt: "Handwoven wool textiles drying under Kutch sunshine",
    tags: ["Bhujodi", "Heritage", "Artisan Stories", "Fair Trade"],
    productIds: ["wh-001", "wh-005"],
    swatches: [
      { code: "DMC 900", name: "Burnt Orange", hex: "#C8421F" },
      { code: "DMC 436", name: "Tan", hex: "#C08F4A" }
    ],
    toc: [
      { id: "village-of-looms", title: "A Village Where Everyone Weaves" },
      { id: "the-vankar-tradition", title: "The Vankar Tradition" },
      { id: "living-wages", title: "Dignity Beyond Piece-Rate Pay" }
    ],
    sections: [
      {
        id: "village-of-looms",
        heading: "A Village Where Everyone Weaves",
        paragraphs: [
          "Just eight kilometres outside Bhuj, the village of Bhujodi hums with an unmistakable cadence. Walk down any whitewashed alley in the morning, and you hear the rhythmic click-clack of pit looms filtering through carved teak doorways.",
          "Here, weaving is not an assembly line; it is a hereditary language passed from grandparent to grandchild."
        ]
      },
      {
        id: "the-vankar-tradition",
        heading: "The Vankar Tradition",
        paragraphs: [
          "The Vankar community historically wove warm blankets (dhablos) for nomadic Maldhari cattle herders in exchange for sheep wool and milk. Today, that symbiotic relationship is reflected in the durable, weather-resistant hand-spun wool used in our Bhujodi rugs."
        ],
        quote: "Our patterns are not computer drawings. They are memories of desert stars, river bends, and temple steps.",
        quoteAuthor: "Dhanji Vankar, Weaver"
      },
      {
        id: "living-wages",
        heading: "Dignity Beyond Piece-Rate Pay",
        paragraphs: [
          "WovenHaat works directly with 14 artisan families in Bhujodi without intermediaries. By guaranteeing 100% upfront material funding and paying 35% above regional fair-wage minimums, weavers invest in solar roofing, children's schooling, and loom upgrades."
        ]
      }
    ]
  },
  {
    slug: "caring-for-cotton-wool-and-jute",
    to: journalPath("caring-for-cotton-wool-and-jute"),
    label: "Care",
    category: "Care Tips",
    title: "Caring for Handwoven Cotton, Wool & Jute: The Slow Guide",
    excerpt: "Natural fibers don't need harsh chemical detergents. Here is how to clean, rotate, and preserve your handloom textiles for generations.",
    date: "September 20, 2026",
    readMinutes: 5,
    featured: false,
    author: {
      name: "Arun Kumar",
      role: "Quality Head · Panipat",
      avatar: unsplash("photo-1544723795-3fb6469f5b39", 200)
    },
    cover: unsplash("photo-1616486338812-3dadae4b4ace", 1200),
    alt: "Handwoven throw and cushions neatly folded in sunlight",
    tags: ["Care Tips", "Organic Cotton", "Longevity", "Wool Maintenance"],
    productIds: ["wh-001", "wh-003", "wh-007"],
    swatches: [
      { code: "DMC 3866", name: "Mocha", hex: "#F0EBE3" },
      { code: "DMC 844", name: "Beaver Gray", hex: "#3F3A38" }
    ],
    toc: [
      { id: "vacuuming-rules", title: "Gentle Vacuuming & Fiber Shedding" },
      { id: "spot-cleaning", title: "Spot Cleaning With Kitchen Staples" },
      { id: "seasonal-sun-baths", title: "The Power of an Annual Sun Bath" },
      { id: "storage", title: "Storing Slow Textiles Between Seasons" }
    ],
    sections: [
      {
        id: "vacuuming-rules",
        heading: "Gentle Vacuuming & Fiber Shedding",
        paragraphs: [
          "New wool and cotton handloom rugs naturally shed loose surface fibers during their first few weeks. Never use a harsh motorized beater bar vacuum, which can snag hand-tied loops.",
          "Instead, use a smooth floor suction head twice weekly. Within 30 to 45 days, shedding diminishes as the pile settles."
        ]
      },
      {
        id: "spot-cleaning",
        heading: "Spot Cleaning With Kitchen Staples",
        paragraphs: [
          "Spilled chai or wine? Do not panic and never rub in circular motions. Blot immediately with clean, dry unbleached cotton toweling.",
          "Mix 1 part mild plant-based soap with 4 parts lukewarm water. Dab gently from the outside of the stain toward the center, then let air dry naturally."
        ],
        quote: "A handwoven textile breathes. Treat it with the same care you would accord fine wool clothing.",
        quoteAuthor: "Arun Kumar, Quality Lead"
      },
      {
        id: "seasonal-sun-baths",
        heading: "The Power of an Annual Sun Bath",
        paragraphs: [
          "Once a year, give your rugs and cushion inserts a 4-hour sun bath on a crisp, dry afternoon. Natural ultraviolet rays disinfect fibers and refresh natural wool lanolin without any synthetic chemicals."
        ]
      },
      {
        id: "storage",
        heading: "Storing Slow Textiles Between Seasons",
        paragraphs: [
          "Always roll rugs with the pile facing inwards; never fold them. Wrap in breathable cotton sheeting with dried neem leaves or cedar blocks to naturally deter moths."
        ]
      }
    ]
  },
  {
    slug: "monsoon-ready-fabrics-that-breathe",
    to: journalPath("monsoon-ready-fabrics-that-breathe"),
    label: "Decor",
    category: "Decor Ideas",
    title: "Monsoon-Ready Interiors: Natural Fabrics That Breathe",
    excerpt: "How to swap heavy winter piles for airy open-weave cottons, anti-microbial bath linens, and mildew-resistant floor mats.",
    date: "September 15, 2026",
    readMinutes: 6,
    featured: false,
    author: {
      name: "Meera Rathore",
      role: "Design Lead · Jaipur",
      avatar: unsplash("photo-1573497019940-1c28c88b4f3e", 200)
    },
    cover: unsplash("photo-1513694203232-719a280e022f", 1200),
    alt: "Bright living space with breezy cotton throws and airy curtains",
    tags: ["Monsoon", "Decor Ideas", "Seasonal Decor", "Bath Linen"],
    productIds: ["wh-004", "wh-006", "wh-008"],
    swatches: [
      { code: "DMC 597", name: "Turquoise", hex: "#5C9FAE" },
      { code: "DMC 352", name: "Light Coral", hex: "#EE8F80" }
    ],
    toc: [
      { id: "humidity-challenge", title: "The Humidity Challenge" },
      { id: "quick-dry-cotton", title: "Switch to Zero-Twist Ring-Spun Cotton" },
      { id: "lightweight-layering", title: "Lightweight Layering for Cool Evenings" }
    ],
    sections: [
      {
        id: "humidity-challenge",
        heading: "The Humidity Challenge",
        paragraphs: [
          "During the Indian monsoon, indoor relative humidity routinely exceeds 85%. Dense synthetic rugs trap moisture close to floorboards, creating musty odours.",
          "By switching to flat-woven punja dhurries and waffle-weave organic cotton, air circulates freely beneath the textile, preventing dampness."
        ]
      },
      {
        id: "quick-dry-cotton",
        heading: "Switch to Zero-Twist Ring-Spun Cotton",
        paragraphs: [
          "In bath spaces, replace synthetic memory foam mats with ribbed combed-cotton mats. Our turquoise bath collection dries 40% faster on towel bars and can be washed on regular cold cycles."
        ]
      },
      {
        id: "lightweight-layering",
        heading: "Lightweight Layering for Cool Evenings",
        paragraphs: [
          "For bedrooms, swap heavy duvets for a lightweight handtufted coverlet. It provides just enough thermal insulation when the AC or evening rain cools the room."
        ]
      }
    ]
  },
  {
    slug: "the-dmc-palette-behind-wovenhaat",
    to: journalPath("the-dmc-palette-behind-wovenhaat"),
    label: "Colour",
    category: "Colour Guides",
    title: "The DMC Palette Behind WovenHaat: Why Yarn Dyeing Demands Patience",
    excerpt: "Exploring the craft philosophy of our six heritage hues: Beaver Gray, Burnt Orange, Tan, Light Coral, Mocha, and Turquoise.",
    date: "September 08, 2026",
    readMinutes: 7,
    featured: false,
    author: {
      name: "Meera Rathore",
      role: "Design Lead · Jaipur",
      avatar: unsplash("photo-1573497019940-1c28c88b4f3e", 200)
    },
    cover: unsplash("photo-1584100936595-c0654b55a2e2", 1200),
    alt: "Textile color palette swatches and yarn skeins neatly arrayed",
    tags: ["DMC", "Yarn Dyeing", "Craft Story", "Colour Theory"],
    productIds: ["wh-001", "wh-002", "wh-003", "wh-004"],
    swatches: JOURNAL_SWATCHES,
    toc: [
      { id: "six-shades", title: "The Six Tonal Foundations" },
      { id: "dye-vat-chemistry", title: "The Patience of Solar Vat Dyeing" },
      { id: "timeless-harmony", title: "Why These Tones Never Age Out" }
    ],
    sections: [
      {
        id: "six-shades",
        heading: "The Six Tonal Foundations",
        paragraphs: [
          "Every product on WovenHaat is mapped against a cohesive palette drawn from classic DMC embroidery floss standards: Beaver Gray (#3F3A38), Burnt Orange (#C8421F), Tan (#C08F4A), Light Coral (#EE8F80), Mocha (#F0EBE3), and Turquoise (#5C9FAE).",
          "This ensures that whether you buy a rug today and cushion covers two years later, the dyes harmonize organically under both daylight and warm 2700K incandescent lamps."
        ]
      },
      {
        id: "dye-vat-chemistry",
        heading: "The Patience of Solar Vat Dyeing",
        paragraphs: [
          "In our Panipat dye house, we do not flash-dye with industrial accelerants. Skeins of cotton and wool are submerged in temperature-controlled vats heated by solar thermal collectors.",
          "This gradual absorption allows dye molecules to bond deeply into the fiber core, achieving OEKO-TEX Standard 100 certification without caustic mordants."
        ]
      },
      {
        id: "timeless-harmony",
        heading: "Why These Tones Never Age Out",
        paragraphs: [
          "Trend palettes come and go every quarter. By rooting our color identity in minerals, sun-baked clay, and plant pigments, WovenHaat textiles remain timeless heirlooms that anchor your home across decades."
        ]
      }
    ]
  },
  {
    slug: "5-ways-to-layer-cushion-covers",
    to: journalPath("5-ways-to-layer-cushion-covers"),
    label: "Decor",
    category: "Decor Ideas",
    title: "5 Ways to Layer Handwoven Cushion Covers",
    excerpt: "Mix geometric jacquards, solid corals, and textured mocha weaves without looking chaotic or overly styled.",
    date: "August 30, 2026",
    readMinutes: 5,
    featured: false,
    author: {
      name: "Meera Rathore",
      role: "Design Lead · Jaipur",
      avatar: unsplash("photo-1573497019940-1c28c88b4f3e", 200)
    },
    cover: unsplash("photo-1616627561839-074385245ff6", 1200),
    alt: "Living room sofa styled with layered cushions and mocha throw",
    tags: ["Cushions", "Living Room", "Styling Guide", "Coral Loom"],
    productIds: ["wh-002", "wh-003", "wh-007"],
    swatches: [
      { code: "DMC 352", name: "Light Coral", hex: "#EE8F80" },
      { code: "DMC 3866", name: "Mocha", hex: "#F0EBE3" },
      { code: "DMC 900", name: "Burnt Orange", hex: "#C8421F" }
    ],
    toc: [
      { id: "size-pyramid", title: "1. The 20-18-Lumbar Pyramid" },
      { id: "texture-clashing", title: "2. Pairing Smooth With Ribbed" },
      { id: "feather-fillers", title: "3. Choose Cruelty-Free Down Alternative" }
    ],
    sections: [
      {
        id: "size-pyramid",
        heading: "1. The 20-18-Lumbar Pyramid",
        paragraphs: [
          "Start at the sofa corners with 20x20 inch solid mocha or beaver gray pillows. Layer an 18x18 inch coral loom cover in front, and finish with a central rectangular lumbar pillow in turquoise.",
          "This stepped depth creates inviting visual comfort without crowding seating room."
        ]
      },
      {
        id: "texture-clashing",
        heading: "2. Pairing Smooth With Ribbed",
        paragraphs: [
          "If all your pillows are smooth woven cotton, the sofa feels flat. Mix a handtufted loop pillow with a crisp flatweave dhurrie cushion and a relaxed waffle throw."
        ]
      },
      {
        id: "feather-fillers",
        heading: "3. Choose Cruelty-Free Down Alternative",
        paragraphs: [
          "Always size your cushion insert 2 inches larger than the cover (e.g. 20x20 insert for an 18x18 cover) to achieve that plush, designer karate-chop top fold."
        ]
      }
    ]
  },
  {
    slug: "why-your-bath-mat-should-be-organic-cotton",
    to: journalPath("why-your-bath-mat-should-be-organic-cotton"),
    label: "Care",
    category: "Care Tips",
    title: "Why Your Bath Mat Should Be Organic Cotton, Not Microfibre",
    excerpt: "Microplastics, synthetic backing odors, and poor absorbency: why ditching polyester transforms your morning routine.",
    date: "August 22, 2026",
    readMinutes: 6,
    featured: false,
    author: {
      name: "Arun Kumar",
      role: "Quality Head · Panipat",
      avatar: unsplash("photo-1544723795-3fb6469f5b39", 200)
    },
    cover: unsplash("photo-1620626011761-996317b8d101", 1200),
    alt: "Ribbed organic cotton bath mat in serene turquoise bathroom",
    tags: ["Bath Mat", "Organic Cotton", "Microplastics", "Eco Living"],
    productIds: ["wh-004", "wh-008"],
    swatches: [
      { code: "DMC 597", name: "Turquoise", hex: "#5C9FAE" },
      { code: "DMC 3866", name: "Mocha", hex: "#F0EBE3" }
    ],
    toc: [
      { id: "microplastics-in-wash", title: "The Microplastic Drain Problem" },
      { id: "skin-feel", title: "Natural Capillary Action vs Synthetic Trap" },
      { id: "care-and-durability", title: "Machine Wash Without Rubber Crumble" }
    ],
    sections: [
      {
        id: "microplastics-in-wash",
        heading: "The Microplastic Drain Problem",
        paragraphs: [
          "Every time a synthetic polyester or microfibre bath mat is washed, up to 700,000 microscopic plastic filaments shed straight into municipal waterways.",
          "Our GOTS-certified organic cotton bath mats are 100% plant-derived and biodegradable. When they eventually retire, they return cleanly to the soil."
        ]
      },
      {
        id: "skin-feel",
        heading: "Natural Capillary Action vs Synthetic Trap",
        paragraphs: [
          "Synthetic fibres are hydrophobic by nature; they use chemical coatings to mimic absorbency. In contrast, hollow organic cotton fibres naturally drink in moisture instantly through capillary action, leaving your feet warm and dry."
        ]
      },
      {
        id: "care-and-durability",
        heading: "Machine Wash Without Rubber Crumble",
        paragraphs: [
          "Synthetic mats with glued rubber spray backs peel and crack after a few hot washes. Our double-faced ribbed bath mats use woven selvedges that thrive in the washing machine and last for years."
        ]
      }
    ]
  }
];

/** 6 Instagram photos teaser for footer / widgets */
export const INSTAGRAM_POSTS = [
  { id: "ig1", image: unsplash("photo-1600607686527-6fb886090705", 400), alt: "Layered handwoven rugs" },
  { id: "ig2", image: unsplash("photo-1584100936595-c0654b55a2e2", 400), alt: "Coral cushion covers" },
  { id: "ig3", image: unsplash("photo-1528459801416-a9e53bbf4e17", 400), alt: "Yarn spools on a dye table" },
  { id: "ig4", image: unsplash("photo-1616627561839-074385245ff6", 400), alt: "Folded mocha throw" },
  { id: "ig5", image: unsplash("photo-1591195853828-11db59a44f6b", 400), alt: "Weaver at a pit loom" },
  { id: "ig6", image: unsplash("photo-1620626011761-996317b8d101", 400), alt: "Turquoise bath mat" }
];
