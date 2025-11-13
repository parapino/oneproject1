import React, { useEffect, useState } from "react";
import ImageModal from "../ImageModal";

export default function GalleryOne() {
  const [mounted, setMounted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Unique IT/market images
  const images = [
    {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      alt: "Online Shopping Woman",
      desc: "A modern woman shopping online, representing the future of digital commerce.",
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      alt: "Product Showcase",
      desc: "Showcase your products with stunning visuals and details.",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      alt: "Digital Marketing",
      desc: "Reach your audience with powerful digital marketing strategies.",
    },
    {
      src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      alt: "Fast Delivery",
      desc: "Fast and reliable delivery for all your orders.",
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      alt: "Woman in IT Workspace",
      desc: "A confident woman working in a modern IT workspace, symbolizing innovation and diversity.",
    },
    {
      src: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80",
      alt: "Customer Experience",
      desc: "Exceptional customer experience from browsing to delivery.",
    },
  ];

  const handleImageClick = (index) => {
    if (index >= 0 && index < images.length) {
      setSelectedImageIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
    }, 300);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper for tilt effect (only hover, no click)
  function handleMouseMove(e, idx) {
    const card = document.getElementById(`gallery-card-${idx}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  }
  function handleMouseLeave(idx) {
    const card = document.getElementById(`gallery-card-${idx}`);
    if (card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  }

  const handleCardClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    // Tilt effektini to'xtatish
    handleMouseLeave(idx);
    // Modal ochish
    handleImageClick(idx);
  };

  // Yangicha: har bir karta bosilmaydi (pointer-events: none), hoverda faqat tilt va animatsiya
  // Yangicha: har bir karta ustida "NEW" badge, pastida progress bar, fon animatsiyasi, shadow glow
  return (
    <section className="text-gray-700 dark:text-gray-200 body-font bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="container px-6 py-24 mx-auto">
        {/* Title */}
        <div className="flex w-full mb-20 flex-wrap items-center justify-between">
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <h1 className="sm:text-4xl text-3xl font-extrabold title-font text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 animate-gradient-move">
              IT Market Trends & Innovations
            </h1>
            <div className="mt-3 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
          <p className="lg:pl-10 lg:w-2/3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Discover the future of technology, digital marketing, and IT solutions.
            Explore products and teams shaping tomorrow's market.
          </p>
        </div>

        {/* Unique grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div
              key={img.alt}
              id={`gallery-card-${idx}`}
              className={`relative group overflow-hidden rounded-3xl shadow-2xl border-4 border-transparent bg-gradient-to-br from-blue-100 via-purple-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } animate-float`}
              style={{
                transitionDelay: `${idx * 120}ms`,
                cursor: "pointer",
                boxShadow: "0 0 32px 0 rgba(80,0,200,0.15), 0 0 0 4px #a78bfa33",
              }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={(e) => handleCardClick(e, idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleImageClick(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.alt} in fullscreen`}
            >
              <div className="absolute inset-0 z-0 pointer-events-none animate-gradient-border"></div>
                <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover object-center rounded-2xl transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                loading="lazy"
                draggable={false}
                style={{ userSelect: "none" }}
              />
              {/* Yangicha progress bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                <div className="w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
              {/* NEW badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-xl shadow-lg font-bold text-xs animate-bounce">
                NEW
              </div>
              <div className="absolute top-4 left-4 bg-white/80 dark:bg-gray-900/80 px-3 py-1 rounded-xl shadow-lg">
                <span className="text-blue-600 dark:text-purple-400 font-bold text-base">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="w-full flex justify-center mt-12">
          <a
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        images={images}
        currentIndex={selectedImageIndex !== null ? selectedImageIndex : 0}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
