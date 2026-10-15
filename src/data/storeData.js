import { sizePrices } from "./sizePrices.js";
import { lookbookArtwork } from "./lookbookArtwork.js";

export const imageUrls = {
  hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86",
  artisan:
    "https://images.unsplash.com/photo-1766065447157-6e7c6dd83e52?auto=format&fit=crop&w=1200&q=84",
  bedroom:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=84",
};

// Existing editorial/lifestyle imagery; never used as a catalogue product photo.
const photos = [
  "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1577942199497-cdd452f1852b?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=82",
];

// Fictional demo catalogue. Images are AI-generated product mockups, not real stock photos.
// Generation: built-in Image Generation, one image per item. Prompt set:
// single square studio textile photo, matching the item name, category, color,
// fabric, shape and set quantity; ivory backdrop; no branding/text/watermarks.
// Rugs/mats: full rectangular textile; cushions: square/lumbar/bolster shapes;
// throws: folded fabric; table linen: runner/cloth or exact 4/6-piece sets;
// curtains: a complete matching panel hung from a plain rod.
// Matched local WebP assets live in public/product-images-v2/. Only this existing code file changes.
// Existing product IDs/slugs are retained for saved carts, routes and lookbook links.
const productPhotos = {
  "1": "/product-images-v2/jaipur-handwoven-cotton-rug.webp",
  "2": "/product-images-v2/malwa-textured-cushion.webp",
  "3": "/product-images-v2/kutch-handwoven-throw.webp",
  "4": "/product-images-v2/dhurrie-bath-mat.webp",
  "5": "/product-images-v2/sanganeri-table-runner.webp",
  "6": "/product-images-v2/linen-blend-curtain.webp",
  "7": "/product-images-v2/boho-jute-area-rug.webp",
  "8": "/product-images-v2/indigo-lumbar-cushion.webp",
  "9": "/product-images-v2/himalayan-wool-throw.webp",
  "10": "/product-images-v2/coral-waffle-bath-mat.webp",
  "11": "/product-images-v2/minimal-linen-napkin-set.webp",
  "12": "/product-images-v2/woven-sheer-curtain.webp",
  "13": "/product-images-v2/soft-chenille-throw.webp",
  "14": "/product-images-v2/chenille-bolster-cushion.webp",
  "15": "/product-images-v2/coral-cotton-accent-rug.webp",
  "16": "/product-images-v2/charcoal-wool-area-rug.webp",
  "17": "/product-images-v2/turquoise-cotton-dhurrie-rug.webp",
  "18": "/product-images-v2/tan-jute-runner-rug.webp",
  "19": "/product-images-v2/terracotta-cotton-cushion-cover.webp",
  "20": "/product-images-v2/white-linen-cushion-cover.webp",
  "21": "/product-images-v2/coral-chenille-floor-cushion.webp",
  "22": "/product-images-v2/turquoise-cotton-summer-throw.webp",
  "23": "/product-images-v2/natural-linen-throw.webp",
  "24": "/product-images-v2/terracotta-wool-blanket.webp",
  "25": "/product-images-v2/white-cotton-loop-bath-mat.webp",
  "26": "/product-images-v2/charcoal-chenille-bath-mat.webp",
  "27": "/product-images-v2/tan-premium-cotton-spa-mat.webp",
  "28": "/product-images-v2/mocha-cotton-pebble-bath-mat.webp",
  "29": "/product-images-v2/coral-cotton-table-runner.webp",
  "30": "/product-images-v2/charcoal-linen-tablecloth.webp",
  "31": "/product-images-v2/terracotta-linen-placemat-set.webp",
  "32": "/product-images-v2/turquoise-cotton-napkin-set.webp",
  "33": "/product-images-v2/coral-cotton-cafe-curtain.webp",
  "34": "/product-images-v2/charcoal-linen-curtain.webp",
  "35": "/product-images-v2/turquoise-cotton-curtain.webp",
  "36": "/product-images-v2/tan-linen-room-darkening-curtain.webp"
};

