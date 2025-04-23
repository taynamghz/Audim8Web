'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function LoadingScreen() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo spin animation
      const spin = gsap.to(logoRef.current, {
        rotation: 360,
        duration: 2,
        ease: "none",
      });

      // Set timeout to hide loading screen after 2 seconds
      setTimeout(() => {
        gsap.to(logoRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setIsVisible(false)
        });
      }, 2000);

      return () => {
        spin.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div ref={logoRef} className="w-32 h-32 relative">
        <Image
          src="/images/logo2.png"
          alt="Audimate Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
