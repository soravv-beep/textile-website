import Link from "next/link";

const SHOP = [
  { href: "/shop", label: "All Products" },
  { href: "/collections", label: "Collections" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
  { href: "/track", label: "Track Order" }
];

const COMPANY = [
  { href: "/about", label: "About Us" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" }
];

const HELP = [
  { href: "/faq", label: "FAQ & Shipping" },
  { href: "/faq#returns", label: "Returns" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/account", label: "My Account" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav__logo">
              Woven<span>Haat</span>
            </Link>
            <p>
              Handwoven home textiles from artisan clusters across India. Certified,
              fair-trade and made to last.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.5 20c1-3 2.5-8 2.5-8m-1-3a3.5 3.5 0 1 1 5 3c-1.5 1-3.5.5-4-1" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>Shop</h4>
            <ul className="footer-links">
              {SHOP.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Help</h4>
            <ul className="footer-links">
              {HELP.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="certs-strip" style={{ justifyContent: "flex-start", marginTop: "var(--sp-4)" }}>
              <span className="badge badge--outline">OEKO-TEX</span>
              <span className="badge badge--outline">GOTS</span>
              <span className="badge badge--outline">GRS</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 WovenHaat. All rights reserved.</span>
          <span>
            <Link href="/faq">Privacy</Link> · <Link href="/faq">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
