import React, { useEffect, useRef } from 'react';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  HeartHandshake, 
  ShieldCheck, 
  Star, 
  ExternalLink,
  Calendar,
  Phone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clinicInfo } from '../data/clinicData';
import AnimatedButton from './AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

export default function DoctorProfile({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const checklistRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image reveal through clip-path mask
      gsap.fromTo(
        imageFrameRef.current,
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          opacity: 0,
          scale: 1.05
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Heading enters from the left
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -40 },
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

      // Supporting text enters from below
      gsap.fromTo(
        [textRef.current, checklistRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // CTA appears last
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="doctor" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile & Realistic Clinical Atmosphere Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Outer decorative halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-dentist-500 to-tealbrand-400 rounded-3xl blur-lg opacity-25"></div>

              {/* Card Container with clipPath ref */}
              <div 
                ref={imageFrameRef}
                className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100"
              >
                {/* Clinical Photography Header */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85"
                    alt="Clinical Consultation at Shree Dental Care"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-dentist-900 shadow">
                      Consultation Environment
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-extrabold text-white">
                      {clinicInfo.doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-dentist-300">
                      {clinicInfo.doctor.qualifications} • {clinicInfo.doctor.role}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Consultation Fee and Guarantee row */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] text-slate-500 block font-medium">Standard Fee</span>
                      <span className="text-base font-extrabold text-dentist-800">
                        ₹200 – ₹500
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] text-slate-500 block font-medium">Practo Rating</span>
                      <span className="text-base font-extrabold text-amber-500 flex items-center justify-center gap-1">
                        ★ 4.9 <span className="text-xs text-slate-400 font-normal">/ 5</span>
                      </span>
                    </div>
                  </div>

                  {/* Practo CTA button */}
                  <a
                    href={clinicInfo.doctor.practoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-dentist-700 bg-dentist-50 hover:bg-dentist-100 border border-dentist-200 transition-colors"
                  >
                    <span>View Dr. Shrikant Rao on Practo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Clinical Philosophy & Areas of Practice */}
          <div className="lg:col-span-7 space-y-6">
            
            <div ref={headingRef} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dentist-100 text-dentist-800 text-xs font-bold uppercase tracking-wider">
                Meet Your Dental Specialist
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Dr. Shrikant Rao (BDS)
              </h2>
              <p className="text-base font-semibold text-dentist-600">
                Chief Dental Surgeon & Founder at Shree Dental Care, Nigdi-Pradhikaran
              </p>
            </div>

            <div ref={textRef} className="space-y-4">
              <p className="text-slate-600 text-base leading-relaxed">
                Dr. Shrikant Rao is a widely respected dental surgeon in the Pimpri-Chinchwad area, known for his gentle demeanor, immaculate surgical precision, and patient-first ethos. With over a decade of clinical excellence in restorative and aesthetic dentistry, he has treated thousands of patients suffering from acute toothache, cosmetic smile concerns, and complex dental trauma.
              </p>

              {/* Doctor's Philosophy Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-dentist-50/80 border-l-4 border-dentist-600 text-slate-800">
                <p className="text-sm italic font-medium leading-relaxed">
                  "{clinicInfo.doctor.philosophy}"
                </p>
                <div className="mt-2 text-xs font-bold text-dentist-800">
                  — Dr. Shrikant Rao, BDS
                </div>
              </div>
            </div>

            {/* Core Competencies Checklist */}
            <div ref={checklistRef} className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Clinical Specializations:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {clinicInfo.doctor.specializations.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-tealbrand-600 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div ref={ctaRef} className="pt-4 flex flex-wrap items-center gap-3">
              <AnimatedButton
                onClick={onOpenBooking}
                variant="primary"
                size="md"
                iconComponent={Calendar}
              >
                Book Consultation with Dr. Rao
              </AnimatedButton>

              <AnimatedButton
                href={`tel:${clinicInfo.contact.phone.replace(/\s+/g, '')}`}
                variant="secondary"
                size="md"
                iconComponent={Phone}
              >
                Call Clinic Desk
              </AnimatedButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
