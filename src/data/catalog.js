import { sizePrices } from "./sizePrices.js";

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
  "1": "/product-images-v2/jaipur-handwoven-cotton-rug-room-image.jpg",
  "2": "/product-images-v2/malwa-textured-cushion.jpg",
  "3": "/product-images-v2/kutch-handwoven-throw.jpg",
  "4": "/product-images-v2/dhurrie-bath-mat.jpg",
  "5": "/product-images-v2/sanganeri-table-runner.webp",
  "6": "/product-images-v2/linen-blend-curtain.webp",
  "7": "/product-images-v2/boho-jute-area-rug.jpg",
  "8": "/product-images-v2/indigo-lumbar-cushion.avif",
  "9": "/product-images-v2/himalayan-wool-throw.webp",
  "10": "/product-images-v2/coral-waffle-bath-mat.avif",
  "11": "/product-images-v2/minimal-linen-napkin-set.avif",
  "12": "/product-images-v2/woven-sheer-curtain.webp",
  "13": "/product-images-v2/soft-chenille-throw.jpg",
  "14": "/product-images-v2/chenille-bolster-cushion.jpg",
  "15": "/product-images-v2/coral-cotton-accent-rug.jpg",
  "16": "/product-images-v2/charcoal-wool-area-rug..webp",
  "17": "/product-images-v2/turquoise-cotton-dhurrie-rug.webp",
  "18": "/product-images-v2/tan-jute-runner-rug.avif",
  "19": "/product-images-v2/terracotta-cotton-cushion-cover.jpg",
  "20": "/product-images-v2/white-linen-cushion-cover.webp",
  "21": "/product-images-v2/coral-chenille-floor-cushion.jpg",
  "22": "/product-images-v2/turquoise-cotton-summer-throw.jpg",
  "23": "/product-images-v2/natural-linen-throw.jpg",
  "24": "/product-images-v2/terracotta-wool-blanket.webp",
  "25": "/product-images-v2/white-cotton-loop-bath-mat.webp",
  "26": "/product-images-v2/charcoal-chenille-bath-mat.jpg",
  "27": "/product-images-v2/tan-premium-cotton-spa-mat.webp",
  "28": "/product-images-v2/mocha-cotton-pebble-bath-mat.jpg",
  "29": "/product-images-v2/coral-cotton-table-runner.webp",
  "30": "/product-images-v2/charcoal-linen-tablecloth.avif",
  "31": "/product-images-v2/terracotta-linen-placemat-set.webp",
  "32": "/product-images-v2/turquoise-cotton-napkin-set.jpg",
  "33": "/product-images-v2/coral-cotton-cafe-curtain.avif",
  "34": "/product-images-v2/charcoal-linen-curtain.avif",
  "35": "/product-images-v2/turquoise-cotton-curtain.jpg",
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
    "longDescription": "Handwoven in the traditional flatweave style of Jaipur, this cotton rug brings the warmth of Rajasthan's desert landscape into your home. The terracotta hue is achieved through natural dyeing processes, creating subtle tonal variations that make each piece unique. The flatweave construction offers a low profile that works beautifully under furniture and in high-traffic areas, while the 100% cotton fibres provide a soft, breathable surface that's gentle underfoot. Finished with hand-knotted fringes on both ends, this rug represents generations of artisanal skill passed down through weaving families. Easy to maintain and naturally durable, it's an investment in everyday beauty that ages gracefully with use.",
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
    "longDescription": "Woven on traditional handlooms in the Malwa region, this cushion cover celebrates the beauty of imperfection. The cotton yarns feature natural slubs — tiny thickened knots that create a subtle, organic texture across the surface. In a versatile mocha tone that bridges warm and cool neutrals, it layers effortlessly with patterned textiles, solid linens, or velvet accents. The envelope closure at the back keeps the insert secure while allowing easy removal for washing. Each cover bears the mark of its maker through slight variations in weave density and colour depth, a testament to the slow, intentional craft of handloom weaving. Pair with the matching throw for a cohesive look, or mix with contrasting textures for curated depth.",
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
    "longDescription": "Born from the centuries-old weaving traditions of Kutch, Gujarat, this wool throw carries the rhythmic geometry of desert horizons in its stripes. The coral hue — a modern interpretation of traditional madder root dyes — adds unexpected warmth to neutral interiors. Woven from locally sourced wool, it offers lightweight insulation that's breathable enough for year-round use. The hand-knotted tassels at each end are finished individually, a detail that requires hours of patient work. The medium weight makes it equally suited for draping over a sofa, folding at the foot of a bed, or wrapping around your shoulders on a chilly evening. Natural wool fibres resist odours and regulate temperature, meaning less washing and more living with this piece.",
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
    "longDescription": "Inspired by the traditional Indian dhurrie — a flatwoven rug style known for its durability and reversible design — this bath mat brings that same hardworking spirit to your bathroom. Woven from 100% cotton in a tight flatweave, it absorbs water quickly and dries fast, preventing the musty odour common with thicker pile mats. The turquoise colour brings a bright, invigorating energy to morning routines, while the natural cotton fibres feel soft and grounding underfoot. Finished with a simple bound edge that withstands repeated washing, this mat is designed for the rhythms of daily life. At 50 × 80 cm, it fits neatly beside a bathtub or vanity. Machine washable and tumble dry friendly.",
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
    "longDescription": "A celebration of Sanganer's 400-year-old block printing heritage, reimagined for the modern table. The subtle motifs are inspired by traditional floral butas (paisley-like forms) that once adorned royal textiles, here rendered in a tone-on-tone tan that feels contemporary rather than ornamental. The linen-cotton blend combines the crisp elegance of linen with the softness and washability of cotton — it emerges from the machine looking lived-in, not wrinkled. At 40 cm wide, it proportions beautifully on tables from compact breakfast nooks to extended dining surfaces. The hemmed edges are finished with a clean double stitch for durability. Style with natural ceramics, brass flatware, or simple white plates for an effortless tablescape.",
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
    "longDescription": "Designed to filter light rather than block it, these curtains transform harsh daylight into a soft, diffused glow that flatters every interior. The linen-blend fabric retains the characteristic slubby texture and natural lustre of pure linen while offering improved drape and reduced wrinkling. In an undyed natural shade, they complement any colour palette — from cool greys to warm terracottas — and develop a beautiful patina over time. The rod pocket header creates gentle, even gathers that hang in relaxed folds. Available in two lengths to suit standard and high ceilings. Unlined for maximum light permeability; pair with a blackout liner if needed for bedrooms. Machine washable on a gentle cycle.",
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
    "longDescription": "Hand-braided from 100% natural jute fibre, this area rug embodies the raw, organic aesthetic of bohemian interiors. Jute — one of the world's most sustainable fibres — grows rapidly with minimal water and no pesticides, making this rug an eco-conscious choice. The tight braided construction creates a dense, durable surface that withstands heavy foot traffic while maintaining a pleasing texture underfoot. The natural golden-beige hue varies subtly across the surface, a result of the fibre's inherent colour variation. Finished with bound edges to prevent fraying. The low profile (approximately 8mm) slides easily under furniture and doorways. As a natural plant fibre, jute prefers dry conditions — avoid prolonged moisture exposure. Vacuum regularly without a beater bar.",
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
    "longDescription": "The rectangular lumbar profile (30 × 50 cm) makes this cushion ideal for lower back support on sofas, armchairs, or daybeds. The deep indigo colour references India's ancient indigo dyeing traditions — a craft that once coloured textiles traded across the Silk Road. Woven from cotton on handlooms, the fabric develops a beautiful fade over time, much like well-loved denim, revealing lighter blue undertones at the high points of the weave. The hidden zip closure allows easy insert removal for washing. The solid colour makes it a versatile anchor for patterned throws or a striking contrast against neutral upholstery. Each piece shows slight variations in dye saturation, a hallmark of the hand-dyeing process.",
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
    "longDescription": "Woven from the fine wool of Himalayan sheep, this throw offers exceptional warmth-to-weight ratio — substantial enough for winter nights, light enough for year-round comfort. The mocha brown is achieved through natural dyeing using walnut husks and iron mordants, a process that yields rich, complex colour without synthetic chemicals. The generous 140 × 180 cm dimensions allow full coverage whether draped over a king-size bed or shared on a sectional sofa. Hand-finished edges with a rolled hem detail showcase the weaver's attention to detail. Wool's natural lanolin content provides water resistance and odour resistance, while the fibre structure regulates temperature and wicks moisture. Dry clean recommended to preserve the hand-finished edges.",
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
    "longDescription": "The waffle weave — a classic textile structure with a three-dimensional grid of recessed squares — creates exceptional surface area for water absorption while allowing air to circulate, so the mat dries quickly between uses. Woven from long-staple cotton for a plush, substantial hand feel that's gentle on bare feet. The coral hue brings a pop of energising colour to neutral bathroom palettes without dominating the space. At 50 × 80 cm, it fits perfectly in front of a single vanity or beside a bathtub. Finished with a clean bound edge that resists fraying through repeated machine washing. The weight (approximately 400 GSM) strikes the ideal balance between absorbency and quick-dry performance. Tumble dry low for best results.",
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
    "longDescription": "Stonewashed for immediate softness — these napkins skip the stiff, starched phase and arrive ready to use with a relaxed, lived-in texture that only improves with each wash. The natural undyed linen showcases the fibre's inherent beauty: subtle tonal variations, occasional slubs, and a gentle lustre that catches candlelight beautifully. At approximately 45 × 45 cm each, they're generously sized for both casual meals and formal settings. The rolled hem is hand-stitched for durability and a refined finish. Linen's natural antimicrobial properties and high absorbency make it the ideal dining textile — it absorbs spills quickly and releases stains easily. Machine washable; line dry for the crispiest hand, or tumble dry for maximum softness. Set of 4.",
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
    "longDescription": "A sheer curtain that transforms direct sunlight into a luminous, shadow-free glow — the kind of light that makes a room feel larger and more serene. The cotton dobby weave incorporates a whisper-fine vertical stripe that adds structure without visual weight, creating a subtle play of opacity as the fabric moves. The white-on-white palette ensures these curtains disappear into the architecture, letting views and light take centre stage. The rod pocket header gathers into soft, even folds that hang beautifully from ceiling to floor. At 213 cm length, they suit standard ceiling heights; for taller windows, they create a graceful puddle at the hem. Unlined by design for maximum light transmission. Machine washable on delicate cycle.",
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
    "longDescription": "Chenille — French for 'caterpillar' — describes the fuzzy, tufted yarn that gives this throw its signature velvety texture. Each yarn is constructed with a central core wrapped in short, soft piles that stand perpendicular, creating a surface that catches and reflects light with a subtle iridescence. In deep charcoal, the pile creates tonal depth that shifts between near-black and warm grey depending on the light angle. The generous 130 × 180 cm size wraps comfortably around two people or folds neatly at the end of a bed. Despite its luxurious hand, chenille is remarkably durable — the tufted construction resists pilling and maintains its plushness through years of use. Machine washable on gentle cycle; air dry flat to preserve the pile structure.",
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
    "longDescription": "The cylindrical bolster form (25 cm diameter × 60 cm length) serves both function and aesthetics — it provides lumbar support when seated, props up a book in bed, and adds architectural interest to a sofa arrangement. Woven from the same tufted chenille yarn as our throws, the surface has a luxurious, caterpillar-soft pile that invites touch. The warm tan shade — a timeless neutral with yellow undertones — harmonises with leather, velvet, linen, and wool upholstery alike. The removable cover features a concealed zipper along one seam for easy laundering. The inner cushion is filled with a resilient polyester fibre that holds its cylindrical shape without flattening. A sophisticated accent piece that bridges comfort and sculpture.",
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
    "description": "A compact coral flatweave rug with natural fringed ends. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Designed for the small moments that make a home — beside the bed, in front of a kitchen sink, at a vanity, or welcoming guests at an entryway. The flatweave construction means zero pile height, so doors swing freely over it and furniture legs don't sink. Woven from cotton in a tight plain weave that resists crushing and wears evenly. The coral colour brings a joyful warmth that works year-round, not just in summer. Natural fringed ends on the short sides are hand-knotted by artisans, each knot a tiny signature. Available in two versatile sizes: 60 × 90 cm for compact spaces, 80 × 120 cm for slightly larger zones. Machine washable; line dry to preserve fringe detail.",
    "oldPrice": 1199
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
    "description": "A dark charcoal wool rug with a plush low pile and subtle tonal border. Demo catalogue item; AI-generated product photo.",
    "longDescription": "An investment piece for the heart of your home. Hand-tufted from premium New Zealand wool — renowned for its long staple length, natural crimp, and exceptional resilience — this rug offers a plush, dense pile (approximately 12mm) that feels luxurious underfoot while resisting matting and crushing. The deep charcoal ground is dyed using metal-complex dyes for superior colourfastness, while the subtle tonal border (two shades lighter) adds a refined frame without competing for attention. The wool's natural lanolin provides inherent stain resistance, and the fibre structure naturally repels dust mites and allergens. Available in two generous sizes to anchor living rooms, dining areas, or master bedrooms. Professional cleaning recommended every 12-18 months.",
    "oldPrice": 7499
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
    "longDescription": "The dhurrie — India's answer to the flatweave — has been woven in village homes for centuries as a practical, reversible floor covering. This version honours that tradition with a contemporary colour story: vibrant turquoise crossed by narrow ivory stripes that create a quiet rhythm across the surface. Woven from cotton on a traditional pit loom, the flatweave structure makes it lightweight, reversible, and ideal for layering over larger natural fibre rugs. The hand-knotted fringes finish the short ends. At 90 × 150 cm, it defines a conversation area; at 120 × 180 cm, it anchors a dining set or bedroom seating. Machine washable on gentle cycle; the flatweave construction means it dries in hours, not days.",
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
    "description": "A long tan jute runner with a dense braided texture. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Long, narrow, and built for the journey — this jute runner is designed for hallways, entryways, kitchen galley runs, and alongside beds where a full rug would overwhelm. The braided construction (three-strand braids stitched side by side) creates a dense, dimensional surface that's incredibly durable and adds tactile interest underfoot. The warm tan hue comes from the jute's natural colour, simply cleaned and softened — no dyes needed. Jute's inherent strength makes it ideal for high-traffic transitions, while its moisture-wicking properties help keep entryways dry. Bound edges prevent unravelling. Available in two lengths to suit your spatial rhythm. Vacuum with suction only; spot clean with mild detergent. Avoid prolonged dampness.",
    "oldPrice": 3999
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
    "description": "A plain terracotta square cotton cushion cover with piped edges. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Sometimes the simplest things are the hardest to get right. This cushion cover is a study in restraint — solid terracotta cotton, clean piped edges, invisible zip closure. The colour is a warm, earthy terracotta achieved through reactive dyeing, which bonds the colour to the fibre for wash-fast results. The cotton is woven in a medium-weight plain weave with enough body to hold the piped edge's structure but enough drape to feel soft, not stiff. Available in two classic square sizes to fit standard cushion inserts. The piping is self-fabric (same material, same colour) for a seamless, sophisticated finish. Mix with patterned cushions for contrast, or stack in tonal neutrals for a monochrome moment. Machine washable; iron on reverse if desired.",
    "oldPrice": 599
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
    "description": "A white square linen cushion cover with a natural slub texture. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Pure European flax linen, stonewashed to a buttery softness that usually takes years to achieve. The natural slubs — those charming thick-and-thin variations in the yarn — catch light differently across the surface, creating a living texture that flat fabric simply can't replicate. The white is not a stark optical white, but a warm, creamy ecru that flatters every skin tone and interior palette. At 50 × 50 cm, it's the classic European square size that proportions beautifully on sofas of any scale. The envelope closure is clean and hardware-free. Linen's hollow fibre structure makes it naturally temperature-regulating — cool in summer, warm in winter — and its antimicrobial properties keep it fresh longer between washes. Gets softer, not thinner, with every laundering.",
    "oldPrice": 1599
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
    "longDescription": "Floor seating reimagined for modern living. This generously proportioned square cushion (available in 60 cm or 70 cm) creates an instant seat anywhere — around a low coffee table, by a window nook, or pulled up for extra guests. The chenille fabric's tufted pile offers a plush, yielding surface that conforms to the body, while the quilted channel stitching keeps the fill evenly distributed and adds a subtle geometric pattern. The coral hue is vibrant but not loud, a warm red-orange that energises a space without overwhelming it. The inner cushion combines a high-resilience foam core with a wrapped polyester fibre layer for the perfect balance of support and sink-in comfort. Removable cover with heavy-duty concealed zipper. A versatile piece that blurs the line between cushion and furniture.",
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
    "description": "A lightweight turquoise cotton throw with ivory tassels. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Woven for the lightest touch — this throw uses a fine cotton gauze weave that's airy, breathable, and weighs a fraction of traditional throws. The open structure traps minimal heat, making it perfect for summer nights when you want a layer without the weight. The turquoise colour evokes tropical waters and clear skies, while the ivory hand-knotted tassels at each corner add a touch of artisanal detail. At 100 × 140 cm, it's sized for one person to wrap around shoulders or drape across a chaise; the 120 × 150 cm offers more coverage for sharing. Cotton gauze gets softer with every wash and dries quickly on the line. A seasonal essential that packs into a tiny bundle for travel.",
    "oldPrice": 1299
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
    "description": "An undyed natural beige linen throw with a soft crinkled weave. Demo catalogue item; AI-generated product photo.",
    "longDescription": "The ultimate expression of linen's natural beauty — undyed, unbleached, uncompromised. The flax fibres retain their field-grown hue, a warm beige with subtle golden undertones that shift in different light. Woven in a relaxed crinkle weave that enhances linen's natural texture and creates air pockets for temperature regulation. The generous dimensions (two sizes available) make it a true blanket replacement — warm enough for cool evenings, breathable enough for year-round use. The edges are finished with a wide, hand-rolled hem that showcases the fabric's substantial hand. Linen can absorb up to 20% of its weight in moisture before feeling damp, making it naturally humidity-regulating. An heirloom piece that softens dramatically over decades, not years.",
    "oldPrice": 3899
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
    "description": "A warm terracotta wool blanket with a broad woven border. Demo catalogue item; AI-generated product photo.",
    "longDescription": "A blanket that commands the room. Woven from merino wool — prized for its fine micron count (18-19 microns) that eliminates the scratch factor of traditional wool — this piece offers serious warmth with a surprisingly soft hand. The terracotta colour is dyed in the yarn before weaving, ensuring complete colour penetration and exceptional fastness. The broad woven border (approximately 15 cm) in a complementary cream tone frames the field with architectural precision, a detail that requires careful loom setup and skilled execution. At 150 × 200 cm, it covers a queen bed; at 180 × 220 cm, it drapes a king with generous overhang. Wool's natural crimp creates insulating air pockets while wicking moisture away from the body. Dry clean only to preserve the border detail.",
    "oldPrice": 5499
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
    "longDescription": "The loop pile construction — where yarn loops stand upright from the base fabric — creates a forest of tiny cotton springs that compress underfoot then spring back, offering a gentle massage with every step. The loops also dramatically increase surface area for water absorption, pulling moisture away from feet efficiently. In crisp white, it brings a spa-like clarity to any bathroom and bleaches safely if needed. Two practical sizes: 40 × 60 cm for compact spaces or guest baths, 50 × 80 cm for primary bathrooms. The latex-free anti-slip backing (latex-free for allergy safety) keeps it securely in place on tile, stone, or vinyl. Machine washable at 60°C for hygienic cleaning; tumble dry low. An everyday essential elevated by thoughtful construction.",
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
    "description": "A charcoal bath mat with plush chenille noodles and a bound edge. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Chenille 'noodles' — thick, tubular yarns with a soft, caterpillar-like pile — create a surface that's more tactile sculpture than bath mat. Each noodle compresses independently, contouring to the foot for a custom-fit feel that's deeply comforting after a shower. The charcoal colour hides water marks and footprints, maintaining a clean appearance between washes. The bound edge finishes the perimeter cleanly and prevents the noodles from unravelling. Two sizes accommodate different bathroom layouts. The chenille construction is inherently quick-drying — the open structure allows air to reach the base fabric. Machine washable; the noodles fluff back up beautifully in the dryer. A small daily luxury that transforms the bathroom ritual.",
    "oldPrice": 1399
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
    "description": "A long thick tan cotton spa mat with a ribbed loop texture. Demo catalogue item; AI-generated product photo.",
    "longDescription": "The spa mat reimagined for home — extra-long dimensions (60 × 120 cm or 70 × 140 cm) that run the full length of a bathtub or double vanity, so you never step onto cold tile. The ribbed loop texture creates parallel channels that guide water away from the standing surface into the grooves, keeping the top layer drier. Woven from premium long-staple cotton in a substantial weight (approximately 800 GSM) that feels thick and luxurious underfoot. The warm tan hue brings a grounding, earthy presence to the bathroom. Heavy enough to stay put without backing, though a non-slip rug pad is recommended for polished stone. Machine washable; the dense construction means it takes longer to dry — plan accordingly. An investment in daily comfort.",
    "oldPrice": 3299
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
    "description": "A light mocha cotton mat with raised pebble-shaped tufting. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Inspired by river stones smoothed by water, the pebble tufting creates a field of soft, rounded domes that massage the soles with every step — a subtle reflexology session built into your morning routine. The tufts are densely packed for stability but spaced enough to allow water to drain between them to the base fabric. The light mocha colour — a warm grey-brown — bridges cool and warm bathroom palettes effortlessly. At 50 × 80 cm, it fits standard tub-side placement; 60 × 90 cm offers more coverage for larger wet zones. The cotton tufts are securely anchored through a reinforced latex-free backing. Machine washable; the pebbles retain their shape through countless cycles. A playful, functional detail that makes the bathroom feel considered.",
    "oldPrice": 1099
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
    "longDescription": "A table runner that brings quiet joy to everyday meals. The coral cotton is woven in a simple plain weave — honest, durable, and easy to launder. At each short end, narrow ivory stripes (three fine lines) provide a delicate frame that signals 'table runner' rather than 'fabric strip' without demanding attention. Two widths: 30 cm for narrow console tables or layered over a wider cloth, 40 cm for standard dining tables. The hemmed edges are clean-finished for a tailored look. Cotton's natural absorbency handles condensation from glasses and minor spills with grace. Machine washable at 40°C; iron while slightly damp for a crisp finish, or embrace the relaxed crinkle. An accessible price point for seasonal colour rotation.",
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
    "description": "A charcoal linen tablecloth with a soft natural drape and hemmed edges. Demo catalogue item; AI-generated product photo.",
    "longDescription": "The foundation of a memorable tablescape. This tablecloth is cut from stonewashed European linen in a deep, sophisticated charcoal — dark enough to ground a setting, nuanced enough to reveal its texture in candlelight. The linen's natural drape means it falls in soft, unstructured folds rather than stiff creases, creating an effortless elegance. Two generous sizes: 150 × 220 cm seats 6-8 with a 25 cm drop; 180 × 260 cm seats 8-10 or accommodates extension tables. The wide double-rolled hem (3 cm) adds weight for a beautiful hang and finishes the edges durably. Linen's hollow fibres absorb spills quickly and release stains readily — often a cold rinse is enough. It wrinkles beautifully, developing a patina that tells the story of shared meals. An heirloom in the making.",
    "oldPrice": 3399
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
    "description": "Four rectangular terracotta linen placemats with a simple stitched border. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Set the table with intention. Four rectangular placemats (35 × 45 cm each) in terracotta stonewashed linen — a warm, earthy tone that complements white ceramics, wooden boards, and brass flatware equally well. The simple stitched border (a single line of tone-on-tone stitching 1 cm from the edge) defines each mat without heaviness. Linen's natural texture means crumbs and light spills sit on the surface rather than sinking into fibres, making cleanup a quick shake or wipe. The set of four covers a standard dining configuration; add two more for larger gatherings. Machine washable; the stonewash finish means they arrive soft and only get better. No ironing required — the relaxed creases are part of the aesthetic. A small detail that makes every meal feel considered.",
    "oldPrice": 1099
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
    "description": "Six turquoise cotton napkins with a neat hem and soft woven finish. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Six napkins — the perfect number for a family of four with spares, or a dinner party of six. The turquoise cotton is woven in a medium-weight plain weave with a soft hand that feels substantial, not flimsy. The neat rolled hem (approximately 5 mm) is double-stitched for durability through hundreds of wash cycles. At 40 × 40 cm, they fold into crisp squares, elegant triangles, or relaxed rectangles with equal grace. Cotton's high absorbency handles wine splashes, sauce drips, and condiment mishaps without staining permanently — a cold soak usually lifts even stubborn marks. The turquoise brings a bright, appetite-stimulating energy to the table. Machine washable at 60°C; tumble dry medium. A workhorse textile that looks anything but utilitarian.",
    "oldPrice": 1499
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
    "longDescription": "Cafe curtains — short panels that cover the lower half of a window — offer privacy at eye level while welcoming light from above. This coral cotton version brings warmth and colour to kitchens, bathrooms, or breakfast nooks. The fabric is a light-to-medium weight cotton with a subtle horizontal slub texture that catches the light. The rod pocket (4 cm) accommodates standard cafe rods and gathers into soft, casual folds. Two lengths: 120 cm for standard half-window coverage, 150 cm for taller windows or a longer puddle. The coral hue reads as cheerful in morning light, cozy in evening glow. Unlined for maximum light transmission. Machine washable; the cotton softens with each wash. Sold as a single panel; order two for a pair.",
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
    "description": "A full-length charcoal linen curtain with a textured woven drape. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Full-length drama in charcoal linen. The deep, complex grey — dyed in the yarn for absolute colour consistency — reads as near-black in low light and reveals warm undertones in daylight. The linen's characteristic slubby texture creates a subtle vertical rhythm that adds depth to the solid colour. The rod pocket header (5 cm) gathers into generous, elegant folds that stack beautifully when drawn. Two lengths: 244 cm (96 inches) for standard 8-foot ceilings with a slight break, 274 cm (108 inches) for 9-foot ceilings or a luxurious puddle. Unlined for a light-filtering effect that glows from within; add a blackout liner for bedrooms. The linen breathes, reducing condensation on windows in humid climates. Dry clean recommended to preserve the fabric's natural finish and drape.",
    "oldPrice": 4199
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
    "description": "A turquoise cotton curtain with simple sewn pleats and a soft fall. Demo catalogue item; AI-generated product photo.",
    "longDescription": "Bright, breezy, and unapologetically colourful — this turquoise cotton curtain brings the energy of a Mediterranean summer indoors. The cotton is woven in a smooth, medium-weight plain weave that holds the sewn pleats crisply while allowing a graceful, fluid fall. The pleats (triple-pinch, 7 cm deep) are pre-sewn for a tailored look without the custom price tag. Two lengths: 183 cm (72 inches) for windows with sills or apron drops, 213 cm (84 inches) for floor-length with a gentle break. The turquoise is a true mid-tone — not pastel, not neon — that balances blue and green equally. Unlined for light filtering; the colour glows beautifully when backlit. Machine washable on gentle; hang damp to release wrinkles naturally. Sold as a single panel.",
    "oldPrice": 1899
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
    "description": "A tan linen-blend curtain with an opaque lining for a room-darkening demo. Demo catalogue item; AI-generated product photo.",
    "longDescription": "The best of both worlds: the texture and beauty of linen on the face, total light control on the back. The front fabric is a premium linen-blend (55% linen, 45% cotton) in a warm, sandy tan that brings natural warmth to any room. The back features an integrated opaque lining — not a separate liner, but a bonded layer that blocks 99% of incoming light while adding thermal insulation. The rod pocket header (6 cm, reinforced) supports the combined weight elegantly. Two lengths: 244 cm for standard ceilings, 274 cm for high ceilings or puddling. Ideal for bedrooms, media rooms, or shift workers who need daytime darkness. The lining also reduces outside noise and improves energy efficiency. Dry clean only to protect the bonded construction. A technical solution that doesn't compromise on aesthetics."
  }
];

