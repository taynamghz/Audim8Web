'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

export default function TryDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Animate elements
    tl.fromTo(
      '.demo-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleTryDemo = () => {
    router.push('/demo');
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#0A0F1C] relative overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F1C]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center demo-content">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Experience Audimate?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Try our demo and see how Audimate can transform your audio production workflow.
          </p>
          <button
            onClick={handleTryDemo}
            className="bg-white text-[#0A0F1C] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Try Demo
          </button>
        </div>
      </div>
    </section>
  );
} 