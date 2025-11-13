import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const slugToTitle = (slug = "", fallback = "") => {
  if (!slug) return fallback || "";
  const words = slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");
  if (!words.length) return fallback || "";
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CATEGORY_EMOJIS = {
  all: "✨",
  beauty: "💄",
  fragrances: "🌸",
  skincare: "🧴",
  groceries: "🛒",
  "home-decoration": "🏡",
  lighting: "💡",
  furniture: "🛋️",
  "women-s-dresses": "👗",
  "women-s-bags": "👜",
  "women-s-watches": "⌚",
  "women-s-jewellery": "💍",
  "men-s-watches": "⌚",
  "mens-shirts": "👔",
  "mens-shoes": "👞",
  footwear: "👟",
  sunglasses: "🕶️",
  smartphones: "📱",
  laptops: "💻",
  automotive: "🚗",
  motorcycle: "🏍️",
  tops: "🧥",
};

// Special styling for fashion/beauty categories
const getCategoryStyle = (slug) => {
  const fashionCategories = ["women-s-dresses", "women-s-bags", "women-s-watches", "women-s-jewellery", "mens-shirts", "mens-shoes", "footwear", "tops"];
  const beautyCategories = ["beauty", "fragrances", "skincare"];
  
  if (fashionCategories.includes(slug)) {
    return "from-pink-500 via-rose-500 to-red-500";
  }
  if (beautyCategories.includes(slug)) {
    return "from-purple-500 via-pink-500 to-rose-500";
  }
  return "from-blue-600 via-indigo-600 to-purple-600";
};

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  const { t } = useTranslation();
  const labels =
    t("products.categoryLabels", {
      returnObjects: true,
      defaultValue: {},
    }) || {};
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const title = t("products.categoryFilterTitle", "Categories");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [activeCategory]);

  const renderLabel = (category) => {
    const { slug, original } = category;
    if (slug === "all") {
      return labels.all || t("products.categoryLabels.all", "All");
    }
    return (
      labels[slug] ||
      labels[original?.toLowerCase?.()] ||
      slugToTitle(original, slugToTitle(slug, original))
    );
  };

  const defaultLabel = useMemo(
    () => (categories.length > 0 ? renderLabel(categories[0]) : ""),
    [categories]
  );

  const activeItem = useMemo(
    () => categories.find((category) => category.slug === activeCategory),
    [categories, activeCategory]
  );

  const activeLabel = activeItem ? renderLabel(activeItem) : defaultLabel;

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (slug) => {
    onSelect(slug);
    setIsOpen(false);
  };

  const renderEmoji = (slug) => CATEGORY_EMOJIS[slug] || "🪄";

  const activeCategoryGradient = activeItem?.slug ? getCategoryStyle(activeItem.slug) : "from-blue-600 via-indigo-600 to-purple-600";

  return (
    <div className="relative mb-6 sm:mb-8 w-full max-w-3xl" ref={containerRef}>
      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-3 sm:gap-4 rounded-[28px] border border-transparent bg-gradient-to-r ${activeCategoryGradient} px-4 py-3 sm:px-6 sm:py-4 text-left text-white shadow-[0_20px_45px_-15px_rgba(79,70,229,0.65)] transition-all hover:shadow-[0_28px_55px_-18px_rgba(79,70,229,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:from-blue-500 dark:via-violet-500 dark:to-purple-500`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-xl sm:text-2xl font-semibold shadow-lg"
          >
            {renderEmoji(activeItem?.slug || "all")}
          </motion.span>
          <div>
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
              {title}
            </p>
            <p className="text-base sm:text-lg md:text-xl font-bold leading-tight">{activeLabel}</p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white backdrop-blur-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="categories-popover"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute top-full z-30 mt-3 sm:mt-4 w-full overflow-hidden rounded-3xl border border-gray-100/60 bg-white/98 shadow-2xl backdrop-blur-xl dark:border-gray-700/60 dark:bg-gray-900/98"
            role="listbox"
          >
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("products.categoryFilterAria", { category: activeLabel })}
                </p>
                <button
                  onClick={() => handleSelect("all")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                    activeCategory === "all"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {renderEmoji("all")} {labels.all || "All"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-h-[70vh] sm:max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {categories
                  .filter((category) => category.slug !== "all")
                  .map((category, index) => {
                    const isActive = activeCategory === category.slug;
                    const label = renderLabel(category);
                    const categoryGradient = getCategoryStyle(category.slug);
                    return (
                      <motion.button
                        key={category.slug}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ delay: index * 0.015, duration: 0.18 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 sm:py-4 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${
                          isActive
                            ? `border-transparent bg-gradient-to-r ${categoryGradient} text-white shadow-xl shadow-blue-500/30`
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400/50 dark:hover:from-gray-800 dark:hover:to-gray-750"
                        }`}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleSelect(category.slug)}
                      >
                        <span className="flex items-center gap-3">
                          <motion.span
                            animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-xl sm:text-2xl ${
                              isActive
                                ? "bg-white/25 text-white shadow-lg"
                                : "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-300"
                            }`}
                          >
                            {renderEmoji(category.slug)}
                          </motion.span>
                          <span className="text-left leading-tight font-medium">{label}</span>
                        </span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="rounded-full bg-white/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white dark:bg-white/20 shadow-md"
                          >
                            {t("misc.selected", "Selected")}
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

