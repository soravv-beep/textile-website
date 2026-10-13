export const metadata = {
  title: "Contact WovenHaat — Enquiry Form, Phone, WhatsApp & Map",
  description:
    "Contact WovenHaat: inquiry form, phone, email, and WhatsApp. Business hours Mon–Sat 9am–6pm, response within 24 working hours.",
  openGraph: {
    title: "Contact WovenHaat",
    description: "Inquiry form, phone, WhatsApp, and location map — connect with the WovenHaat team."
  }
};

import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let&apos;s talk textiles</h1>
          <p>
            Whether you need order assistance, have product questions, or wish to collaborate —
            fill out the form or message us directly. We respond within 24 working hours.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="section" aria-labelledby="form-h">
        <div className="container contact-grid">
          {/* Contact form */}
          <div>
            <span className="eyebrow">Send a message</span>
            <h2 id="form-h">Enquiry form</h2>
            <ContactForm />
          </div>

          {/* Quick contact info */}
          <aside className="contact-info" aria-label="Contact details">
            <div className="card card__body">
              <h3>Quick reach</h3>
              <ul className="contact-list">
                <li>
                  <span className="contact-list__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-3 2a13 13 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
                  </span>
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                </li>
                <li>
                  <span className="contact-list__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  </span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:hello@wovenhaat.example">hello@wovenhaat.example</a>
                  </div>
                </li>
                <li>
                  <span className="contact-list__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  </span>
                  <div>
                    <strong>Studio &amp; unit</strong>
                    <span>
                      Plot 14, Sector 29 Industrial Area,
                      <br />
                      Panipat, Haryana 132103
                    </span>
                  </div>
                </li>
              </ul>

              <hr className="divider" />

              <h3>Business hours</h3>
              <table className="hours">
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
              <p className="form-hint">Expected response: within 24 working hours.</p>

              <a
                className="btn btn-secondary btn-block"
                href="https://wa.me/919876543210?text=Hi%20WovenHaat%2C%20I%20have%20a%20question"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a11.4 11.4 0 0 1-4.8-4.2c-.4-.6-1-1.5-1-2.4 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.5c.1 0 .4 0 .5.4l.7 1.7c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.2.3-.1.5.3.6 1.2 1.5 2.2 2 .3.2.5.1.6 0l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.2.1.6-.1 1.1Z" /></svg>
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* MAP */}
      <section className="section section--alt" aria-labelledby="map-h">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Visit us</span>
            <h2 id="map-h">Panipat studio &amp; weaving unit</h2>
            <p>Appointments are required so we can arrange a live demonstration on the weaving floor.</p>
          </div>
          <div className="map-frame">
            <iframe
              title="Map showing WovenHaat studio location in Panipat, Haryana"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.95%2C29.37%2C77.01%2C29.42&layer=mapnik"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="form-hint" style={{ marginTop: "var(--sp-3)" }}>
            <a href="https://www.openstreetmap.org/?mlat=29.39&mlon=76.98#map=14/29.39/76.98" target="_blank" rel="noopener">
              Open larger map
            </a>
          </p>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section" aria-labelledby="faq-teaser">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Have questions?</span>
            <h2 id="faq-teaser">Frequently Asked Questions</h2>
          </div>
          <div className="accordion" style={{ maxWidth: "760px", marginInline: "auto" }}>
            <details>
              <summary>How many days does delivery take?</summary>
              <div>
                2–4 working days in metro cities, and 4–7 days across the rest of India. Free shipping on orders above ₹1,499.
              </div>
            </details>
            <details>
              <summary>Do you accept bulk and custom orders?</summary>
              <div>
                Yes — custom sizes, color palettes (by DMC code), and quantities for retailers, interior designers, and boutique hotels. Fill out our <a href="/bulk-orders">bulk inquiry form</a>.
              </div>
            </details>
            <details>
              <summary>How do returns work?</summary>
              <div>
                Returns are accepted within 7 days of delivery, unused with original tags intact. Simply email us with your order number and we will arrange a pickup.
              </div>
            </details>
          </div>
          <p style={{ textAlign: "center", marginTop: "var(--sp-5)" }}>
            <a className="btn btn-outline" href="/faq">
              See all FAQs
            </a>
          </p>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a
        className="wa-float"
        href="https://wa.me/919876543210?text=Hi%20WovenHaat%2C%20I%20have%20a%20question"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a11.4 11.4 0 0 1-4.8-4.2c-.4-.6-1-1.5-1-2.4 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.5c.1 0 .4 0 .5.4l.7 1.7c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.2.3-.1.5.3.6 1.2 1.5 2.2 2 .3.2.5.1.6 0l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.2.1.6-.1 1.1Z" /></svg>
        <span className="wa-float__label">WhatsApp</span>
      </a>
    </main>
  );
}
