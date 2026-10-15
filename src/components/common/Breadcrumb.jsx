import AppLink from "./AppLink.jsx";

const links = {
  Shop: "/shop",
  Collections: "/collections",
  Journal: "/journal",
  Cart: "/cart",
  About: "/about",
};

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <AppLink to="/">Home</AppLink>
      {items.map((item, index) => (
        <span key={item}>
          / {index === items.length - 1 || !links[item] ? item : <AppLink to={links[item]}>{item}</AppLink>}
        </span>
      ))}
    </nav>
  );
}
