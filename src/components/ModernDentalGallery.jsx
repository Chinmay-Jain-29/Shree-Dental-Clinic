import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { X, Maximize2, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { modernDentalGallery } from '../data/dentalImages';

gsap.registerPlugin(Flip);

const filterCategories = [
  "All",
  "General Dentistry",
  "Cosmetic Dentistry",
  "Dental Implants",
  "Orthodontics",
  "Clinic Interior"
];

export default function ModernDentalGallery({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  
  const galleryRef = useRef(null);
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);

  // Filter items based on active category
  const filteredPhotos = modernDentalGallery.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const handleFilterChange = (category) => {
    if (category === selectedCategory) return;

    // Capture current layout state for GSAP Flip
    const state = Flip.getState(gridRef.current.querySelectorAll('.gallery-card'));

    setSelectedCategory(category);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.05,
        fade: true,
        absolute: true,
        onEnter: (elements) => {
          gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
        },
        onLeave: (elements) => {
          gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
        }
      });
    });
  };

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section ref={galleryRef} id="modern-gallery" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Decorative gradient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-dentist-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-tealbrand-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-dentist-300 text-xs font-bold uppercase tracking-wider border border-white/15 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-dentist-400" />
            <span>Visual Tour & Environment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A Glimpse Into Modern Dental Care
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Experience our clinical space, patient-first consultations, and autoclaved surgical operatory designed to deliver relaxed, pain-free dentistry.
          </p>
        </div>

        {/* GSAP Flip Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-dentist-600 text-white shadow-lg shadow-dentist-600/30 ring-1 ring-white/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Premium Masonry-Style Grid with Flip Support */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]"
        >
          {filteredPhotos.map((item, index) => {
            return (
              <div
                key={item.id}
                data-flip-id={item.id}
                onClick={() => openLightbox(index)}
                className={`gallery-card group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-800 shadow-xl border border-white/10 ${item.aspectRatio || 'col-span-1 row-span-1'}`}
              >
                {/* Image with zoom and smooth transition */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Subtle Multi-stage Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 backdrop-blur-md text-white border border-white/20">
                    {item.tag}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover Captions Reveal */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-bold text-dentist-400 uppercase tracking-wide block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-dentist-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-400">
          <span>Click any photograph to view in high-resolution detail.</span>
        </div>

      </div>

      {/* Interactive Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:block cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:block cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Lightbox Image Frame */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Captions and Information */}
            <div className="p-6 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-dentist-500/20 text-dentist-400 border border-dentist-500/30">
                    {activePhoto.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activePhotoIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mt-1">
                  {activePhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {activePhoto.description}
                </p>
              </div>

              <button
                onClick={() => {
                  closeLightbox();
                  onOpenBooking(activePhoto.title);
                }}
                className="shrink-0 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-dentist-600 hover:bg-dentist-700 shadow-md transition-colors cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
