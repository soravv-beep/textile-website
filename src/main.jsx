import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/shop.css";
import "./styles/product.css";
import "./styles/account.css";
import "./styles/pages.css";
import "./styles/features.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);