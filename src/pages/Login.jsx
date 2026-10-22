/**
 * Login / Register Page — WovenHaat (Dev 3 / Manav Chotai)
 * Left: textile fabric image with brand text overlay
 * Right: Sign In / Create Account tabs with placeholders, no emojis
 */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ROUTES } from "../constants/routes.js";
import PageMeta from "../components/PageMeta.jsx";

import loginBg from "../assets/login-bg.jpg";

/* Textile fabric image — user-supplied reference photograph */
const TEXTILE_IMG = loginBg;

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

/* ── Sign In form ── */
function SignInForm({ onSuccess }) {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [formErr, setFormErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormErr("");
    if (!email || !password) { setFormErr("Please fill in all fields."); return; }
    const { ok, error: err } = await login({ email, password });
    if (ok) onSuccess();
    else setFormErr(err || "Sign in failed. Please try again.");
  };

  return (
    <form className="lp-form" onSubmit={handleSubmit} noValidate id="signin-form">
      <h2 className="lp-form__title">Welcome back</h2>
      <p className="lp-form__sub">Sign in to your WovenHaat account</p>
      {(formErr || error) && <div className="lp-alert" role="alert">{formErr || error}</div>}

      <div className="lp-field">
        <label htmlFor="signin-email" className="lp-field__label">Email address</label>
        <input
          id="signin-email"
          type="email"
          className="lp-field__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. manav@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="lp-field">
        <label htmlFor="signin-password" className="lp-field__label">Password</label>
        <div className="lp-field__pw-wrap">
          <input
            id="signin-password"
            type={showPw ? "text" : "password"}
            className="lp-field__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
          <button type="button" className="lp-field__eye" onClick={() => setShowPw((s) => !s)} aria-label="Toggle password visibility">
            <EyeIcon open={showPw} />
          </button>
        </div>
      </div>

      <div className="lp-row">
        <label className="lp-remember">
          <input type="checkbox" id="signin-remember" /> Remember me
        </label>
        <a href="#" className="lp-forgot">Forgot password?</a>
      </div>

      <button type="submit" className="lp-submit" disabled={loading} id="signin-submit">
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="lp-divider"><span>or continue with</span></div>

      <button type="button" className="lp-google" id="signin-google">
        <GoogleIcon /> Sign in with Google
      </button>
    </form>
  );
}

