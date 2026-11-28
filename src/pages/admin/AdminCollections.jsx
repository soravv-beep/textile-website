import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PageMeta from "../../components/PageMeta.jsx";
import Container from "../../components/ui/Container.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";
import Button from "../../components/ui/Button.jsx";
import Tag from "../../components/ui/Tag.jsx";
import Field from "../../components/ui/Field.jsx";
import { ROUTES } from "../../constants/routes.js";
import { CATEGORIES } from "../../data/collections.js";

/**
 * Admin Collections — manage product categories/collections
 * Uses localStorage for persistence (demo purposes)
 */
const STORAGE_KEY = "wh_admin_collections";

function getStoredCollections() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { }
  return CATEGORIES;
}

function saveCollections(collections) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch { }
}

function generateId() {
  return `cat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const DEFAULT_COLLECTION = {
  id: "",
  slug: "",
  name: "",
  noun: "",
  tagline: "",
  desc: "",
  tone: "#c9b79a",
  types: [],
  sizes: [],
  care: [],
};

// ============================================
// COLLECTION LIST PAGE
// ============================================
function AdminCollectionList() {
  const [collections, setCollections] = useState(() => getStoredCollections());
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setCollections(getStoredCollections());
  }, []);

  const filteredCollections = useMemo(() => {
    if (!search) return collections;
    const q = search.toLowerCase();
    return collections.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q)
    );
  }, [collections, search]);

  const handleDelete = (id) => setDeleteConfirm(id);

  const confirmDelete = (id) => {
    const updated = collections.filter((c) => c.id !== id);
    setCollections(updated);
    saveCollections(updated);
    setDeleteConfirm(null);
  };

  return (
    <>
      <PageMeta
        title="Collections | Admin | WovenHaat"
        description="Manage product collections and categories."
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>Collections</h1>
          <p className="admin-page-header__subtitle">
            Manage your product categories. {collections.length} collection{collections.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <Link to={`${ROUTES.adminCollections}/new`} className="admin-page-header__action">
          <Button variant="primary">Add Collection</Button>
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
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search collections"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="admin-collections-grid">
        {filteredCollections.length === 0 ? (
          <div className="admin-empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h3>No collections found</h3>
            <p>Try adjusting your search.</p>
            <Button variant="outline" onClick={() => setSearch("")}>Clear Search</Button>
          </div>
        ) : (
          filteredCollections.map((collection) => (
            <article key={collection.id} className="admin-collection-card">
              <div className="admin-collection-card__header" style={{ borderColor: collection.tone }}>
                <div className="admin-collection-card__color" style={{ background: collection.tone }} aria-hidden="true" />
                <div className="admin-collection-card__info">
                  <h3>{collection.name}</h3>
                  <span className="admin-collection-card__slug">/{collection.slug}/</span>
                </div>
              </div>
              <p className="admin-collection-card__desc">{collection.desc}</p>
              <div className="admin-collection-card__meta">
                <span className="admin-collection-card__tagline">{collection.tagline}</span>
                <div className="admin-collection-card__counts">
                  <span>{collection.types.length} types</span>
                  <span>{collection.sizes.length} sizes</span>
                </div>
              </div>
              <div className="admin-collection-card__actions">
                <Link
                  to={`${ROUTES.adminCollections}/${collection.id}/edit`}
                  className="admin-table__action"
                  aria-label={`Edit ${collection.name}`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="admin-table__action admin-table__action--delete"
                  onClick={() => handleDelete(collection.id)}
                  aria-label={`Delete ${collection.name}`}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="delete-modal-title">Delete Collection</h3>
            <p>Are you sure you want to delete this collection? This action cannot be undone.</p>
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
// COLLECTION FORM (Add/Edit)
// ============================================
function AdminCollectionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(() => {
    if (isEditing) {
      const collections = getStoredCollections();
      const collection = collections.find((c) => c.id === id);
      return collection
        ? {
            ...collection,
            types: [...collection.types],
            sizes: [...collection.sizes],
            care: [...collection.care],
          }
        : DEFAULT_COLLECTION;
    }
    return { ...DEFAULT_COLLECTION, id: generateId() };
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.noun.trim()) newErrors.noun = "Singular noun is required (e.g., 'Rug')";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const collections = getStoredCollections();
    const slug = formData.slug || generateSlug(formData.name);
    const finalSlug = isEditing ? formData.slug : slug;

    // Check for duplicate slug
    const duplicate = collections.find(
      (c) => c.slug === finalSlug && c.id !== formData.id
    );
    if (duplicate) {
      setErrors({ slug: "This slug is already in use" });
      setSubmitting(false);
      return;
    }

    const collectionData = {
      ...formData,
      slug: finalSlug,
      types: formData.types.filter((t) => t.trim()),
      sizes: formData.sizes.filter((s) => s.trim()),
      care: formData.care.filter((c) => c.trim()),
    };

    let updatedCollections;
    if (isEditing) {
      updatedCollections = collections.map((c) => (c.id === id ? collectionData : c));
    } else {
      updatedCollections = [...collections, collectionData];
    }

    setCollections(updatedCollections);
    saveCollections(updatedCollections);

    setSubmitting(false);
    navigate(ROUTES.adminCollections);
  };

  const [collections, setCollections] = useState(() => getStoredCollections());

  const renderArrayField = (field, label, placeholder) => (
    <div className="admin-form__array-field">
      <label className="admin-form__array-label">{label}</label>
      {formData[field].map((item, idx) => (
        <div key={idx} className="admin-form__array-row">
          <Field
            name={`${field}[${idx}]`}
            value={item}
            onChange={(v) => handleArrayChange(field, idx, v)}
            placeholder={placeholder}
          />
          {formData[field].length > 1 && (
            <button
              type="button"
              className="admin-form__remove-array"
              onClick={() => removeArrayItem(field, idx)}
              aria-label={`Remove ${label.toLowerCase()}`}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      {formData[field].length < 10 && (
        <button type="button" className="admin-form__add-array" onClick={() => addArrayItem(field)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add {label}
        </button>
      )}
    </div>
  );

  return (
    <>
      <PageMeta
        title={`${isEditing ? "Edit Collection" : "Add Collection"} | Admin | WovenHaat`}
        description={isEditing ? "Edit an existing collection." : "Create a new product collection."}
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>{isEditing ? "Edit Collection" : "Add Collection"}</h1>
          <p className="admin-page-header__subtitle">
            {isEditing ? "Update collection details." : "Create a new product category for your store."}
          </p>
        </div>
        <Link to={ROUTES.adminCollections} className="admin-page-header__action">
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="admin-form" noValidate>
        <div className="admin-form__grid">
          <div className="admin-form__main">
            <section className="admin-form__section">
              <h2>Basic Information</h2>
              <div className="admin-form__row">
                <Field
                  label="Collection Name"
                  name="name"
                  value={formData.name}
                  onChange={(v) => handleChange("name", v)}
                  error={errors.name}
                  required
                  placeholder="e.g., Rugs"
                />
                <Field
                  label="Slug (URL)"
                  name="slug"
                  value={formData.slug}
                  onChange={(v) => handleChange("slug", v)}
                  error={errors.slug}
                  required
                  placeholder="auto-generated from name"
                  help="Used in the collection URL. Lowercase, hyphens only."
                />
              </div>

              <div className="admin-form__row">
                <Field
                  label="Singular Noun"
                  name="noun"
                  value={formData.noun}
                  onChange={(v) => handleChange("noun", v)}
                  error={errors.noun}
                  required
                  placeholder="e.g., Rug"
                  help="Used in UI: 'Shop all Rugs', 'Add Rug to cart'"
                />
                <Field
                  label="Theme Color"
                  name="tone"
                  type="color"
                  value={formData.tone}
                  onChange={(v) => handleChange("tone", v)}
                  help="Used for accent colors in mega menu"
                />
              </div>

              <Field
                label="Tagline"
                name="tagline"
                value={formData.tagline}
                onChange={(v) => handleChange("tagline", v)}
                placeholder="e.g., Timeless Rugs for Every Space"
                help="Shown in mega menu header"
              />

              <Field
                label="Description"
                name="desc"
                value={formData.desc}
                onChange={(v) => handleChange("desc", v)}
                as="textarea"
                rows={3}
                error={errors.desc}
                required
                placeholder="Brief description of this collection"
              />
            </section>
          </div>

          <aside className="admin-form__sidebar">
            <section className="admin-form__section admin-form__section--sticky">
              <h2>Types / Subcategories</h2>
              <p className="admin-form__help">Product types shown in mega menu (e.g., 'Area Rugs', 'Runners')</p>
              {renderArrayField("types", "Type", "e.g., Area Rugs")}
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Available Sizes</h2>
              <p className="admin-form__help">Standard sizes for this collection</p>
              {renderArrayField("sizes", "Size", "e.g., 6' × 9'")}
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Care Guides</h2>
              <p className="admin-form__help">Care guide titles linked in mega menu</p>
              {renderArrayField("care", "Care Guide", "e.g., How to Choose a Rug Size")}
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Actions</h2>
              <div className="admin-form__actions">
                <Button type="submit" variant="primary" disabled={submitting} block>
                  {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Collection"}
                </Button>
                <Link to={ROUTES.adminCollections}>
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
// MAIN EXPORT
// ============================================
export default function AdminCollections() {
  const { id } = useParams();

  if (id === "new") return <AdminCollectionForm />;
  if (id && id !== "new") return <AdminCollectionForm />;

  return <AdminCollectionList />;
}