/* ------------------------------------------------------------------ */
/* Derived product attributes for filtering                           */
/* ------------------------------------------------------------------ */

/** Map a product to its type based on category + material + name. */
const deriveProductType = (product) => {
  const { category, material, name } = product;
  const lowerName = name.toLowerCase();

  if (category === "Throws") {
    if (material === "Wool") return "Wool Throws";
    if (material === "Linen") return "Linen Throws";
    if (material === "Chenille") return "Chenille Throws";
    if (material === "Cotton") {
      if (lowerName.includes("knit")) return "Knit Throws";
      return "Woven Throws";
    }
  }
  if (category === "Rugs") {
    if (material === "Jute") return "Jute & Plant-Based Rugs";
    if (lowerName.includes("runner")) return "Runners";
    if (lowerName.includes("accent") || product.sizeClass === "Small") return "Accent Rugs";
    if (lowerName.includes("washable")) return "Washable Rugs";
    return "Area Rugs";
  }
  if (category === "Cushions") {
    if (lowerName.includes("lumbar")) return "Lumbar Cushions";
    if (lowerName.includes("bolster")) return "Bolster Cushions";
    if (lowerName.includes("floor")) return "Floor Cushions";
    if (lowerName.includes("outdoor")) return "Outdoor Cushions";
    return "Square Cushions";
  }
  if (category === "Bath Mats") {
    if (lowerName.includes("memory") || lowerName.includes("foam")) return "Memory Foam Mats";
    if (material === "Cotton" && lowerName.includes("organic")) return "Organic Bath Mats";
    if (lowerName.includes("anti-slip") || lowerName.includes("pebble")) return "Anti-Slip Mats";
    return "Bath Mats";
  }
  if (category === "Table Linen") {
    if (lowerName.includes("tablecloth")) return "Tablecloths";
    if (lowerName.includes("runner")) return "Table Runners";
    if (lowerName.includes("placemat")) return "Placemats";
    if (lowerName.includes("napkin")) return "Napkins";
    if (lowerName.includes("kitchen") || lowerName.includes("towel")) return "Kitchen Towels";
    return "Table Runners";
  }
  if (category === "Curtains") {
    if (lowerName.includes("sheer")) return "Sheer Curtains";
    if (lowerName.includes("room-darkening") || lowerName.includes("darkening")) return "Room-Darkening Curtains";
    if (lowerName.includes("cafe")) return "Cafe Curtains";
    if (material === "Linen") return "Linen Curtains";
    return "Light-Filtering Curtains";
  }
  return "";
};

