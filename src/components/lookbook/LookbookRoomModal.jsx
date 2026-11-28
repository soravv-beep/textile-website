import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Copy, Check } from "lucide-react";

import { productPath } from "../../constants/routes.js";
import { formatINR } from "../../utils/format.js";
import { products, colorSwatches } from "../../data/catalog.js";
import { shareLinks as shareLinksUtil } from "../../utils/shareLinks.js";

/**
 * LookbookRoomModal - Premium interactive room detail modal
 * Displays a lifestyle room image with interactive hotspots and product information panel
 */
export default function LookbookRoomModal({
  look,
  isOpen,
  onClose
}) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(null);
  const modalCardRef = useRef(null);
  const previousActiveRef = useRef(null);

  // Get products for this look's hotspots
  const lookProducts = useMemo(() => {
    if (!look) return [];
    const productMap = new Map(products.map((p) => [p.id, p]));
    return look.hotspots
      .map((h) => ({
        ...h,
        product: productMap.get(h.productId)
      }))
      .filter((h) => Boolean(h.product));
  }, [look]);

  // Currently selected product (from hotspot or first product)
  const selectedProduct = selectedHotspot
    ? lookProducts.find((p) => p.productId === selectedHotspot.productId)?.product
    : lookProducts[0]?.product;

  // Handle share link copy
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyFeedback("copied");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback("failed");
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  // Focus trap, escape, scroll lock, restore focus for modal
  useEffect(() => {
    if (!isOpen) return;
    const card = modalCardRef.current;
    previousActiveRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeBtn = card?.querySelector(".lookbook-room-modal__close");
    closeBtn?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key === "Tab") {
        const focusable = card?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveRef.current && typeof previousActiveRef.current.focus === "function") {
        previousActiveRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Reset selected hotspot when look changes
  useEffect(() => {
    setSelectedHotspot(null);
  }, [look?.id]);

  if (!isOpen || !look) return null;

  const shareUrls = shareLinksUtil(look);

  return (
    <div className="lookbook-room-modal-overlay" role="dialog" aria-modal="true" aria-label={`Shop the look: ${look.title}`}>
      <div className="lookbook-room-modal__scrim" onClick={onClose} />
      
      <div 
        ref={modalCardRef} 
        className="lookbook-room-modal__panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - top right, circular white with shadow */}
        <button
          type="button"
          className="lookbook-room-modal__close"
          aria-label="Close lookbook room detail"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {/* Main content grid - 60/40 split */}
        <div className="lookbook-room-modal__content">
          
          {/* LEFT SIDE - Room Image with Interactive Hotspots (60%) */}
          <div className="lookbook-room-modal__image-wrap">
            <div className="lookbook-room-modal__image-container" style={{ aspectRatio: look.aspectRatio || "4/5" }}>
              <img
                src={look.image}
                alt={look.title}
                className="lookbook-room-modal__image"
                onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'; }}
              />
              
              {/* Hotspot pins on room image */}
              {look.hotspots.map((spot, sIdx) => {
                const product = products.find((p) => p.id === spot.productId);
                const isSelected = selectedHotspot?.productId === spot.productId;
                const swatchColor = product ? colorSwatches[product.color || "Natural"]?.css || "var(--color-primary)" : "var(--color-primary)";
                
                return (
                  <button
                    key={`${look.id}-hotspot-${sIdx}`}
                    type="button"
                    className={`lookbook-room-modal__hotspot ${isSelected ? "is-active" : ""}`}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      "--hotspot-color": swatchColor
                    }}
                    onClick={() => setSelectedHotspot(spot)}
                    aria-label={`Shop ${spot.label}`}
                    aria-pressed={isSelected}
                    title={spot.label}
                  >
                    {/* White outer ring */}
                    <span className="lookbook-room-modal__hotspot-ring" aria-hidden="true" />
                    {/* Terracotta/orange center dot */}
                    <span className="lookbook-room-modal__hotspot-dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE - Room Information Panel (40%) */}
          <div className="lookbook-room-modal__panel">
            
            {/* Room Header */}
            <div className="lookbook-room-modal__header">
              <h2 className="lookbook-room-modal__title">{look.title}</h2>
              <p className="lookbook-room-modal__narrative">{look.narrative}</p>
            </div>

            {/* Featured Product Card - White, rounded, with shadow */}
            {selectedProduct && (
              <Link
                to={productPath(selectedProduct.slug)}
                className="lookbook-room-modal__featured-card"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="lookbook-room-modal__featured-thumb"
                  onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'; }}
                />
                <div className="lookbook-room-modal__featured-info">
                  <span className="lookbook-room-modal__featured-label">
                    {selectedHotspot?.label || "Featured"}
                  </span>
                  <h3 className="lookbook-room-modal__featured-name">{selectedProduct.name}</h3>
                  <p className="lookbook-room-modal__featured-price">{formatINR(selectedProduct.price)}</p>
                </div>
                <span className="lookbook-room-modal__featured-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}

            {/* In This Room - Associated Products */}
            <div className="lookbook-room-modal__pieces" role="group" aria-label="Products shown in this room">
              <h3 className="lookbook-room-modal__pieces-title">In this room</h3>
              {lookProducts.map(({ product, label }) => (
                <button
                  key={product.id}
                  type="button"
                  className={`lookbook-room-modal__piece ${selectedHotspot?.productId === product.id ? "is-active" : ""}`}
                  onClick={() => setSelectedHotspot({ productId: product.id, label })}
                  aria-pressed={selectedHotspot?.productId === product.id}
                  aria-label={`Select ${product.name}`}
                >
                  {/* Small circular color indicator */}
                  <span
                    className="lookbook-room-modal__piece-swatch"
                    style={{ background: colorSwatches[product.color]?.css || "var(--color-primary)" }}
                    aria-hidden="true"
                  />
                  <span className="lookbook-room-modal__piece-info">
                    <strong>{product.name}</strong>
                    <small>{product.color || "Natural"} · {formatINR(product.price)}</small>
                  </span>
                </button>
              ))}
            </div>

            {/* Share Section */}
            <div className="lookbook-room-modal__share">
              <span className="lookbook-room-modal__share-label">Share</span>
              
              {/* WhatsApp */}
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on WhatsApp"
                className="lookbook-room-modal__share-btn"
              >
                <MessageCircle aria-hidden="true" />
              </a>
              
              {/* Pinterest */}
              <a
                href={shareUrls.pinterest}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on Pinterest"
                className="lookbook-room-modal__share-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.17-.52-.94-.86-2.12-.86-3.27 0-1.61.96-2.92 2.17-2.92 1.02 0 1.51.76 1.51 1.69 0 1.03-.65 2.56-.99 3.99-.28.92-.02 1.64.2 2.22.08 1.25.32 2.34 1.07 3.1.03.11.05.22.08.33.16.61.56 1.11 1.23 1.11.88 0 1.48-.82 1.48-1.92 0-.99-.53-1.58-1.13-1.58-.64 0-1 .48-1 1.05 0 .58.26.94.44 1.16.07.09.11.2.1.31-.02.15-.1.24-.28.24-.22 0-.46-.17-.46-.4 0-.24.1-.42.26-.54.11-.18.2-.43.27-.71.05-.18.03-.36-.04-.52-.16-.4-.5-.85-1.17-.85-.97 0-1.6 1.04-1.6 2.14 0 1.33.75 2.24 1.8 2.24.72 0 1.27-.46 1.27-1.07 0-.66-.31-1.07-.73-1.07-.54 0-.96.54-.96 1.2 0 .69.36 1.21.8 1.45.17.09.22.19.19.39-.04.25-.32.51-.72.51-.44 0-.8-.28-.8-.74 0-.39.26-.65.6-.84.15-.09.26-.2.26-.44 0-.25-.13-.43-.4-.43-.38 0-.68.37-.68.89 0 .36.1.6.24.78.03.05.02.11-.02.15-.18.21-.52.59-.52 1.23 0 .9.62 1.66 1.78 1.66 5.27 0 8.67-4.18 8.67-9.5 0-4.95-3.07-9.09-7.58-9.09z" />
                </svg>
              </a>
              
              {/* Copy Link */}
              <button 
                onClick={handleCopyLink} 
                aria-label="Copy link" 
                className="lookbook-room-modal__share-btn"
              >
                {copyFeedback === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copyFeedback === "copied" && <span className="lookbook-room-modal__copied">Copied!</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}