import { ArrowRight } from "lucide-react";
import AppLink from "./AppLink.jsx";

export default function SectionHeading({ kicker, title, copy, link, align = "left" }) {
  return (
    <div className={`section-heading ${align}`}>
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {link && <AppLink to={link[1]} className="inline-link">{link[0]}<ArrowRight /></AppLink>}
    </div>
  );
}
