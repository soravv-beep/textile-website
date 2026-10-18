import { unsplash } from "../utils/images.js";

export const SUSTAINABILITY_STATS = [
  {
    value: "100%",
    label: "GOTS-Certified Cotton",
    detail: "Every bale is 100% organically farmed, non-GMO, and rain-fed in Gujarat and Maharashtra."
  },
  {
    value: "62%",
    label: "Less Water Consumed",
    detail: "Reduced dyeing water intensity through rainwater capture and zero-liquid-discharge ETP recycling."
  },
  {
    value: "48",
    label: "Artisan Families",
    detail: "Direct fair-trade livelihood across 4 historic handloom clusters with medical and educational grants."
  },
  {
    value: "0 kg",
    label: "Landfill Waste",
    detail: "100% of yarn off-cuts are shredded into recycled filler or re-spun into textured floor dhurries."
  }
];

export const SUSTAINABLE_MATERIALS = [
  {
    id: "organic-cotton",
    name: "Organic Long-Staple Cotton",
    tag: "GOTS Certified",
    tagTone: "eco",
    image: unsplash("photo-1596755094514-f87e34085b2c", 700),
    description: "Sourced directly from rain-fed cooperatives in Kutch. Grown without synthetic pesticides, toxic fertilizers, or genetically modified seeds, consuming 88% less irrigation water.",
    features: [
      "100% Certified Organic (License: GOTS-CU-85491)",
      "Zero toxic runoff into surrounding farmland",
      "Hypoallergenic and breathable against sensitive skin",
      "Biodegradable at end of product lifecycle"
    ]
  },
  {
    id: "recycled-fibres",
    name: "Regenerated Wool & Jute",
    tag: "GRS Recycled",
    tagTone: "tan",
    image: unsplash("photo-1616627561839-074385245ff6", 700),
    description: "Panipat is India's historic recycling capital. We reclaim post-consumer wool and plant-based jute fibres, mechanically carding them into resilient, textural weft yarns.",
    features: [
      "Global Recycled Standard (GRS) verified yarn stream",
      "Diverts over 24 tonnes of fabric trimmings yearly",
      "Natural thermal regulation and acoustic dampening",
      "Blended without synthetic binder plastics"
    ]
  },
  {
    id: "low-impact-dyes",
    name: "Azo-Free & Plant-Derived Dyes",
    tag: "OEKO-TEX 100",
    tagTone: "coral",
    image: unsplash("photo-1528459801416-a9e53bbf4e17", 700),
    description: "Colour stories are formulated using natural pigments (madder root, indigo, pomegranate rind) alongside OEKO-TEX Standard 100 certified low-impact synthetic dyes.",
    features: [
      "Free from formaldehyde, heavy metals & carcinogenic amines",
      "High colourfastness to sunlight and washing (Grade 4+)",
      "Closed-loop exhaust dyeing recovers up to 92% of water",
      "Gentle on weavers' hands and home living spaces"
    ]
  }
];

export const CERTIFICATIONS = [
  {
    id: "gots",
    name: "GOTS",
    fullName: "Global Organic Textile Standard",
    badgeLabel: "Farm to Loom",
    scope: "Certified Organic Cotton Fibres & Weaving Operations",
    validTill: "December 2027",
    licenceNumber: "CU-854911-IN",
    summary: "The world's leading processing standard for textiles made from organic fibres, incorporating strict ecological and social criteria across the entire supply chain.",
    highlights: [
      "At least 95% certified organic fibre content",
      "Ban on chlorine bleaching, aromatic solvents, and toxic mordants",
      "Strict worker safety, fair compensation, and zero forced labour audits"
    ],
    fileUrl: "#"
  },
  {
    id: "oeko-tex",
    name: "OEKO-TEX",
    fullName: "STANDARD 100 by OEKO-TEX®",
    badgeLabel: "Tested for Harmful Substances",
    scope: "Dyes, Yarns, Thread & Finished Textile Products",
    validTill: "October 2027",
    licenceNumber: "21.HIN.90842",
    summary: "Rigorous scientific laboratory testing certifying that every thread, dye bath, and woven edge is safe for direct human contact and free from over 300 hazardous chemicals.",
    highlights: [
      "Safe for nursery, kids' bedrooms, and allergy-prone households",
      "Exceeds global statutory chemical restrictions",
      "Annual unannounced factory audits and specimen re-testing"
    ],
    fileUrl: "#"
  },
  {
    id: "grs",
    name: "GRS",
    fullName: "Global Recycled Standard",
    badgeLabel: "Circular Economy",
    scope: "Recycled Wool and Regenerated Cotton Dhurrie Lines",
    validTill: "August 2027",
    licenceNumber: "GRS-TEX-3108",
    summary: "Tracks and verifies recycled material from source to finished rug, setting stringent requirements for social and environmental processing and chemical restrictions.",
    highlights: [
      "Full chain of custody tracking from industrial off-cuts to loom",
      "Zero toxic discharge during shredding and re-spinning",
      "Fair wage standards enforced across recycling facilities"
    ],
    fileUrl: "#"
  },
  {
    id: "craftmark",
    name: "Craftmark",
    fullName: "All India Artisans and Craftworkers Welfare Association",
    badgeLabel: "Authentic Handloom",
    scope: "Pit Loom, Punja Weaving & Hand-Tufted Clusters",
    validTill: "March 2028",
    licenceNumber: "CM-PAN-2024-04",
    summary: "A national trust seal verifying that genuine handmade techniques are used and no mechanised power looms are introduced into the artisan production stream.",
    highlights: [
      "Guarantees 100% human-powered weaving",
      "Protects indigenous weaving techniques and generational heritage",
      "Direct artisan fair-compensation verification"
    ],
    fileUrl: "#"
  }
];

