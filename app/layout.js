import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://wovenhaat.example"),
  title: {
    default: "WovenHaat — Handcrafted Home Textiles | Rugs, Cushions, Throws & Bath Mats",
    template: "%s — WovenHaat"
  },
  description:
    "Handwoven rugs, cushion covers, throws, bath mats, table linen and curtains. GOTS & OEKO-TEX certified, made by artisan clusters across India. Free shipping over ₹1499.",
  openGraph: {
    type: "website",
    title: "WovenHaat — Handcrafted Home Textiles",
    description:
      "Handwoven home textiles from artisan clusters. Shop rugs, cushions, throws and more."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <div className="announce">
          Free shipping above ₹1499 · Easy 7-day returns ·{" "}
          <a href="/bulk-orders">Bulk orders → get a quote</a>
        </div>

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
