import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaCloudUploadAlt, FaRegEdit, FaTrashAlt, FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useUserProducts } from "../components/UserProductsContext";
import { useFavorites } from "../components/FavoritesContext";
import { useTranslation } from "react-i18next";

const defaultFormState = {
  title: "",
  price: "",
  description: "",
  brand: "",
  category: "",
  email: "",
  stock: "",
  tags: "",
  images: [],
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MyProducts() {
  const { userProducts, addProduct, updateProduct, deleteProduct } = useUserProducts();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();

  const [formData, setFormData] = useState(defaultFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const texts = useMemo(() => {
    const fallback = {
      header: {
        title: "O‘z mahsulotlaringizni qo‘shing",
        subtitle: "Mahsulot nomi, narxi va rasmni kiriting — hammasi shu yerda saqlanadi.",
        pulse: "Mahsulot qo‘shish tugmasi",
      },
      form: {
        nameLabel: "Mahsulot nomi *",
        namePlaceholder: "Masalan, Premium qahva to‘plami",
        priceLabel: "Narx (USD) *",
        pricePlaceholder: "Masalan, 149",
        brandLabel: "Brend",
        brandPlaceholder: "Masalan, Parapinoo",
        categoryLabel: "Kategoriya",
        categoryPlaceholder: "Masalan, Ichimliklar",
        descriptionLabel: "Tavsif *",
        descriptionPlaceholder:
          "Mahsulotning afzalliklari, tarkibi yoki ishlatilish usuli haqida yozing.",
        emailLabel: "Email *",
        emailPlaceholder: "username@gmail.com",
        stockLabel: "Ombordagi soni",
        stockPlaceholder: "Masalan, 120",
        tagsLabel: "Kalit so‘zlar (vergul bilan)",
        tagsPlaceholder: "Masalan, premium, ichimlik, energiya",
        imagesLabel: "Mahsulot rasmlari *",
        imagesHint: "Rasmlarni yuklash uchun bu yerga bosing (maksimal 5 ta)",
        imagesSupport: "JPG, JPEG yoki PNG formatlarini qo‘llab-quvvatlaydi",
        imagesUploading: "Rasmlar yuklanmoqda...",
        submitCreate: "Mahsulotni qo‘shish",
        submitUpdate: "O‘zgartirishni saqlash",
        submitting: "Saqlanmoqda...",
        reset: "Formani tozalash",
        removeImageAria: "Rasmni o‘chirish",
      },
      errors: {
        name: "Mahsulot nomini kiriting",
        description: "Qisqacha tavsif talab qilinadi",
        price: "To‘g‘ri narx kiriting",
        pricePositive: "Narx 0 dan katta bo‘lishi kerak",
        email: "To‘g‘ri email kiriting (masalan: username@gmail.com)",
        images: "Kamida bitta rasm yuklang",
      },
      stats: {
        title: "Statistikalar",
        subtitle: "Shaxsiy katalogingiz haqidagi ma’lumotlar.",
        totalLabel: "Mahsulotlar soni",
        favoritesLabel: "Sevimlilarga qo‘shilganlar",
        tipTitle: "Maslahat",
        tipBody:
          "Gmail manzilingizni to‘g‘ri kiriting — xaridorlar siz bilan tez bog‘lana olishadi. Rasm sifatini ham yuqori darajada saqlang.",
      },
      list: {
        title: "Yaratilgan mahsulotlar",
        lastUpdated: "Oxirgi o‘zgartirish:",
        emptyTitle: "Hozircha mahsulot qo‘shilmagan",
        emptySubtitle: "Formani to‘ldirib, birinchi mahsulotni qo‘shishni boshlang.",
        edit: "Tahrirlash",
        delete: "O‘chirish",
        favoriteAria: "Sevimlilarga qo‘shish",
        noImage: "Rasm mavjud emas",
      },
    };

    const translation = t("myProducts", { returnObjects: true });
    const mergeSection = (section) => ({
      ...fallback[section],
      ...(translation && typeof translation === "object" && translation[section]
        ? translation[section]
        : {}),
    });

    return {
      header: mergeSection("header"),
      form: mergeSection("form"),
      errors: mergeSection("errors"),
      stats: mergeSection("stats"),
      list: mergeSection("list"),
    };
  }, [t]);

  const totalProducts = userProducts.length;
  const favoriteCount = useMemo(
    () => userProducts.filter((product) => isFavorite(product.id)).length,
    [userProducts, isFavorite]
  );

  const resetForm = () => {
    setFormData(defaultFormState);
    setFormErrors({});
    setIsEditing(false);
    setEditingId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []).slice(0, 5);
    if (!files.length) return;

    setImageLoading(true);
    try {
      const dataUrls = await Promise.all(
        files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...dataUrls].slice(0, 5),
      }));
      setFormErrors((prev) => {
        if (!prev.images) return prev;
        const next = { ...prev };
        delete next.images;
        return next;
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoading(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = texts.errors.name;
    if (!formData.description.trim()) errors.description = texts.errors.description;
    if (!formData.price || Number.isNaN(Number(formData.price))) {
      errors.price = texts.errors.price;
    } else if (Number(formData.price) <= 0) {
      errors.price = texts.errors.pricePositive;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = texts.errors.email;
    }

    if (!formData.images.length) {
      errors.images = texts.errors.images;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const normalizeProductPayload = () => ({
    title: formData.title.trim(),
    price: Number(formData.price),
    description: formData.description.trim(),
    brand: formData.brand.trim(),
    category: formData.category.trim(),
    email: formData.email.trim(),
    stock: formData.stock ? Number(formData.stock) : 0,
    tags: formData.tags
      ? formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    images: formData.images,
    thumbnail: formData.images[0] || "",
    rating: {
      rate: 0,
      count: 0,
    },
    source: "local",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const payload = normalizeProductPayload();

    try {
      if (isEditing && editingId) {
        updateProduct(editingId, payload);
      } else {
        addProduct(payload);
      }
      resetForm();
    } catch (error) {
      console.error("Mahsulotni saqlashda xatolik:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setFormData({
      title: product.title || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      email: product.email || "",
      stock: product.stock?.toString() || "",
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
      images: product.images || (product.thumbnail ? [product.thumbnail] : []),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    if (isEditing && editingId === id) {
      resetForm();
    }
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-gray-100 via-white to-gray-100 py-16 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid gap-6 lg:grid-cols-[2fr_3fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {texts.header.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {texts.header.subtitle}
                </p>
              </div>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 text-2xl text-blue-600 dark:bg-blue-500/20 dark:text-blue-300"
                aria-label={texts.header.pulse}
              >
                <FaPlus />
              </motion.span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texts.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={texts.form.namePlaceholder}
                    className={`w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 dark:bg-gray-800 ${
                      formErrors.title
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400 dark:border-gray-700"
                    }`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm font-medium text-red-500">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texts.form.priceLabel}
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder={texts.form.pricePlaceholder}
                    className={`w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 dark:bg-gray-800 ${
                      formErrors.price
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400 dark:border-gray-700"
                    }`}
                  />
                  {formErrors.price && (
                    <p className="mt-1 text-sm font-medium text-red-500">{formErrors.price}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texts.form.brandLabel}
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder={texts.form.brandPlaceholder}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texts.form.categoryLabel}
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder={texts.form.categoryPlaceholder}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {texts.form.descriptionLabel}
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={texts.form.descriptionPlaceholder}
                  className={`w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 dark:bg-gray-800 ${
                    formErrors.description
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-400 dark:border-gray-700"
                  }`}
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texts.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={texts.form.emailPlaceholder}
                    className={`w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 dark:bg-gray-800 ${
                      formErrors.email
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400 dark:border-gray-700"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm font-medium text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texts.form.stockLabel}
                  </label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder={texts.form.stockPlaceholder}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus-ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {texts.form.tagsLabel}
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder={texts.form.tagsPlaceholder}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {texts.form.imagesLabel}
                </label>
                <div
                  className={`mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/40 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 ${
                    formErrors.images ? "border-red-400" : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex cursor-pointer flex-col items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-300"
                  >
                    <FaCloudUploadAlt className="text-4xl" />
                    <span className="font-semibold">
                      {texts.form.imagesHint}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {texts.form.imagesSupport}
                    </span>
                  </label>
                </div>
                {formErrors.images && (
                  <p className="mt-1 text-sm font-medium text-red-500">{formErrors.images}</p>
                )}

                {imageLoading && (
                  <p className="mt-3 text-sm text-blue-500">{texts.form.imagesUploading}</p>
                )}

                {formData.images.length > 0 && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {formData.images.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-md dark:border-gray-700"
                      >
                        <img
                          src={image}
                          alt={t("misc.uploadedImage", { index: index + 1 })}
                          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white opacity-0 transition-all group-hover:opacity-100"
                          aria-label={texts.form.removeImageAria}
                        >
                          <IoClose />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-xl transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting
                    ? texts.form.submitting
                    : isEditing
                    ? texts.form.submitUpdate
                    : texts.form.submitCreate}
                </motion.button>

                {(isEditing || Object.values(formData).some((value) => value)) && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {texts.form.reset}
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="rounded-3xl bg-blue-50/60 p-8 shadow-2xl ring-1 ring-blue-100 dark:bg-gray-900/60 dark:ring-gray-800"
          >
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              {texts.stats.title}
            </h2>
            <p className="mt-1 text-sm text-blue-700/80 dark:text-blue-300/80">
              {texts.stats.subtitle}
            </p>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {texts.stats.totalLabel}
                </p>
                <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-300">
                  {totalProducts}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {texts.stats.favoritesLabel}
                </p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-rose-500">
                  <FaHeart />
                  {favoriteCount}
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white">{texts.stats.tipTitle}</h3>
                <p className="mt-2 text-sm text-blue-100">
                  {texts.stats.tipBody}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {texts.list.title}
            </h2>
            {userProducts.length > 0 && (
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {texts.list.lastUpdated}{" "}
                {new Date(
                  [...userProducts].sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                  )[0].updatedAt
                ).toLocaleString()}
              </p>
            )}
          </div>

          {userProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xl dark:border-gray-700 dark:bg-gray-900">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {texts.list.emptyTitle}
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {texts.list.emptySubtitle}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {userProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all hover:-translate-y-2 dark:bg-gray-900"
                  >
                    <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-800 dark:to-gray-900">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 dark:border-gray-700">
                          {texts.list.noImage}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                            {product.title}
                          </h3>
                          {product.brand && (
                            <p className="text-sm font-medium uppercase tracking-wide text-blue-500">
                              {product.brand}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(product)}
                          className={`flex h-10 w-10 items-center justify-center rounded-full shadow transition-all ${
                            isFavorite(product.id)
                              ? "bg-rose-500 text-white"
                              : "bg-gray-100 text-rose-500 dark:bg-gray-800"
                          }`}
                          aria-label={texts.list.favoriteAria}
                        >
                          <FaHeart />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        ${product.price}
                      </p>

                      <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => handleEditProduct(product)}
                          className="inline-flex items-center gap-2 rounded-full border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 dark:hover:bg-blue-500/10"
                        >
                          <FaRegEdit />
                          {texts.list.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="inline-flex items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <FaTrashAlt />
                          {texts.list.delete}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

