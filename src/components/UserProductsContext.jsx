import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "user-products";

const UserProductsContext = createContext(null);

const parseStoredProducts = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse user products from storage:", error);
    return [];
  }
};

const persistProducts = (products) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to persist user products:", error);
  }
};

function UserProductsProvider({ children }) {
  const [userProducts, setUserProducts] = useState(parseStoredProducts);

  useEffect(() => {
    persistProducts(userProducts);
    window.dispatchEvent(new CustomEvent("user-products:change"));
  }, [userProducts]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setUserProducts(parseStoredProducts());
      }
    };

    const handleCustomChange = () => {
      setUserProducts(parseStoredProducts());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("user-products:change", handleCustomChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("user-products:change", handleCustomChange);
    };
  }, []);

  const addProduct = (product) => {
    setUserProducts((prev) => [
      {
        ...product,
        id:
          product.id ||
          (typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`),
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt: product.updatedAt || new Date().toISOString(),
        isCustom: true,
      },
      ...prev,
    ]);
  };

  const updateProduct = (id, updates) => {
    setUserProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setUserProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const clearProducts = () => setUserProducts([]);

  const value = useMemo(
    () => ({
      userProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      clearProducts,
    }),
    [userProducts]
  );

  return (
    <UserProductsContext.Provider value={value}>
      {children}
    </UserProductsContext.Provider>
  );
}

const useUserProducts = () => {
  const context = useContext(UserProductsContext);
  if (!context) {
    throw new Error("useUserProducts must be used within UserProductsProvider");
  }
  return context;
};

export { UserProductsProvider, useUserProducts };



