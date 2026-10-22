/**
 * AuthContext — session management for WovenHaat.
 *
 * Provides: { user, isAuthenticated, login, register, logout, loading }
 * Persists a lightweight user object in localStorage (no real backend yet;
 * swap the stubs in authService.js once the API is ready).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "wovenhaat_user";

/** Load saved session from localStorage — returns null if no session exists. */
function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(loadSession);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  /* Persist on every user change */
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else       localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  /**
   * login({ email, password })
   * Stub — replace with real API call. Returns { ok, error }.
   */
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with real API call
      await new Promise((r) => setTimeout(r, 700)); // simulated latency
      if (!email || !password) throw new Error("Email and password are required.");
      const profile = {
        id:     `usr_${Date.now()}`,
        name:   email.split("@")[0].replace(/[._]/g, " "),
        email,
        avatar: null,
        createdAt: new Date().toISOString()
      };
      setUser(profile);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * register({ name, email, password })
   * Stub — replace with real API call. Returns { ok, error }.
   */
  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      if (!name || !email || !password) throw new Error("All fields are required.");
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");
      const profile = {
        id:     `usr_${Date.now()}`,
        name,
        email,
        avatar: null,
        createdAt: new Date().toISOString()
      };
      setUser(profile);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const updateProfile = useCallback(async (updates) => {
    setUser((prev) => prev ? { ...prev, ...updates } : prev);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoggedIn: !!user,
      loading,
      error,
      login,
      register,
      logout,
      clearError,
      updateProfile,
    }),
    [user, loading, error, login, register, logout, clearError, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return (
    ctx ?? {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login:  async () => ({ ok: false }),
      register: async () => ({ ok: false }),
      logout: () => {},
      clearError: () => {}
    }
  );
}

export default AuthContext;
