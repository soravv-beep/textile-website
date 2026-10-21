/**
 * Navigation data — single source of truth for the main nav and mega menu.
 * Uses the target project's categories from collections.js.
 */
import { CATEGORIES, categorySlugs } from './collections.js';
import { collectionPath } from '../constants/routes.js';

/** Main navigation links — order matters (desktop + mobile use the same list). */
export const MAIN_NAV = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['Collection', '/collections'],
  ['Lookbook', '/lookbook'],
  ['Journal', '/journal'],
  ['About', '/about'],
  ['Contact', '/contact']
];

/** Build query-string URL for a collection with a filter. */
const q = (slug, key, value) => `${collectionPath(slug)}?${key}=${encodeURIComponent(value)}`;

/** Mega menu configuration — generated from target project's CATEGORIES. */
export const MEGA = Object.fromEntries(
  CATEGORIES.map((category) => [
    category.slug,
    [
      {
        title: 'Shop by Type',
        links: [
          ...category.types.map((type) => [type, q(category.slug, 'sub', type)]),
          [`Shop All ${category.name}`, collectionPath(category.slug)]
        ]
      },
      {
        title: 'Shop by Size',
        links: category.sizes.map((size) => [size, q(category.slug, 'size', size)])
      },
      {
        title: 'Style Edit',
        links: ['Classic', 'Modern', 'Textured'].map((style) => [
          `${category.name} — ${style}`,
          q(category.slug, 'style', style)
        ])
      },
      {
        title: 'Guides',
        links: category.care.map((guide) => [guide, '/journal'])
      }
    ]
  ])
);

/** Validates that a category slug exists in the target project. */
export const isValidCategory = (slug) => categorySlugs.includes(slug);