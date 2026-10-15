/**
 * Contact page (Dev 1).
 *
 * Two columns (stacks on mobile):
 *   LEFT  — big Playfair heading, subline, three contact cards with arrow
 *           buttons (Email / Call & WhatsApp / Studio in Panipat), social icons.
 *   RIGHT — white form card (radius 24, soft shadow) titled "Send an Enquiry"
 *           containing <EnquiryForm />.
 * Below: hours, an optional embedded map, and a short FAQ teaser that links to
 * /faq (owned by Dev 5).
 *
 * Env: VITE_FORM_ENDPOINT — see src/components/contact/EnquiryForm.jsx.
 */
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import EnquiryForm from "../components/contact/EnquiryForm.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import { CONTACT, ROUTES, SOCIALS } from "../constants/routes.js";

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

const CONTACT_CARDS = [
  {
    id: "email",
    label: "Email us",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    caption: "Replies within 24 working hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  },
  {
    id: "phone",
    label: "Call or WhatsApp",
    value: CONTACT.phoneDisplay,
    href: CONTACT.whatsapp,
    external: true,
    caption: "Mon–Sat, 9:00 am – 6:00 pm IST",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M5 4h4l2 5-3 2a13 13 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </svg>
    )
  },
  {
    id: "studio",
    label: "Studio & weaving unit",
    value: CONTACT.addressLines.join(" "),
    caption: "Visits by appointment — book a loom demo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }
];

const FAQ_TEASER = [
  {
    q: "How long does delivery take?",
    a: "2–4 working days in metro cities and 4–7 days across the rest of India. Free shipping above ₹1,499."
  },
  {
    q: "Do you take bulk and custom orders?",
    a: "Yes — custom sizes, DMC-matched colourways and volumes for retailers, designers and boutique hotels. Choose \"Bulk Order\" in the form and we'll send a quote."
  },
  {
    q: "How do returns work?",
    a: "Returns within 7 days of delivery, unused and with tags intact. Email your order number and we'll arrange a pickup."
  }
];

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact WovenHaat — Enquiries, WhatsApp & Studio Visits"
        description="Contact WovenHaat for retail questions, bulk and custom orders. Email, phone, WhatsApp and our Panipat studio address — replies within 24 working hours."
      />

      <section className="section section--contact" aria-labelledby="contact-h">
        <Container className="contact-grid">
          {/* LEFT */}
          <div className="contact-intro">
            <span className="eyebrow">Contact</span>
            <h1 id="contact-h" className="contact-intro__title">
              Let's get in touch
            </h1>
            <p className="contact-intro__sub">
              Questions about an order, a fabric swatch, a hotel project? Tell us what
              you're planning and the studio team will get back to you within 24 hours.
            </p>

            <ul className="contact-cards">
              {CONTACT_CARDS.map((card) => (
                <li key={card.id}>
                  <Card padded={false} className="contact-card">
                    <span className="contact-card__icon" aria-hidden="true">
                      {card.icon}
                    </span>
                    <div className="contact-card__body">
                      <strong>{card.label}</strong>
                      {card.href ? (
                        <a
                          href={card.href}
                          {...(card.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {card.value}
                        </a>
                      ) : (
                        <span>{card.value}</span>
                      )}
                      <span className="contact-card__caption">{card.caption}</span>
                    </div>
                    {card.href && (
                      <a
                        className="contact-card__arrow"
                        href={card.href}
                        aria-label={`${card.label}: ${card.value}`}
                        {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </Card>
                </li>
              ))}
            </ul>

            <div className="contact-social">
              <h2 className="contact-social__title">Follow the loom</h2>
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

            <table className="hours">
              <caption className="visually-hidden">Studio opening hours</caption>
              <tbody>
                <tr>
                  <th scope="row">Mon – Sat</th>
                  <td>9:00 am – 6:00 pm</td>
                </tr>
                <tr>
                  <th scope="row">Sunday</th>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* RIGHT */}
          <Card radius={24} className="enquiry-card" as="aside" aria-labelledby="enquiry-h">
            <h2 id="enquiry-h" className="enquiry-card__title">
              Send an Enquiry
            </h2>
            <p className="enquiry-card__sub">
              Fields marked * are required. Bulk and custom requests welcome.
            </p>
            <EnquiryForm />
          </Card>
        </Container>
      </section>

      {/* MAP */}
      <section className="section section--alt" aria-labelledby="map-h">
        <Container>
          <SectionHeading
            id="map-h"
            label="Visit us"
            title="Panipat studio & weaving unit"
            subtitle="Appointments are required so we can arrange a live demonstration on the weaving floor."
          />
          <div className="map-frame">
            <iframe
              title="Map showing the WovenHaat studio location in Panipat, Haryana"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.95%2C29.37%2C77.01%2C29.42&amp;layer=mapnik"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="form-hint">
            <a
              href="https://www.openstreetmap.org/?mlat=29.39&amp;mlon=76.98#map=14/29.39/76.98"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open larger map
            </a>
          </p>
        </Container>
      </section>

      {/* FAQ TEASER — full FAQ page belongs to Dev 5 */}
      <section className="section" aria-labelledby="faq-teaser-h">
        <Container>
          <SectionHeading
            id="faq-teaser-h"
            align="center"
            label="Have questions?"
            title="Frequently asked questions"
          />
          <div className="accordion accordion--narrow">
            {FAQ_TEASER.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <div>{item.a}</div>
              </details>
            ))}
          </div>
          <div className="section-cta">
            <Button as={Link} to={ROUTES.faq} variant="outline">
              See all FAQs
            </Button>
          </div>
        </Container>
      </section>

      {/* Floating WhatsApp */}
      <a
        className="wa-float"
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a11.4 11.4 0 0 1-4.8-4.2c-.4-.6-1-1.5-1-2.4 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.5c.1 0 .4 0 .5.4l.7 1.7c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.2.3-.1.5.3.6 1.2 1.5 2.2 2 .3.2.5.1.6 0l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.2.1.6-.1 1.1Z" />
        </svg>
        <span className="wa-float__label">WhatsApp</span>
      </a>
    </>
  );
}
