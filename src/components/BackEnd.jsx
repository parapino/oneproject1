import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetailModal from "./ProductDetailModal";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 8;
const TOTAL_PAGES = 25;

export default function BackEnd() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;
    axios
      .get("https://dummyjson.com/products?limit=200")
      .then((res) => {
        if (!isMounted) return;
        const updated = res.data.products.map((p) => ({
          ...p,
          shortDesc:
            p.description?.slice(0, 72).concat(p.description?.length > 72 ? "…" : "") ||
            "",
          brand: p.brand || t("home.products.unknownBrand", "Unknown"),
          rating: p.rating || "4.5",
        }));
        setProducts(updated);
      })
      .catch((err) => console.error("Products fetch failed:", err));

    return () => {
      isMounted = false;
    };
  }, [t]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setTimeout(() => setShowModal(true), 100);
  };

  const closeProduct = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProduct(null), 400);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if (page === maxPage && maxPage < TOTAL_PAGES) {
      setMaxPage(maxPage + 1);
    }
  };

  const getVisiblePages = () => {
    const start = Math.max(1, maxPage - 1);
    return [start, maxPage];
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = useMemo(
    () => products.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [products, startIndex]
  );

  const isLoading = products.length === 0;

  return (
    <section className="bg-gray-50 py-14 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("home.products.title", "Featured products")}
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mx-auto sm:max-w-2xl">
            {t(
              "home.products.subtitle",
              "Fresh picks curated for you. Explore trending gadgets, fashion, and lifestyle essentials."
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-pulse rounded-2xl bg-white/60 p-6 shadow-sm dark:bg-gray-900/60"
              >
                <div className="mb-4 h-40 rounded-2xl bg-gray-200 dark:bg-gray-700" />
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
              <motion.article
                key={product.id}
                layout
                whileHover={{ translateY: -6 }}
                onClick={() => openProduct(product)}
                className="group flex h-full cursor-pointer flex-col rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 dark:bg-gray-900"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mx-auto h-48 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow dark:bg-gray-800/80 dark:text-gray-200">
                    {product.brand}
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${product.price}
                    </p>
                    <p className="text-sm font-semibold text-yellow-500">
                      ⭐ {product.rating}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="mt-12 flex justify-center gap-3 select-none">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  if (currentPage - 1 < maxPage - 1 && maxPage > 2) {
                    setMaxPage(maxPage - 1);
                  }
                }
              }}
              disabled={currentPage === 1}
              className={`h-11 w-11 rounded-full text-lg font-semibold transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-500/90"
              }`}
              aria-label={t("home.products.pagination.prev", "Previous page")}
            >
              ‹
            </motion.button>

            <AnimatePresence mode="popLayout">
              {getVisiblePages().map((page) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: -10 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 18 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-11 w-11 rounded-full text-sm font-semibold transition-all ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-lg dark:bg-blue-500"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </motion.button>
              ))}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (currentPage < TOTAL_PAGES) {
                  setCurrentPage(currentPage + 1);
                  if (currentPage + 1 > maxPage && maxPage < TOTAL_PAGES) {
                    setMaxPage(maxPage + 1);
                  }
                }
              }}
              disabled={currentPage === TOTAL_PAGES}
              className={`h-11 w-11 rounded-full text-lg font-semibold transition-all ${
                currentPage === TOTAL_PAGES
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-500/90"
              }`}
              aria-label={t("home.products.pagination.next", "Next page")}
            >
              ›
            </motion.button>
          </div>
        )}

        <ProductDetailModal
          isOpen={Boolean(selectedProduct) && showModal}
          product={selectedProduct}
          onClose={closeProduct}
        />
      </div>
    </section>
  );
}
