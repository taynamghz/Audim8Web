'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          end: 'bottom top',
          scrub: 0.5,
        },
        y: 50,
        opacity: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="w-full h-screen relative bg-white z-50"
    >
      <div className="absolute inset-0 bg-white z-50"></div>
      <div className="absolute bottom-8 left-8 z-50">
        <h1 className="text-[#001f3f] text-8xl font-bold">AUDIMATE</h1>
      </div>
    </footer>
  );
} 