export const PROCESS_LIFECYCLE = [
  {
    step: "01",
    phase: "Farm & Fiber Selection",
    location: "Kutch & Vidarbha",
    description: "Traceable organic cotton is harvested by smallholder farmer cooperatives, followed by gentle ginning that preserves long staple fibres for heirloom durability.",
    ecoMetric: "Zero synthetic pesticides used"
  },
  {
    step: "02",
    phase: "Conscious Yarn Dyeing",
    location: "Panipat Closed-Loop Facility",
    description: "Yarn skeins are dipped in solar-heated vats using plant extracts and OEKO-TEX low-impact formulations. Spent liquor undergoes multi-stage biological clarification.",
    ecoMetric: "92% process water recycled in-house"
  },
  {
    step: "03",
    phase: "Handloom Weaving",
    location: "Artisan Pit Loom Clusters",
    description: "Trained master weavers set up warp threads by hand. Rhythmic wooden pedals and shuttle movements interlock weft threads without consuming any electric grid power.",
    ecoMetric: "Zero kWh electric power consumed on loom"
  },
  {
    step: "04",
    phase: "Finishing & Zero-Plastic Packaging",
    location: "Quality Studio, Haryana",
    description: "Edges are fringe-knotted by hand, steamed with rainwater, and folded into unbleached cotton dust bags and recycled corrugated cartons.",
    ecoMetric: "100% plastic-free compostable packaging"
  }
];

export const WATER_AND_WASTE_PRACTICES = [
  {
    id: "rainwater",
    title: "Panipat Rainwater Harvesting Reservoir",
    body: "Our primary dyeing hub collects seasonal monsoon rainfall across 45,000 sq.ft of rooftop catchment. Stored in subterranean filtration tanks, this naturally soft water reduces the need for chemical softening agents and supplies 65% of our annual dyeing requirements."
  },
  {
    id: "etp",
    title: "Effluent Treatment Plant (Zero Liquid Discharge)",
    body: "Dye-bath runoff passes through a multi-stage bio-digester, sand media filters, and reverse osmosis membranes. The reclaimed clear water is looped back to subsequent wash cycles, while solid salt cake is safely collected for non-toxic industrial paving blocks."
  },
  {
    id: "yarn-scrap",
    title: "Upcycled Yarn Scrap Dhurries & Cushion Fillers",
    body: "No thread is discarded. Loom selvedge trimmings and bobbin ends are sorted by color tone. Coarse wool scrap becomes dense felt backing for heavy rugs, while fine cotton threads are spun into our limited-edition Upcycled Rag Dhurries."
  },
  {
    id: "solar",
    title: "Rooftop Solar for Weaving & Quality Halls",
    body: "While the looms themselves are completely hand-powered, our artisan work halls, natural yarn dryers, and inspection light-tables are powered by a 35 kW on-site rooftop solar grid, reducing carbon emissions by 42 tonnes annually."
  }
];

export const SOURCING_REGIONS = [
  {
    id: "bhujodi",
    name: "Bhujodi, Kutch",
    state: "Gujarat",
    craft: "Vankar Extra-Weft Weaving",
    families: 14,
    specialty: "Geometric woolen and organic cotton motifs woven with pure hand-spun Desi wool and natural indigo.",
    image: unsplash("photo-1591195853828-11db59a44f6b", 600)
  },
  {
    id: "panipat",
    name: "Panipat Cluster",
    state: "Haryana",
    craft: "Punja Dhurrie & Flatweaves",
    families: 18,
    specialty: "High-density flatweaves crafted from regenerated yarns, known for exceptional durability in high-traffic living spaces.",
    image: unsplash("photo-1600166898405-da9535204843", 600)
  },
  {
    id: "bhadohi",
    name: "Bhadohi Hub",
    state: "Uttar Pradesh",
    craft: "Hand-Tufting & Hand-Knotted Weaves",
    families: 9,
    specialty: "Plush organic cotton bath textiles, textured accent rugs, and sculpted high-low pile craftwork.",
    image: unsplash("photo-1620626011761-996317b8d101", 600)
  },
  {
    id: "kannur",
    name: "Kannur Handloom Belt",
    state: "Kerala",
    craft: "Soft Botanical Table & Bed Linens",
    families: 7,
    specialty: "Lightweight, breathable combed cotton textiles woven using traditional frame looms with hand-rolled hems.",
    image: unsplash("photo-1616486338812-3dadae4b4ace", 600)
  }
];
