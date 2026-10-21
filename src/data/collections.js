/**
 * Product categories — mirrors the target project's catalog.js categories
 * with additional fields needed for the WOVENHAAT-style mega menu.
 * Each category includes types, sizes, care guides, and tagline for the mega menu.
 */
import { categories as catalogCategories } from './catalog.js';

// Extended category data for mega menu — derived from catalog categories
// with WOVENHAAT-style navigation structure
export const CATEGORIES = [
  {
    slug: 'rugs',
    name: 'Rugs',
    noun: 'Rug',
    tagline: 'Timeless Rugs for Every Space',
    desc: 'Hand-finished rugs in wool, jute and cotton that anchor a room.',
    tone: '#c9b79a',
    types: [
      'Area Rugs',
      'Runners',
      'Accent Rugs',
      'Washable Rugs',
      'Jute & Plant-Based Rugs'
    ],
    sizes: ["2' × 3'", "6' × 9'", "8' × 10'", "9' × 12'", "10' × 14'"],
    care: ['How to Choose a Rug Size', 'Why You Need a Rug Pad']
  },
  {
    slug: 'cushions',
    name: 'Cushions',
    noun: 'Cushion',
    tagline: 'Cushions That Complete a Room',
    desc: 'Textured covers in cotton, linen, chenille and wool.',
    tone: '#d6c4ab',
    types: [
      'Square Cushions',
      'Lumbar Cushions',
      'Bolster Cushions',
      'Floor Cushions',
      'Outdoor Cushions'
    ],
    sizes: ['40 × 40 cm', '45 × 45 cm', '50 × 50 cm', '30 × 50 cm', '60 × 60 cm'],
    care: ['How to Style Cushions', 'Cushion Care Guide']
  },
  {
    slug: 'throws',
    name: 'Throws',
    noun: 'Throw',
    tagline: 'Soft Layers for Every Season',
    desc: 'Woven, knit and linen throws to layer on sofas and beds.',
    tone: '#d6c4ab',
    types: [
      'Woven Throws',
      'Knit Throws',
      'Linen Throws',
      'Wool Throws',
      'Chenille Throws'
    ],
    sizes: ['Standard', 'Oversized'],
    care: ['How to Care for Your Throws', 'Fabric Guide']
  },
  {
    slug: 'bath-mats',
    name: 'Bath Mats',
    noun: 'Mat',
    tagline: 'Fresh Comfort Daily',
    desc: 'Absorbent, quick-drying mats for a calmer bathroom.',
    tone: '#cdbfa9',
    types: [
      'Bath Mats',
      'Memory Foam Mats',
      'Organic Bath Mats',
      'Anti-Slip Mats'
    ],
    sizes: ['40 × 60 cm', '50 × 80 cm', '60 × 90 cm', '60 × 120 cm'],
    care: ['How to Clean Bath Mats', 'Material Guide']
  },
  {
    slug: 'table-linen',
    name: 'Table Linen',
    noun: 'Linen',
    tagline: 'Elevate Everyday Meals',
    desc: 'Tablecloths, runners and napkins in breathable natural fibres.',
    tone: '#e0d3bd',
    types: [
      'Tablecloths',
      'Table Runners',
      'Placemats',
      'Napkins',
      'Kitchen Towels'
    ],
    sizes: [
      'Small (Up to 4 Seater)',
      'Medium (4–6 Seater)',
      'Large (6–8 Seater)',
      'Extra Large (8+ Seater)'
    ],
    care: ['How to Care for Table Linen', 'Fabric Guide']
  },
  {
    slug: 'curtains',
    name: 'Curtains',
    noun: 'Curtain',
    tagline: 'Filter Light with an Effortless Drape',
    desc: 'Light-filtering and room-darkening curtains in linen and cotton.',
    tone: '#b9a58c',
    types: [
      'Sheer Curtains',
      'Light-Filtering Curtains',
      'Room-Darkening Curtains',
      'Cafe Curtains',
      'Linen Curtains'
    ],
    sizes: [
      '112 × 120 cm',
      '112 × 150 cm',
      '112 × 183 cm',
      '112 × 213 cm',
      '112 × 244 cm',
      '112 × 274 cm'
    ],
    care: ['How to Hang Curtains', 'Curtain Care Guide']
  }
];

/** Lookup a category by slug. */
export const bySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);

/** Get all category slugs for routing validation. */
export const categorySlugs = CATEGORIES.map((c) => c.slug);

/** Get categories as simple name/slug pairs for basic navigation. */
export const simpleCategories = CATEGORIES.map((c) => ({ name: c.name, slug: c.slug }));