import React, { useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Heart,
  ChevronRight,
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clinicInfo, treatments } from '../data/clinicData';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onOpenBooking }) {
  const footerRef = useRef(null);
  const colsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        colsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Clinic Bio */}
          <div ref={(el) => (colsRef.current[0] = el)} className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dentist-500 to-tealbrand-400 flex items-center justify-center text-white font-bold shadow-md">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7 2 4 5 4 10c0 4 2 8 4 12 1-3 2-5 4-5s3 2 4 5c2-4 4-8 4-12 0-5-3-8-8-8z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Shree Dental Care
                </span>
                <p className="text-xs font-semibold text-dentist-400">
                  {clinicInfo.doctor.name} ({clinicInfo.doctor.qualifications})
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Premier dental clinic in Nigdi-Pradhikaran, PCMC. Committed to conservative dentistry, zero-pain root canals, high-precision implants, and natural cosmetic smile designing.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Class B Autoclave 100% Sterile Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-dentist-400 shrink-0" />
                <span>Consultation Fee: {clinicInfo.doctor.consultationFee}</span>
              </div>
            </div>
          </div>

          {/* Key Treatments */}
          <div ref={(el) => (colsRef.current[1] = el)} className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {treatments.map((t) => (
                <li key={t.id}>
                  <a 
                    href="#services" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-dentist-500 group-hover:translate-x-0.5 transition-transform" />
                    <span>{t.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Timings */}
          <div ref={(el) => (colsRef.current[2] = el)} className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#doctor" className="hover:text-white transition-colors">About Dr. Rao</a>
              </li>
              <li>
                <a href="#modern-gallery" className="hover:text-white transition-colors">Clinic Gallery</a>
              </li>
              <li>
                <a href="#smile-gallery" className="hover:text-white transition-colors">Smile Results</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Patient Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Location & Hours</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a 
                  href={clinicInfo.doctor.practoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-dentist-400 flex items-center gap-1 text-amber-300 font-semibold pt-1"
                >
                  <span>Practo Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div ref={(el) => (colsRef.current[3] = el)} className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinic Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-dentist-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">{clinicInfo.contact.address.shop}</p>
                  <p>{clinicInfo.contact.address.landmark}</p>
                  <p>{clinicInfo.contact.address.sector}, {clinicInfo.contact.address.area}</p>
                  <p>{clinicInfo.contact.address.city} - {clinicInfo.contact.address.pincode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-dentist-400 shrink-0" />
                <a 
                  href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`} 
                  className="text-white font-bold hover:text-dentist-300 transition-colors"
                >
                  {clinicInfo.contact.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-dentist-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">Mon – Sat: 12:00 PM – 8:00 PM</p>
                  <p className="text-red-400">Sunday: Closed</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-dentist-600 hover:bg-dentist-700 transition-colors text-center cursor-pointer"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright with Smooth Scroll-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Shree Dental Care (Dr. Shrikant Rao, BDS). All Rights Reserved.
          </p>

          {/* Smooth Scroll-To-Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all group cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <p className="text-center sm:text-right text-[11px] max-w-md">
            Medical Disclaimer: Content is provided for informational and appointment scheduling convenience. A physical clinical examination is essential for diagnosis.
          </p>
        </div>

      </div>
    </footer>
  );
}
