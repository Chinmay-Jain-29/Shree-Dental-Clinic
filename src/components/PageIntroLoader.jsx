import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageIntroLoader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fail-safe: ensure loader is removed after 1.2s maximum no matter what
    const safetyTimeout = setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 1200);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      clearTimeout(safetyTimeout);
      setIsDone(true);
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimeout);
          setIsDone(true);
          onComplete?.();
        }
      });

      // 1. Initial State
      gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 8 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

      // 2. Quick Reveal
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out'
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out'
      }, '-=0.15')

      // 3. Turquoise Line Progress
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.35,
        ease: 'power2.inOut'
      })

      // 4. Smooth Exit
      .to(containerRef.current, {
        opacity: 0,
        yPercent: -100,
        duration: 0.45,
        ease: 'power3.inOut'
      }, '+=0.05');

    }, containerRef);

    return () => {
      clearTimeout(safetyTimeout);
      ctx.revert();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none pointer-events-none transition-opacity duration-300"
    >
      <div className="flex flex-col items-center text-center px-4 max-w-sm">
        {/* Clinic Logo Icon */}
        <div
          ref={logoRef}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-dentist-600 to-tealbrand-500 flex items-center justify-center text-white shadow-lg shadow-dentist-500/25 mb-3"
        >
          <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7 2 4 5 4 10c0 4 2 8 4 12 1-3 2-5 4-5s3 2 4 5c2-4 4-8 4-12 0-5-3-8-8-8z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v6" />
          </svg>
        </div>

        {/* Brand Name */}
        <div ref={textRef} className="space-y-1">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Shree Dental Care
          </h1>
          <p className="text-[11px] font-semibold text-dentist-600 tracking-wider uppercase">
            Dr. Shrikant Rao (BDS) • Nigdi-Pradhikaran
          </p>
        </div>

        {/* Thin Turquoise Loading Line */}
        <div className="w-40 h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
          <div
            ref={lineRef}
            className="w-full h-full bg-gradient-to-r from-dentist-500 to-tealbrand-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
