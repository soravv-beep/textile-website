import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, MapPin, Minus, Package, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import RecentlyViewed from "../components/product/RecentlyViewed.jsx";
import { colorSwatches, products } from "../data/storeData.js";
import { estimateDelivery, money, getUnitPrice } from "../utils/format.js";

const demoReviews = [
  { name: "Rhea S.", stars: 5, text: "Even better in person. The texture is lovely and the colour matches the photos.", date: "2 October 2026" },
  { name: "Arjun M.", stars: 5, text: "Well finished and packed with care. Arrived a day early.", date: "21 September 2026" },
  { name: "Neha P.", stars: 4, text: "Gorgeous weave. Slightly smaller than I pictured, so check the size chart.", date: "9 September 2026" },
];

export default function ProductPage({ wishlist, onWish, addToCart, notify, recent, trackViewed }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  
  const [view, setView] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Description");
  const [pin, setPin] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [pinError, setPinError] = useState("");
  const [zoom, setZoom] = useState(null);

  useLayoutEffect(() => {
    if (product) {
      trackViewed(product.id);
      setSize(product.sizes[0]);
      setQuantity(1);
      const uniq = [product.image, product.altImage].filter((v, i, a) => a.indexOf(v) === i);
      setView(uniq[0] || product.image);
      setTab("Description");
      setPin("");
      setEstimate(null);
      setPinError("");
      setZoom(null);
    }
  }, [product?.id, trackViewed]);

  if (!product) {
    return (
      <main className="page-main shell">
        <Breadcrumb items={["Shop"]} />
        <div className="empty-state">
          <h3>Product not found</h3>
          <p>The product you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  const selectedSize = product.sizes.includes(size) ? size : product.sizes[0];
  const unitPrice = getUnitPrice(product, selectedSize);
  const priceAvailable = unitPrice !== null;
  const swatch = colorSwatches[product.color];
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const checkPin = (event) => {
    event.preventDefault();
    const result = estimateDelivery(pin);
    setEstimate(result);
    setPinError(result ? "" : "Enter a valid 6-digit PIN code.");
  };
  const buyNow = () => {
    if (priceAvailable && addToCart(product, quantity, selectedSize, true) !== false) navigate("/checkout");
  };
  const moveZoom = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    setZoom({ x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 });
  };
  const uniqImages = [product.image, product.altImage].filter((v, i, a) => a.indexOf(v) === i);
  const imageFor = view === "texture" ? null : view;
  const specs = [
    ["Material", product.fabric.material],
    ["Weave", product.fabric.weave],
    ["Pile height", product.fabric.pile],
    ["Weight", product.fabric.weight],
    ["Size", selectedSize],
    ["Colour", `${product.color} · ${product.dmc}`],
    ["Technique", "Handwoven"],
    ["Origin", "India"],
  ];

  return (
    <main className="page-main shell">
      <Breadcrumb items={["Shop", product.name]} />
      <div className="product-detail">
        <div className="product-gallery">
          <div className="thumbnails">
            {uniqImages.map((img, idx) => (
              <button
                key={idx}
                className={view === img ? "on" : ""}
                onClick={() => setView(img)}
                aria-label={`Photo ${idx + 1}`}
              >
                <img src={img} alt="" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'; }} />
              </button>
            ))}
            <button className={`texture-thumb ${view === "texture" ? "on" : ""}`} onClick={() => setView("texture")} aria-label="Texture close-up" style={{ backgroundImage: `url(${product.image})` }}><span>Weave</span></button>
          </div>
          {view === "texture" ? (
            <div className="main-product-image texture-view" role="img" aria-label={`${product.name} texture close-up`} style={{ backgroundImage: `url(${product.image})` }}><span>Texture close-up</span></div>
          ) : (
            <div className="zoom-frame" onMouseMove={moveZoom} onMouseLeave={() => setZoom(null)}>
              <img className="main-product-image" src={imageFor} alt={product.name}
                style={zoom ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                onError={(e)=>{e.currentTarget.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'}} />
              <span className="zoom-hint">Hover to zoom</span>
            </div>
          )}
        </div>
        <div className="product-summary">
          <p className="kicker">{product.material} · Handmade in India</p>
          <h1>{product.name}</h1>
          <div className="rating"><Star fill="currentColor" /><b>{product.rating}</b><span>{product.reviews} verified reviews</span></div>
          <div className="detail-price">
            <strong aria-live="polite">{priceAvailable ? money(unitPrice) : "Price unavailable"}</strong>
            {priceAvailable && selectedSize === product.sizes[0] && product.oldPrice > unitPrice && <><del>{money(product.oldPrice)}</del><em className="sale-tag">{Math.round((1 - unitPrice / product.oldPrice) * 100)}% off</em></>}
          </div>
          {!priceAvailable && <p className="form-note" role="status">Pricing for this size is not available yet. Please choose another size.</p>}
          <p className="product-description">{product.description}</p>
          <div className="stock"><i /> In stock · dispatches in 2–3 days</div>
          <fieldset>
            <legend>Choose size</legend>
            <div className="option-row">
              {product.sizes.map((item) => (
                <button key={item} className={selectedSize === item ? "selected" : ""} onClick={() => setSize(item)} aria-pressed={selectedSize === item}>{item}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Colour</legend>
            <div className="color-choice">
              <i style={{ background: swatch?.css }} />{product.color}
              <span>{product.dmc === "Undyed" ? "Natural, undyed" : `Thread code ${product.dmc}`}</span>
            </div>
          </fieldset>
          <div className="buy-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(99, quantity + 1))} aria-label="Increase quantity"><Plus /></button>
            </div>
            <button className="button primary grow" disabled={!priceAvailable} onClick={() => addToCart(product, quantity, selectedSize)}>{priceAvailable ? `Add to cart · ${money(unitPrice * quantity)}` : "Price unavailable"}</button>
            <button className={`button square ${wishlist.has(product.id) ? "selected" : ""}`} onClick={() => onWish(product)} aria-label="Toggle wishlist">
              <Heart fill={wishlist.has(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
          <button className="button dark full" disabled={!priceAvailable} onClick={buyNow}>Buy now</button>
          <button className="button secondary full swatch-btn" onClick={() => notify(`Swatch request for ${product.name} (size ${size}) saved (demo). We will contact you shortly.`)}>Request a fabric swatch</button>

          <form className="pin-check" onSubmit={checkPin}>
            <label htmlFor="pin"><MapPin /> Delivery estimate</label>
            <div>
              <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} placeholder="Enter PIN code" />
              <button className="button outline">Check</button>
            </div>
            {estimate && <p className="pin-ok">Delivered between {estimate} to {pin}.</p>}
            {pinError && <p className="pin-error" role="alert">{pinError}</p>}
          </form>

          <div className="delivery-notes">
            <span><Truck />Free delivery above ₹2,999</span>
            <span><Package />14-day easy returns on unused standard products</span>
            <span><ShieldCheck />Secure payment · UPI, cards, net banking, COD</span>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div role="tablist" aria-label="Product details">
          {["Description", "Specifications", "Care", "Reviews"].map((item) => (
            <button
              role="tab"
              id={`tab-${item.toLowerCase()}`}
              aria-selected={tab === item}
              aria-controls={`panel-${item.toLowerCase()}`}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <div role="tabpanel" id="panel-description" aria-labelledby="tab-description" hidden={tab !== "Description"}>
            <p>Designed for everyday use, this piece combines natural fibres, visible texture and durable hand finishing. Subtle variations in tone and weave make each one unique.</p>
          </div>
          <div role="tabpanel" id="panel-specifications" aria-labelledby="tab-specifications" hidden={tab !== "Specifications"}>
            <dl>{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
          <div role="tabpanel" id="panel-care" aria-labelledby="tab-care" hidden={tab !== "Care"}>
            <p>{product.fabric.care}</p>
            <p>Keep away from prolonged direct sunlight, and spot clean spills quickly. Small variations in tone are part of hand production.</p>
          </div>
          <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews" hidden={tab !== "Reviews"}>
            <div className="reviews-tab">
              <div className="rating-summary"><strong>{product.rating}</strong><span>out of 5 · {product.reviews} reviews</span></div>
              <p className="form-note">Sample reviews (demo data)</p>
              <ul>{demoReviews.map((r) => (
                <li key={r.name}>
                  <div className="rating">{Array.from({ length: r.stars }, (_, i) => <Star key={i} fill="currentColor" />)}<b>{r.name}</b><span>Verified buyer · {r.date}</span></div>
                  <p>{r.text}</p>
                </li>))}
              </ul>
              <p className="form-note">Reviews with photos can be added by customers after purchase.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section related">
        <SectionHeading kicker="You may also like" title="Related pieces" />
        <ProductGrid list={related} wishlist={wishlist} onWish={onWish} />
      </section>
      <RecentlyViewed ids={recent} excludeId={product.id} wishlist={wishlist} onWish={onWish} />

      <div className="sticky-buy" aria-label="Quick add to cart">
        <div><strong>{priceAvailable ? money(unitPrice * quantity) : "Price unavailable"}</strong><small>{product.name}</small></div>
        <button className="button primary" disabled={!priceAvailable} onClick={() => addToCart(product, quantity, selectedSize)}>Add to cart</button>
      </div>
    </main>
  );
}
