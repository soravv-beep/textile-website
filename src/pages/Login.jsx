/**
 * Login / Register Page — WovenHaat (Dev 3 / Manav Chotai)
 * Left: textile fabric image with brand text overlay
 * Right: Sign In / Create Account tabs with placeholders, no emojis
 */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

    </>
  );
}
