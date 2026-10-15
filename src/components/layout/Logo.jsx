import AppLink from "../common/AppLink.jsx";

export default function Logo() {
  return (
    <AppLink to="/" className="nav__logo" ariaLabel="WovenHaat home">
      Woven<span>Haat</span>
    </AppLink>
  );
}
