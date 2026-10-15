import Header from "./layout/Header";
import Footer from "./layout/Footer";
import CompareBar from "./product/CompareBar";
import WhatsAppButton from "./common/WhatsAppButton";
import { useStore } from "../context/StoreContext";

export default function Layout({ children, cartCount, wishlistCount, path, notify }) {
  const { clearCompare } = useStore();
  const lifted = path.startsWith("/product/");

  return (
    <>
      <Header path={path} cartCount={cartCount} wishlistCount={wishlistCount} />
      <div id="main-content">{children}</div>
      <Footer notify={notify} />
      <CompareBar lifted={lifted} clear={clearCompare} />
      <WhatsAppButton lifted={lifted} />
    </>
  );
}