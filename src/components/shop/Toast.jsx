import { Check } from "lucide-react";

/** Transient confirmation message (add to cart, wishlist, compare limit). */
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="shop-scope">
      <div className="toast" role="status">
        <Check aria-hidden="true" />
        {message}
      </div>
    </div>
  );
}
