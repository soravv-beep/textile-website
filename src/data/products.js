/**
 * MOCK DATA — products.
 *
 * ⚠️ TEMPORARY. Dev 2 owns the real product data + <ProductCard />.
 * The Home page renders these through `src/components/ProductCardStub.jsx`,
 * which is a clearly-marked stub. When Dev 2 ships the real card:
 *   1. delete ProductCardStub.jsx,
 *   2. import the real ProductCard in Home.jsx instead,
 *   3. replace this file with the API/store-backed source.
 * The object shape below is the contract the stub expects:
 *   { slug, name, image, alt, ecoBadge, badge, rating, reviews, price, was?, stock }
 */
import { unsplash } from "../utils/images.js";

export const BESTSELLERS = [
  {
    slug: "bhujodi-terracotta-rug",
    name: "Bhujodi Terracotta Rug",
    image: unsplash("photo-1600166898405-da9535204843", 500),
    alt: "Terracotta handloom flatweave rug",
    ecoBadge: "OEKO-TEX",
    badge: "best",
    rating: 4.5,
    reviews: 128,
    price: 4890,
    was: 6100,
    stock: 10
  },
  {
    slug: "coral-loom-cushion-set",
    name: "Coral Loom Cushion Set",
    image: unsplash("photo-1584100936595-c0654b55a2e2", 500),
    alt: "Coral cotton cushion cover pair",
    ecoBadge: "GOTS",
    badge: "new",
    rating: 5,
    reviews: 86,
    price: 1290,
    was: null,
    stock: 10
  },
  {
    slug: "mocha-handloom-throw",
    name: "Mocha Handloom Throw",
    image: unsplash("photo-1616627561839-074385245ff6", 500),
    alt: "Mocha wool blend throw blanket",
    ecoBadge: "GRS",
    badge: null,
    rating: 4,
    reviews: 54,
    price: 2450,
    was: null,
    stock: 10
  },
  {
    slug: "turquoise-ribbed-bath-mat",
    name: "Turquoise Ribbed Bath Mat",
    image: unsplash("photo-1620626011761-996317b8d101", 500),
    alt: "Turquoise striped cotton bath mat",
    ecoBadge: "OEKO-TEX",
    badge: "sale",
    rating: 4.5,
    reviews: 73,
    price: 890,
    was: 1150,
    stock: 10
  }
];
