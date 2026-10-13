"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECTS = [
  "Order status / delivery",
  "Product question",
  "Returns or exchange",
  "Bulk / custom order",
  "Press or collaboration",
  "Something else"
];

const empty = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "This field is required.";
    if (!form.email.trim()) er.email = "This field is required.";
    else if (!EMAIL_RE.test(form.email.trim())) er.email = "Please enter a valid email address.";
    if (!form.subject) er.subject = "Please select a topic.";
    if (!form.message.trim()) er.message = "This field is required.";

    setErrors(er);
    if (Object.keys(er).length) {
      const first = document.querySelector("[aria-invalid='true']");
      if (first) first.focus();
      return;
    }
    setSent(true);
    setForm(empty);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      {sent && (
        <p className="form-success" role="status">
          Thank you! Your message has been received — we will respond within 24 working hours.
        </p>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="c-name">Full name *</label>
          <input id="c-name" name="name" type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="c-phone">Phone</label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="c-email">Email *</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="c-subject">Subject *</label>
        <select id="c-subject" name="subject" required value={form.subject} onChange={set("subject")} aria-invalid={!!errors.subject}>
          <option value="">Choose a topic…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.subject && <p className="form-error">{errors.subject}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="c-message">Message *</label>
        <textarea id="c-message" name="message" required placeholder="How can we help you?" value={form.message} onChange={set("message")} aria-invalid={!!errors.message} />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <button className="btn btn-primary" type="submit">
        Send Message
      </button>
      <p className="form-hint" style={{ marginTop: "var(--sp-3)" }}>
        * Required fields. Your information will only be used to respond to your inquiry.
      </p>
    </form>
  );
}
