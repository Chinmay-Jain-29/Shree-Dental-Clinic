import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, HeartHandshake, Eye, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const hygieneProtocols = [
  {
    title: "Class-B Autoclave Sterilization",
    desc: "Hospital-grade vacuum autoclaving kills 100% of bacterial and viral spores on all surgical instruments.",
    icon: ShieldCheck
  },
  {
    title: "Sealed Pouches Opened Before You",
    desc: "Each examination instrument set is sealed in sterile pouches and unsealed directly in front of the patient.",
    icon: Eye
  },
  {
    title: "Gentle Anesthesia & Topical Numbing",
    desc: "Pain-free dentistry is our standard. Topical numbing gel is applied prior to any injection to prevent stinging.",
    icon: HeartHandshake
  },
  {
    title: "Ultra-Low Radiation Digital X-Ray (RVG)",
    desc: "Sensor-based instant digital imaging with up to 90% less radiation exposure than conventional dental films.",
    icon: Sparkles
  }
];

export default function SterilizationAndHygiene({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
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

      // Left column slide-in
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: isDesktop ? -35 : -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Feature cards staggered entrance
      gsap.fromTo(
        cardsRef.current,
        { 
          opacity: 0, 
          x: isDesktop ? 30 : 0, 
          y: isDesktop ? 0 : 20 
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-24 bg-gradient-to-r from-dentist-950 via-dentist-900 to-slate-900 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div ref={leftColRef} className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-800/80 text-dentist-300 text-xs font-bold uppercase tracking-wider border border-dentist-700/60">
              <Award className="w-3.5 h-3.5 text-dentist-400" />
              <span>Hospital-Grade Safety Standards</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Safety & Comfort Are Never Compromised.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              At Shree Dental Care in Nigdi-Pradhikaran, we adhere to strict international multi-step sterilization protocols. Our clinic is designed to be calm, clean, and anxiety-free for children and adults alike.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-lg transition-all cursor-pointer"
              >
                <span>Schedule a Safe Visit</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hygieneProtocols.map((protocol, index) => {
              const ProtocolIcon = protocol.icon;
              return (
                <div 
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-dentist-500/40 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-dentist-600/30 text-dentist-300 border border-dentist-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ProtocolIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {protocol.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {protocol.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
