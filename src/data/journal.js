/**
 * MOCK DATA — journal posts (home page teaser only).
 * The real /journal index and /journal/:slug article pages belong to another
 * developer; this list only powers the three-card teaser on the home page.
 */
import { unsplash } from "../utils/images.js";
import { journalPath } from "../constants/routes.js";

export const JOURNAL_POSTS = [
  {
    slug: "colours-drawn-from-real-yarn",
    to: journalPath("colours-drawn-from-real-yarn"),
    label: "Colour",
    title: "Colours drawn from real dyed yarn",
    image: unsplash("photo-1528459801416-a9e53bbf4e17", 700),
    alt: "Spools of yarn in burnt orange and turquoise"
  },
  {
    slug: "how-a-pit-loom-works",
    to: journalPath("how-a-pit-loom-works"),
    label: "Craft",
    title: "How a pit loom turns thread into texture",
    image: unsplash("photo-1591195853828-11db59a44f6b", 700),
    alt: "Weaver working at a wooden pit loom"
  },
  {
    slug: "caring-for-handwoven-textiles",
    to: journalPath("caring-for-handwoven-textiles"),
    label: "Care",
    title: "Caring for handwoven textiles, the slow way",
    image: unsplash("photo-1616486338812-3dadae4b4ace", 700),
    alt: "Styled living room with layered handwoven textiles"
  }
];

/** Instagram grid — 6 placeholder squares. `to` is a placeholder profile link. */
export const INSTAGRAM_POSTS = [
  { id: "ig1", image: unsplash("photo-1600607686527-6fb886090705", 400), alt: "Layered handwoven rugs" },
  { id: "ig2", image: unsplash("photo-1584100936595-c0654b55a2e2", 400), alt: "Coral cushion covers" },
  { id: "ig3", image: unsplash("photo-1528459801416-a9e53bbf4e17", 400), alt: "Yarn spools on a dye table" },
  { id: "ig4", image: unsplash("photo-1616627561839-074385245ff6", 400), alt: "Folded mocha throw" },
  { id: "ig5", image: unsplash("photo-1591195853828-11db59a44f6b", 400), alt: "Weaver at a pit loom" },
  { id: "ig6", image: unsplash("photo-1620626011761-996317b8d101", 400), alt: "Turquoise bath mat" }
];
