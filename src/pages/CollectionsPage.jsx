import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import AppLink from "../components/common/AppLink.jsx";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import ProductBrowser from "../components/product/ProductBrowser.jsx";
import { categories, collections, imageUrls, products } from "../data/storeData.js";

const CollectionCard = ({ collection }) => (
  <AppLink to={`/collections/${collection.slug}`} className="collection-card">
    <img src={collection.image} alt="" loading="lazy" />
    <div>
      <p className="kicker light">{collection.group} edit</p>
      <h2>{collection.name}</h2>
      <p>{collection.description}</p>
      <span>Explore collection <ArrowRight /></span>
    </div>
  </AppLink>
);

export default function CollectionsPage({ wishlist, onWish, addToCart, notify }) {
  const { slug } = useParams();
  if (!slug) {
    return (
      <main className="page-main shell">
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
            <AppLink key={c.slug} to={`/collections/${c.slug}`} className="category-chip"><img src={c.image} alt="" loading="lazy" />{c.name}</AppLink>
          ))}
        </div>
        {["Seasonal", "Themed"].map((group) => (
          <section key={group}>
            <h2 className="group-title">{group} collections</h2>
            <div className="collection-grid">
              {collections.filter((c) => c.group === group).map((c) => <CollectionCard key={c.slug} collection={c} />)}
            </div>
          </section>
        ))}
      </main>
    );
  }

  const category = categories.find((item) => item.slug === slug);
  const collection = collections.find((item) => item.slug === slug);
  
  if (!category && !collection) {
    return (
      <main className="page-main shell">
        <Breadcrumb items={["Collections"]} />
        <div className="empty-state">
          <h3>Collection not found</h3>
          <p>The collection you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  const title = category?.name || collection?.name || "Textile Collection";
  const description = category?.description || collection?.description || "Handcrafted texture for considered homes.";
  const image = category?.image || collection?.image || imageUrls.hero;
  const list = category
    ? products.filter((product) => product.category === category.name)
    : collection
      ? products.filter((product) => collection.match.includes(product.category))
      : products;

  return (
    <main>
      <section
        className="collection-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgb(63 58 56 / .78), rgb(63 58 56 / .1)), url(${image})` }}
      >
        <div className="shell">
          <Breadcrumb items={["Collections", title]} />
          <p className="kicker light">The WovenHaat edit</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <AppLink to="/shop" className="button cream">Shop all textiles</AppLink>
        </div>
      </section>
      <section className="section shell">
        <div className="listing-head">
          <div>
            <h2>{title}</h2>
            <p>{list.length} thoughtfully made pieces</p>
          </div>
        </div>
        <ProductBrowser key={slug} list={list} showSearch={false} summary="Filter and sort this collection" wishlist={wishlist} onWish={onWish} addToCart={addToCart} notify={notify} />
      </section>
    </main>
  );
}
