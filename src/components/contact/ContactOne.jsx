import React from "react";
import { useTranslation } from "react-i18next";

export default function ContactOne() {
  const { t } = useTranslation();

  return (
    <section className="body-font relative bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto flex flex-wrap px-5 py-24 sm:flex-nowrap">
        <div className="relative flex items-end justify-start overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-200/50 ring-1 ring-indigo-100 dark:bg-gray-900 dark:ring-indigo-500/40 lg:w-2/3">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0 brightness-105 contrast-105"
            frameBorder="0"
            title="Parapinoo location map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Monday+IT+School,+Buxoro,+Uzbekistan&ie=UTF8&t=&z=15&iwloc=B&output=embed"
            aria-hidden="false"
          ></iframe>
          <div className="relative flex w-full flex-wrap gap-6 rounded-3xl bg-white/90 p-10 shadow-lg backdrop-blur dark:bg-gray-900/90">
            <div className="w-full lg:w-1/2">
              <h2 className="title-font text-xs font-semibold tracking-widest text-gray-900 dark:text-gray-200">
                {t("contact.mapTitle")}
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("contact.mapDescription")}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="title-font text-xs font-semibold tracking-widest text-gray-900 dark:text-gray-200">
                {t("contact.emailLabel")}
              </h2>
              <a
                href="mailto:info@monday.uz"
                className="mt-1 inline-block text-indigo-500 transition-colors hover:text-indigo-600"
              >
                info@monday.uz
              </a>
              <h2 className="title-font mt-4 text-xs font-semibold tracking-widest text-gray-900 dark:text-gray-200">
                {t("contact.phoneLabel")}
              </h2>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                +998 90 340 06 06
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 w-full rounded-3xl border border-indigo-200 bg-white p-8 shadow-xl shadow-indigo-100/30 transition-all duration-300 dark:border-indigo-500/50 dark:bg-gray-900 dark:shadow-none md:ml-auto md:mt-0 md:w-1/2 lg:ml-12 lg:w-1/3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("contact.formTitle")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {t("contact.formSubtitle")}
          </p>
          <form className="mt-6 space-y-5" noValidate>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-sm font-semibold text-gray-600 dark:text-gray-400"
              >
                {t("contact.nameLabel")}
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                autoComplete="name"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-sm font-semibold text-gray-600 dark:text-gray-400"
              >
                {t("contact.emailFieldLabel")}
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-semibold text-gray-600 dark:text-gray-400"
              >
                {t("contact.messageLabel")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                placeholder={t("contact.messagePlaceholder")}
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {t("contact.submit")}
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            {t("contact.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
