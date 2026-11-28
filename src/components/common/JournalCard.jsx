import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Tag from "../ui/Tag.jsx";
import { journalPath } from "../../constants/routes.js";

/**
 * JournalCard — reusable card for journal listings.
 * Matches the current design system (globals.css .jn-card styles).
 */
export default function JournalCard({ post }) {
  return (
    <article className="jn-card">
      <div className="jn-card__media">
        <Link to={journalPath(post.slug)}>
          <img
            src={post.cover}
            alt={post.alt}
            className="jn-card__img"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="jn-card__body">
        <div className="jn-card__category">
          <Tag tone="coral">{post.category}</Tag>
        </div>
        <h3 className="jn-card__title">
          <Link to={journalPath(post.slug)}>
            {post.title}
          </Link>
        </h3>
        <p className="jn-card__excerpt">
          {post.excerpt}
        </p>
        <div className="jn-card__foot">
          <span>{post.date} · {post.readMinutes} min read</span>
          <Link to={journalPath(post.slug)} className="jn-card__link">
            Read story <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}