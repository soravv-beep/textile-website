import { unsplash } from "../utils/images.js";
import { productPhotos } from "../data/catalog.js";

export const LOOKBOOK_ROOMS = [
  "All Rooms",
  "Living Room",
  "Bedroom",
  "Dining & Nook",
  "Bath & Spa",
  "Balcony & Verandah"
];

export const LOOKBOOK_STYLES = [
  "All Styles",
  "Boho Warmth",
  "Earthy Minimal",
  "Heritage Classic",
  "Festive Luxe"
];

export const LOOKBOOK_ITEMS = [
  {
    id: "lb-01",
    title: "Sunlit Terracotta Living Studio",
    room: "Living Room",
    style: "Boho Warmth",
    image: productPhotos["1"], // Jaipur Handwoven Cotton Rug
    aspectRatio: "4/5",
    narrative: "Layering natural wool fibers with warm terracotta clay accents. The extra-weft geometric rug grounds the raw teak coffee table.",
    hotspots: [
      {
        x: 42,
        y: 74,
        productId: 1,
        label: "Jaipur Handwoven Cotton Rug"
      },
      {
        x: 68,
        y: 48,
        productId: 21,
        label: "Coral Chenille Floor Cushion"
      }
    ]
  },
  {
    id: "lb-02",
    title: "Mocha Minimalist Bedroom Suite",
    room: "Bedroom",
    style: "Earthy Minimal",
    image: productPhotos["9"], // Himalayan Wool Throw
    aspectRatio: "3/4",
    narrative: "Tonal serenity styled with undyed organic cotton and textured wool blends for slow morning rituals.",
    hotspots: [
      {
        x: 52,
        y: 65,
        productId: 9,
        label: "Himalayan Wool Throw"
      },
      {
        x: 32,
        y: 40,
        productId: 3,
        label: "Kutch Handwoven Throw"
      }
    ]
  },
  {
    id: "lb-03",
    title: "Coastal Turquoise Powder Room",
    room: "Bath & Spa",
    style: "Earthy Minimal",
    image: productPhotos["4"], // Dhurrie Bath Mat
    aspectRatio: "1/1",
    narrative: "High-absorbency organic ring-spun cotton brings soft tactility and cool turquoise calm to stone tiles.",
    hotspots: [
      {
        x: 48,
        y: 68,
        productId: 4,
        label: "Dhurrie Bath Mat"
      },
      {
        x: 75,
        y: 35,
        productId: 27,
        label: "Tan Premium Cotton Spa Mat"
      }
    ]
  },
  {
    id: "lb-04",
    title: "Heritage Midnight Library",
    room: "Living Room",
    style: "Heritage Classic",
    image: productPhotos["16"], // Charcoal Wool Area Rug
    aspectRatio: "3/4",
    narrative: "Deep natural indigo and midnight tones anchored by hand-knotted wool pile. Built for acoustic depth and quiet reading hours.",
    hotspots: [
      {
        x: 50,
        y: 80,
        productId: 16,
        label: "Charcoal Wool Area Rug"
      },
      {
        x: 65,
        y: 52,
        productId: 9,
        label: "Himalayan Wool Throw"
      }
    ]
  },
  {
    id: "lb-05",
    title: "Botanical Garden Dining Table",
    room: "Dining & Nook",
    style: "Festive Luxe",
    image: productPhotos["5"], // Sanganeri Table Runner
    aspectRatio: "4/5",
    narrative: "Pure combed cotton table linen naturally dyed with botanical sage extracts. Finished with subtle hemstitch details.",
    hotspots: [
      {
        x: 45,
        y: 60,
        productId: 5,
        label: "Sanganeri Table Runner"
      }
    ]
  },
  {
    id: "lb-06",
    title: "Wabi-Sabi Daybed Nook",
    room: "Living Room",
    style: "Earthy Minimal",
    image: productPhotos["21"], // Coral Chenille Floor Cushion
    aspectRatio: "1/1",
    narrative: "Playful juxtaposition of coral hues with neutral limestone plaster. Designed for afternoon reading and tea.",
    hotspots: [
      {
        x: 40,
        y: 55,
        productId: 21,
        label: "Coral Chenille Floor Cushion"
      },
      {
        x: 70,
        y: 62,
        productId: 9,
        label: "Himalayan Wool Throw"
      }
    ]
  },
  {
    id: "lb-07",
    title: "Breezy Cane Verandah Lounge",
    room: "Balcony & Verandah",
    style: "Boho Warmth",
    image: productPhotos["3"], // Kutch Handwoven Throw
    aspectRatio: "4/5",
    narrative: "Breathable open-weave cottons that withstand shaded outdoor breezes while providing plush barefoot comfort.",
    hotspots: [
      {
        x: 55,
        y: 70,
        productId: 3,
        label: "Kutch Handwoven Throw"
      },
      {
        x: 35,
        y: 45,
        productId: 21,
        label: "Coral Chenille Floor Cushion"
      }
    ]
  },
  {
    id: "lb-08",
    title: "Monsoon Breakfast Solarium",
    room: "Dining & Nook",
    style: "Heritage Classic",
    image: productPhotos["5"], // Sanganeri Table Runner
    aspectRatio: "3/4",
    narrative: "Rich earthy textures harmonised with lush indoor greenery and warm morning sunlight filtering through linen.",
    hotspots: [
      {
        x: 48,
        y: 66,
        productId: 5,
        label: "Sanganeri Table Runner"
      },
      {
        x: 72,
        y: 45,
        productId: 1,
        label: "Jaipur Handwoven Cotton Rug"
      }
    ]
  },
  {
    id: "lb-09",
    title: "Master Ensuite Linen Spa",
    room: "Bath & Spa",
    style: "Festive Luxe",
    image: productPhotos["27"], // Tan Premium Cotton Spa Mat
    aspectRatio: "1/1",
    narrative: "Double-woven zero-twist cotton loops that elevate daily skincare routines into five-star sensory moments.",
    hotspots: [
      {
        x: 50,
        y: 72,
        productId: 27,
        label: "Tan Premium Cotton Spa Mat"
      },
      {
        x: 25,
        y: 40,
        productId: 4,
        label: "Dhurrie Bath Mat"
      }
    ]
  },
  {
    id: "lb-10",
    title: "Artisan Loom Living Pavilion",
    room: "Living Room",
    style: "Festive Luxe",
    image: productPhotos["1"], // Jaipur Handwoven Cotton Rug
    aspectRatio: "4/5",
    narrative: "Curated with our signature DMC Burnt Orange and Turquoise accents, creating celebratory warmth without visual clutter.",
    hotspots: [
      {
        x: 58,
        y: 75,
        productId: 1,
        label: "Jaipur Handwoven Cotton Rug"
      },
      {
        x: 30,
        y: 48,
        productId: 4,
        label: "Dhurrie Bath Mat"
      }
    ]
  },
  {
    id: "lb-11",
    title: "Japandi Meditation Alcove",
    room: "Bedroom",
    style: "Earthy Minimal",
    image: productPhotos["9"], // Himalayan Wool Throw
    aspectRatio: "3/4",
    narrative: "Low tatami-inspired floor seating draped with tactile mocha throws and organic washed cotton bolsters.",
    hotspots: [
      {
        x: 46,
        y: 65,
        productId: 9,
        label: "Himalayan Wool Throw"
      }
    ]
  },
  {
    id: "lb-12",
    title: "Courtyard Sunset Verandah",
    room: "Balcony & Verandah",
    style: "Heritage Classic",
    image: productPhotos["16"], // Charcoal Wool Area Rug
    aspectRatio: "16/9",
    narrative: "Open sky and heritage stone arches brought together with traditional punja dhurries woven to withstand decades.",
    hotspots: [
      {
        x: 40,
        y: 70,
        productId: 16,
        label: "Charcoal Wool Area Rug"
      },
      {
        x: 65,
        y: 50,
        productId: 21,
        label: "Coral Chenille Floor Cushion"
      }
    ]
  }
];

