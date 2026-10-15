/**
 * MOCK DATA — product categories (home page tiles).
 * Links to /collections#<slug>. Dev 2 owns the real collections page.
 */
import { unsplash } from "../utils/images.js";
import { collectionPath } from "../constants/routes.js";

export const CATEGORIES = [
  {
    slug: "rugs",
    name: "Rugs",
    to: collectionPath("rugs"),
    image: unsplash("photo-1600607686527-6fb886090705", 600),
    alt: "Handloom rugs stacked in natural tones"
  },
  {
    slug: "cushions",
    name: "Cushions",
    to: collectionPath("cushions"),
    image: unsplash("photo-1584100936595-c0654b55a2e2", 600),
    alt: "Coral and tan cushion covers on a sofa"
  },
  {
    slug: "throws",
    name: "Throws",
    to: collectionPath("throws"),
    image: unsplash("photo-1616627561839-074385245ff6", 600),
    alt: "Folded woven throw blanket in warm beige"
  },
  {
    slug: "bath-mats",
    name: "Bath Mats",
    to: collectionPath("bath-mats"),
    image: unsplash("photo-1620626011761-996317b8d101", 600),
    alt: "Cotton bath mat beside a freestanding tub"
  }
];
