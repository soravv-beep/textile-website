/**
 * <PageMeta /> — per-route SEO for a client-rendered Vite app.
 *
 * In the old Next.js build these were `export const metadata`. In Vite we set
 * them imperatively: document.title plus the description / canonical / og tags,
 * restored when the route unmounts. Search engines that execute JS (and every
 * social crawler that respects <meta property="og:*"> after render) pick these
 * up; if the team later adds prerendering (vite-plugin-ssr / react-snap), this
 * component is the single place to hook into.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.image] absolute or root-relative OG image
 */
import { useEffect } from "react";

const SITE_NAME = "WovenHaat";

function upsertMeta(attr, key, content) {
  if (!content) return undefined;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !tag;
  if (created) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  const previous = tag.getAttribute("content");
  tag.setAttribute("content", content);
  return () => {
    if (created) tag.remove();
    else tag.setAttribute("content", previous ?? "");
  };
}

export default function PageMeta({ title, description, image }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title}` : SITE_NAME;

    const cleanups = [
      upsertMeta("name", "description", description),
      upsertMeta("property", "og:title", title),
      upsertMeta("property", "og:description", description),
      upsertMeta("property", "og:type", "website"),
      upsertMeta("property", "og:site_name", SITE_NAME),
      upsertMeta("name", "twitter:card", "summary_large_image"),
      upsertMeta("name", "twitter:title", title),
      upsertMeta("name", "twitter:description", description),
      image ? upsertMeta("property", "og:image", image) : undefined,
      image ? upsertMeta("name", "twitter:image", image) : undefined
    ].filter(Boolean);

    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn?.());
    };
  }, [title, description, image]);

  return null;
}
