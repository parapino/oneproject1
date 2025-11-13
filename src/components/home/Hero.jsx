import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingBag } from "react-icons/fa";
import { MdCategory, MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const FEATURED_CATEGORIES = [
  "all",
  "beauty",
  "fragrances",
  "skincare",
  "home-decoration",
  "groceries",
];

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const categoryLabels = useMemo(
    () =>
      t("products.categoryLabels", {
        returnObjects: true,
        defaultValue: {},
      }) || {},
    [t]
  );

  const handleGoToProducts = (category = "all") => {
    navigate("/products", { state: { category } });
  };

  const handleToggleCategories = () => setExpanded((prev) => !prev);

  return (
    <section className="relative flex items-center justify-center text-center min-h-screen text-gray-700 dark:text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-white to-indigo-100 dark:from-gray-800 dark:to-gray-900 opacity-90 -z-10" />

      <div className="flex flex-col items-center px-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 drop-shadow-md tracking-wide text-blue-900 dark:text-white">
          {t("hero.title")}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 tracking-wide max-w-3xl">
          {t("hero.subtitle")}
        </p>

        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
          {t("hero.description")}
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleGoToProducts("all")}
              className="inline-flex items-center gap-4 text-white bg-indigo-600 hover:bg-indigo-700 py-4 px-12 rounded-full text-lg sm:text-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <FaShoppingBag className="text-2xl sm:text-3xl" />
              {t("hero.ctaPrimary")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleToggleCategories}
              className={`relative inline-flex items-center gap-3 rounded-full border-2 border-indigo-200 bg-indigo-50 py-4 pl-12 pr-16 text-lg sm:text-xl font-semibold text-indigo-700 shadow-md transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-400/40 dark:bg-indigo-500/10 dark:text-indigo-300`}
            >
              <span className="absolute left-6 text-3xl text-indigo-500 dark:text-indigo-300">
                <MdCategory />
              </span>
              <span className="pl-4">{categoryLabels.all || t("products.categoryLabels.all", "All")}</span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                className="text-3xl text-indigo-400 dark:text-indigo-200"
              >
                <MdExpandMore />
              </motion.span>
            </motion.button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="hero-categories"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {FEATURED_CATEGORIES.filter((slug) => slug !== "all").map((slug, index) => {
                  const label =
                    categoryLabels[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
                  return (
                    <motion.button
                      key={slug}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 250, damping: 18 }}
                      onClick={() => handleGoToProducts(slug)}
                      className="group relative overflow-hidden rounded-full border border-indigo-200 bg-white/90 px-6 py-3 text-sm font-semibold text-indigo-600 shadow hover:border-indigo-300 hover:text-indigo-700 dark:border-indigo-400/30 dark:bg-gray-900/70 dark:text-indigo-200 dark:hover:border-indigo-300"
                    >
                      <span className="relative z-10">{label}</span>
                      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-80 dark:from-indigo-500/10 dark:via-gray-900/80 dark:to-indigo-500/10" />
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