const rawProducts = [
  {
    "id": 1,
    "slug": "jaipur-handwoven-cotton-rug",
    "name": "Jaipur Handwoven Cotton Rug",
    "category": "Rugs",
    "material": "Cotton",
    "color": "Terracotta",
    "sizes": [
      "120 × 180 cm",
      "160 × 230 cm"
    ],
    "price": 2499,
    "oldPrice": 3199,
    "rating": 4.8,
    "reviews": 124,
    "badge": "Bestseller",
    "description": "A soft flatweave rug finished by hand in warm desert tones. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Large"
  },
  {
    "id": 2,
    "slug": "malwa-textured-cushion",
    "name": "Malwa Textured Cushion Cover",
    "category": "Cushions",
    "material": "Cotton",
    "color": "Mocha",
    "sizes": [
      "45 × 45 cm"
    ],
    "price": 799,
    "rating": 4.6,
    "reviews": 89,
    "badge": "New",
    "description": "Tactile cotton slubs and a relaxed neutral palette for easy layering. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Small"
  },
  {
    "id": 3,
    "slug": "kutch-handwoven-throw",
    "name": "Kutch Handwoven Throw",
    "category": "Throws",
    "material": "Wool",
    "color": "Coral",
    "sizes": [
      "130 × 170 cm"
    ],
    "price": 1999,
    "oldPrice": 2799,
    "rating": 4.7,
    "reviews": 102,
    "badge": "Sale",
    "description": "A warm artisan throw with rhythmic stripes and hand-knotted tassels. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Medium"
  },
  {
    "id": 4,
    "slug": "dhurrie-bath-mat",
    "name": "Dhurrie Bath Mat",
    "category": "Bath Mats",
    "material": "Cotton",
    "color": "Turquoise",
    "sizes": [
      "50 × 80 cm"
    ],
    "price": 699,
    "rating": 4.5,
    "reviews": 68,
    "badge": "New",
    "description": "Quick-drying woven cotton with a soft, substantial underfoot feel. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Medium"
  },
  {
    "id": 5,
    "slug": "sanganeri-table-runner",
    "name": "Sanganeri Table Runner",
    "category": "Table Linen",
    "material": "Linen",
    "color": "Tan",
    "sizes": [
      "40 × 150 cm",
      "40 × 180 cm"
    ],
    "price": 1299,
    "rating": 4.7,
    "reviews": 50,
    "badge": "Bestseller",
    "description": "Block-inspired motifs meet an easy-wash linen-cotton base. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Medium"
  },
  {
    "id": 6,
    "slug": "linen-blend-curtain",
    "name": "Linen Blend Curtain",
    "category": "Curtains",
    "material": "Linen",
    "color": "Natural",
    "sizes": [
      "112 × 213 cm",
      "112 × 274 cm"
    ],
    "price": 2199,
    "rating": 4.6,
    "reviews": 74,
    "badge": "New",
    "description": "Airy light-filtering curtains with a naturally textured fall. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Large"
  },
  {
    "id": 7,
    "slug": "boho-jute-area-rug",
    "name": "Boho Jute Area Rug",
    "category": "Rugs",
    "material": "Jute",
    "color": "Natural",
    "sizes": [
      "120 × 180 cm",
      "160 × 230 cm"
    ],
    "price": 3499,
    "rating": 4.9,
    "reviews": 143,
    "badge": "Bestseller",
    "description": "Braided natural jute brings earthy structure to relaxed rooms. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Large"
  },
  {
    "id": 8,
    "slug": "indigo-lumbar-cushion",
    "name": "Indigo Lumbar Cushion",
    "category": "Cushions",
    "material": "Cotton",
    "color": "Indigo",
    "sizes": [
      "30 × 50 cm"
    ],
    "price": 899,
    "rating": 4.5,
    "reviews": 37,
    "badge": "New",
    "description": "A long accent cushion inspired by hand-dyed indigo textiles. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Small"
  },
  {
    "id": 9,
    "slug": "himalayan-wool-throw",
    "name": "Himalayan Wool Throw",
    "category": "Throws",
    "material": "Wool",
    "color": "Mocha",
    "sizes": [
      "140 × 180 cm"
    ],
    "price": 2899,
    "rating": 4.8,
    "reviews": 61,
    "badge": "Limited",
    "description": "Lightweight warmth in soft mocha with fine hand-finished edges. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Large"
  },
  {
    "id": 10,
    "slug": "coral-waffle-bath-mat",
    "name": "Coral Waffle Bath Mat",
    "category": "Bath Mats",
    "material": "Cotton",
    "color": "Coral",
    "sizes": [
      "50 × 80 cm"
    ],
    "price": 749,
    "oldPrice": 999,
    "rating": 4.4,
    "reviews": 44,
    "badge": "Sale",
    "description": "A plush waffle weave that adds colour without overwhelming. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Medium"
  },
  {
    "id": 11,
    "slug": "minimal-linen-napkin-set",
    "name": "Minimal Linen Napkin Set",
    "category": "Table Linen",
    "material": "Linen",
    "color": "Natural",
    "sizes": [
      "Set of 4"
    ],
    "price": 1099,
    "rating": 4.7,
    "reviews": 29,
    "badge": "New",
    "description": "Four stonewashed napkins with a relaxed, naturally crinkled finish. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Set"
  },
  {
    "id": 12,
    "slug": "woven-sheer-curtain",
    "name": "Woven Sheer Curtain",
    "category": "Curtains",
    "material": "Cotton",
    "color": "White",
    "sizes": [
      "112 × 213 cm"
    ],
    "price": 1799,
    "rating": 4.6,
    "reviews": 56,
    "badge": "Bestseller",
    "description": "Soft diffusion and a subtle dobby stripe for calm, light-filled rooms. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Large"
  },
  {
    "id": 13,
    "slug": "soft-chenille-throw",
    "name": "Soft Chenille Throw",
    "category": "Throws",
    "material": "Chenille",
    "color": "Charcoal",
    "sizes": [
      "130 × 180 cm"
    ],
    "price": 2299,
    "rating": 4.7,
    "reviews": 38,
    "badge": "New",
    "description": "A plush chenille throw with a velvety hand and a deep, grounded tone. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Medium"
  },
  {
    "id": 14,
    "slug": "chenille-bolster-cushion",
    "name": "Chenille Bolster Cushion",
    "category": "Cushions",
    "material": "Chenille",
    "color": "Tan",
    "sizes": [
      "25 × 60 cm"
    ],
    "price": 999,
    "rating": 4.6,
    "reviews": 21,
    "badge": "New",
    "description": "A cylindrical bolster in tactile chenille that finishes a sofa corner. Demo catalogue item; AI-generated product photo.",
    "sizeClass": "Medium"
  },
  {
    "id": 15,
    "slug": "coral-cotton-accent-rug",
    "name": "Coral Cotton Accent Rug",
    "category": "Rugs",
    "material": "Cotton",
    "color": "Coral",
    "sizes": [
      "60 × 90 cm",
      "80 × 120 cm"
    ],
    "price": 899,
    "rating": 3.9,
    "reviews": 12,
    "badge": "New",
    "sizeClass": "Small",
    "description": "A compact coral flatweave rug with natural fringed ends. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 16,
    "slug": "charcoal-wool-area-rug",
    "name": "Charcoal Wool Area Rug",
    "category": "Rugs",
    "material": "Wool",
    "color": "Charcoal",
    "sizes": [
      "160 × 230 cm",
      "200 × 300 cm"
    ],
    "price": 5999,
    "rating": 4.9,
    "reviews": 19,
    "badge": "Bestseller",
    "sizeClass": "Large",
    "description": "A dark charcoal wool rug with a plush low pile and subtle tonal border. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 17,
    "slug": "turquoise-cotton-dhurrie-rug",
    "name": "Turquoise Cotton Dhurrie Rug",
    "category": "Rugs",
    "material": "Cotton",
    "color": "Turquoise",
    "sizes": [
      "90 × 150 cm",
      "120 × 180 cm"
    ],
    "price": 1799,
    "rating": 4.3,
    "reviews": 26,
    "badge": "Sale",
    "sizeClass": "Medium",
    "description": "A turquoise cotton dhurrie with narrow ivory stripes and fringed ends. Demo catalogue item; AI-generated product photo.",
    "oldPrice": 2299
  },
  {
    "id": 18,
    "slug": "tan-jute-runner-rug",
    "name": "Tan Jute Runner Rug",
    "category": "Rugs",
    "material": "Jute",
    "color": "Tan",
    "sizes": [
      "60 × 180 cm",
      "70 × 240 cm"
    ],
    "price": 3299,
    "rating": 4.6,
    "reviews": 33,
    "badge": "Limited",
    "sizeClass": "Large",
    "description": "A long tan jute runner with a dense braided texture. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 19,
    "slug": "terracotta-cotton-cushion-cover",
    "name": "Terracotta Cotton Cushion Cover",
    "category": "Cushions",
    "material": "Cotton",
    "color": "Terracotta",
    "sizes": [
      "40 × 40 cm",
      "45 × 45 cm"
    ],
    "price": 449,
    "rating": 3.8,
    "reviews": 40,
    "badge": "New",
    "sizeClass": "Small",
    "description": "A plain terracotta square cotton cushion cover with piped edges. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 20,
    "slug": "white-linen-cushion-cover",
    "name": "White Linen Cushion Cover",
    "category": "Cushions",
    "material": "Linen",
    "color": "White",
    "sizes": [
      "50 × 50 cm"
    ],
    "price": 1299,
    "rating": 4.4,
    "reviews": 47,
    "badge": "Bestseller",
    "sizeClass": "Medium",
    "description": "A white square linen cushion cover with a natural slub texture. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 21,
    "slug": "coral-chenille-floor-cushion",
    "name": "Coral Chenille Floor Cushion",
    "category": "Cushions",
    "material": "Chenille",
    "color": "Coral",
    "sizes": [
      "60 × 60 cm",
      "70 × 70 cm"
    ],
    "price": 2799,
    "rating": 4.8,
    "reviews": 54,
    "badge": "Sale",
    "sizeClass": "Large",
    "description": "A generously sized coral chenille floor cushion with soft quilted channels. Demo catalogue item; AI-generated product photo.",
    "oldPrice": 3599
  },
  {
    "id": 22,
    "slug": "turquoise-cotton-summer-throw",
    "name": "Turquoise Cotton Summer Throw",
    "category": "Throws",
    "material": "Cotton",
    "color": "Turquoise",
    "sizes": [
      "100 × 140 cm",
      "120 × 150 cm"
    ],
    "price": 999,
    "rating": 3.9,
    "reviews": 61,
    "badge": "Limited",
    "sizeClass": "Small",
    "description": "A lightweight turquoise cotton throw with ivory tassels. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 23,
    "slug": "natural-linen-throw",
    "name": "Natural Linen Throw",
    "category": "Throws",
    "material": "Linen",
    "color": "Natural",
    "sizes": [
      "130 × 180 cm",
      "150 × 200 cm"
    ],
    "price": 3199,
    "rating": 4.9,
    "reviews": 68,
    "badge": "New",
    "sizeClass": "Large",
    "description": "An undyed natural beige linen throw with a soft crinkled weave. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 24,
    "slug": "terracotta-wool-blanket",
    "name": "Terracotta Wool Blanket",
    "category": "Throws",
    "material": "Wool",
    "color": "Terracotta",
    "sizes": [
      "150 × 200 cm",
      "180 × 220 cm"
    ],
    "price": 4599,
    "rating": 4.6,
    "reviews": 75,
    "badge": "Bestseller",
    "sizeClass": "Large",
    "description": "A warm terracotta wool blanket with a broad woven border. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 25,
    "slug": "white-cotton-loop-bath-mat",
    "name": "White Cotton Loop Bath Mat",
    "category": "Bath Mats",
    "material": "Cotton",
    "color": "White",
    "sizes": [
      "40 × 60 cm",
      "50 × 80 cm"
    ],
    "price": 399,
    "rating": 3.9,
    "reviews": 82,
    "badge": "Sale",
    "sizeClass": "Small",
    "description": "A compact white cotton bath mat with raised absorbent loops. Demo catalogue item; AI-generated product photo.",
    "oldPrice": 599
  },
  {
    "id": 26,
    "slug": "charcoal-chenille-bath-mat",
    "name": "Charcoal Chenille Bath Mat",
    "category": "Bath Mats",
    "material": "Chenille",
    "color": "Charcoal",
    "sizes": [
      "50 × 80 cm",
      "60 × 90 cm"
    ],
    "price": 1099,
    "rating": 4.6,
    "reviews": 89,
    "badge": "Limited",
    "sizeClass": "Medium",
    "description": "A charcoal bath mat with plush chenille noodles and a bound edge. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 27,
    "slug": "tan-premium-cotton-spa-mat",
    "name": "Tan Premium Cotton Spa Mat",
    "category": "Bath Mats",
    "material": "Cotton",
    "color": "Tan",
    "sizes": [
      "60 × 120 cm",
      "70 × 140 cm"
    ],
    "price": 2799,
    "rating": 4.9,
    "reviews": 96,
    "badge": "New",
    "sizeClass": "Large",
    "description": "A long thick tan cotton spa mat with a ribbed loop texture. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 28,
    "slug": "mocha-cotton-pebble-bath-mat",
    "name": "Mocha Cotton Pebble Bath Mat",
    "category": "Bath Mats",
    "material": "Cotton",
    "color": "Mocha",
    "sizes": [
      "50 × 80 cm",
      "60 × 90 cm"
    ],
    "price": 899,
    "rating": 4.2,
    "reviews": 103,
    "badge": "Bestseller",
    "sizeClass": "Medium",
    "description": "A light mocha cotton mat with raised pebble-shaped tufting. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 29,
    "slug": "coral-cotton-table-runner",
    "name": "Coral Cotton Table Runner",
    "category": "Table Linen",
    "material": "Cotton",
    "color": "Coral",
    "sizes": [
      "30 × 120 cm",
      "40 × 150 cm"
    ],
    "price": 599,
    "rating": 3.9,
    "reviews": 110,
    "badge": "Sale",
    "sizeClass": "Small",
    "description": "A coral cotton table runner with small ivory stripes at each end. Demo catalogue item; AI-generated product photo.",
    "oldPrice": 799
  },
  {
    "id": 30,
    "slug": "charcoal-linen-tablecloth",
    "name": "Charcoal Linen Tablecloth",
    "category": "Table Linen",
    "material": "Linen",
    "color": "Charcoal",
    "sizes": [
      "150 × 220 cm",
      "180 × 260 cm"
    ],
    "price": 2799,
    "rating": 4.9,
    "reviews": 117,
    "badge": "Limited",
    "sizeClass": "Large",
    "description": "A charcoal linen tablecloth with a soft natural drape and hemmed edges. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 31,
    "slug": "terracotta-linen-placemat-set",
    "name": "Terracotta Linen Placemat Set",
    "category": "Table Linen",
    "material": "Linen",
    "color": "Terracotta",
    "sizes": [
      "Set of 4 · 35 × 45 cm each"
    ],
    "price": 899,
    "rating": 4.4,
    "reviews": 124,
    "badge": "New",
    "sizeClass": "Set",
    "description": "Four rectangular terracotta linen placemats with a simple stitched border. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 32,
    "slug": "turquoise-cotton-napkin-set",
    "name": "Turquoise Cotton Napkin Set",
    "category": "Table Linen",
    "material": "Cotton",
    "color": "Turquoise",
    "sizes": [
      "Set of 6 · 40 × 40 cm each"
    ],
    "price": 1199,
    "rating": 4.7,
    "reviews": 131,
    "badge": "Bestseller",
    "sizeClass": "Set",
    "description": "Six turquoise cotton napkins with a neat hem and soft woven finish. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 33,
    "slug": "coral-cotton-cafe-curtain",
    "name": "Coral Cotton Cafe Curtain",
    "category": "Curtains",
    "material": "Cotton",
    "color": "Coral",
    "sizes": [
      "112 × 120 cm",
      "112 × 150 cm"
    ],
    "price": 699,
    "rating": 3.9,
    "reviews": 138,
    "badge": "Sale",
    "sizeClass": "Small",
    "description": "A short coral cotton cafe curtain with a simple rod pocket. Demo catalogue item; AI-generated product photo.",
    "oldPrice": 999
  },
  {
    "id": 34,
    "slug": "charcoal-linen-curtain",
    "name": "Charcoal Linen Curtain",
    "category": "Curtains",
    "material": "Linen",
    "color": "Charcoal",
    "sizes": [
      "112 × 244 cm",
      "112 × 274 cm"
    ],
    "price": 3499,
    "rating": 4.8,
    "reviews": 145,
    "badge": "Limited",
    "sizeClass": "Large",
    "description": "A full-length charcoal linen curtain with a textured woven drape. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 35,
    "slug": "turquoise-cotton-curtain",
    "name": "Turquoise Cotton Curtain",
    "category": "Curtains",
    "material": "Cotton",
    "color": "Turquoise",
    "sizes": [
      "112 × 183 cm",
      "112 × 213 cm"
    ],
    "price": 1499,
    "rating": 4.3,
    "reviews": 152,
    "badge": "New",
    "sizeClass": "Medium",
    "description": "A turquoise cotton curtain with simple sewn pleats and a soft fall. Demo catalogue item; AI-generated product photo."
  },
  {
    "id": 36,
    "slug": "tan-linen-room-darkening-curtain",
    "name": "Tan Linen Room-Darkening Curtain",
    "category": "Curtains",
    "material": "Linen",
    "color": "Tan",
    "sizes": [
      "112 × 244 cm",
      "112 × 274 cm"
    ],
    "price": 4299,
    "rating": 4.9,
    "reviews": 159,
    "badge": "Bestseller",
    "sizeClass": "Large",
    "description": "A tan linen-blend curtain with an opaque lining for a room-darkening demo. Demo catalogue item; AI-generated product photo."
  }
];

