import { Link } from "react-router-dom";

export default function AppLink({ to, children, className = "", onClick, ariaLabel, ...rest }) {
  return (
    <Link to={to} className={className} aria-label={ariaLabel} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