/** Map a product to its style based on category + material + color + name. */
const deriveStyle = (product) => {
  const { category, material, color, name } = product;
  const lowerName = name.toLowerCase();

  // Classic: neutral colors, traditional materials, simple names
  const classicColors = ["Natural", "White", "Charcoal", "Tan", "Mocha"];
  const classicMaterials = ["Wool", "Linen", "Jute"];
  const modernColors = ["Turquoise", "Coral", "Indigo"];
  const texturedMaterials = ["Chenille", "Jute"];

  if (classicMaterials.includes(material) || classicColors.includes(color)) {
    if (!modernColors.includes(color) && !texturedMaterials.includes(material)) {
      return "Classic";
    }
  }
  if (modernColors.includes(color) || lowerName.includes("modern") || lowerName.includes("minimal")) {
    return "Modern";
  }
  if (texturedMaterials.includes(material) || lowerName.includes("textured") || lowerName.includes("waffle") || lowerName.includes("chenille") || lowerName.includes("boucle")) {
    return "Textured";
  }
  // Default fallback
  if (classicColors.includes(color)) return "Classic";
  if (modernColors.includes(color)) return "Modern";
  return "Classic";
};

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

export const products = rawProducts.map((product) => {
  const productType = deriveProductType(product);
  const style = deriveStyle(product);
  return {
    ...product,
    productType,
    style,
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
  };
});

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