/* ── Create Account form ── */
function RegisterForm({ onSuccess }) {
  const { register, loading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [formErr, setFormErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormErr("");
    if (!name || !email || !password || !confirm) { setFormErr("All fields are required."); return; }
    if (password !== confirm) { setFormErr("Passwords do not match."); return; }
    if (password.length < 8) { setFormErr("Password must be at least 8 characters."); return; }
    const { ok, error: err } = await register({ name, email, password });
    if (ok) onSuccess();
    else setFormErr(err || "Registration failed. Please try again.");
  };

  return (
    <form className="lp-form" onSubmit={handleSubmit} noValidate id="register-form">
      <h2 className="lp-form__title">Create account</h2>
      <p className="lp-form__sub">Join WovenHaat and discover handwoven art</p>
      {(formErr || error) && <div className="lp-alert" role="alert">{formErr || error}</div>}

      <div className="lp-field">
        <label htmlFor="reg-name" className="lp-field__label">Full name</label>
        <input
          id="reg-name"
          type="text"
          className="lp-field__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Manav Chotai"
          autoComplete="name"
          required
        />
      </div>

      <div className="lp-field">
        <label htmlFor="reg-email" className="lp-field__label">Email address</label>
        <input
          id="reg-email"
          type="email"
          className="lp-field__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. manav@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="lp-field">
        <label htmlFor="reg-password" className="lp-field__label">Password</label>
        <div className="lp-field__pw-wrap">
          <input
            id="reg-password"
            type={showPw ? "text" : "password"}
            className="lp-field__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            required
          />
          <button type="button" className="lp-field__eye" onClick={() => setShowPw((s) => !s)} aria-label="Toggle password visibility">
            <EyeIcon open={showPw} />
          </button>
        </div>
      </div>

      <div className="lp-field">
        <label htmlFor="reg-confirm" className="lp-field__label">Confirm password</label>
        <input
          id="reg-confirm"
          type="password"
          className="lp-field__input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
        />
      </div>

      <button type="submit" className="lp-submit" disabled={loading} id="register-submit">
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <div className="lp-divider"><span>or continue with</span></div>

      <button type="button" className="lp-google" id="register-google">
        <GoogleIcon /> Sign up with Google
      </button>
    </form>
  );
}

/* ── Main ── */
export default function LoginPage() {
  const [tab, setTab] = useState("signin");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || ROUTES.account;

  const handleSuccess = () => navigate(from, { replace: true });

  return (
    <>
      <PageMeta
        title="Sign In — WovenHaat"
        description="Sign in or create your WovenHaat account to access your cart, orders and wishlist."
      />
      <div className="lp-page">
        {/* ── Left panel — textile image ── */}
        <div className="lp-brand">
          <img
            src={TEXTILE_IMG}
            alt="Handwoven Indian textile"
            className="lp-brand__img"
          />
          <div className="lp-brand__overlay" />
          <div className="lp-brand__text">
            <Link to={ROUTES.home} className="lp-brand__logo">WovenHaat</Link>
            <h1 className="lp-brand__headline">
              India's finest<br />handwoven textiles
            </h1>
            <p className="lp-brand__tagline">
              Authentic craftsmanship from the looms of Kutch, Bhujodi and Panipat — delivered to your door.
            </p>
            <div className="lp-brand__stats">
              <div className="lp-stat"><span className="lp-stat__num">5000+</span><span className="lp-stat__label">Happy Customers</span></div>
              <div className="lp-stat"><span className="lp-stat__num">200+</span><span className="lp-stat__label">Artisan Weavers</span></div>
              <div className="lp-stat"><span className="lp-stat__num">10yr</span><span className="lp-stat__label">Craft Heritage</span></div>
            </div>
          </div>
        </div>

        {/* ── Right panel — forms ── */}
        <div className="lp-form-panel">
          <div className="lp-tabs" role="tablist">
            <button
              className={`lp-tab${tab === "signin" ? " is-active" : ""}`}
              onClick={() => setTab("signin")}
              role="tab"
              aria-selected={tab === "signin"}
              id="tab-signin"
            >
              Sign In
            </button>
            <button
              className={`lp-tab${tab === "register" ? " is-active" : ""}`}
              onClick={() => setTab("register")}
              role="tab"
              aria-selected={tab === "register"}
              id="tab-register"
            >
              Create Account
            </button>
          </div>

          <div className="lp-form-container">
            {tab === "signin"
              ? <SignInForm onSuccess={handleSuccess} />
              : <RegisterForm onSuccess={handleSuccess} />
            }
          </div>

          <p className="lp-switch">
            {tab === "signin" ? (
              <>New to WovenHaat?{" "}
                <button className="lp-switch__btn" onClick={() => setTab("register")}>Create an account</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button className="lp-switch__btn" onClick={() => setTab("signin")}>Sign in</button>
              </>
            )}
          </p>
        </div>
      </div>

      <style>{`
        .lp-page {
          height: calc(100vh - var(--nav-height, 64px));
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        @media (max-width: 820px) { .lp-page { grid-template-columns: 1fr; } }

        /* Brand / image panel */
        .lp-brand {
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        @media (max-width: 820px) { .lp-brand { display: none; } }
        .lp-brand__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .lp-brand__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,5,2,0.92) 0%,
            rgba(15,8,3,0.75) 35%,
            rgba(20,10,5,0.25) 65%,
            rgba(0,0,0,0.05) 100%
          );
        }
        .lp-brand__text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 1.5rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          color: #fff;
          box-sizing: border-box;
        }

        .lp-brand__logo {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          margin-bottom: 0.75rem;
          opacity: 0.9;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .lp-brand__headline {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 2vw, 2rem);
          font-weight: 700;
          line-height: 1.25;
          margin: 0 0 0.6rem;
          color: #fff;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        .lp-brand__tagline {
          font-size: 0.85rem;
          line-height: 1.65;
          opacity: 0.88;
          margin: 0 0 1.25rem;
          max-width: 420px;
          color: #e8ddd5;
          text-shadow: 0 1px 6px rgba(0,0,0,0.4);
        }
        .lp-brand__stats { display: flex; gap: 2.5rem; flex-wrap: wrap; justify-content: center; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.2); width: 100%; max-width: 420px; }
        .lp-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }

        .lp-stat__num { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #ffd59a; }
        .lp-stat__label { font-size: 0.78rem; color: rgba(255,255,255,0.75); letter-spacing: 0.04em; }

        /* Form panel */
        .lp-form-panel {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 1.5rem 2.5rem 2rem;
          background: var(--color-bg);
          height: 100%;
          overflow-y: auto;
          min-height: 0;
        }
        @media (max-width: 480px) { .lp-form-panel { padding: 2rem 1.25rem; } }

        /* Tabs */
        .lp-tabs {
          display: flex;
          border-bottom: 2px solid var(--color-border);
          margin-bottom: var(--sp-6);
        }
        .lp-tab {
          flex: 1;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          padding: var(--sp-3) 0;
          margin-bottom: -2px;
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-muted);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .lp-tab.is-active { color: var(--color-primary); border-bottom-color: var(--color-primary); }

        /* Form */
        .lp-form { display: flex; flex-direction: column; gap: var(--sp-4); }
        .lp-form__title { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: var(--color-text); }
        .lp-form__sub { color: var(--color-muted); margin: 0; font-size: 0.9rem; }
        .lp-alert { background: #fef0ed; border: 1px solid #f5b8ae; color: var(--color-error); border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); font-size: 0.88rem; }
        .lp-field { display: flex; flex-direction: column; gap: var(--sp-1); }
        .lp-field__label { font-size: 0.88rem; font-weight: 600; color: var(--color-text); }
        .lp-field__input {
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: var(--color-text);
          background: var(--color-surface);
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .lp-field__input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(200,66,31,.1); }
        .lp-field__input::placeholder { color: #b0a898; }
        .lp-field__pw-wrap { position: relative; }
        .lp-field__pw-wrap .lp-field__input { padding-right: 3rem; }
        .lp-field__eye {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-muted);
          display: flex;
          align-items: center;
          padding: 0;
        }
        .lp-row { display: flex; justify-content: space-between; align-items: center; }
        .lp-remember { display: flex; align-items: center; gap: var(--sp-2); font-size: 0.85rem; color: var(--color-muted); cursor: pointer; }
        .lp-forgot { font-size: 0.85rem; color: var(--color-primary); text-decoration: none; }
        .lp-forgot:hover { text-decoration: underline; }
        .lp-submit {
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          padding: 0.875rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .lp-submit:hover:not(:disabled) { background: #a63419; transform: translateY(-1px); }
        .lp-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .lp-divider { display: flex; align-items: center; gap: var(--sp-3); color: var(--color-muted); font-size: 0.82rem; }
        .lp-divider::before, .lp-divider::after { content: ""; flex: 1; height: 1px; background: var(--color-border); }
        .lp-google {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--sp-3);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          background: var(--color-surface);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lp-google:hover { border-color: #4285F4; box-shadow: 0 0 0 3px rgba(66,133,244,.1); }
        .lp-switch { text-align: center; font-size: 0.88rem; color: var(--color-muted); margin-top: var(--sp-4); }
        .lp-switch__btn { background: none; border: none; color: var(--color-primary); font-weight: 600; cursor: pointer; text-decoration: underline; font-size: inherit; }
        .lp-form-container { flex: 1; }
      `}</style>
    </>
  );
}
