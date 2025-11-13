import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoAdd, IoRemove, IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "./CartProvider";
import ImageModal from "./ImageModal";
import { useFavorites } from "./FavoritesContext";
import { useTranslation } from "react-i18next";

export default function ProductDetailModal({ isOpen, product, onClose, onAddToCart }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageSrc = useMemo(() => {
    if (!product) return "";
    return product.images?.[0] || product.thumbnail || product.image || "";
  }, [product]);

  const allImages = useMemo(() => {
    if (!product) return [];
    const images = [];
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        images.push({
          src: img,
          alt: product.title,
          title: product.title,
          desc: product.description,
        });
      });
    } else if (product.thumbnail) {
      images.push({
        src: product.thumbnail,
        alt: product.title,
        title: product.title,
        desc: product.description,
      });
    } else if (product.image) {
      images.push({
        src: product.image,
        alt: product.title,
        title: product.title,
        desc: product.description,
      });
    }
    return images;
  }, [product]);

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setImageLoaded(false);
      setIsImageModalOpen(false);
      setSelectedImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const favorite = isFavorite(product.id);

  const increment = () => setQuantity((q) => Math.min(q + 1, 999));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handlePurchase = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.image || imageSrc,
      },
      quantity
    );
    onAddToCart?.();
    onClose?.();
  };

  const handleImageClick = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex(0);
      setIsImageModalOpen(true);
    }
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex justify-center items-center bg-black/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10 my-4 sm:my-8"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-red-500 hover:bg-red-600 active:scale-95 text-white w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-lg transition-all duration-200"
              aria-label="Close modal"
            >
              <IoClose />
            </button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleFavorite}
              className="absolute top-2 right-12 sm:top-4 sm:right-16 md:right-20 z-50 flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-xl backdrop-blur transition-all duration-300 hover:bg-white"
              aria-label={t("products.favoriteAria")}
            >
              {favorite ? <FaHeart className="text-lg sm:text-xl md:text-2xl" /> : <FaRegHeart className="text-lg sm:text-xl md:text-2xl" />}
            </motion.button>

            <div className="lg:w-1/2 w-full flex justify-center items-center">
              <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl relative overflow-hidden shadow-inner">
                {!imageLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500"
                  >
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p>{t("productDetail.loadingImage")}</p>
                    </div>
                  </motion.div>
                )}
                {imageSrc ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                    src={imageSrc}
                    alt={product.title}
                    onLoad={() => setImageLoaded(true)}
                    onClick={handleImageClick}
                    className="rounded-xl w-full h-full object-contain transition-all duration-500 p-4 cursor-zoom-in hover:opacity-90"
                  />
                ) : (
                  <div className="text-gray-400 dark:text-gray-500 text-center">
                    <p className="text-4xl mb-2">🖼️</p>
                    <p>{t("productDetail.noImageTitle")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/2 w-full text-left space-y-3 sm:space-y-4 md:space-y-5 flex flex-col justify-center">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                  {product.title}
                </h1>
                {product.brand && (
                  <p className="text-xs sm:text-sm md:text-base text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {t("productDetail.brandLabel")}: {product.brand}
                  </p>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3 sm:line-clamp-4">
                {product.description}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                {product.rating && (
                  <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                      {t("productDetail.ratingLabel")}: {product.rating} / 5
                    </span>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      product.stock > 0
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {product.stock > 0
                      ? t("productDetail.stockAvailable", { count: product.stock })
                      : t("productDetail.stockUnavailable")}
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  ${product.price}
                </span>
                {product.discountPercentage && (
                  <span className="text-sm sm:text-base md:text-lg text-gray-500 line-through">
                    {t("productDetail.priceOriginal")}: $
                    {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                  {t("productDetail.quantityLabel")}:
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={decrement}
                    disabled={quantity <= 1}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg sm:text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                  >
                    <IoRemove />
                  </motion.button>
                  <span className="min-w-[50px] sm:min-w-[60px] text-center text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={increment}
                    disabled={quantity >= 999}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg sm:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                  >
                    <IoAdd />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl mt-3 sm:mt-4 text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                <span>{t("productDetail.addToCart")}</span>
              </motion.button>
            </div>
          </motion.div>

          {allImages.length > 0 && (
            <ImageModal
              isOpen={isImageModalOpen}
              images={allImages}
              currentIndex={selectedImageIndex}
              onClose={handleCloseImageModal}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

