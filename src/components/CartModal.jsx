// src/components/CartModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal({ isOpen, cartItems, onClose, onReset, onBuy }) {
  if (!isOpen) return null;

  // Umumiy narx hisoblash
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] md:w-[600px] p-6 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 dark:text-gray-200">
              🛒 Sizning Savatingiz
            </h2>

            {/* Mahsulotlar */}
            {cartItems.length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.price} so'm × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {(item.price * item.quantity).toLocaleString()} so'm
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                Savat bo‘sh 😕
              </p>
            )}

            {/* Umumiy narx va tugmalar */}
            <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">
                  Umumiy:
                </span>
                <span className="font-bold text-xl text-green-600 dark:text-green-400">
                  {total.toLocaleString()} so'm
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <button
                  onClick={onReset}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={onBuy}
                  disabled={cartItems.length === 0}
                  className={`flex-1 font-semibold py-2 rounded-lg transition ${
                    cartItems.length === 0
                      ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  💸 Buy
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