export const UGC_COMMUNITY_GALLERY = [
  {
    id: "ugc-1",
    author: "Ananya S., Bangalore",
    handle: "@ananya_interiors",
    image: unsplash("photo-1600607686527-6fb886090705", 500),
    text: "The Bhujodi Terracotta rug completely transformed our living room. The weave feels dense, grounded, and so soft barefoot.",
    productName: "Bhujodi Terracotta Rug"
  },
  {
    id: "ugc-2",
    author: "Karan & Rohit, Mumbai",
    handle: "@bombay_loft",
    image: unsplash("photo-1584100936595-c0654b55a2e2", 500),
    text: "Coral cushion covers add the exact pop of festive warmth our neutral beige sofa needed.",
    productName: "Coral Loom Cushion Set"
  },
  {
    id: "ugc-3",
    author: "Dr. Shalini M., New Delhi",
    handle: "@shalini_home",
    image: unsplash("photo-1620626011761-996317b8d101", 500),
    text: "Finding GOTS organic cotton bath mats that actually absorb quickly was impossible until WovenHaat.",
    productName: "Turquoise Ribbed Bath Mat"
  },
  {
    id: "ugc-4",
    author: "Tanvi Roy, Kolkata",
    handle: "@the_slow_flat",
    image: unsplash("photo-1616627561839-074385245ff6", 500),
    text: "Love that every piece comes with a card naming the artisan weaver. True slow design.",
    productName: "Mocha Handloom Throw"
  }
];
