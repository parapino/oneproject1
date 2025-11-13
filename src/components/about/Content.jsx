import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();

  const fade = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const fallbackCards = [
    {
      title: "Who We Are",
      text: "Parapinoo is a modern tech studio where creativity meets code. We craft digital experiences that inspire, engage, and innovate.",
      icon: "🌐",
    },
    {
      title: "Our Vision",
      text: "To shape the digital future through technology and design. We believe every idea deserves to become reality.",
      icon: "🚀",
    },
    {
      title: "Our Culture",
      text: "Passion, innovation, and collaboration are at our core. We’re not just developers — we’re creators of impact.",
      icon: "💡",
    },
  ];

  const cards = useMemo(() => {
    const translated = t("about.cards", { returnObjects: true });
    if (Array.isArray(translated) && translated.length > 0) {
      return translated;
    }
    return fallbackCards;
  }, [t]);

  const backLabel = t("about.back", "Back");
  const headerTitle = t("about.header.title", "Welcome to Parapinoo");
  const headerSubtitle = t(
    "about.header.subtitle",
    "Where technology meets imagination — we design the future through code, art, and innovation."
  );
  const ctaTitle = t(
    "about.cta.title",
    "Ready to Create Something Incredible?"
  );
  const ctaSubtitle = t(
    "about.cta.subtitle",
    "Join us in shaping the digital world — every great idea starts with a single line of code."
  );
  const ctaPrimary = t("about.cta.primary", "View Projects");
  const ctaSecondary = t("about.cta.secondary", "Contact Us");
  const footerText = t("about.footer", {
    year: new Date().getFullYear(),
    defaultValue: "⚡ Designed with vision by Sarvar © {{year}}",
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fade}
      className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black overflow-hidden text-white"
    >
      {/* Floating Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-ping"></div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 z-50"
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-lg font-semibold flex items-center space-x-2 transition-transform hover:-translate-y-1"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>{backLabel}</span>
        </Link>
      </motion.div>

      {/* Header */}
      <div className="relative z-10 text-center pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md"
        >
          {headerTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-xl max-w-3xl mx-auto mt-6 text-gray-200"
        >
          {headerSubtitle}
        </motion.p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8 relative z-10">
        {cards.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6, scale: 1.03 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl transition-all"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Call To Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-24 mb-16 px-4 relative z-10"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
          {ctaTitle}
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          {ctaSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/products"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 font-bold text-white hover:scale-105 transition-transform shadow-lg"
          >
            {ctaPrimary}
          </Link>
          <Link
            to="/boglanish"
            className="px-10 py-4 rounded-2xl border border-white/40 font-bold text-gray-200 hover:bg-white/10 hover:scale-105 transition-transform"
          >
            {ctaSecondary}
          </Link>
        </div>
      </motion.div>

        
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-center text-gray-400 text-sm pb-10 relative z-10"
      >
        {footerText}
      </motion.footer>
    </motion.div>
  );
}
