import React, { useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Crown, 
  Anchor, 
  Scissors, 
  HeartPulse, 
  Clock, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { treatments, clinicInfo } from '../data/clinicData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  Crown: Crown,
  Anchor: Anchor,
  Scissors: Scissors,
  HeartPulse: HeartPulse,
};

export default function Services({ onSelectTreatmentForBooking }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      // Section heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Staggered service cards reveal
      gsap.fromTo(
        cardsRef.current,
        { 
          opacity: 0, 
          y: isDesktop ? 45 : 25, 
          scale: isDesktop ? 0.95 : 0.98 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: isDesktop ? 0.8 : 0.6,
          stagger: isDesktop ? 0.12 : 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-dentist-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
            <span>Specialized Clinical Treatments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Dental Care by Dr. Shrikant Rao
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            Every procedure is carried out with computerized diagnostics, strict sterilization protocols, and a primary objective to preserve your natural smile.
          </p>
        </div>

        {/* 6 Image-Based Treatment Cards Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {treatments.map((treatment, idx) => {
            const Icon = iconMap[treatment.icon] || ShieldCheck;
            return (
              <div
                key={treatment.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Large Treatment Image with Hover Zoom */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-dentist-900 shadow-sm">
                        {treatment.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-dentist-600/90 backdrop-blur-md text-white shadow-sm">
                        {treatment.badge}
                      </span>
                    </div>

                    {/* Bottom Category Cue on Image */}
                    <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2 text-white">
                      <div className="p-1.5 rounded-lg bg-dentist-600/80 backdrop-blur-md">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold tracking-wide drop-shadow-sm">
                        {treatment.duration}
                      </span>
                    </div>
                  </div>

                  {/* Text Details & Clinical Highlights */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-dentist-700 transition-colors leading-snug">
                        {treatment.title}
                      </h3>
                      <p className="text-xs font-semibold text-dentist-600 mt-1">
                        {treatment.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {treatment.description}
                    </p>

                    {/* Key Checklist Benefits */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {treatment.benefits.slice(0, 3).map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-tealbrand-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Comfort Level Badge */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Comfort:</span>
                      <span className="font-bold text-tealbrand-700">{treatment.painLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button on Hover */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => onSelectTreatmentForBooking(treatment.title)}
                    className="w-full inline-flex items-center justify-between py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-dentist-600 hover:bg-dentist-700 shadow-md shadow-dentist-600/20 group/btn transition-all cursor-pointer"
                  >
                    <span>Explore Treatment & Consult</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Doctor Philosophy Card underneath treatments */}
        <div className="mt-14 sm:mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-dentist-50 text-dentist-600 flex items-center justify-center shrink-0 border border-dentist-100">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Transparent Initial Consultation Fee: ₹200 – ₹500
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Includes physical oral examination, digital symptom assessment, and honest treatment advice by Dr. Shrikant Rao (BDS).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onSelectTreatmentForBooking("General Dental Checkup & Consultation")}
              className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow transition-colors cursor-pointer text-center"
            >
              Book Examination Slot
            </button>
            <a
              href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
                "Hello Dr. Shrikant Rao, I would like to consult regarding a dental procedure at Shree Dental Care."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
