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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

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
    router.push('/demo'); // Navigate to the demo page
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[linear-gradient(to_bottom,_#0f2a39_0%,_#0f2a39_5%,_white_30%,_white_100%)] overflow-hidden"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl w-full text-center demo-content">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#e84b35] mb-10 leading-tight">
            Ready to Experience Audimate?
          </h2>
          <p className="text-2xl sm:text-3xl text-[#0f2a39] mb-14 font-medium">
            Try our demo and see how Audimate can transform your audio production workflow.
          </p>
          <button
            onClick={handleTryDemo}
            className="px-10 py-5 text-xl sm:text-2xl font-bold text-white bg-[#e84b35] rounded-full shadow-lg hover:bg-[#d13e2c] hover:scale-105 transition-all duration-300 ease-in-out"
          >
            🚀 Try Demo
          </button>
        </div>
      </div>
    </section>
  );
}