/* ------------------------------------------------------------------ */
/* Colour system – six DMC thread shades from the project document     */
/* ------------------------------------------------------------------ */
export const dmcPalette = [
  {
    code: "DMC 844",
    name: "Ultra Dark Beaver Gray",
    hex: "#3F3A38",
    css: "var(--ink)",
    use: "Text, headings, footer",
  },
  {
    code: "DMC 900",
    name: "Dark Burnt Orange",
    hex: "#C8421F",
    css: "var(--orange)",
    use: "Buttons, key highlights",
  },
  {
    code: "DMC 436",
    name: "Tan",
    hex: "#C08F4A",
    css: "var(--tan)",
    use: "Accents, badges, ratings",
  },
  {
    code: "DMC 352",
    name: "Light Coral",
    hex: "#EE8F80",
    css: "var(--coral)",
    use: "Sale tags, soft highlights",
  },
  {
    code: "DMC 3866",
    name: "Ultra Very Light Mocha",
    hex: "#F0EBE3",
    css: "var(--mocha)",
    use: "Page background, sections",
  },
  {
    code: "DMC 597",
    name: "Turquoise",
    hex: "#5C9FAE",
    css: "var(--turquoise)",
    use: "Links, info, focus",
  },
];

/* Product colour name -> brand swatch + DMC thread code */
export const colorSwatches = {
  Indigo: { dmc: "Sample indigo shade", css: "#29445D" },
  Terracotta: { dmc: "DMC 900", css: "var(--orange)" },
  Tan: { dmc: "DMC 436", css: "var(--tan)" },
  Coral: { dmc: "DMC 352", css: "var(--coral)" },
  Mocha: { dmc: "DMC 3866", css: "var(--mocha)" },
  Turquoise: { dmc: "DMC 597", css: "var(--turquoise)" },
  Charcoal: { dmc: "DMC 844", css: "var(--ink)" },
  Natural: {
    dmc: "Undyed",
    css: "color-mix(in srgb, var(--tan) 28%, var(--mocha))",
  },
  White: { dmc: "Undyed", css: "#ffffff" },
};
export const colorNames = Object.keys(colorSwatches);

