import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetailModal from "./ProductDetailModal";
import FullscreenCart from "./FullscreenCart";
import ImageModal from "./ImageModal";
import { useCart } from "./CartProvider";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useFavorites } from "./FavoritesContext";
import { useUserProducts } from "./UserProductsContext";
import { useTranslation } from "react-i18next";
import CategoryFilter from "./categories/CategoryFilter";
import { useLocation, useNavigate } from "react-router-dom";

const slugifyCategory = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function ProductsPage() {
  const [remoteProducts, setRemoteProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const initialCategory =
    (location.state && typeof location.state.category === "string"
      ? location.state.category
      : null) || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { userProducts } = useUserProducts();
  const { t } = useTranslation();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setRemoteProducts(data.products))
      .catch(() => setRemoteProducts([]));
  }, []);

  useEffect(() => {
    if (location.state && typeof location.state.category === "string") {
      setActiveCategory(location.state.category);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const preparedUserProducts = useMemo(
    () =>
      userProducts.map((product) => ({
        ...product,
        title: product.title || product.name || "Untitled",
        brand: product.brand || product.category || "",
        description: product.description || "",
        thumbnail:
          product.thumbnail ||
          (Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : product.image) ||
          "",
        images:
          product.images && product.images.length > 0
            ? product.images
            : product.thumbnail
            ? [product.thumbnail]
            : [],
        source: "local",
      })),
    [userProducts]
  );

  const combinedProducts = useMemo(
    () => [...preparedUserProducts, ...remoteProducts],
    [preparedUserProducts, remoteProducts]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return combinedProducts.filter((product) => {
      const categorySlug = slugifyCategory(product.category || "");
      const matchesCategory =
        activeCategory === "all" || categorySlug === activeCategory;
      const title = product.title?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return (
        matchesCategory &&
        (title.includes(query) ||
          brand.includes(query) ||
          description.includes(query))
      );
    });
  }, [combinedProducts, searchQuery, activeCategory]);

  const categories = useMemo(() => {
    const unique = new Map();
    combinedProducts.forEach((product) => {
      if (!product?.category) return;
      const slug = slugifyCategory(product.category);
      if (!slug) return;
      if (!unique.has(slug)) {
        unique.set(slug, {
          slug,
          original: product.category,
        });
      }
    });
    return [
      { slug: "all", original: "All" },
      ...Array.from(unique.values()).sort((a, b) =>
        a.original.localeCompare(b.original)
      ),
    ];
  }, [combinedProducts]);

  const productTexts = useMemo(() => {
    const translations = t("products", { returnObjects: true });
    return {
      searchPlaceholder: "Search products...",
      addToCart: "Add to Cart",
      scrollHint: "Scroll to load more...",
      toastTitle: "Added to Cart!",
      favoriteAria: "Toggle favorite",
      localBadge: "My product",
       noResultsTitle: "No products found",
       noResultsSubtitle: "Try adjusting your search terms or explore other categories to find what you need.",
       clearSearch: "Reset search",
      categoryFilterTitle: "Categories",
      categoryFilterAria: "Filter by {{category}} category",
      ...(translations && typeof translations === "object" ? translations : {}),
    };
  }, [t]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setTimeout(() => setShowModal(true), 100);
  };

  const closeProduct = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  useEffect(() => {
    let isLoading = false;
    const handleScroll = () => {
      if (isLoading) return;
      isLoading = true;

      requestAnimationFrame(() => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const threshold = 200;

        if (scrollPosition >= pageHeight - threshold) {
          setVisibleCount((prev) => {
            const next = prev + 8;
            return next <= filteredProducts.length
              ? next
              : filteredProducts.length;
          });
        }
        isLoading = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredProducts]);

  useEffect(() => {
    setVisibleCount((prev) => {
      const next = Math.min(prev, filteredProducts.length || 0);
      return next === prev ? prev : next;
    });
  }, [filteredProducts.length]);

  useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, activeCategory, combinedProducts.length]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setVisibleCount(8);
  };

  const handleAddToCart = (product) => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail:
          product.thumbnail ||
          (Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : product.image) ||
          "",
      },
      1
    );
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite(product);
  };

  const handleImageClick = (e, product, index = 0) => {
    e.stopPropagation();
    const images =
      product.images && product.images.length > 0
        ? product.images
        : product.thumbnail
        ? [product.thumbnail]
        : [];

    if (images.length > 0) {
      const imagePayload = images.map((img) => ({
        src: img,
        alt: product.title,
        title: product.title,
        desc: product.description,
      }));
      setSelectedProduct({ ...product, imagesForModal: imagePayload });
      setSelectedImageIndex(index);
      setIsImageModalOpen(true);
    }
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
      setSelectedProduct(null);
    }, 300);
  };

  const handleNextImage = () => {
    if (selectedProduct?.imagesForModal) {
      setSelectedImageIndex(
        (prev) => (prev + 1) % selectedProduct.imagesForModal.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct?.imagesForModal) {
      setSelectedImageIndex(
        (prev) =>
          (prev - 1 + selectedProduct.imagesForModal.length) %
          selectedProduct.imagesForModal.length
      );
    }
  };

  const hasResults = filteredProducts.length > 0;

  return (
    <section className="min-h-[70vh] py-6 sm:py-10 pb-16 sm:pb-20 bg-gray-100 dark:bg-gray-900 transition-all duration-500 relative">
      <div className="container mx-auto px-3 sm:px-4 mb-4 sm:mb-6 flex justify-center">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-md"
          autoComplete="off"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={productTexts.searchPlaceholder}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-white transition-colors"
          />
          <button
            type="submit"
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors flex items-center text-sm sm:text-base"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-center mb-4 sm:mb-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(slug) => {
              setActiveCategory(slug);
              setVisibleCount(8);
            }}
          />
        </div>
        {hasResults ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.slice(0, visibleCount).map((product, idx) => (
              <motion.div
                key={product.id}
                onClick={() => openProduct(product)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group transition-all duration-300"
              >
                {product.source === "local" && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="absolute left-2 sm:left-3 top-2 sm:top-3 z-10 rounded-full bg-blue-600/90 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white shadow-lg"
                  >
                    {productTexts.localBadge}
                  </motion.span>
                )}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(product);
                  }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-lg backdrop-blur transition-all duration-300 hover:bg-white hover:scale-110"
                  aria-label={productTexts.favoriteAria}
                >
                  {isFavorite(product.id) ? (
                    <FaHeart className="text-lg sm:text-xl" />
                  ) : (
                    <FaRegHeart className="text-lg sm:text-xl" />
                  )}
                </motion.button>
                <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    onClick={(e) => handleImageClick(e, product, 0)}
                    className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-500 ease-in-out group-hover:scale-110 cursor-zoom-in"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate mb-2">
                    {product.title}
                  </h2>
                  <p className="text-green-600 dark:text-green-400 font-bold text-lg sm:text-xl mb-1">
                    💲 {product.price}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    🏷️ {product.brand}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="w-full py-2.5 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base"
                >
                  {productTexts.addToCart}
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center shadow-inner"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {productTexts.noResultsTitle}
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {productTexts.noResultsSubtitle}
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all"
            >
              {productTexts.clearSearch}
            </button>
          </motion.div>
        )}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="py-6 sm:py-8 text-center text-gray-400 dark:text-gray-500 animate-pulse mb-6 sm:mb-8 text-sm sm:text-base">
          {productTexts.scrollHint}
        </div>
      )}

      <div className="h-16 sm:h-20" />

      <ImageModal
        isOpen={isImageModalOpen}
        images={selectedProduct?.imagesForModal || []}
        currentIndex={selectedImageIndex ?? 0}
        onClose={handleCloseImageModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />

      <ProductDetailModal
        isOpen={Boolean(selectedProduct) && showModal}
        product={selectedProduct}
        onClose={closeProduct}
        onAddToCart={() => {
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 2500);
        }}
      />

      <FullscreenCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-6 right-6 z-50 w-96 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-3 font-medium text-lg">
              {productTexts.toastTitle}
              <button
                onClick={() => setToastVisible(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <IoClose />
              </button>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-1 bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
