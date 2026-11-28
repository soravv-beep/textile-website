import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PageMeta from "../../components/PageMeta.jsx";
import Container from "../../components/ui/Container.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";
import Button from "../../components/ui/Button.jsx";
import Tag from "../../components/ui/Tag.jsx";
import Field from "../../components/ui/Field.jsx";
import { ROUTES } from "../../constants/routes.js";
import { MOCK_PRODUCTS } from "../../data/mockProducts.js";
import { formatINR } from "../../utils/format.js";

/**
 * Admin Products — list, create, edit products
 * Uses localStorage for persistence (demo purposes)
 */
const STORAGE_KEY = "wh_admin_products";

const DEFAULT_PRODUCT = {
  id: "",
  slug: "",
  name: "",
  images: [""],
  price: 0,
  compareAtPrice: "",
  saleEndsAt: "",
  badge: { label: "" },
  ecoLabel: "",
  meta: "",
  inStock: true,
  isWishlisted: false,
};

const CATEGORY_OPTIONS = [
  "Rugs", "Cushions", "Throws", "Bath Mats", "Table Linen", "Curtains"
];

const BADGE_OPTIONS = ["", "Bestseller", "New", "Sale", "Limited"];

const ECO_LABEL_OPTIONS = ["", "GOTS Certified", "OEKO-TEX", "GRS Recycled Yarn", "Handloom", "Handknotted"];

function getStoredProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { }
  return MOCK_PRODUCTS;
}

function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch { }
}