/* ------------------------------------------------------------------ */
/* Fabric details shown on the product page (demo data)                */
/* ------------------------------------------------------------------ */
const weaveByMaterial = {
  Cotton: "Hand-loomed flatweave",
  Wool: "Handloom twill",
  Jute: "Braided natural jute",
  Linen: "Plain weave, stonewashed",
  Chenille: "Cut-pile chenille",
};
const careByMaterial = {
  Cotton: "Machine wash cold on a gentle cycle. Dry flat or in shade.",
  Wool: "Dry clean or hand wash cold with wool detergent. Dry flat.",
  Jute: "Vacuum gently. Spot clean with a damp cloth only. Keep dry.",
  Linen: "Wash cold, tumble dry low and iron while damp for a crisp finish.",
  Chenille: "Spot clean or dry clean. Brush gently along the pile direction.",
};
const pileByCategory = {
  Rugs: "Low pile · about 6 mm",
  Cushions: "Textured surface",
  Throws: "Brushed finish",
  "Bath Mats": "Terry loop · about 8 mm",
  "Table Linen": "Flat, no pile",
  Curtains: "Flat, no pile",
};
const weightByCategory = {
  Rugs: "2.4 kg per m²",
  Cushions: "320 g (cover)",
  Throws: "850 g",
  "Bath Mats": "1.1 kg per m²",
  "Table Linen": "180 gsm",
  Curtains: "220 gsm",
};

