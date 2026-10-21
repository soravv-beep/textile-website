/**
 * <Footer /> — shared by every page (Dev 1).
 *
 * Background is var(--color-chrome) — the SAME token as the navbar, so the two
 * can never drift apart. Mocha text, Tan headings and hover state.
 * Columns: brand + socials, Shop, Company, Support, newsletter, certification
 * strip, copyright + payment methods.
 */
import { Link } from "react-router-dom";

import {
  CONTACT,
  FOOTER_COMPANY,
  FOOTER_SHOP,
  FOOTER_SUPPORT,
  ROUTES,
  SOCIALS
} from "../../constants/routes.js";
import Newsletter from "../sections/Newsletter.jsx";

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 20c1-3 2.5-8 2.5-8m-1-3a3.5 3.5 0 1 1 5 3c-1.5 1-3.5.5-4-1" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m11 9.5 4 2.5-4 2.5z" />
    </svg>
  )
};

const PAYMENTS = ["Razorpay", "UPI", "Cards", "COD"];

function Column({ title, links }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul className="footer-links">
        {links.map((link) => (
          <li key={`${link.to}-${link.label}`}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to={ROUTES.home} className="logo">
              Woven<span>Haat</span>
            </Link>
            <p>
              A house of handwoven rugs, cushions and throws, made by artisan
              families in Panipat and shipped to 18+ countries — slow craft,
              certified materials, colours drawn from real dyed yarn.
            </p>
            <div className="footer-social">
              {SOCIALS.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[social.key]}
                </a>
              ))}
            </div>
          </div>

          <Column title="Shop" links={FOOTER_SHOP} />
          <Column title="Company" links={FOOTER_COMPANY} />
          <Column title="Support" links={FOOTER_SUPPORT} />

          <div className="footer-newsletter">
            <h4>Join the loom list</h4>
            <p className="footer-newsletter__blurb">
              New weaves, craft stories and care guides — no spam, ever.
            </p>
            <Newsletter variant="footer" />
          </div>
        </div>

        <div className="certs-strip certs-strip--footer">
          <span className="badge badge--outline">OEKO-TEX</span>
          <span className="badge badge--outline">GOTS</span>
          <span className="badge badge--outline">GRS</span>
          <span className="badge badge--outline">Shipped to 18+ countries</span>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WovenHaat. All rights reserved.</span>
          <span className="footer-payments">
            {PAYMENTS.map((method) => (
              <span key={method} className="footer-payments__item">
                {method}
              </span>
            ))}
          </span>
          <span className="footer-legal">
            <Link to={ROUTES.shippingReturns}>Privacy</Link> ·{" "}
            <Link to={ROUTES.shippingReturns}>Terms</Link> ·{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
