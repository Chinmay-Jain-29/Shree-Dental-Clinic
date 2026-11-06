import React, { useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight, 
  Award, 
  CheckCircle, 
  MessageSquare
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clinicInfo } from '../data/clinicData';
import AnimatedButton from './AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenBooking, introFinished }) {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const wordsRef = useRef([]);
  const descRef = useRef(null);
  const checklistRef = useRef(null);
  const ctaRef = useRef(null);
  const reviewsRef = useRef(null);
  const photoCardRef = useRef(null);
  const photoImgRef = useRef(null);
  const floatingBadge1Ref = useRef(null);
  const floatingBadge2Ref = useRef(null);
  const statsRef = useRef(null);

  const headlineWords = ["A", "Healthier", "Smile", "Starts", "With", "The", "Right", "Care."];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      if (prefersReducedMotion) {
        gsap.set([badgeRef.current, descRef.current, checklistRef.current, ctaRef.current, reviewsRef.current, photoCardRef.current, statsRef.current], { opacity: 1, y: 0 });
        gsap.set(wordsRef.current, { y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        delay: introFinished ? 0.05 : 0.2
      });

      // 1. Badge slide in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )

      // 2. Word-by-word heading reveal
      .fromTo(
        wordsRef.current,
        { y: isDesktop ? '110%' : '50%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1, 
          duration: isDesktop ? 0.7 : 0.5, 
          stagger: isDesktop ? 0.05 : 0.03, 
          ease: 'power3.out' 
        },
        '-=0.25'
      )

      // 3. Description & Checklist
      .fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        checklistRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        '-=0.25'
      )

      // 4. CTA buttons entrance
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        reviewsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.15'
      )

      // 5. Main Photograph Entrance
      .fromTo(
        photoCardRef.current,
        { 
          clipPath: isDesktop ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 0,
          y: 25
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          y: 0,
          duration: isDesktop ? 1.0 : 0.6,
          ease: 'power3.out'
        },
        '-=0.6'
      );

      // Desktop only subtle parallax and badge floating
      if (isDesktop) {
        tl.fromTo(
          photoImgRef.current,
          { scale: 1.12 },
          { scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.9'
        )
        .fromTo(
          [floatingBadge1Ref.current, floatingBadge2Ref.current],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.4'
        );

        gsap.to(photoCardRef.current, {
          y: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to(floatingBadge1Ref.current, {
          y: -6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Stats row reveal
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );
    });

    return () => mm.revert();
  }, [introFinished]);

  const whatsappUrl = `https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
    "Hello Dr. Shrikant Rao, I would like to inquire about an appointment at Shree Dental Care in Nigdi-Pradhikaran."
  )}`;

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-6 pb-16 lg:pt-14 lg:pb-24 subtle-gradient">
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-dentist-200/40 via-tealbrand-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clinic Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Top Pill / Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dentist-50 border border-dentist-200/80 text-dentist-800 text-xs sm:text-sm font-semibold shadow-xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-dentist-600 animate-pulse shrink-0"></span>
              <span>Nigdi-Pradhikaran’s Trusted Family Dental Clinic</span>
              <span className="hidden sm:inline text-dentist-400">•</span>
              <span className="hidden sm:inline text-dentist-600 font-bold">Sector 27 (Royal Arcade)</span>
            </div>

            {/* Main Headline with Word-by-Word overflow hidden reveal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden mr-1.5 sm:mr-3">
                  <span
                    ref={(el) => (wordsRef.current[idx] = el)}
                    className="inline-block"
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Sub-headline */}
            <p 
              ref={descRef}
              className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Led by <span className="font-semibold text-slate-900">Dr. Shrikant Rao (BDS)</span>, 
              Shree Dental Care delivers conservative, pain-managed dental solutions—from single-visit root canals to radiant smile makeovers and permanent dental implants.
            </p>

            {/* Trust Bullet Grid */}
            <div 
              ref={checklistRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 pb-1 max-w-xl mx-auto lg:mx-0 text-left"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>Virtually Painless RCT</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>Sterile Class-B</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>Fee: ₹200–₹500</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>Digital Diagnostics</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>12 PM – 8 PM</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>Practo Verified</span>
              </div>
            </div>

            {/* CTAs Group using AnimatedButton */}
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <AnimatedButton
                onClick={onOpenBooking}
                variant="primary"
                size="lg"
                iconComponent={Calendar}
                className="w-full sm:w-auto"
              >
                Book Doctor Appointment
              </AnimatedButton>

              <AnimatedButton
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                iconComponent={MessageSquare}
                className="w-full sm:w-auto"
              >
                WhatsApp Query
              </AnimatedButton>

              <AnimatedButton
                href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`}
                variant="secondary"
                size="lg"
                iconComponent={Phone}
                className="w-full sm:w-auto"
              >
                {clinicInfo.contact.phone}
              </AnimatedButton>
            </div>

            {/* Quick Location & Rating Cue */}
            <div 
              ref={reviewsRef}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-500"
            >
              <div className="flex items-center gap-1 text-amber-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-800 ml-1">4.9 / 5.0</span>
                <span className="text-slate-400">(Practo & Google)</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-dentist-600" />
                <span>Sector 27 Pradhikaran</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Photographic Card & Doctor Identity */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            
            {/* Main Visual Card with clip-path animated entrance */}
            <div 
              ref={photoCardRef}
              className="relative mx-auto max-w-md bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100"
            >
              {/* High-Resolution Professional Dental Operatory & Consultation Photography */}
              <div className="relative aspect-16/11 w-full overflow-hidden bg-slate-900">
                <img
                  ref={photoImgRef}
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85"
                  alt="Modern Dental Operatory at Shree Dental Care"
                  className="w-full h-full object-cover object-center"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-dentist-800 shadow">
                    Pradhikaran, Nigdi
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Open Mon–Sat 12 PM – 8 PM
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Shree Dental Care • Modern Operatory
                  </h3>
                </div>
              </div>

              {/* Doctor Details Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {clinicInfo.doctor.name}
                    </h2>
                    <p className="text-xs font-bold text-dentist-700">
                      {clinicInfo.doctor.qualifications} • {clinicInfo.doctor.role}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {clinicInfo.doctor.experience}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shrink-0">
                    Practo Verified
                  </span>
                </div>

                {/* Consultation Details */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium block">Consultation Fee</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {clinicInfo.doctor.consultationFee}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium block">Rating</span>
                    <span className="text-sm font-extrabold text-amber-500">
                      ★ 4.9 / 5.0
                    </span>
                  </div>
                </div>

                {/* Quick Action Button */}
                <AnimatedButton
                  onClick={onOpenBooking}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  Reserve Consultation Slot
                </AnimatedButton>

                <div className="text-center">
                  <a 
                    href={clinicInfo.contact.directionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-dentist-600 inline-flex items-center gap-1 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-dentist-500" />
                    <span>Shop No. 2, Royal Arcade, Pradhikaran</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Floating Trust Badge (Desktop Only) */}
            <div 
              ref={floatingBadge1Ref}
              className="hidden lg:flex items-center gap-3 absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-slate-100 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                ★ 4.9
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800">Top Rated in Nigdi</p>
                <p className="text-slate-500">350+ Satisfied Patients</p>
              </div>
            </div>

            {/* Floating Sterilization Pill (Desktop Only) */}
            <div 
              ref={floatingBadge2Ref}
              className="hidden lg:flex items-center gap-2 absolute -top-4 -right-3 bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl shadow-lg border border-slate-100 text-xs font-semibold text-slate-700 z-20"
            >
              <ShieldCheck className="w-4 h-4 text-tealbrand-600" />
              <span>100% Sterile Class-B Autoclave</span>
            </div>

          </div>

        </div>

        {/* Highlight Stats Row */}
        <div 
          ref={statsRef}
          className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6"
        >
          {clinicInfo.highlights.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center sm:text-left"
            >
              <div className="text-xl sm:text-3xl font-extrabold text-dentist-700 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