export const products = rawProducts.map((product) => ({
  ...product,
  sizePrices: sizePrices[product.id],
  price: sizePrices[product.id]?.[product.sizes[0]] ?? product.price,
  sizeClass: product.sizeClass,
  image: productPhotos[product.id],
  // A matching second thumbnail; no unrelated lifestyle image is substituted.
  altImage: productPhotos[product.id],
  imageKind: "AI-generated demo product photo",
  dmc: colorSwatches[product.color]?.dmc ?? "—",
  fabric: {
    material: product.material,
    weave: weaveByMaterial[product.material],
    pile: pileByCategory[product.category],
    weight: weightByCategory[product.category],
    care: careByMaterial[product.material],
  },
}));

export const categories = [
  {
    name: "Rugs",
    slug: "rugs",
    image: productPhotos[1],
    description: "Ground a room with texture and craft.",
  },
  {
    name: "Cushions",
    slug: "cushions",
    image: productPhotos[2],
    description: "Small layers with a considered story.",
  },
  {
    name: "Throws",
    slug: "throws",
    image: productPhotos[3],
    description: "Comfort woven in natural fibres.",
  },
  {
    name: "Bath Mats",
    slug: "bath-mats",
    image: productPhotos[4],
    description: "Soft, absorbent and easy to live with.",
  },
  {
    name: "Table Linen",
    slug: "table-linen",
    image: productPhotos[5],
    description: "Bring relaxed craft to every meal.",
  },
  {
    name: "Curtains",
    slug: "curtains",
    image: productPhotos[6],
    description: "Filter light with an effortless drape.",
  },
];

