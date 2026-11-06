import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight,
  Camera,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { clinicInfo } from '../data/clinicData';
import AnimatedButton from './AnimatedButton';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if clinic is open right now (Mon-Sat, 12 PM - 8 PM IST)
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hour = now.getHours();

      // Open Mon (1) to Sat (6), 12:00 to 20:00
      if (day >= 1 && day <= 6 && hour >= 12 && hour < 20) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkOpenStatus();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Treatments", href: "#services" },
    { name: "Explore Care", href: "#explore-categories" },
    { name: "Gallery", href: "#modern-gallery", icon: Camera },
    { name: "About Dr. Rao", href: "#doctor" },
    { name: "Smile Results", href: "#smile-gallery" },
    { name: "Timings & Map", href: "#location" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification / Urgency Bar */}
      <div className="bg-gradient-to-r from-dentist-950 via-dentist-900 to-slate-900 text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-dentist-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Status & Hours */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              {isOpenNow ? 'Open Now (12 PM – 8 PM)' : 'Opens at 12 PM (Mon–Sat)'}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-dentist-400" />
              Sec 27, Pradhikaran, Nigdi
            </span>
          </div>

          {/* Quick Contact & Practo Info */}
          <div className="flex items-center gap-4 text-xs sm:text-sm ml-auto">
            <a 
              href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 font-medium text-dentist-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-dentist-400" />
              <span className="hidden sm:inline">Emergency / Call:</span>
              <span className="font-bold text-white">{clinicInfo.contact.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-amber-300/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Practo Verified Clinic
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Doctor Subtitle */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-dentist-600 to-tealbrand-500 flex items-center justify-center text-white shadow-md shadow-dentist-500/20 group-hover:scale-105 transition-transform shrink-0">
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7 2 4 5 4 10c0 4 2 8 4 12 1-3 2-5 4-5s3 2 4 5c2-4 4-8 4-12 0-5-3-8-8-8z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v6" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-dentist-700 transition-colors">
                  Shree Dental Care
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-dentist-600 tracking-wide uppercase">
                {clinicInfo.doctor.name} <span className="text-slate-600 font-normal">({clinicInfo.doctor.qualifications})</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-dentist-600 transition-colors flex items-center gap-1 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-dentist-600 hover:after:w-full after:transition-all"
              >
                {link.icon && <link.icon className="w-3.5 h-3.5 text-dentist-500" />}
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <AnimatedButton
              onClick={onOpenBooking}
              variant="primary"
              size="sm"
              iconComponent={Calendar}
            >
              Book Appointment
            </AnimatedButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Animated Full-Screen / Large Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] z-50 bg-slate-950/60 backdrop-blur-md transition-all animate-in fade-in duration-200">
          <div className="bg-white w-full max-h-[calc(100vh-90px)] overflow-y-auto px-6 py-6 shadow-2xl border-b border-slate-200 animate-in slide-in-from-top-4 duration-300">
            
            <div className="flex flex-col divide-y divide-slate-100 text-base font-semibold text-slate-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3.5 flex items-center justify-between hover:text-dentist-600 active:text-dentist-700 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    {link.icon && <link.icon className="w-4 h-4 text-dentist-600" />}
                    <span>{link.name}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Action CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-dentist-600 hover:bg-dentist-700 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment (₹200–₹500)</span>
              </button>

              <a
                href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded-2xl font-semibold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-dentist-600" />
                <span>Call Clinic Desk ({clinicInfo.contact.phone})</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
