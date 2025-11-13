import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaInfoCircle,
  FaImages,
  FaPhoneAlt,
  FaBoxOpen,
  FaHeart,
  FaStore,
  FaShoppingCart,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import LanguageInput from "./LanguageInput";
import FullscreenCart from "./FullscreenCart";
import CheckoutModal from "./CheckoutModal";
import { useCart } from "./CartProvider";
import { useFavorites } from "./FavoritesContext";
import { useTranslation } from "react-i18next";

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const location = useLocation();
  const { cartItems, clearCart } = useCart();
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = useMemo(() => cartItems.length, [cartItems]);
  const favoritesCount = useMemo(() => favorites.length, [favorites]);
  
  const total = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems]
  );

  const handleCartClick = () => {
    // Har doim korzinka modalini ochadi, mahsulotlarni ko'rsatadi
    setCartOpen(true);
  };

  const navItems = useMemo(
    () => [
      { key: "home", label: t("nav.home"), path: "/", icon: <FaHome /> },
      { key: "products", label: t("nav.products"), path: "/products", icon: <FaStore /> },
      { key: "myProducts", label: t("nav.myProducts"), path: "/myproducts", icon: <FaBoxOpen /> },
      { key: "favorites", label: t("nav.favorites"), path: "/favorites", icon: <FaHeart /> },
      { key: "gallery", label: t("nav.gallery"), path: "/rasmlar", icon: <FaImages /> },
      { key: "about", label: t("nav.about"), path: "/biz-haqimizda", icon: <FaInfoCircle /> },
      { key: "contact", label: t("nav.contact"), path: "/boglanish", icon: <FaPhoneAlt /> },
    ],
    [t]
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 left-0 z-50 backdrop-blur-xl
          ${
            dark
              ? scrolled
                ? "bg-[#0f172a]/95 dark:bg-[#0f172a]/95 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                : "bg-[#0f172a]/70 dark:bg-[#0f172a]/70"
              : scrolled
              ? "bg-white/95 shadow-[0_0_25px_rgba(0,0,0,0.15)]"
              : "bg-white/70"
          } transition-colors duration-500`}
      >
        <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 p-4">
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 group relative select-none flex-shrink-0"
          >
            <motion.span
              animate={{
                scale: [1, 1.12, 1],
                textShadow: [
                  "0 0 5px rgba(59,130,246,0.3)",
                  "0 0 15px rgba(59,130,246,0.8)",
                  "0 0 5px rgba(59,130,246,0.3)",
                ],
                rotate: [0, -6, 6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.25, rotate: 360 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#38bdf8]"
            >
              P
            </motion.span>
            <motion.span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#1b2a6b] to-[#3b82f6]">
              arapinoo
            </motion.span>
          </Link>

          <div className="flex-1 min-w-0 order-3 md:order-2">
            <nav className="flex items-center justify-start md:justify-between gap-2 sm:gap-3 overflow-x-auto md:overflow-visible flex-nowrap pb-2 md:pb-0 scrollbar-hide">
              {navItems.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className={`flex flex-col items-center gap-1 group relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-sm transition-all duration-400 whitespace-nowrap text-[10px] xs:text-xs sm:text-sm md:text-base md:px-1 md:py-0 md:bg-transparent md:border-none md:shadow-none flex-shrink-0 ${
                    location.pathname === link.path
                      ? "text-blue-500 font-semibold bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl">{link.icon}</span>
                  <span className="relative font-medium md:font-normal text-center">
                    {link.label}
                    {link.key === "favorites" && favoritesCount > 0 && (
                      <span className="absolute -right-4 sm:-right-6 -top-2 sm:-top-3 flex min-h-[16px] sm:min-h-[18px] min-w-[16px] sm:min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-0.5 sm:px-1 text-[9px] sm:text-[10px] font-semibold text-white shadow-md">
                        {favoritesCount > 99 ? "99+" : favoritesCount}
                      </span>
                    )}
                  </span>
                  <span
                    className={`absolute left-3 right-3 sm:left-4 sm:right-4 bottom-0.5 hidden h-[2px] sm:h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500 md:left-0 md:right-0 md:block md:bottom-[-4px] ${
                      location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-shrink-0 order-2 md:order-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCartClick}
              className="relative cursor-pointer text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl transition-all duration-300 hover:text-blue-700 dark:hover:text-blue-300"
              aria-label={t("checkout.cartTitleShort")}
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 via-red-600 to-pink-500 text-white text-xs font-bold min-w-[22px] h-6 flex items-center justify-center rounded-full shadow-xl border-2 border-white dark:border-gray-900 px-1.5 z-10"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.12, boxShadow: "0 4px 24px rgba(59,130,246,0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDark(!dark)}
              className={`relative w-[60px] sm:w-[70px] h-[30px] sm:h-[34px] rounded-full cursor-pointer shadow-inner border border-gray-400/40 dark:border-gray-600/40 overflow-hidden flex-shrink-0
                ${
                  dark
                    ? "bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
                    : "bg-gradient-to-r from-gray-200 to-white"
                } transition-colors duration-200`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className={`absolute top-[3px] left-[3px] sm:left-[4px] w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] rounded-full flex items-center justify-center text-lg sm:text-xl
                  ${dark ? "translate-x-[30px] sm:translate-x-[34px] bg-white text-yellow-400 shadow-lg" : "translate-x-0 bg-blue-600 text-white shadow-lg"}
                `}
              >
                {dark ? <FaSun /> : <FaMoon />}
              </motion.div>
            </motion.div>

            <div className="flex-shrink-0">
              <LanguageInput />
            </div>
          </div>
        </div>
      </motion.header>

      <FullscreenCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <CheckoutModal
        isOpen={checkoutOpen}
        total={total}
        onClose={() => setCheckoutOpen(false)}
        onComplete={({ method, provider }) => {
          clearCart();
          setCheckoutOpen(false);
        }}
      />
    </>
  );
}
