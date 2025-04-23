'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const headerButtonsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch(error => console.log("Video play failed:", error));
    }
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current && isVideoPlaying) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observerRef.current.observe(heroRef.current);
    return () => observerRef.current?.disconnect();
  }, [isVideoPlaying]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 1.5,
        onComplete: () => {
          setShowContent(true);
          gsap.to(backgroundRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setShowLanding(false),
          });
          window.scrollTo(0, 0);
        },
      });

      tl.to(logoRef.current, { rotation: 360, duration: 2, ease: "linear" }, 0);
      tl.to(overlayRef.current, {
        scale: 30,
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        transformOrigin: "center center",
        backgroundColor: "#e84b35",
      }, 0);
      tl.to(logoRef.current, { scale: 30, duration: 1, ease: "power4.inOut" }, 0);
      tl.to(whiteOverlayRef.current, {
        x: '0%',
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5");
      tl.to(headerLogoRef.current, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.5");
      tl.to(headerButtonsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {showLanding && (
        <section className="fixed inset-0 z-50">
          <div ref={backgroundRef} className="absolute inset-0 flex items-center justify-center bg-white">
            <div ref={logoRef} className="w-32 h-32 relative">
              <Image src="/images/lgoo.png" alt="Audimate Logo" fill className="object-contain" priority />
            </div>
            <div ref={overlayRef} className="absolute w-32 h-32 opacity-0" style={{ transformOrigin: 'center center' }} />
            <div ref={whiteOverlayRef} className="absolute inset-0 overflow-hidden transform translate-x-full bg-white">
              <video
                ref={videoRef}
                className="w-full h-full object-contain sm:object-cover sm:bg-white"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                onClick={handlePlayVideo}
              >
                <source src="/images/audimate-exp-v0.mp4" type="video/mp4" />
              </video>
            </div>
            <div ref={headerLogoRef} className="absolute top-4 left-4 w-24 h-24 opacity-0">
              <Image src="/images/lgoo.png" alt="Audimate Logo" fill className="object-contain" priority />
            </div>
            <div
              ref={headerButtonsRef}
              className="absolute top-4 right-4 flex space-x-8 opacity-0 transform translate-x-full"
            >
              {['About', 'Team', 'Try Demo'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-lg hover:scale-110 cursor-pointer relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {showContent && (
        <div className="relative">
          <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-2 py-1 bg-white/10 backdrop-blur-sm">
            <div className="w-24 h-24 relative">
              <Image src="/images/lgoo.png" alt="Audimate Logo" fill className="object-contain" priority />
            </div>
            <div className="flex space-x-6">
              {['About', 'Team', 'Try Demo'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-base hover:scale-110 cursor-pointer relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </header>

          <div className="fixed inset-0 -z-10 bg-white">
            <video className="w-full h-full object-contain sm:object-cover sm:bg-white" loop muted playsInline autoPlay preload="auto">
              <source src="/images/audimate-exp-v3.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="h-screen" />

          <section className="relative bg-gradient-to-b from-[#e84b35] to-white">
            <div className="flex flex-col items-center justify-center text-center px-4 py-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#0f2a39]">AI-Powered Casting Assistant</h1>
              <h2 className="text-2xl md:text-3xl mb-6 text-[#0f2a39]">for Saudi Film Industry</h2>
              <button
                onClick={scrollToHowItWorks}
                className="px-8 py-3 bg-white text-lg font-semibold text-[#e84b35] rounded-full transition-colors duration-300 hover:bg-[#fabd96] hover:text-[#0f2a39] hover:border hover:border-[#0f2a39]"
              >
                How It Works
              </button>
            </div>
            <div ref={howItWorksRef}></div>
          </section>
        </div>
      )}
    </>
  );
}
