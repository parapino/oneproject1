import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function ImageModal({ isOpen, images, currentIndex, onClose, onNext, onPrev }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      // Body scroll ni to'xtatish
      document.body.style.overflow = "hidden";
      // Navbar va boshqa fixed elementlarni yashirish
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.display = 'none';
      }
    } else {
      document.body.style.overflow = "unset";
      // Navbar ni qayta ko'rsatish
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.display = '';
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  const validIndex = currentIndex !== null && currentIndex !== undefined ? currentIndex : 0;
  const currentImage = images[validIndex];
  if (!currentImage) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 flex items-center justify-center"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 999999,
            margin: 0,
            padding: 0,
            width: '100vw',
            height: '100vh'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[9999999] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-xl transition-all duration-200 hover:scale-110"
            aria-label={t("imageModal.close")}
          >
            <IoClose />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-4 z-[9999999] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-xl transition-all duration-200 hover:scale-110"
                aria-label={t("imageModal.prev")}
              >
                <IoChevronBack />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-4 z-[9999999] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-xl transition-all duration-200 hover:scale-110"
                aria-label={t("imageModal.next")}
              >
                <IoChevronForward />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 z-[9999999] bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              {validIndex + 1} / {images.length}
            </div>
          )}

          {/* Image */}
          <motion.div
            key={validIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full flex items-center justify-center"
            style={{ width: '100vw', height: '100vh', padding: '2rem' }}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt || currentImage.title || "Gallery Image"}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
            />
            {/* Image Info */}
            {(currentImage.alt || currentImage.title || currentImage.desc) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-xl max-w-2xl text-center z-[9999999]"
              >
                {currentImage.title && (
                  <h3 className="text-xl font-bold mb-1">{currentImage.title}</h3>
                )}
                {currentImage.alt && !currentImage.title && (
                  <h3 className="text-xl font-bold mb-1">{currentImage.alt}</h3>
                )}
                {currentImage.desc && (
                  <p className="text-sm text-gray-300">{currentImage.desc}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal orqali render qilish - body ga to'g'ridan-to'g'ri
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}

