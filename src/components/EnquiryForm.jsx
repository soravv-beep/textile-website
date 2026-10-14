/**
 * <EnquiryForm /> — the Contact page enquiry form (Dev 1).
 *
 * Fields: Name, Email, Phone (+91 default), Enquiry Type, Quantity (only when
 * "Bulk Order" is selected), Message. Full-width burnt-orange submit, privacy
 * line underneath, inline validation (email format, 10-digit phone, required),
 * a honeypot field for spam, and a success state with an animated checkmark.
 *
 * Submission: POSTs JSON to import.meta.env.VITE_FORM_ENDPOINT. Until that env
 * var is configured in .env.local the form runs in demo mode and reports the
 * same success message locally, so the page is testable before the endpoint
 * exists. Never commit a real endpoint with credentials in it.
 */
import { useState } from "react";

import Button from "./ui/Button.jsx";
import SuccessCheck from "../animations/SuccessCheck.jsx";
import { CONTACT, ROUTES } from "../constants/routes.js";
import { Link } from "react-router-dom";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const ENQUIRY_TYPES = ["Retail", "Bulk Order", "Custom Design", "Other"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  type: "Retail",
  quantity: "",
  message: "",
  company: "" // honeypot — real users never see or fill this
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please tell us your name.";
  if (!form.email.trim()) errors.email = "Please add an email address.";
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = "That email address doesn't look right.";
  const digits = form.phone.replace(/\D/g, "").replace(/^91/, "");
  if (!form.phone.trim()) errors.phone = "Please add a phone number.";
  else if (!PHONE_RE.test(digits)) errors.phone = "Enter a 10-digit mobile number.";
  if (!form.type) errors.type = "Please choose an enquiry type.";
  if (form.type === "Bulk Order") {
    const qty = Number(form.quantity);
    if (!form.quantity) errors.quantity = "How many pieces do you need?";
    else if (!Number.isFinite(qty) || qty < 1) errors.quantity = "Quantity must be a number above 0.";
  }
  if (!form.message.trim()) errors.message = "Please add a short message.";
  return errors;
}

export default function EnquiryForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done

  const update = (key) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstInvalid = document.querySelector("[data-enquiry] [aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, phone: form.phone.trim(), source: "contact-page" })
        });
        if (!response.ok) throw new Error(`Enquiry failed: ${response.status}`);
      }
      setStatus("done");
      setForm(EMPTY);
    } catch {
      setStatus("idle");
      setErrors({ message: "We couldn't send that just now — please email us directly." });
    }
  };

  if (status === "done") {
    return (
      <div className="enquiry-success" role="status">
        <SuccessCheck size={52} />
        <h3>Thanks! We'll reply within 24 hours.</h3>
        <p>
          Your enquiry is with the studio team in Panipat. For anything urgent,
          call us on <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>.
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const isBulk = form.type === "Bulk Order";

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate data-enquiry>
      <div className="form-row">
        <div className={`form-group${errors.name ? " field--error" : ""}`}>
          <label htmlFor="eq-name">Name *</label>
          <input
            id="eq-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "eq-name-error" : undefined}
          />
          {errors.name && (
            <p className="form-error" id="eq-name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`form-group${errors.email ? " field--error" : ""}`}>
          <label htmlFor="eq-email">Email *</label>
          <input
            id="eq-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={update("email")}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "eq-email-error" : undefined}
          />
          {errors.email && (
            <p className="form-error" id="eq-email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className={`form-group${errors.phone ? " field--error" : ""}`}>
          <label htmlFor="eq-phone">Phone *</label>
          <div className="phone-field">
            <span className="phone-field__prefix" aria-hidden="true">
              +91
            </span>
            <input
              id="eq-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              maxLength={10}
              value={form.phone}
              onChange={update("phone")}
              aria-invalid={errors.phone ? "true" : undefined}
              aria-describedby={errors.phone ? "eq-phone-error" : undefined}
            />
          </div>
          {errors.phone && (
            <p className="form-error" id="eq-phone-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className={`form-group${errors.type ? " field--error" : ""}`}>
          <label htmlFor="eq-type">Enquiry type *</label>
          <select id="eq-type" name="type" value={form.type} onChange={update("type")}>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity appears only for bulk enquiries */}
      {isBulk && (
        <div className={`form-group${errors.quantity ? " field--error" : ""}`}>
          <label htmlFor="eq-quantity">Quantity (pieces) *</label>
          <input
            id="eq-quantity"
            name="quantity"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="e.g. 40"
            value={form.quantity}
            onChange={update("quantity")}
            aria-invalid={errors.quantity ? "true" : undefined}
            aria-describedby={errors.quantity ? "eq-quantity-error" : undefined}
          />
          {errors.quantity && (
            <p className="form-error" id="eq-quantity-error" role="alert">
              {errors.quantity}
            </p>
          )}
          <p className="form-hint">
            Planning a larger run? Tell us in the message and we'll send a volume price list.
          </p>
        </div>
      )}

      <div className={`form-group${errors.message ? " field--error" : ""}`}>
        <label htmlFor="eq-message">Message *</label>
        <textarea
          id="eq-message"
          name="message"
          rows={5}
          placeholder="Tell us what you're looking for — sizes, colours, timelines…"
          value={form.message}
          onChange={update("message")}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "eq-message-error" : undefined}
        />
        {errors.message && (
          <p className="form-error" id="eq-message-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from users and screen readers, bots fill it in. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="eq-company">Company (leave blank)</label>
        <input
          id="eq-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <Button type="submit" variant="primary" block arrow loading={status === "sending"}>
        Send Enquiry
      </Button>

      <p className="form-hint enquiry-form__privacy">
        Your details are only used to answer this enquiry. See our{" "}
        <Link to={ROUTES.shippingReturns}>privacy note</Link>.
      </p>
    </form>
  );
}
