import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const footerTexts = useMemo(() => {
    const defaults = {
      description: "Your one-stop shop for amazing products and inspiring galleries.",
      quickLinksTitle: "Quick Links",
      contactTitle: "Contact Info",
      followTitle: "Follow Us",
      newsletterTitle: "Newsletter",
      newsletterPlaceholder: "Your email",
      newsletterButton: "Subscribe",
      contact: {
        email: "Email: info@parapinoo.com",
        phone: "Phone: +998 90 340 06 06",
        address: "Address: Tashkent, Uzbekistan",
      },
    };
    const translation = t("footer", { returnObjects: true });
    return {
      ...defaults,
      ...(translation && typeof translation === "object" ? translation : {}),
      contact: {
        ...defaults.contact,
        ...(translation &&
        typeof translation === "object" &&
        translation.contact &&
        typeof translation.contact === "object"
          ? translation.contact
          : {}),
      },
    };
  }, [t]);

  const navLinks = useMemo(
    () => [
      { name: t("nav.home"), href: "/" },
      { name: t("nav.about"), href: "/biz-haqimizda" },
      { name: t("nav.gallery"), href: "/rasmlar" },
      { name: t("nav.products"), href: "/products" },
      { name: t("nav.contact"), href: "/boglanish" },
    ],
    [t]
  );

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "https://instagram.com/parapinoo" },
    { icon: <FaLinkedinIn />, href: "#" },
  ];

  const footerSections = [
    {
      title: footerTexts.quickLinksTitle,
      type: "links",
      items: navLinks,
    },
    {
      title: footerTexts.contactTitle,
      type: "contacts",
      items: [
        { name: footerTexts.contact.email, href: "mailto:info@parapinoo.com" },
        { name: footerTexts.contact.phone, href: "tel:+998903400606" },
        { name: footerTexts.contact.address, href: "#" },
      ],
    },
    {
      title: footerTexts.followTitle,
      type: "social",
      items: socialLinks.map((s) => s),
    },
    {
      title: footerTexts.newsletterTitle,
      type: "newsletter",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-inner p-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Parapinoo
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {footerTexts.description}
          </p>
        </div>

        {footerSections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
              {section.title}
            </h3>
            {section.type === "social" ? (
              <div className="flex gap-3 mt-2">
                {section.items.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.3, color: "#3b82f6" }}
                    className="text-gray-600 dark:text-gray-400 text-xl transition-all duration-300"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            ) : section.type === "newsletter" ? (
              <form className="flex gap-2 mt-2">
                <input
                  type="email"
                  placeholder={footerTexts.newsletterPlaceholder}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  {footerTexts.newsletterButton}
                </button>
              </form>
            ) : (
              <ul className="flex flex-col gap-2 mt-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © 2025 Parapinoo —{" "}
          <a href="#" className="hover:text-blue-500">
            @parapinoo
          </a>
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          {socialLinks.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.3, color: "#3b82f6" }}
              className="text-gray-600 dark:text-gray-400 text-xl transition-all duration-300"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}

