import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { IoAdd, IoRemove, IoClose, IoTrashOutline } from "react-icons/io5";
import { useCart } from "./CartProvider";
import CheckoutModal from "./CheckoutModal";
import { useTranslation } from "react-i18next";

export default function FullscreenCart({ isOpen, onClose }) {
  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const { cartItems, incrementQty, decrementQty, removeFromCart, clearCart } = useCart();
  const { t } = useTranslation();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const total = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems]
  );

  // Faqat unique mahsulotlar soni (qty emas, id bo'yicha)
  const uniqueItemsCount = new Set(cartItems.map(item => item.id)).size;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="fullscreen-cart"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-blue-50 dark:bg-gray-900 m-0 p-0 transition-colors duration-300 overflow-hidden"
        >
          {/* Full screen container */}
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full h-full flex flex-col md:flex-row items-stretch justify-start gap-0 p-0 overflow-hidden"
          >
            {/* Products List */}
            <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto custom-scrollbar p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 transition-colors duration-300 pb-24 md:pb-6 h-full md:h-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6 relative sticky top-0 bg-white dark:bg-gray-800 z-10 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">🛒 {t("checkout.cartTitle")}</h2>

                {/* Korzinka ustidagi indikator */}
                {uniqueItemsCount > 0 && (
                  <span className="absolute -top-1 sm:-top-2 right-16 sm:right-20 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-lg">
                    {uniqueItemsCount}
                  </span>
                )}

                <button
                  onClick={onClose}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-all duration-200"
                >
                  <IoClose size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Mahsulotlar */}
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10 sm:mt-20 gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-5xl sm:text-6xl">😔</span>
                  <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-center px-4">{t("checkout.emptyTitle")}</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-center px-4 text-sm sm:text-base">{t("checkout.emptySubtitle")}</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.02, duration: 0.12 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-150 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg bg-white dark:bg-gray-700 p-2"
                        />
                        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-600 dark:bg-blue-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg font-bold">
                          x{item.qty}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col gap-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">{item.title}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-bold text-base sm:text-lg">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <button
                          onClick={() => decrementQty(item.id)}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 hover:text-white rounded-full transition-all duration-200"
                        >
                          <IoRemove className="text-sm sm:text-base" />
                        </button>
                        <span className="w-5 sm:w-6 text-center font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{item.qty}</span>
                        <button
                          onClick={() => incrementQty(item.id)}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 dark:hover:bg-purple-600 text-gray-700 dark:text-gray-300 hover:text-white rounded-full transition-all duration-200"
                        >
                          <IoAdd className="text-sm sm:text-base" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-1 sm:ml-3 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 text-white rounded-full transition-all duration-200 flex-shrink-0"
                      >
                        <FaTrash className="text-xs sm:text-sm" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary - Mobile: Fixed at bottom, Desktop: Sidebar */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.15 }}
                className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto w-full md:w-[350px] bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-none shadow-2xl md:shadow-xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border-t-2 md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 transition-colors duration-300 z-20 max-h-[45vh] sm:max-h-[50vh] md:max-h-full overflow-y-auto custom-scrollbar"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4">
                  {t("checkout.summaryTitle")}
                </h3>
                <div className="flex justify-between items-center font-semibold text-base sm:text-lg pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">{t("checkout.totalLabel")}:</span>
                  <span className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl md:text-2xl">${total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold transition-all duration-200 disabled:opacity-60 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    disabled={cartItems.length === 0}
                  >
                    {t("checkout.checkoutBtn")}
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2.5 sm:py-3 bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 text-gray-800 dark:text-gray-200 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    <IoTrashOutline className="text-base sm:text-lg" />
                    <span>{t("checkout.clearCart")}</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 sm:py-3 bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600 text-sm sm:text-base"
                  >
                    {t("checkout.close")}
                  </button>
                </div>
                {checkoutStatus && (
                  <div className="mt-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                    {checkoutStatus}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          <CheckoutModal
            isOpen={checkoutOpen}
            total={total}
            onClose={() => setCheckoutOpen(false)}
            onComplete={({ method, provider }) => {
              clearCart();
              setCheckoutStatus(
                method === "express"
                  ? t("checkout.completedExpress", { provider })
                  : t("checkout.completedCard")
              );
              setCheckoutOpen(false);
              onClose?.();
            }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
