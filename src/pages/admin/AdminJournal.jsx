import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PageMeta from "../../components/PageMeta.jsx";
import Container from "../../components/ui/Container.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";
import Button from "../../components/ui/Button.jsx";
import Tag from "../../components/ui/Tag.jsx";
import Field from "../../components/ui/Field.jsx";
import { ROUTES } from "../../constants/routes.js";
import { JOURNAL_POSTS, JOURNAL_CATEGORIES, JOURNAL_SWATCHES } from "../../data/journalContent.js";
import { journalPath } from "../../constants/routes.js";

/**
 * Admin Journal Posts — manage blog/journal articles
 * Uses localStorage for persistence (demo purposes)
 */
const STORAGE_KEY = "wh_admin_journal";

function getStoredPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { }
  return JOURNAL_POSTS;
}

function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch { }
}

function generateId() {
  return `post-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const DEFAULT_POST = {
  slug: "",
  to: "",
  label: "",
  category: JOURNAL_CATEGORIES[1],
  title: "",
  excerpt: "",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  readMinutes: 5,
  featured: false,
  author: {
    name: "Meera Rathore",
    role: "Design Lead · Jaipur",
    avatar: "",
  },
  cover: "",
  alt: "",
  tags: [],
  productIds: [],
  swatches: [],
  toc: [],
  sections: [],
};

// ============================================
// JOURNAL LIST PAGE
// ============================================
function AdminJournalList() {
  const [posts, setPosts] = useState(() => getStoredPosts());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
  }, [posts, search, categoryFilter]);

  const handleDelete = (slug) => setDeleteConfirm(slug);

  const confirmDelete = (slug) => {
    const updated = posts.filter((p) => p.slug !== slug);
    setPosts(updated);
    savePosts(updated);
    setDeleteConfirm(null);
  };

  return (
    <>
      <PageMeta
        title="Journal Posts | Admin | WovenHaat"
        description="Manage journal articles and craft stories."
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>Journal Posts</h1>
          <p className="admin-page-header__subtitle">
            Manage your craft stories and articles. {posts.length} post{posts.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <Link to={`${ROUTES.adminJournal}/new`} className="admin-page-header__action">
          <Button variant="primary">Write Post</Button>
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
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search posts"
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
            {JOURNAL_CATEGORIES.filter((c) => c !== "All Stories").map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        {filteredPosts.length === 0 ? (
          <div className="admin-empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3>No posts found</h3>
            <p>Try adjusting your search or filters.</p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategoryFilter("All"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Read Time</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.slug}>
                  <td>
                    <div className="admin-table__post">
                      <img
                        src={post.cover}
                        alt=""
                        className="admin-table__thumb"
                        onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'; }}
                      />
                      <div>
                        <strong>{post.title}</strong>
                        <small>{post.slug}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Tag tone="coral" size="sm">{post.category}</Tag>
                  </td>
                  <td>{post.date}</td>
                  <td>{post.readMinutes} min</td>
                  <td>
                    {post.featured && (
                      <span className="admin-badge featured">⭐ Featured</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <Link
                        to={`${ROUTES.adminJournal}/${post.slug}/edit`}
                        className="admin-table__action"
                        aria-label={`Edit ${post.title}`}
                      >
                        Edit
                      </Link>
                      <Link
                        to={journalPath(post.slug)}
                        target="_blank"
                        rel="noopener"
                        className="admin-table__action"
                        aria-label={`View ${post.title}`}
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="admin-table__action admin-table__action--delete"
                        onClick={() => handleDelete(post.slug)}
                        aria-label={`Delete ${post.title}`}
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
            <h3 id="delete-modal-title">Delete Post</h3>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
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
// JOURNAL FORM (Add/Edit)
// ============================================
function AdminJournalForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);

  const [formData, setFormData] = useState(() => {
    if (isEditing) {
      const posts = getStoredPosts();
      const post = posts.find((p) => p.slug === slug);
      return post
        ? {
            ...post,
            tags: [...post.tags],
            productIds: [...post.productIds],
            swatches: [...post.swatches],
            toc: [...post.toc],
            sections: post.sections.map((s) => ({
              ...s,
              paragraphs: [...s.paragraphs],
            })),
          }
        : DEFAULT_POST;
    }
    return {
      ...DEFAULT_POST,
      slug: "",
      to: "",
      author: {
        name: "Meera Rathore",
        role: "Design Lead · Jaipur",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
      },
    };
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.cover.trim()) newErrors.cover = "Cover image URL is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.sections.length === 0) newErrors.sections = "At least one section is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNestedChange = (path, value) => {
    setFormData((prev) => {
      const keys = path.split(".");
      const newObj = JSON.parse(JSON.stringify(prev));
      let current = newObj;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newObj;
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], defaultValue] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `section-${Date.now()}`,
          heading: "",
          paragraphs: [""],
          quote: "",
          quoteAuthor: "",
          image: "",
          imageCaption: "",
        },
      ],
    }));
  };

  const removeSection = (index) => {
    if (formData.sections.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const addParagraph = (sectionIndex) => {
    setFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        paragraphs: [...newSections[sectionIndex].paragraphs, ""],
      };
      return { ...prev, sections: newSections };
    });
  };

  const removeParagraph = (sectionIndex, paragraphIndex) => {
    setFormData((prev) => {
      const newSections = [...prev.sections];
      if (newSections[sectionIndex].paragraphs.length <= 1) return prev;
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        paragraphs: newSections[sectionIndex].paragraphs.filter((_, i) => i !== paragraphIndex),
      };
      return { ...prev, sections: newSections };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const posts = getStoredPosts();
    const finalSlug = formData.slug || generateSlug(formData.title);
    const finalTo = journalPath(finalSlug);

    // Check for duplicate slug
    const duplicate = posts.find(
      (p) => p.slug === finalSlug && p.slug !== (isEditing ? slug : "")
    );
    if (duplicate) {
      setErrors({ slug: "This slug is already in use" });
      setSubmitting(false);
      return;
    }

    const postData = {
      ...formData,
      slug: finalSlug,
      to: finalTo,
      tags: formData.tags.filter((t) => t.trim()),
      productIds: formData.productIds.filter((p) => p.trim()),
      swatches: formData.swatches.filter((s) => s.code && s.name && s.hex),
      toc: formData.toc.filter((t) => t.id && t.title),
      sections: formData.sections
        .filter((s) => s.heading.trim())
        .map((s) => ({
          ...s,
          paragraphs: s.paragraphs.filter((p) => p.trim()),
        })),
    };

    let updatedPosts;
    if (isEditing) {
      updatedPosts = posts.map((p) => (p.slug === slug ? postData : p));
    } else {
      updatedPosts = [...posts, postData];
    }

    setPosts(updatedPosts);
    savePosts(updatedPosts);

    setSubmitting(false);
    navigate(ROUTES.adminJournal);
  };

  const [posts, setPosts] = useState(() => getStoredPosts());

  const renderArrayField = (field, label, placeholder, defaultValue = "") => (
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
        <button type="button" className="admin-form__add-array" onClick={() => addArrayItem(field, defaultValue)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add {label}
        </button>
      )}
    </div>
  );

  const renderSwatchField = () => (
    <div className="admin-form__array-field">
      <label className="admin-form__array-label">Color Swatches</label>
      {formData.swatches.map((swatch, idx) => (
        <div key={idx} className="admin-form__swatch-row">
          <div style={{ display: "flex", gap: "var(--sp-2)", flex: 1 }}>
            <Field
              name={`swatches[${idx}].code`}
              value={swatch.code}
              onChange={(v) => handleNestedChange(`swatches[${idx}].code`, v)}
              placeholder="DMC 900"
              style={{ width: "100px" }}
            />
            <Field
              name={`swatches[${idx}].name`}
              value={swatch.name}
              onChange={(v) => handleNestedChange(`swatches[${idx}].name`, v)}
              placeholder="Burnt Orange"
              style={{ flex: 1 }}
            />
            <Field
              name={`swatches[${idx}].hex`}
              type="color"
              value={swatch.hex || "#C8421F"}
              onChange={(v) => handleNestedChange(`swatches[${idx}].hex`, v)}
              style={{ width: "50px" }}
            />
          </div>
          {formData.swatches.length > 1 && (
            <button
              type="button"
              className="admin-form__remove-array"
              onClick={() => removeArrayItem("swatches", idx)}
              aria-label="Remove swatch"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      {formData.swatches.length < 10 && (
        <button type="button" className="admin-form__add-array" onClick={() => addArrayItem("swatches", { code: "", name: "", hex: "#C8421F" })}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Swatch
        </button>
      )}
    </div>
  );

  const renderTOCField = () => (
    <div className="admin-form__array-field">
      <label className="admin-form__array-label">Table of Contents</label>
      {formData.toc.map((item, idx) => (
        <div key={idx} className="admin-form__array-row">
          <div style={{ display: "flex", gap: "var(--sp-2)", flex: 1 }}>
            <Field
              name={`toc[${idx}].id`}
              value={item.id}
              onChange={(v) => handleNestedChange(`toc[${idx}].id`, v)}
              placeholder="anchor-id"
              style={{ width: "140px" }}
            />
            <Field
              name={`toc[${idx}].title`}
              value={item.title}
              onChange={(v) => handleNestedChange(`toc[${idx}].title`, v)}
              placeholder="Section Title"
              style={{ flex: 1 }}
            />
          </div>
          {formData.toc.length > 1 && (
            <button
              type="button"
              className="admin-form__remove-array"
              onClick={() => removeArrayItem("toc", idx)}
              aria-label="Remove TOC item"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      {formData.toc.length < 10 && (
        <button type="button" className="admin-form__add-array" onClick={() => addArrayItem("toc", { id: "", title: "" })}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add TOC Item
        </button>
      )}
    </div>
  );

  const renderSectionField = (section, sectionIndex) => (
    <div key={sectionIndex} className="admin-form__section-block">
      <div className="admin-form__section-block-header">
        <h4>Section {sectionIndex + 1}</h4>
        <div className="admin-form__section-block-actions">
          {sectionIndex > 0 && (
            <button
              type="button"
              className="admin-form__move-btn"
              onClick={() => {
                setFormData((prev) => {
                  const newSections = [...prev.sections];
                  [newSections[sectionIndex - 1], newSections[sectionIndex]] = [newSections[sectionIndex], newSections[sectionIndex - 1]];
                  return { ...prev, sections: newSections };
                });
              }}
              aria-label="Move up"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          )}
          {sectionIndex < formData.sections.length - 1 && (
            <button
              type="button"
              className="admin-form__move-btn"
              onClick={() => {
                setFormData((prev) => {
                  const newSections = [...prev.sections];
                  [newSections[sectionIndex], newSections[sectionIndex + 1]] = [newSections[sectionIndex + 1], newSections[sectionIndex]];
                  return { ...prev, sections: newSections };
                });
              }}
              aria-label="Move down"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
          {formData.sections.length > 1 && (
            <button
              type="button"
              className="admin-form__remove-section"
              onClick={() => removeSection(sectionIndex)}
              aria-label="Remove section"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <Field
        label="Section Heading"
        name={`sections[${sectionIndex}].heading`}
        value={section.heading}
        onChange={(v) => handleNestedChange(`sections[${sectionIndex}].heading`, v)}
        required
        placeholder="e.g., The Chemistry of Sun and Water"
      />

      <label className="admin-form__array-label">Paragraphs</label>
      {section.paragraphs.map((para, pIdx) => (
        <div key={pIdx} className="admin-form__array-row">
          <Field
            name={`sections[${sectionIndex}].paragraphs[${pIdx}]`}
            value={para}
            onChange={(v) => handleNestedChange(`sections[${sectionIndex}].paragraphs[${pIdx}]`, v)}
            as="textarea"
            rows={3}
            placeholder="Write your paragraph here..."
          />
          {section.paragraphs.length > 1 && (
            <button
              type="button"
              className="admin-form__remove-array"
              onClick={() => removeParagraph(sectionIndex, pIdx)}
              aria-label="Remove paragraph"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      {section.paragraphs.length < 5 && (
        <button type="button" className="admin-form__add-array" onClick={() => addParagraph(sectionIndex)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Paragraph
        </button>
      )}

      <div className="admin-form__row" style={{ marginTop: "var(--sp-4)" }}>
        <Field
          label="Quote (optional)"
          name={`sections[${sectionIndex}].quote`}
          value={section.quote}
          onChange={(v) => handleNestedChange(`sections[${sectionIndex}].quote`, v)}
          as="textarea"
          rows={2}
          placeholder="Optional pull quote"
        />
        <Field
          label="Quote Author"
          name={`sections[${sectionIndex}].quoteAuthor`}
          value={section.quoteAuthor}
          onChange={(v) => handleNestedChange(`sections[${sectionIndex}].quoteAuthor`, v)}
          placeholder="— Author Name"
        />
      </div>

      <div className="admin-form__row" style={{ marginTop: "var(--sp-4)" }}>
        <Field
          label="Inline Image URL (optional)"
          name={`sections[${sectionIndex}].image`}
          value={section.image}
          onChange={(v) => handleNestedChange(`sections[${sectionIndex}].image`, v)}
          placeholder="https://example.com/image.jpg"
        />
        <Field
          label="Image Caption"
          name={`sections[${sectionIndex}].imageCaption`}
          value={section.imageCaption}
          onChange={(v) => handleNestedChange(`sections[${sectionIndex}].imageCaption`, v)}
          placeholder="Caption for the image"
        />
      </div>
    </div>
  );

  return (
    <>
      <PageMeta
        title={`${isEditing ? "Edit Post" : "Write Post"} | Admin | WovenHaat`}
        description={isEditing ? "Edit an existing journal post." : "Write a new craft story or article."}
      />

      <header className="admin-page-header">
        <div className="admin-page-header__content">
          <h1>{isEditing ? "Edit Post" : "Write Post"}</h1>
          <p className="admin-page-header__subtitle">
            {isEditing ? "Update your article." : "Create a new journal post for the WovenHaat Journal."}
          </p>
        </div>
        <Link to={ROUTES.adminJournal} className="admin-page-header__action">
          <Button variant="outline">Cancel</Button>
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="admin-form admin-form--journal" noValidate>
        <div className="admin-form__grid">
          <div className="admin-form__main">
            <section className="admin-form__section">
              <h2>Post Details</h2>
              <div className="admin-form__row">
                <Field
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={(v) => handleChange("title", v)}
                  error={errors.title}
                  required
                  placeholder="e.g., Decorating with Burnt Orange and Turquoise"
                />
                <Field
                  label="Slug (URL)"
                  name="slug"
                  value={formData.slug}
                  onChange={(v) => handleChange("slug", v)}
                  error={errors.slug}
                  required
                  placeholder="auto-generated from title"
                  help="Used in the post URL. Lowercase, hyphens only."
                />
              </div>

              <Field
                label="Excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={(v) => handleChange("excerpt", v)}
                as="textarea"
                rows={3}
                error={errors.excerpt}
                required
                placeholder="Brief summary shown in listings..."
              />

              <div className="admin-form__row">
                <Field
                  label="Category"
                  name="category"
                  as="select"
                  value={formData.category}
                  onChange={(v) => handleChange("category", v)}
                  error={errors.category}
                  required
                >
                  <option value="">Select category</option>
                  {JOURNAL_CATEGORIES.filter((c) => c !== "All Stories").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Field>
                <Field
                  label="Read Time (minutes)"
                  name="readMinutes"
                  type="number"
                  min="1"
                  max="60"
                  value={formData.readMinutes}
                  onChange={(v) => handleChange("readMinutes", Number(v) || 5)}
                />
              </div>

              <Field
                label="Featured Post"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={(v) => handleChange("featured", v)}
              />

              <div className="admin-form__row" style={{ marginTop: "var(--sp-4)" }}>
                <Field
                  label="Cover Image URL"
                  name="cover"
                  value={formData.cover}
                  onChange={(v) => handleChange("cover", v)}
                  error={errors.cover}
                  required
                  placeholder="https://example.com/cover.jpg"
                />
                <Field
                  label="Alt Text"
                  name="alt"
                  value={formData.alt}
                  onChange={(v) => handleChange("alt", v)}
                  placeholder="Description for accessibility"
                />
              </div>
            </section>

            <section className="admin-form__section">
              <h2>Author</h2>
              <div className="admin-form__row">
                <Field
                  label="Name"
                  name="author.name"
                  value={formData.author?.name || ""}
                  onChange={(v) => handleNestedChange("author.name", v)}
                  placeholder="Meera Rathore"
                />
                <Field
                  label="Role"
                  name="author.role"
                  value={formData.author?.role || ""}
                  onChange={(v) => handleNestedChange("author.role", v)}
                  placeholder="Design Lead · Jaipur"
                />
              </div>
              <Field
                label="Avatar URL"
                name="author.avatar"
                value={formData.author?.avatar || ""}
                onChange={(v) => handleNestedChange("author.avatar", v)}
                placeholder="https://example.com/avatar.jpg"
              />
            </section>

            <section className="admin-form__section">
              <h2>Article Content</h2>
              <p className="admin-form__help">
                Structure your article with sections. Each section has a heading, paragraphs, and optional quote/image.
              </p>

              {formData.sections.length === 0 && (
                <div className="admin-form__empty-sections">
                  <p>No sections yet. Add your first section to start writing.</p>
                  <Button variant="outline" type="button" onClick={addSection}>Add First Section</Button>
                </div>
              )}

              {formData.sections.map((section, idx) => renderSectionField(section, idx))}

              {formData.sections.length > 0 && (
                <button type="button" className="admin-form__add-section" onClick={addSection}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Section
                </button>
              )}
            </section>

            <section className="admin-form__section">
              <h2>Related Products</h2>
              <p className="admin-form__help">Product IDs to show in "Shop the Story" section (e.g., wh-001, wh-004)</p>
              {renderArrayField("productIds", "Product ID", "wh-001")}
            </section>

            <section className="admin-form__section">
              <h2>Tags</h2>
              {renderArrayField("tags", "Tag", "Colour Theory, DMC 900, Living Room")}
            </section>
          </div>

          <aside className="admin-form__sidebar">
            <section className="admin-form__section admin-form__section--sticky">
              <h2>Color Palette Swatches</h2>
              <p className="admin-form__help">DMC color codes shown in the article palette strip</p>
              {renderSwatchField()}

              <details style={{ marginTop: "var(--sp-4)" }}>
                <summary style={{ cursor: "pointer", color: "var(--color-link)" }}>
                  Quick-add WovenHaat DMC Palette
                </summary>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, swatches: [...JOURNAL_SWATCHES] }));
                  }}
                  style={{ marginTop: "var(--sp-2)" }}
                >
                  Load Default Palette
                </Button>
              </details>
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Table of Contents</h2>
              <p className="admin-form__help">Anchor links for sticky sidebar navigation</p>
              {renderTOCField()}
            </section>

            <section className="admin-form__section admin-form__section--sticky">
              <h2>Actions</h2>
              <div className="admin-form__actions">
                <Button type="submit" variant="primary" disabled={submitting} block>
                  {submitting ? "Saving..." : isEditing ? "Save Changes" : "Publish Post"}
                </Button>
                <Link to={ROUTES.adminJournal}>
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
export default function AdminJournal() {
  const { slug } = useParams();

  if (slug === "new") return <AdminJournalForm />;
  if (slug && slug !== "new") return <AdminJournalForm />;

  return <AdminJournalList />;
}