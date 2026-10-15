// import { useState } from "react";
// import { ArrowRight, BadgeCheck } from "lucide-react";
// import AppLink from "../common/AppLink.jsx";
// import { certifications, socialLinks } from "../../data/storeData.js";
// import { InstagramIcon, FacebookIcon, PinterestIcon, YoutubeIcon } from "../common/SocialIcons.jsx";
// import Logo from "./Logo.jsx";
// import { memo } from "react";

// const Footer = memo(function Footer({ notify }) {
//   const [email, setEmail] = useState("");

//   const subscribe = (event) => {
//     event.preventDefault();
//     if (!email) return;
//     setEmail("");
//     notify("Newsletter preview complete (demo; no subscription sent). Use WELCOME10 for 10% off.");
//   };

//   return (
//     <footer className="site-footer">
//       <div className="footer-top shell">
//         <div className="footer-intro">
//           <Logo />
//           <p>Thoughtful textiles, made slowly for homes that feel lived in.</p>
//           <div className="socials">
//             {socialLinks.map((link) => {
//               const IconMap = {
//                 InstagramIcon,
//                 FacebookIcon,
//                 PinterestIcon,
//                 YoutubeIcon,
//               };
//               const Icon = IconMap[link.icon];
//               return (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   aria-label={link.ariaLabel}
//                   aria-disabled="true"
//                   tabIndex={-1}
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   <Icon />
//                 </a>
//               );
//             })}
//           </div>
//         </div>
//         <div>
//           <h4>Shop</h4>
//           <AppLink to="/shop">All products</AppLink>
//           <AppLink to="/collections">Collections</AppLink>
//           <AppLink to="/collections/rugs">Rugs</AppLink>
//           <AppLink to="/collections/cushions">Cushions</AppLink>
//           <AppLink to="/collections/throws">Throws</AppLink>
//         </div>
//         <div>
//           <h4>Discover</h4>
//           <AppLink to="/about">Our story</AppLink>
//           <AppLink to="/sustainability">Sustainability</AppLink>
//           <AppLink to="/lookbook">Lookbook</AppLink>
//           <AppLink to="/journal">Journal</AppLink>
//         </div>
//         <div>
//           <h4>Help</h4>
//           <AppLink to="/faq">FAQ</AppLink>
//           <AppLink to="/faq?s=shipping">Shipping policy</AppLink>
//           <AppLink to="/faq?s=returns">Returns policy</AppLink>
//           <AppLink to="/track">Track an order</AppLink>
//           <AppLink to="/contact">Contact us</AppLink>
//           <AppLink to="/bulk-orders">Bulk orders</AppLink>
//         </div>
//         <form className="footer-newsletter" onSubmit={subscribe}>
//           <h4>Notes from the loom</h4>
//           <p>New collections, craft stories and 10% off your first order.</p>
//           <label>
//             <span className="sr-only">Email address</span>
//             <input
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               placeholder="Email address"
//               required
//             />
//             <button aria-label="Subscribe">
//               <ArrowRight />
//             </button>
//           </label>
//         </form>
//       </div>
//       <div className="footer-certs shell">
//         <span>Certifications</span>
//         {certifications.map((c) => (
//           <b key={c.id} title={c.name}>
//             <BadgeCheck />
//             {c.short}
//           </b>
//         ))}
//       </div>
//       <div className="footer-bottom shell">
//         <span>
//           © 2026 WovenHaat · <AppLink to="/faq?s=shipping">Shipping</AppLink> ·{" "}
//           <AppLink to="/faq?s=returns">Returns</AppLink> ·{" "}
//           <a href="#" aria-label="Privacy & terms (policy page not implemented)" onClick={(e)=>e.preventDefault()}>Privacy & terms</a>
//         </span>
//         <span>Secure payments · Made with care in India</span>
//       </div>
//     </footer>
//   );
// });

// Footer.displayName = "Footer";
// export default Footer;
import { memo, useState } from "react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { certifications, socialLinks } from "../../data/storeData.js";
import {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  YoutubeIcon,
} from "../common/SocialIcons.jsx";
import Logo from "./Logo.jsx";

const SOCIAL_ICONS = {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  YoutubeIcon,
};

const Footer = memo(function Footer({ notify }) {
  const [email, setEmail] = useState("");

  const subscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setEmail("");
    notify?.(
      "Newsletter preview complete (demo; no subscription sent). Use WELCOME10 for 10% off."
    );
  };

  const footerColumns = [
    {
      title: "Shop",
      links: [
        { label: "All products", to: "/shop" },
        { label: "Collections", to: "/collections" },
        { label: "Rugs", to: "/collections/rugs" },
        { label: "Cushions", to: "/collections/cushions" },
        { label: "Throws", to: "/collections/throws" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "Our story", to: "/about" },
        { label: "Sustainability", to: "/sustainability" },
        { label: "Lookbook", to: "/lookbook" },
        { label: "Journal", to: "/journal" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "FAQ", to: "/faq" },
        { label: "Shipping policy", to: "/faq?s=shipping" },
        { label: "Returns policy", to: "/faq?s=returns" },
        { label: "Track an order", to: "/track" },
        { label: "Contact us", to: "/contact" },
        { label: "Bulk orders", to: "/bulk-orders" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand__logo">
              <Logo />
            </div>

            <p className="footer-brand__description">
              Thoughtful textiles, made slowly for homes that feel lived in.
            </p>

            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];

                if (!Icon) return null;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.ariaLabel || social.name}
                    aria-disabled="true"
                    tabIndex={-1}
                    onClick={(event) => event.preventDefault()}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h4>{column.title}</h4>

              <ul className="footer-links">
                {column.links.map((link) => (
                  <li key={`${link.to}-${link.label}`}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-newsletter">
            <h4>Notes from the loom</h4>

            <p className="footer-newsletter__blurb">
              New collections, craft stories and 10% off your first order.
            </p>

            <form onSubmit={subscribe} className="footer-newsletter__form">
              <label className="footer-newsletter__field">
                <span className="sr-only">Email address</span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  required
                />

                <button type="submit" aria-label="Subscribe">
                  <ArrowRight aria-hidden="true" />
                </button>
              </label>
            </form>
          </div>
        </div>

        <div className="certs-strip certs-strip--footer">
          <span className="footer-certs__title">Certifications</span>

          {certifications.map((certification) => (
            <span
              className="footer-certification"
              key={certification.id}
              title={certification.name}
            >
              <BadgeCheck aria-hidden="true" />
              {certification.short}
            </span>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>
              © {new Date().getFullYear()} WovenHaat
            </span>

            <span className="footer-legal__separator" aria-hidden="true">
              ·
            </span>

            <Link to="/faq?s=shipping">Shipping</Link>

            <span className="footer-legal__separator" aria-hidden="true">
              ·
            </span>

            <Link to="/faq?s=returns">Returns</Link>

            <span className="footer-legal__separator" aria-hidden="true">
              ·
            </span>

            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Privacy and terms (page not implemented)"
            >
              Privacy &amp; terms
            </a>
          </div>

          <p className="footer-bottom__note">
            Secure payments · Made with care in India
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;