/**
 * Collections (Dev 2)
 *   /collections        → category chips + seasonal / themed collection cards
 *   /collections/:slug  → a category (rugs, cushions, …) or a themed collection,
 *                         with the same filters + sorting as the Shop page
 * Old anchor links (/collections#rugs) are redirected to /collections/rugs.
 */
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Breadcrumb from "../components/shop/Breadcrumb.jsx";
import ProductBrowser from "../components/shop/ProductBrowser.jsx";
import { ROUTES } from "../constants/routes.js";
import { categories, collections, imageUrls, products } from "../data/catalog.js";

const CollectionCard = ({ collection }) => (
  <Link to={`${ROUTES.collections}/${collection.slug}`} className="collection-card">
    <img src={collection.image} alt="" loading="lazy" />
    <div>
      <p className="kicker light">{collection.group} edit</p>
      <h2>{collection.name}</h2>
      <p>{collection.description}</p>
      <span>
        Explore collection <ArrowRight aria-hidden="true" />
      </span>
    </div>
  </Link>
);

export default function Collections() {
  const { slug } = useParams();
  const { hash } = useLocation();

  if (!slug) {
    const anchor = hash.replace("#", "");
    if (anchor && categories.some((c) => c.slug === anchor)) {
      return <Navigate to={`${ROUTES.collections}/${anchor}`} replace />;
    }
    return (
      <div className="shop-scope">
        <PageMeta
          title="Collections | WovenHaat"
          description="Shop by category or explore seasonal and themed collections of handwoven home textiles."
        />
        <div className="page-main shell">
          <Breadcrumb items={["Collections"]} />
          <div className="page-title-row">
            <div>
              <p className="kicker">Curated by mood</p>
              <h1>Collections for every room</h1>
              <p>Explore seasonal colour, natural materials and enduring craft.</p>
            </div>
          </div>
          <h2 className="group-title">Shop by category</h2>
          <div className="category-chips">
            {categories.map((c) => (
              <Link key={c.slug} to={`${ROUTES.collections}/${c.slug}`} className="category-chip">
                <img src={c.image} alt="" loading="lazy" />
                {c.name}
              </Link>
            ))}
          </div>
          {["Seasonal", "Themed"].map((group) => (
            <section key={group}>
              <h2 className="group-title">{group} collections</h2>
              <div className="collection-grid">
                {collections
                  .filter((c) => c.group === group)
                  .map((c) => (
                    <CollectionCard key={c.slug} collection={c} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  const category = categories.find((item) => item.slug === slug);
  const collection = collections.find((item) => item.slug === slug);

  if (!category && !collection) {
    return (
      <div className="shop-scope">
        <PageMeta title="Collection not found | WovenHaat" description="This collection does not exist." />
        <div className="page-main shell">
          <Breadcrumb items={["Collections"]} />
          <div className="empty-state">
            <h3>Collection not found</h3>
            <p>The collection you're looking for doesn't exist.</p>
            <Link to={ROUTES.collections} className="button outline">
              Browse all collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = category?.name || collection?.name || "Textile Collection";
  const description = category?.description || collection?.description || "Handcrafted texture for considered homes.";
  const image = category?.image || collection?.image || imageUrls.hero;
  const list = category
    ? products.filter((product) => product.category === category.name)
    : products.filter((product) => collection.match.includes(product.category));

  return (
    <div className="shop-scope">
      <PageMeta title={`${title} | WovenHaat`} description={description} />
      <section
        className="collection-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgb(63 58 56 / .78), rgb(63 58 56 / .1)), url(${image})` }}
      >
        <div className="shell">
          <Breadcrumb items={["Collections", title]} />
          <p className="kicker light">The WovenHaat edit</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <Link to={ROUTES.shop} className="button cream">
            Shop all textiles
          </Link>
        </div>
      </section>
      <section className="section shell">
        <div className="listing-head">
          <div>
            <h2>{title}</h2>
            <p>{list.length} thoughtfully made pieces</p>
          </div>
        </div>
        <ProductBrowser key={slug} list={list} showSearch={false} summary="Filter and sort this collection" />
      </section>
    </div>
  );
}
