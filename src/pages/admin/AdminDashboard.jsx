import { Link } from "react-router-dom";

import PageMeta from "../../components/PageMeta.jsx";
import Container from "../../components/ui/Container.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { ROUTES } from "../../constants/routes.js";
import { MOCK_PRODUCTS } from "../../data/mockProducts.js";
import { CATEGORIES } from "../../data/collections.js";
import { JOURNAL_POSTS } from "../../data/journalContent.js";

/**
 * Admin Dashboard — overview stats and quick actions
 */
export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: MOCK_PRODUCTS.length,
      icon: "📦",
      href: ROUTES.adminProducts,
      color: "var(--color-primary)",
    },
    {
      title: "Collections",
      value: CATEGORIES.length,
      icon: "📁",
      href: ROUTES.adminCollections,
      color: "var(--color-accent)",
    },
    {
      title: "Journal Posts",
      value: JOURNAL_POSTS.length,
      icon: "📝",
      href: ROUTES.adminJournal,
      color: "var(--color-link)",
    },
    {
      title: "Featured Posts",
      value: JOURNAL_POSTS.filter((p) => p.featured).length,
      icon: "⭐",
      href: ROUTES.adminJournal,
      color: "var(--color-warning)",
    },
  ];

  const recentProducts = MOCK_PRODUCTS.slice(0, 5);
  const recentPosts = JOURNAL_POSTS.slice(0, 5);

  return (
    <>
      <PageMeta
        title="Admin Dashboard | WovenHaat"
        description="WovenHaat administration dashboard - manage products, collections, and journal content."
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>Admin Dashboard</h1>
          <p className="admin-page-header__subtitle">
            Manage your store content from one place.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="admin-section">
        <div className="admin-stats-grid">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.href} className="admin-stat-card">
              <div className="admin-stat-card__icon" style={{ background: stat.color }}>
                <span aria-hidden="true">{stat.icon}</span>
              </div>
              <div className="admin-stat-card__info">
                <div className="admin-stat-card__value">{stat.value}</div>
                <div className="admin-stat-card__label">{stat.title}</div>
              </div>
              <svg className="admin-stat-card__arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions & Recent Items */}
      <div className="admin-dashboard-grid">
        {/* Recent Products */}
        <section className="admin-section">
          <div className="admin-section__header">
            <h2>Recent Products</h2>
            <Link to={ROUTES.adminProducts} className="admin-section__view-all">
              View all →
            </Link>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-table__product">
                        <img src={product.images[0]} alt="" className="admin-table__thumb" />
                        <div>
                          <strong>{product.name}</strong>
                          <small>{product.slug}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-table__price">
                        ₹{product.price.toLocaleString()}
                        {product.compareAtPrice && (
                          <s className="admin-table__old-price">
                            ₹{product.compareAtPrice.toLocaleString()}
                          </s>
                        )}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${product.inStock ? "in-stock" : "out-of-stock"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`${ROUTES.adminProducts}/${product.id}/edit`}
                        className="admin-table__action"
                        aria-label={`Edit ${product.name}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Journal Posts */}
        <section className="admin-section">
          <div className="admin-section__header">
            <h2>Recent Journal Posts</h2>
            <Link to={ROUTES.adminJournal} className="admin-section__view-all">
              View all →
            </Link>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.slug}>
                    <td>
                      <strong>{post.title}</strong>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge--category">{post.category}</span>
                    </td>
                    <td>{post.date}</td>
                    <td>
                      <Link
                        to={`${ROUTES.adminJournal}/${post.slug}/edit`}
                        className="admin-table__action"
                        aria-label={`Edit ${post.title}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="admin-section">
        <h2>Quick Actions</h2>
        <div className="admin-actions-grid">
          <Link to={`${ROUTES.adminProducts}/new`} className="admin-action-card">
            <span className="admin-action-card__icon">➕</span>
            <h3>Add Product</h3>
            <p>Create a new product listing</p>
          </Link>
          <Link to={`${ROUTES.adminCollections}/new`} className="admin-action-card">
            <span className="admin-action-card__icon">📁</span>
            <h3>Add Collection</h3>
            <p>Create a new product collection</p>
          </Link>
          <Link to={`${ROUTES.adminJournal}/new`} className="admin-action-card">
            <span className="admin-action-card__icon">📝</span>
            <h3>Write Post</h3>
            <p>Publish a new journal article</p>
          </Link>
          <Link to="/" target="_blank" rel="noopener" className="admin-action-card">
            <span className="admin-action-card__icon">🔗</span>
            <h3>View Store</h3>
            <p>Open the live storefront</p>
          </Link>
        </div>
      </section>
    </>
  );
}