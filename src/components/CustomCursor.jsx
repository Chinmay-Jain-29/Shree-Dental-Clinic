import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      // Direct positioning for instant dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out'
      });

      // Smooth lag follower
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out'
      });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(follower, {
        scale: 2.2,
        backgroundColor: 'rgba(14, 165, 233, 0.15)',
        borderColor: 'rgba(14, 165, 233, 0.6)',
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: 0.6,
        duration: 0.2
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(14, 165, 233, 0.4)',
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Attach hover listeners to buttons, links, inputs
    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [data-interactive="true"]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-dentist-600 pointer-events-none z-50 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />
      {/* Fluid outer ring follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-dentist-500/40 pointer-events-none z-50 transition-opacity duration-300 backdrop-blur-[0.5px]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}

