import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoCard, IoWallet, IoCheckmarkCircle } from "react-icons/io5";
import { FaApplePay, FaGooglePay, FaPaypal } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const expressOptions = [
  { id: "paypal", icon: <FaPaypal className="text-3xl" />, label: "PayPal" },
  { id: "apple", icon: <FaApplePay className="text-3xl" />, label: "Apple Pay" },
  { id: "google", icon: <FaGooglePay className="text-3xl" />, label: "Google Pay" },
];

export default function CheckoutModal({ isOpen, total, onClose, onComplete }) {
  const { t } = useTranslation();
  const [method, setMethod] = useState("express");
  const [paymentResult, setPaymentResult] = useState(null);
  const [expressPreview, setExpressPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scroll when modal is open
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

  const summaryLines = useMemo(
    () => [
      { label: t("checkout.subtotal"), value: total },
      { label: t("checkout.shipping"), value: 0 },
      { label: t("checkout.tax"), value: total * 0.12 },
    ],
    [total, t]
  );

  const validateCardForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = t("checkout.errors.name");
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, "")))
      nextErrors.cardNumber = t("checkout.errors.cardNumber");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry))
      nextErrors.expiry = t("checkout.errors.expiry");
    if (!/^\d{3,4}$/.test(formData.cvv)) nextErrors.cvv = t("checkout.errors.cvv");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleExpressCheckout = (option) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentResult({
        status: "success",
        message: t("checkout.successMessage", { provider: option.label }),
      });
      onComplete?.({ method: "express", provider: option.label });
    }, 1200);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!validateCardForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentResult({
        status: "success",
        message: t("checkout.successCard"),
      });
      onComplete?.({ method: "card", payload: formData });
    }, 1500);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setPaymentResult(null);
    setErrors({});
    setExpressPreview(null);
    setFormData({
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    setMethod("express");
    onClose?.();
  };

  if (!isOpen) return null;

  const grandTotal = summaryLines.reduce((sum, line) => sum + line.value, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-2 sm:px-4 py-2 sm:py-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] max-h-[95vh] sm:max-h-[90vh] custom-scrollbar"
          >
            {/* Left column */}
            <div className="relative flex flex-col gap-4 sm:gap-6 overflow-y-auto custom-scrollbar px-4 py-4 sm:px-5 sm:py-6 md:p-10">
              <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                  <IoWallet className="text-blue-600 text-2xl sm:text-3xl" />
                  {t("checkout.title")}
                </h2>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition flex-shrink-0"
                  aria-label={t("checkout.close")}
                >
                  <IoClose className="text-lg sm:text-xl" />
                </button>
              </div>

              <div className="flex gap-3 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full">
                <button
                  className={`flex-1 py-2 rounded-full font-semibold transition ${
                    method === "express"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setMethod("express")}
                >
                  {t("checkout.methods.express")}
                </button>
                <button
                  className={`flex-1 py-2 rounded-full font-semibold transition ${
                    method === "card"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setMethod("card")}
                >
                  {t("checkout.methods.card")}
                </button>
              </div>

              {paymentResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-2xl p-6 flex items-center gap-4"
                >
                  <IoCheckmarkCircle className="text-green-600 dark:text-green-400 text-4xl" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                      {t("checkout.successTitle")}
                    </h3>
                    <p className="text-green-600 dark:text-green-300">
                      {paymentResult.message}
                    </p>
                  </div>
                </motion.div>
              ) : method === "express" ? (
                <motion.div
                  key="express"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-4"
                >
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t("checkout.expressHint")}
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    {expressOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSubmitting}
                        onClick={() => setExpressPreview(option)}
                        className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-5 sm:py-6 shadow hover:shadow-md transition"
                      >
                        {option.icon}
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="card"
                  onSubmit={handleCardSubmit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-5"
                >
                  <div className="grid gap-2">
                    <label className="font-semibold text-gray-700 dark:text-gray-200">
                      {t("checkout.form.name")}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={t("checkout.form.namePlaceholder")}
                      className={`w-full rounded-xl border px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                        errors.name
                          ? "border-red-400 focus:ring-red-400"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.name && (
                      <span className="text-sm text-red-500">{errors.name}</span>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="font-semibold text-gray-700 dark:text-gray-200">
                      {t("checkout.form.cardNumber")}
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                        setFormData((prev) => ({ ...prev, cardNumber: formatted }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full rounded-xl border px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                        errors.cardNumber
                          ? "border-red-400 focus:ring-red-400"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                      } focus:outline-none focus:ring-2`}
                    />
                    {errors.cardNumber && (
                      <span className="text-sm text-red-500">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="font-semibold text-gray-700 dark:text-gray-200">
                        {t("checkout.form.expiry")}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                          const formatted =
                            value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                          setFormData((prev) => ({ ...prev, expiry: formatted }));
                        }}
                        placeholder="MM/YY"
                        className={`w-full rounded-xl border px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                          errors.expiry
                            ? "border-red-400 focus:ring-red-400"
                            : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                        } focus:outline-none focus:ring-2`}
                      />
                      {errors.expiry && (
                        <span className="text-sm text-red-500">{errors.expiry}</span>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <label className="font-semibold text-gray-700 dark:text-gray-200">
                        {t("checkout.form.cvv")}
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          }))
                        }
                        placeholder="123"
                        className={`w-full rounded-xl border px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                          errors.cvv
                            ? "border-red-400 focus:ring-red-400"
                            : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                        } focus:outline-none focus:ring-2`}
                      />
                      {errors.cvv && (
                        <span className="text-sm text-red-500">{errors.cvv}</span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition disabled:opacity-60"
                  >
                    <IoCard className="text-xl" />
                    {isSubmitting ? t("checkout.processing") : t("checkout.payNow")}
                  </motion.button>
                </motion.form>
              )}
            </div>

            {/* Right column summary */}
            <div className="bg-gray-50 dark:bg-gray-950 border-t-2 border-gray-200 dark:border-gray-800 sm:border-t-0 sm:border-l p-4 sm:p-6 md:p-10 flex flex-col gap-4 sm:gap-6 overflow-y-auto custom-scrollbar max-h-full">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
                  {t("checkout.orderSummary")}
                </h3>
                <div className="space-y-3">
                  {summaryLines.map((line) => (
                    <div key={line.label} className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>{line.label}</span>
                      <span>${line.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center border-t-2 border-gray-200 dark:border-gray-800 pt-3 sm:pt-4">
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {t("checkout.totalDue")}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="mt-auto space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <p className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">•</span>
                  {t("checkout.security")}
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">•</span>
                  {t("checkout.help")}
                </p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {expressPreview && (
              <motion.div
                key="express-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[1250] flex items-center justify-center bg-black/50 px-3 sm:px-4 py-4"
                onClick={() => !isSubmitting && setExpressPreview(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl dark:bg-gray-900 max-h-[85vh] overflow-y-auto"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                        {expressPreview.icon}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                          {t("checkout.expressReview.title")}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("checkout.expressReview.subtitle", {
                            provider: expressPreview.label,
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setExpressPreview(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <IoClose />
                    </button>
                  </div>

                  <div className="mt-5 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300">
                    {summaryLines.map((line) => (
                      <div key={line.label} className="flex justify-between">
                        <span>{line.label}</span>
                        <span>${line.value.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t border-dashed border-gray-300 pt-3 text-base font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                      <span>{t("checkout.expressReview.totalLabel")}</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={isSubmitting}
                      onClick={() => {
                        if (!expressPreview || isSubmitting) return;
                        handleExpressCheckout(expressPreview);
                        setExpressPreview(null);
                      }}
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
                    >
                      {isSubmitting
                        ? t("checkout.processing")
                        : t("checkout.expressReview.confirm", {
                            amount: `$${grandTotal.toFixed(2)}`,
                          })}
                    </motion.button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => !isSubmitting && setExpressPreview(null)}
                      className="rounded-2xl border border-gray-300 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {t("checkout.expressReview.cancel")}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