export const collections = [
  {
    name: "Boho Collection",
    slug: "boho",
    group: "Themed",
    image: imageUrls.hero,
    description:
      "Earthy textures, artisan weaves and relaxed pattern for a warm, collected home.",
    match: ["Rugs", "Cushions", "Throws"],
  },
  {
    name: "Minimal Collection",
    slug: "minimal",
    group: "Themed",
    image: imageUrls.bedroom,
    description:
      "Quiet tones and honest materials designed for calm everyday spaces.",
    match: ["Curtains", "Table Linen", "Cushions"],
  },
  {
    name: "Classic Craft",
    slug: "classic",
    group: "Themed",
    image: photos[6],
    description: "Time-honoured patterns reworked for modern Indian homes.",
    match: ["Rugs", "Table Linen", "Curtains"],
  },
  {
    name: "Festive Edit",
    slug: "festive",
    group: "Seasonal",
    image: photos[9],
    description: "Colour-rich layers and tactile details for gathering season.",
    match: ["Cushions", "Throws", "Table Linen"],
  },
  {
    name: "Monsoon Comfort",
    slug: "monsoon",
    group: "Seasonal",
    image: photos[11],
    description:
      "Easy-care light layers and quick-drying cottons for rainy days.",
    match: ["Bath Mats", "Curtains", "Cushions"],
  },
  {
    name: "Winter Weaves",
    slug: "winter",
    group: "Seasonal",
    image: photos[8],
    description: "Wool-rich warmth and deeper tones for cooler evenings.",
    match: ["Throws", "Rugs", "Cushions"],
  },
];

