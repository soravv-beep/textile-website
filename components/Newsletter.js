"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null); // { type: 'ok'|'err', text }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setMsg({ type: "err", text: "Please enter a valid email address." });
      return;
    }
    setMsg({
      type: "ok",
      text: "Subscribed! A 10% discount code for your first order has been sent to your email."
    });
    setEmail("");
  };

  return (
    <section className="section" aria-labelledby="nl-h">
      <div className="container">
        <div className="newsletter">
          <span className="eyebrow" style={{ color: "var(--clr-text)" }}>
            Join the loom list
          </span>
          <h2 id="nl-h">Get 10% off your first order</h2>
          <p>New weaves, craft stories, and care guides — straight to your inbox. No spam, ever.</p>
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <label className="visually-hidden" htmlFor="nl-email">
              Email address
            </label>
            <input
              id="nl-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (msg) setMsg(null);
              }}
            />
            <button className="btn btn-primary" type="submit">
              Subscribe
            </button>
            <p
              role="status"
              style={{
                flexBasis: "100%",
                margin: 0,
                minHeight: "1.2em",
                color: msg ? (msg.type === "err" ? "var(--clr-error)" : "var(--clr-text)") : "inherit"
              }}
            >
              {msg ? msg.text : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
