/**
 * MOCK DATA — customer reviews for premium testimonials section.
 *
 * Shape: { id, rating, quote, name, place, avatar, alt, productImage, productAlt }
 * productImage: textile product photo for the card header
 * avatar: customer profile image
 */
export const TESTIMONIALS = [
  {
    id: "simran",
    rating: 5,
    quote:
      "Amazing quality! The bedsheet is so soft and adds a premium feel to my room. Will definitely shop again.",
    name: "Simran Kaur",
    place: "Homeowner · Delhi",
    avatar: "/avatars/simran.svg",
    alt: "Portrait of Simran Kaur",
    productImage: "/product-images-v2/white-linen-cushion-cover.webp",
    productAlt: "Premium white linen cushion cover on neutral bedding"
  },
  {
    id: "arjun",
    rating: 5,
    quote:
      "The fabric is breathable and perfect for everyday use. The colors are vibrant and exactly as shown.",
    name: "Arjun Mehta",
    place: "Homeowner · Mumbai",
    avatar: "/avatars/arjun.svg",
    alt: "Portrait of Arjun Mehta",
    productImage: "/product-images-v2/turquoise-cotton-summer-throw.webp",
    productAlt: "Turquoise cotton summer throw draped over sofa"
  },
  {
    id: "kavya",
    rating: 5,
    quote:
      "I loved the variety and the quality is top-notch. It truly feels like luxury.",
    name: "Kavya Iyer",
    place: "Interior Designer · Bangalore",
    avatar: "/avatars/kavya.svg",
    alt: "Portrait of Kavya Iyer",
    productImage: "/product-images-v2/jaipur-handwoven-cotton-rug.webp",
    productAlt: "Jaipur handwoven cotton rug in living room setting"
  }
];

/**
 * Legacy testimonials data for other uses (kept for backward compatibility).
 * @deprecated Use TESTIMONIALS above for the premium section.
 */
export const LEGACY_TESTIMONIALS = [
  {
    id: "ananya",
    rating: 5,
    quote:
      "The rug's texture is even better than in the photos. The colour is exactly like the DMC swatch — it settled the whole living room.",
    name: "Ananya Sharma",
    place: "Homeowner · Bengaluru",
    avatar: "/avatars/ananya.svg",
    alt: "Portrait of Ananya Sharma"
  },
  {
    id: "rekha",
    rating: 5,
    quote:
      "Ordered 40 cushion covers for my boutique. Sample approval was smooth, delivery on schedule, and quality identical across every piece.",
    name: "Rekha Textiles",
    place: "Retail Partner · Jaipur",
    avatar: "/avatars/rekha.svg",
    alt: "Portrait of the Rekha Textiles buyer"
  },
  {
    id: "karan",
    rating: 4,
    quote:
      "Bath mats are soft, absorbent and quick-drying. Delivered in three days and the packaging was completely plastic-free.",
    name: "Karan Mehta",
    place: "Homeowner · Pune",
    avatar: "/avatars/karan.svg",
    alt: "Portrait of Karan Mehta"
  },
  {
    id: "nandini",
    rating: 5,
    quote:
      "I specify WovenHaat for client projects now. Custom sizes arrive on the promised date and the colour match has never slipped.",
    name: "Nandini Rao",
    place: "Interior Designer · Hyderabad",
    avatar: "/avatars/nandini.svg",
    alt: "Portrait of Nandini Rao"
  }
];