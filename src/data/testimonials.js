/**
 * MOCK DATA — customer reviews.
 *
 * ⚠️ DUMMY content (2 columns on desktop, stacked on mobile).
 * Replace with real reviews from the reviews service/Sheet before launch.
 * Shape: { id, rating, quote, name, place, avatar, alt }
 */
import { unsplash } from "../utils/images.js";

export const TESTIMONIALS = [
  {
    id: "ananya",
    rating: 5,
    quote:
      "The rug's texture is even better than in the photos. The colour is exactly like the DMC swatch — it settled the whole living room.",
    name: "Ananya Sharma",
    place: "Homeowner · Bengaluru",
    avatar: unsplash("photo-1544005313-94ddf0286df2", 240),
    alt: "Portrait of Ananya Sharma"
  },
  {
    id: "rekha",
    rating: 5,
    quote:
      "Ordered 40 cushion covers for my boutique. Sample approval was smooth, delivery on schedule, and quality identical across every piece.",
    name: "Rekha Textiles",
    place: "Retail Partner · Jaipur",
    avatar: unsplash("photo-1573496359142-b8d87734a5a2", 240),
    alt: "Portrait of the Rekha Textiles buyer"
  },
  {
    id: "karan",
    rating: 4,
    quote:
      "Bath mats are soft, absorbent and quick-drying. Delivered in three days and the packaging was completely plastic-free.",
    name: "Karan Mehta",
    place: "Homeowner · Pune",
    avatar: unsplash("photo-1500648767791-00dcc994a43e", 240),
    alt: "Portrait of Karan Mehta"
  },
  {
    id: "nandini",
    rating: 5,
    quote:
      "I specify WovenHaat for client projects now. Custom sizes arrive on the promised date and the colour match has never slipped.",
    name: "Nandini Rao",
    place: "Interior Designer · Hyderabad",
    avatar: unsplash("photo-1580489944761-15a19d654956", 240),
    alt: "Portrait of Nandini Rao"
  }
];
