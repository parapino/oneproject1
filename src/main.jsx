// File: src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n.js";

//  Contextni to‘g‘ri yo‘l bilan chaqirdik
import { FavoritesProvider } from "./components/FavoritesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/*  Provider bilan butun App ni o‘rab oldik */}
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
