import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useFavorites } from "../components/FavoritesContext";
import ProductDetailModal from "../components/ProductDetailModal";
import { useTranslation } from "react-i18next";

export default function Favorites() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const hasFavorites = favorites.length > 0;

  const preparedFavorites = useMemo(
    () =>
      favorites.map((item) => ({
        ...item,
        data: item.raw && typeof item.raw === "object" ? item.raw : item,
      })),
    [favorites]
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const texts = useMemo(() => {
    const translation = t("favorites", { returnObjects: true });
    return {
      heading: "Favorites",
      subheading: "Your favorite products appear here.",
      clearAll: "Clear all",
      viewProducts: "View products",
      emptyTitle: "No favorites yet",
      emptySubtitle: "Mark products with the heart icon to save them.",
      backToProducts: "Back to products",
      noImage: "Image not available",
      remove: "Remove from favorites",
      ...(translation && typeof translation === "object" ? translation : {}),
    };
  }, [t]);

  return (
    <section className="min-h-[70vh] py-16 bg-gray-100 dark:bg-gray-900 transition-all duration-500">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {texts.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-gray-600 dark:text-gray-400"
            >
              {texts.subheading}
            </motion.p>
          </div>

          {hasFavorites && (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={clearFavorites}
                className="rounded-full border border-red-400/60 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-500 shadow-sm transition-all hover:bg-red-500/20"
              >
                {texts.clearAll}
              </motion.button>

              <Link
                to="/products"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
              >
                {texts.viewProducts}
              </Link>
            </div>
          )}
        </div>

        {!hasFavorites ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/80 p-10 text-center shadow-xl backdrop-blur dark:bg-gray-800/70">
            <FaHeartBroken className="mb-4 text-6xl text-rose-400" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {texts.emptyTitle}
            </h2>
            <p className="mt-2 max-w-xl text-gray-600 dark:text-gray-400">
              {texts.emptySubtitle}
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700"
            >
              {texts.backToProducts}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {preparedFavorites.map((favorite, idx) => (
                <motion.article
                  key={favorite.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.04 }}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800"
                >
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-lg transition-all hover:scale-110"
                    aria-label={texts.remove}
                  >
                    <IoTrashOutline className="text-xl" />
                  </button>

                  <div
                    onClick={() => openModal(favorite.data)}
                    className="flex cursor-pointer flex-col"
                  >
                    <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
                      {favorite.thumbnail ? (
                        <img
                          src={favorite.thumbnail}
                          alt={favorite.title}
                          className="h-full w-full rounded-2xl object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400">
                          <FaHeartBroken className="mb-2 text-3xl" />
                          <span>{texts.noImage}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 px-5 py-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {favorite.title}
                      </h2>
                      {favorite.brand && (
                        <p className="text-sm font-medium uppercase tracking-wide text-blue-500">
                          {favorite.brand}
                        </p>
                      )}
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        ${favorite.price}
                      </p>
                      {favorite.description && (
                        <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                          {favorite.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ProductDetailModal
        isOpen={modalOpen && Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={closeModal}
      />
    </section>
  );
}


