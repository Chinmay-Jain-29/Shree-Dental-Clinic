import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { dentalCategories } from '../data/dentalImages';

export default function DentalCategoriesSection({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal animation
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="explore-categories" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-dentist-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-tealbrand-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dentist-50 text-dentist-700 text-xs font-bold uppercase tracking-wider border border-dentist-200">
            <Sparkles className="w-3.5 h-3.5 text-dentist-600" />
            <span>Comprehensive Dental Spectrum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore the World of Dental Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Delivering precision healthcare through advanced modern dental techniques, compassionate clinical consultations, and state-of-the-art operatory technology.
          </p>
        </div>

        {/* 8 Dental Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dentalCategories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with subtle gradient & hover zoom */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-dentist-800 shadow-sm">
                    {category.badge}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-dentist-600 uppercase tracking-wide block">
                      {category.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-dentist-700 transition-colors mt-0.5">
                      {category.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {category.description}
                  </p>

                  {/* Highlights Bullet Checklist */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {category.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-tealbrand-600 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2">
                <button
                  onClick={() => onOpenBooking(category.title)}
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-bold text-dentist-700 bg-dentist-50 hover:bg-dentist-600 hover:text-white transition-all duration-200 group/btn"
                >
                  <span>Explore & Consult</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

