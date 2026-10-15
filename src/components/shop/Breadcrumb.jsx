import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";

const LINKS = {
  Shop: ROUTES.shop,
  Collections: ROUTES.collections,
  Journal: ROUTES.journal,
  Cart: ROUTES.cart,
  About: ROUTES.about
};

/** Home / Shop / Product name — the last item is plain text. */
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to={ROUTES.home}>Home</Link>
      {items.map((item, index) => (
        <span key={item}>
          / {index === items.length - 1 || !LINKS[item] ? item : <Link to={LINKS[item]}>{item}</Link>}
        </span>
      ))}
    </nav>
  );
}
