"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const current = (href) => (pathname === href ? { "aria-current": "page" } : {});

  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="nav__logo" onClick={() => setOpen(false)}>
          Woven<span>Haat</span>
        </Link>

        <nav aria-label="Main">
          <ul className="nav__menu">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} {...current(l.href)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <Link href="/shop" className="nav__icon" aria-label="Search products">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <Link href="/wishlist" className="nav__icon" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z" />
            </svg>
          </Link>
          <Link href="/cart" className="nav__icon" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
          </Link>
          <button
            className="nav__icon nav__toggle"
            data-nav-toggle
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`nav__drawer${open ? " is-open" : ""}`} id="nav-drawer" data-nav-drawer>
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} {...current(l.href)} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/account" onClick={() => setOpen(false)}>
              My Account
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
