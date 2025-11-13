import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function LanguageInput() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = useMemo(
    () => [
      { code: "uz", short: "UZ", label: t("language.uz") },
      { code: "en", short: "EN", label: t("language.en") },
      { code: "zh", short: "中文", label: t("language.zh") },
    ],
    [t]
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("app-language");
      if (saved && saved !== i18n.resolvedLanguage) {
        i18n.changeLanguage(saved);
      }
    } catch (error) {
      console.error("Failed to read saved language:", error);
    }
  }, [i18n]);

  const resolvedLanguage = i18n.resolvedLanguage || i18n.language || "uz";
  const currentLanguage =
    languages.find((lang) => resolvedLanguage.startsWith(lang.code)) ||
    languages[0];

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang.code);
    try {
      window.localStorage.setItem("app-language", lang.code);
    } catch (error) {
      console.error("Failed to persist language:", error);
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold tracking-wide
        bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700
        dark:from-blue-800 dark:via-blue-700 dark:to-sky-600
        text-white border border-blue-600/40 dark:border-blue-500/40
        shadow-[0_2px_10px_rgba(30,58,138,0.4)] dark:shadow-[0_2px_10px_rgba(59,130,246,0.3)]
        hover:shadow-[0_4px_14px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_4px_14px_rgba(59,130,246,0.4)]
        transition-all duration-300 text-xs sm:text-sm"
        aria-label="language-switcher"
      >
        {currentLanguage?.short ?? "UZ"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[110%] left-0 w-full min-w-[120px]
            bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-sky-700/95
            dark:from-blue-800/95 dark:via-blue-700/95 dark:to-sky-600/95
            backdrop-blur-xl rounded-xl overflow-hidden border border-blue-600/40 dark:border-blue-500/40 shadow-lg z-50"
          >
            {languages.map((lang) => {
              const isActive = currentLanguage?.code === lang.code;
              return (
                <motion.button
                  type="button"
                  key={lang.code}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(lang)}
                  className={`w-full px-4 sm:px-5 py-2 sm:py-2.5 cursor-pointer text-center transition-all font-semibold text-xs sm:text-sm ${
                    isActive
                      ? "bg-blue-700/80 dark:bg-blue-600/80 text-white"
                      : "text-sky-100 dark:text-sky-200 hover:bg-blue-800/50 dark:hover:bg-blue-700/50"
                  }`}
                >
                  <span className="block text-xs uppercase text-sky-200/80">
                    {lang.short}
                  </span>
                  <span>{lang.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
