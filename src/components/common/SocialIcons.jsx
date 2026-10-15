const common = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const InstagramIcon = () => (
  <svg {...common}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
export const FacebookIcon = () => (
  <svg {...common}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
  </svg>
);
export const PinterestIcon = () => (
  <svg {...common}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.5 20l2-8m-1-3a2 2 0 1 1 2.5 2.5M9 13c-1-3 1-6 4-5.5" />
  </svg>
);
export const YoutubeIcon = () => (
  <svg {...common}>
    <rect x="3" y="6" width="18" height="12" rx="4" />
    <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" />
  </svg>
);