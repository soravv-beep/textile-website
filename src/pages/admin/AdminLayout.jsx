import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";
import Container from "../../components/ui/Container.jsx";
import Button from "../../components/ui/Button.jsx";

/**
 * Admin navigation items
 */
const ADMIN_NAV = [
  { path: ROUTES.adminProducts, label: "Products", icon: "📦" },
  { path: ROUTES.adminCollections, label: "Collections", icon: "📁" },
  { path: ROUTES.adminJournal, label: "Journal Posts", icon: "📝" },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-layout">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" role="navigation" aria-label="Admin navigation">
        <div className="admin-sidebar__header">
          <Link to={ROUTES.adminDashboard} className="admin-sidebar__brand">
            <span className="admin-sidebar__icon">⚙️</span>
            <span className="admin-sidebar__title">WovenHaat Admin</span>
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          <ul className="admin-nav">
            {ADMIN_NAV.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `admin-nav__link ${isActive ? "is-active" : ""}`
                  }
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  <span className="admin-nav__icon" aria-hidden="true">{item.icon}</span>
                  <span className="admin-nav__label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__back-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="admin-main" role="main">
        <header className="admin-header">
          <div className="admin-header__left">
            <h1 className="admin-header__title">Dashboard</h1>
          </div>
          <div className="admin-header__right">
            <Link to="/" className="admin-header__view-site" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>View Store</span>
            </Link>
          </div>
        </header>

        <div className="admin-content">
          <Container>
            <Outlet />
          </Container>
        </div>
      </main>
    </div>
  );
}