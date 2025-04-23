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

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch(error => {
          console.log("Video play failed:", error);
        });
    }
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Pause play video based on visibility
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

  // Logo spin and background transition animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 1.5, // Slightly reduced delay for faster transition
        onComplete: () => {
          setShowContent(true);
          // Fade out landing section
          gsap.to(backgroundRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setShowLanding(false)
          });
          // Scroll to top of the page
          window.scrollTo(0, 0);
        }
      });

      // Logo spin animation for 2 seconds
      tl.to(logoRef.current, {
        rotation: 360, // Spin 360 degrees
        duration: 2,   // 2 seconds duration
        ease: "linear"
      }, 0);

      // Zoom-out and color transition for 1 second, with the theme orange
      tl.to(overlayRef.current, {
        scale: 30,
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        transformOrigin: "center center",
        backgroundColor: "#e84b35" // Orange color for the theme
      }, 0);

      tl.to(logoRef.current, {
        scale: 30,
        duration: 1,
        ease: "power4.inOut"
      }, 0);

      // Slide in the video overlay from the right side
      tl.to(whiteOverlayRef.current, {
        x: '0%',
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5");

      // Fade in header logo and slide in white overlay
      tl.to(headerLogoRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.5");

      // Fade in header buttons
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
      {/* Landing section with video */}
      {showLanding && (
        <section className="fixed inset-0 z-50">
          {/* Initial centered logo with background */}
          <div ref={backgroundRef} className="absolute inset-0 flex items-center justify-center bg-white">
            <div ref={logoRef} className="w-32 h-32 relative">
              <Image
                src="/images/logo2.png" // Updated logo image path
                alt="Audimate Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Theme orange overlay - starts small and centered */}
            <div 
              ref={overlayRef} 
              className="absolute w-32 h-32 opacity-0"
              style={{ transformOrigin: 'center center' }}
            />
            {/* Video overlay - starts off screen to the right */}
            <div 
              ref={whiteOverlayRef} 
              className="absolute inset-0 overflow-hidden"
              style={{ transform: 'translateX(100%)' }}
            >
              <video
                ref={videoRef}
                className="absolute w-full h-full object-cover"
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
            {/* Header logo - starts invisible */}
            <div 
              ref={headerLogoRef} 
              className="absolute top-4 left-4 w-24 h-24 opacity-0"
            >
              <Image
                src="/images/logo.png"
                alt="Audimate Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Header buttons - starts invisible and off screen */}
            <div 
              ref={headerButtonsRef}
              className="absolute top-4 right-4 flex space-x-8 opacity-0"
              style={{ transform: 'translateX(100%)' }}
            >
              <a href="#" className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-lg hover:scale-110 cursor-pointer relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-lg hover:scale-110 cursor-pointer relative group">
                Team
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-lg hover:scale-110 cursor-pointer relative group">
                Try Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Content sections */}
      {showContent && (
        <div className="relative">
          {/* Header with logo and navigation - always visible */}
          <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-2 py-1 bg-white/10 backdrop-blur-sm">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/logo.png"
                alt="Audimate Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-base hover:scale-110 cursor-pointer relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-base hover:scale-110 cursor-pointer relative group">
                Team
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-[#001f3f] hover:text-[#001f3f] transform transition-all duration-300 text-base hover:scale-110 cursor-pointer relative group">
                Try Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#001f3f] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </header>

          {/* Video background - fixed position */}
          <div className="fixed inset-0 -z-10">
            <video
              className="absolute w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
            >
              <source src="/images/audimate-exp-v3.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Spacer to ensure content starts below video */}
          <div className="h-screen"></div>
          
          {/* Tagline section */}
          <section className="relative bg-gradient-to-b from-[#e84b35] to-white">
            <div className="flex flex-col items-center justify-center text-center px-4 py-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#0f2a39]">
                AI-Powered Casting Assistant
              </h1>
              <h2 className="text-2xl md:text-3xl mb-6 text-[#0f2a39]">
                for Saudi Film Industry
              </h2>
              <button
                onClick={scrollToHowItWorks}
                className="px-8 py-3 bg-white text-lg font-semibold text-[#e84b35] rounded-full transition-colors duration-300 hover:bg-[#fabd96] hover:text-[#0f2a39] hover:border hover:border-[#0f2a39]"
              >
                How It Works
              </button>
            </div>
            {/* Scroll target for other sections */}
            <div ref={howItWorksRef}></div>
          </section>
        </div>
      )}
    </>
  );
}
