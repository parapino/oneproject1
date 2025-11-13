// File: src/components/FavoritesContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "favorites";

const FavoritesContext = createContext(null);

const normaliseProduct = (product) => {
  if (!product || typeof product !== "object") return null;

  const thumbnail =
    product.thumbnail ||
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null) ||
    product.image ||
    "";

  return {
    id: product.id,
    title: product.title || product.name || "Untitled",
    price: product.price ?? 0,
    brand: product.brand || product.category || "",
    description: product.description || "",
    thumbnail,
    raw: product,
  };
};

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse favorites from storage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to persist favorites:", error);
    }
  }, [favorites]);

  const toggleFavorite = (product) => {
    const payload = normaliseProduct(product);
    if (!payload?.id) return;

    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === payload.id);
      return exists
        ? prev.filter((item) => item.id !== payload.id)
        : [...prev, payload];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const clearFavorites = () => setFavorites([]);

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isFavorite,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

export { FavoritesProvider, FavoritesContext, useFavorites };
