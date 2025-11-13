import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageModal from "../ImageModal";

export default function GalleryTwo() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      title: "Modern Workspace"
    },
    {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      title: "Tech Conference"
    },
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      title: "Startup Team"
    },
    {
      src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      title: "Coding Session"
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      title: "Digital Marketing"
    },
    {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      title: "IT Solutions"
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleImageClick = (index) => {
    if (index >= 0 && index < galleryItems.length) {
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
    setSelectedImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Helper for tilt effect (only hover, no click)
  function handleMouseMove(e, idx) {
    const card = document.getElementById(`gallerytwo-card-${idx}`);
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
    const card = document.getElementById(`gallerytwo-card-${idx}`);
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

  return (
    <section className="text-gray-700 dark:text-gray-200 body-font bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="container px-6 py-24 mx-auto">
        {/* Title + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="sm:text-4xl text-3xl font-extrabold title-font text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              Our Exclusive Collection
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              Browse carefully curated products designed to bring style and comfort to your lifestyle.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
          >
            Go to Home
          </button>
        </div>

        {/* Gallery grid */}
        <div className="flex flex-wrap -m-4">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="lg:w-1/3 sm:w-1/2 p-4"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div
                id={`gallerytwo-card-${index}`}
                className={`relative overflow-hidden rounded-2xl shadow-lg group transform transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  cursor: "pointer",
                  boxShadow: "0 0 32px 0 rgba(80,0,200,0.15), 0 0 0 4px #a78bfa33",
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={(e) => handleCardClick(e, index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleImageClick(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title} in fullscreen`}
              >
                <img
                  alt={item.title}
                  className="w-full h-72 object-cover object-center transform transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1 animate-float"
                  src={item.src}
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
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        images={galleryItems}
        currentIndex={selectedImageIndex !== null ? selectedImageIndex : 0}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
