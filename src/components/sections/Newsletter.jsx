/**
 * <Newsletter /> — email capture used on the home page and in the footer.
 *
 * @param {object} props
 * @param {"section"|"footer"} [props.variant="section"]
 *   section = full Tan panel with heading (home page)
 *   footer  = compact form only (inside the footer chrome)
 *
 * Validates the email, shows an inline error, and swaps to a success state with
 * an animated checkmark. The POST target is VITE_NEWSLETTER_ENDPOINT (optional):
 * when it is not set the component stays in demo mode and reports success
 * locally, so nothing breaks before the backend exists.
 */
import { useState } from "react";

import Button from "../ui/Button.jsx";
import SuccessCheck from "../../animations/SuccessCheck.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

export default function Newsletter({ variant = "section" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done

  const isFooter = variant === "footer";
  const inputId = isFooter ? "nl-email-footer" : "nl-email";
  const messageId = `${inputId}-msg`;

  const onSubmit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value, source: isFooter ? "footer" : "home" })
        });
      }
      setStatus("done");
      setEmail("");
    } catch {
      setError("Something went wrong — please try again.");
      setStatus("idle");
    }
  };

  const form = (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <label className="visually-hidden" htmlFor={inputId}>
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        name="email"
        placeholder="your@email.com"
        autoComplete="email"
        required
        value={email}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? messageId : undefined}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError("");
        }}
      />
      <Button type="submit" variant="primary" loading={status === "sending"}>
        Subscribe
      </Button>
      <p className="newsletter-form__msg" id={messageId} role="status">
        {error && <span className="form-error">{error}</span>}
        {status === "done" && (
          <span className="newsletter-form__done">
            <SuccessCheck size={20} /> Subscribed — a 10% code for your first order is on its way.
          </span>
        )}
      </p>
      {isFooter && (
        <p className="newsletter-form__privacy">
          By subscribing you agree to our privacy policy. Unsubscribe anytime.
        </p>
      )}
    </form>
  );

  if (isFooter) return form;

  return (
    <section className="section" aria-labelledby="nl-h">
      <div className="container">
        <div className="newsletter">
          <span className="eyebrow newsletter__eyebrow">Join the loom list</span>
          <h2 id="nl-h">Get 10% off your first order</h2>
          <p>New weaves, craft stories, and care guides — straight to your inbox. No spam, ever.</p>
          {form}
        </div>
      </div>
    </section>
  );
}
