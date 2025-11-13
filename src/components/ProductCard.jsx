// File: src/components/ProductCard/ProductCard.jsx
import React from "react";
import { useFavorites } from "./FavoritesContext";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useFavorites();

  // Shu product favoritda bormi?
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="border p-4 rounded shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.price} so'm</p>

      {/* Yurakcha tugma */}
      <button onClick={() => toggleFavorite(product)} className="text-2xl">
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