function generateId() {
  return `wh-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ============================================
// PRODUCT LIST PAGE
// ============================================
export function AdminProductList() {
  const [products, setProducts] = useState(() => getStoredProducts());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Sync with localStorage on mount
  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.meta?.includes(categoryFilter) || p.ecoLabel?.includes(categoryFilter));
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter((p) => (statusFilter === "In Stock" ? p.inStock : !p.inStock));
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, search, categoryFilter, statusFilter, sortBy, sortDir]);

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
    setDeleteConfirm(null);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <span>⇅</span>;
    return sortDir === "asc" ? <span>↑</span> : <span>↓</span>;
  };

  return (
    <>
      <PageMeta
        title="Products | Admin | WovenHaat"
        description="Manage products in the WovenHaat store."
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>Products</h1>
          <p className="admin-page-header__subtitle">
            Manage your product catalog. {products.length} product{products.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <Link to={`${ROUTES.adminProducts}/new`} className="admin-page-header__action">
          <Button variant="primary">Add Product</Button>
        </Link>
      </header>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-toolbar__search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="admin-toolbar__filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="admin-select"
          >
            <option value="All">All Categories</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by stock status"
            className="admin-select"
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        {filteredProducts.length === 0 ? (
          <div className="admin-empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategoryFilter("All"); setStatusFilter("All"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Product <SortIcon field="name" />
                </th>
                <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                  Price <SortIcon field="price" />
                </th>
                <th onClick={() => handleSort("compareAtPrice")} style={{ cursor: "pointer" }}>
                  Compare At <SortIcon field="compareAtPrice" />
                </th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-table__product">
                      <img
                        src={product.images?.[0] || product.images}
                        alt=""
                        className="admin-table__thumb"
                        onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'; }}
                      />
                      <div>
                        <strong>{product.name}</strong>
                        <small>{product.slug}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-table__price">
                      {formatINR(product.price)}
                      {product.compareAtPrice && (
                        <s className="admin-table__old-price">
                          {formatINR(product.compareAtPrice)}
                        </s>
                      )}
                    </span>
                  </td>
                  <td>{product.compareAtPrice ? formatINR(product.compareAtPrice) : "—"}</td>
                  <td>
                    <Tag tone="tan" size="sm">
                      {product.meta?.split("·")[0]?.trim() || "General"}
                    </Tag>
                  </td>
                  <td>
                    <span className={`admin-badge ${product.inStock ? "in-stock" : "out-of-stock"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <Link
                        to={`${ROUTES.adminProducts}/${product.id}/edit`}
                        className="admin-table__action"
                        aria-label={`Edit ${product.name}`}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="admin-table__action admin-table__action--delete"
                        onClick={() => handleDelete(product.id)}
                        aria-label={`Delete ${product.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="delete-modal-title">Delete Product</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="admin-modal__actions">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="danger" onClick={() => confirmDelete(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// PRODUCT FORM (Add/Edit)
// ============================================
export function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(() => {
    if (isEditing) {
      const products = getStoredProducts();
      const product = products.find((p) => p.id === id);
      return product ? { ...product, images: [...product.images] } : DEFAULT_PRODUCT;
    }
    return { ...DEFAULT_PRODUCT, id: generateId() };
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.images[0]?.trim()) newErrors.images = "At least one image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
    if (errors.images) setErrors((prev) => ({ ...prev, images: undefined }));
  };

  const addImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImage = (index) => {
    if (formData.images.length <= 1) return;
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const products = getStoredProducts();
    const slug = formData.slug || generateSlug(formData.name);
    const finalSlug = isEditing ? formData.slug : slug;

    // Check for duplicate slug
    const duplicate = products.find(
      (p) => p.slug === finalSlug && p.id !== formData.id
    );
    if (duplicate) {
      setErrors({ slug: "This slug is already in use" });
      setSubmitting(false);
      return;
    }

    const productData = {
      ...formData,
      slug: finalSlug,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      badge: formData.badge?.label ? { label: formData.badge.label } : undefined,
      images: formData.images.filter((img) => img.trim()),
    };

    let updatedProducts;
    if (isEditing) {
      updatedProducts = products.map((p) => (p.id === id ? productData : p));
    } else {
      updatedProducts = [...products, productData];
    }

    setProducts(updatedProducts);
    saveProducts(updatedProducts);

    setSubmitting(false);
    navigate(ROUTES.adminProducts);
  };

  // Need to use setProducts from context or re-get
  const [products, setProducts] = useState(() => getStoredProducts());

  return (
    <>
      <PageMeta
        title={`${isEditing ? "Edit Product" : "Add Product"} | Admin | WovenHaat`}
        description={isEditing ? "Edit an existing product." : "Create a new product listing."}
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>{isEditing ? "Edit Product" : "Add Product"}</h1>
          <p className="admin-page-header__subtitle">
            {isEditing ? "Update product details." : "Create a new product listing for your store."}
          </p>
        </div>
        <Link to={ROUTES.adminProducts} className="admin-page-header__action">
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="admin-form" noValidate>
        <div className="admin-form__grid">
          {/* Main Content */}
          <div className="admin-form__main">
            <section className="admin-form__section">
              <h2>Basic Information</h2>
              <div className="admin-form__row">
                <Field
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={(v) => handleChange("name", v)}
                  error={errors.name}
                  required
                  placeholder="e.g., Bhujodi Terracotta Handloom Rug"
                />
                <Field
                  label="Slug (URL)"
                  name="slug"
                  value={formData.slug}
                  onChange={(v) => handleChange("slug", v)}
                  error={errors.slug}
                  required
                  placeholder="auto-generated from name"
                  help="Used in the product URL. Lowercase, hyphens only."
                />
              </div>

              <Field
                label="Description / Meta"
                name="meta"
                value={formData.meta}
                onChange={(v) => handleChange("meta", v)}
                as="textarea"
                rows={3}
                placeholder="e.g., 5x8 ft · Wool"
                help="Brief description shown on product cards."
              />
            </section>

            <section className="admin-form__section">
              <h2>Images</h2>
              <p className="admin-form__help">Add at least one image. The first image is used as the main product image.</p>
              {formData.images.map((img, idx) => (
                <div key={idx} className="admin-form__image-row">
                  <Field
                    label={`Image ${idx + 1}`}
                    name={`images[${idx}]`}
                    value={img}
                    onChange={(v) => handleImageChange(idx, v)}
                    error={errors.images && idx === 0 ? errors.images : undefined}
                    placeholder="https://example.com/image.jpg or /path/to/image.webp"
                    required={idx === 0}
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      className="admin-form__remove-image"
                      onClick={() => removeImage(idx)}
                      aria-label={`Remove image ${idx + 1}`}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 6l12 12M18 6l-12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {formData.images.length < 5 && (
                <button type="button" className="admin-form__add-image" onClick={addImage}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add another image
                </button>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="admin-form__sidebar">
            <section className="admin-form__section admin-form__section--sticky">
              <h2>Pricing</h2>
              <div className="admin-form__row">
                <Field
                  label="Price (₹)"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={(v) => handleChange("price", v)}
                  error={errors.price}
                  required
                  placeholder="12499"
                />
                <Field
                  label="Compare At Price (₹)"
                  name="compareAtPrice"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.compareAtPrice || ""}
                  onChange={(v) => handleChange("compareAtPrice", v)}
                  placeholder="17849 (optional)"
                  help="Original price for sale display"
                />
              </div>

              <Field
                label="Sale Ends At"
                name="saleEndsAt"
                type="datetime-local"
                value={formData.saleEndsAt ? formData.saleEndsAt.slice(0, 16) : ""}
                onChange={(v) => handleChange("saleEndsAt", v)}
                help="ISO datetime for sale countdown (optional)"
              />
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Classification</h2>
              <Field
                label="Category"
                name="category"
                as="select"
                value={formData.meta?.split("·")[0]?.trim() || ""}
                onChange={(v) => handleChange("meta", v.replace(/·.*$/, "").trim() + " · " + formData.meta?.split("·").slice(1).join("·").trim())}
                error={errors.category}
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Field>

              <Field
                label="Badge"
                name="badge"
                as="select"
                value={formData.badge?.label || ""}
                onChange={(v) => handleChange("badge", { label: v })}
              >
                <option value="">None</option>
                {BADGE_OPTIONS.filter(Boolean).map((badge) => (
                  <option key={badge} value={badge}>{badge}</option>
                ))}
              </Field>

              <Field
                label="Eco Label"
                name="ecoLabel"
                as="select"
                value={formData.ecoLabel || ""}
                onChange={(v) => handleChange("ecoLabel", v)}
              >
                <option value="">None</option>
                {ECO_LABEL_OPTIONS.filter(Boolean).map((label) => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </Field>
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Inventory</h2>
              <Field
                label="In Stock"
                name="inStock"
                type="checkbox"
                checked={formData.inStock}
                onChange={(v) => handleChange("inStock", v)}
              />

              <Field
                label="Wishlisted (demo)"
                name="isWishlisted"
                type="checkbox"
                checked={formData.isWishlisted}
                onChange={(v) => handleChange("isWishlisted", v)}
              />
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Actions</h2>
              <div className="admin-form__actions">
                <Button type="submit" variant="primary" disabled={submitting} block>
                  {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
                </Button>
                <Link to={ROUTES.adminProducts}>
                  <Button variant="outline" block>Cancel</Button>
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </form>
    </>
  );
}

// ============================================
// MAIN EXPORT - Routes to List or Form
// ============================================
export default function AdminProducts() {
  const { id } = useParams();

  if (id === "new") return <AdminProductForm />;
  if (id && id !== "new") return <AdminProductForm />;

  return <AdminProductList />;
}