export const coupons = {
  WELCOME10: { type: "percent", value: 10 },
  FLAT500: { type: "flat", value: 500, minOrder: 2000 },
  FREESHIP: { type: "shipping" },
};

export const FREE_SHIPPING_THRESHOLD = 2999;
export const STANDARD_SHIPPING = 99;
export const EXPRESS_SHIPPING = 199;
export const COD_FEE = 49;

export const certifications = [
  { id: 1, name: "Global Organic Textile Standard", short: "GOTS" },
  { id: 2, name: "OEKO-TEX Standard 100", short: "OEKO-TEX" },
  { id: 3, name: "Fair Trade Certified", short: "Fair Trade" },
  { id: 4, name: "Handloom Mark", short: "Handloom" },
];

export const socialLinks = [
  { name: "Instagram", href: "#", ariaLabel: "Instagram (profile URL not configured)", icon: "InstagramIcon" },
  { name: "Facebook", href: "#", ariaLabel: "Facebook (profile URL not configured)", icon: "FacebookIcon" },
  { name: "Pinterest", href: "#", ariaLabel: "Pinterest (profile URL not configured)", icon: "PinterestIcon" },
  { name: "YouTube", href: "#", ariaLabel: "YouTube (profile URL not configured)", icon: "YoutubeIcon" },
];