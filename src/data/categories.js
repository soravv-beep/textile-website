/**
 * MOCK DATA — the four home-page categories.
 *
 * Drives <CategoryGrid /> on Home. `to` points at the real collection route
 * (/collections/:slug, owned by Dev 2) and `image` is requested at 900px wide
 * because the columns render full-bleed rather than inside a container.
 */
import { unsplash } from "../utils/images.js";
import { collectionPath } from "../constants/routes.js";

export const CATEGORIES = [
  {
    slug: "rugs",
    name: "Rugs",
    to: collectionPath("rugs"),
    image: unsplash("photo-1600607686527-6fb886090705", 900),
    alt: "Handloom rugs stacked in natural tones"
  },
  {
    slug: "cushions",
    name: "Cushions",
    to: collectionPath("cushions"),
    image: unsplash("photo-1584100936595-c0654b55a2e2", 900),
    alt: "Coral and tan cushion covers on a sofa"
  },
  {
    slug: "throws",
    name: "Throws",
    to: collectionPath("throws"),
    image: unsplash("photo-1616627561839-074385245ff6", 900),
    alt: "Folded woven throw blanket in warm beige"
  },
  {
    slug: "bath-mats",
    name: "Bath Mats",
    to: collectionPath("bath-mats"),
    image: unsplash("photo-1620626011761-996317b8d101", 900),
    alt: "Cotton bath mat beside a freestanding tub"
  }
];
