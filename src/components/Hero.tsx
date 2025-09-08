import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide all elements except logo
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, infoCardsRef.current, contactInfoRef.current, imageRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 50
      });

      // Create main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Title with stagger effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      // Subtitle with smooth fade
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      // Info cards with stagger
      .to(infoCardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // CTA buttons with bounce
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)"
      }, "-=0.6")
      // Contact info
      .to(contactInfoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      // Image with scale effect
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      // Scroll indicator
      // .to(scrollIndicatorRef.current, {
      //   opacity: 1,
      //   y: 0,
      //   duration: 0.6,
      //   ease: "power2.out"
      // }, "-=0.3");

      gsap.to(scrollIndicatorRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Parallax effect for background elements
      gsap.to(".bg-particle", {
        y: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: element,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-4"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source src="Shibuya opening trailer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/30 z-1"></div>
      
      {/* Mobile-First Content Container */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Layout (Stack Vertically) - Optimized for smaller screens */}
        <div className="flex flex-col lg:hidden items-center justify-center min-h-[85vh] space-y-3 py-4">
          
          {/* Mobile Headline - Increased Font Sizes */}
          <div className="order-1 text-center px-3">
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight mb-2"
              style={{
                color: "#ffffff",
                textShadow: "0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.9)"
              }}
            >
              One Crossing,
              <br />
              <span 
                className="text-4xl sm:text-5xl md:text-6xl"
                style={{
                  color: "#ffd700",
                  textShadow: "0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.9)"
                }}
              >
                Exotic Flavours
              </span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl leading-snug font-heading mb-3"
              style={{
                color: "#ffffff",
                textShadow: "0 0 15px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.9)"
              }}
            >
              Artisanal Pan Asian Experience
            </p>
          </div>

          {/* Mobile Reservation Card - Increased Font Sizes */}
          <div className="order-3 w-full max-w-sm mx-auto relative">
            <div
              ref={ctaRef}
              className="bg-white/98 backdrop-blur-md rounded-2xl p-5 border-2 border-[#b91c1c] shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative z-10"
              style={{
                boxShadow: "0 20px 40px rgba(185, 28, 28, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.2)"
              }}
            >
              <div className="text-center" style={{ fontFamily: 'AsianHiro, sans-serif' }}>
                {/* Logo - The Lollipop Logo, large with no empty space */}
                <div className="mb-5 -mx-1 -mt-1">
                  <img 
                    src="/THE LOLLIPOP - WITHOUT BG (1).png" 
                    alt="Shibuya Xing Logo" 
                    className="w-full h-40 sm:h-44 object-contain"
                  />
                </div>

                {/* Mobile CTA Button - Perfectly centered */}
                <div className="mb-8 flex justify-center">
                  <a 
                    href="https://order.tmbill.com/outlet/26084511970566/ReserveTable"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] hover:from-[#7f1d1d] hover:to-[#b91c1c] text-white px-6 py-2.5 rounded-full text-base font-bold shadow-lg transition-all duration-300 font-heading tracking-wide transform hover:scale-105 active:scale-95"
                    style={{ 
                      letterSpacing: '0.02em', 
                      boxShadow: '0 4px 16px rgba(185, 28, 28, 0.4)'
                    }}
                  >
                    Savor The Flavour - Reserve Now
                  </a>
                </div>

                {/* Mobile Contact Info - Enhanced Visibility */}
                <div
                  ref={contactInfoRef}
                  className="text-white text-base space-y-2"
                  style={{ fontFamily: 'AsianHiro, sans-serif' }}
                >
                  <p className="flex items-center justify-center">
                    <span className="mr-2 text-[#d4af37] text-base">📍</span>
                    <span className="text-base">621/B, San-Jose, Indiranagar</span>
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="mr-2 text-[#d4af37] text-base">🕒</span>
                    <span className="text-base">Open Daily: 11:00 AM - 11:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (Two-column) - No Logo */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] max-w-6xl mx-auto">
            
            {/* Desktop Left: Welcome Text */}
            <div className="flex flex-col justify-center items-center text-center">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading tracking-tight mb-6"
              style={{
                color: "#ffffff",
                textShadow: "0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.9)"
              }}
            >
              One Crossing,
              <br />
              <span 
                style={{
                  color: "#ffd700",
                  textShadow: "0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.9)"
                }}
              >
                Exotic Flavours
              </span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed font-heading"
              style={{
                color: "#ffffff",
                textShadow: "0 0 15px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.9)"
              }}
            >
              Artisanal Pan Asian Experience in the Heart of Indiranagar
            </p>
          </div>

          {/* Desktop Right: Reservation Card - Exact Same Styling as Mobile */}
          <div className="flex justify-center relative">
            <div
              ref={ctaRef}
              className="bg-white/98 backdrop-blur-md rounded-2xl p-8 border-2 border-[#b91c1c] shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative z-10 w-full max-w-lg"
              style={{
                boxShadow: "0 20px 40px rgba(185, 28, 28, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.2)"
              }}
            >
              <div className="text-center" style={{ fontFamily: 'AsianHiro, sans-serif' }}>
                {/* Logo - The Lollipop Logo, large with no empty space */}
                <div className="mb-19 flex justify-center">
                  <img 
                    src="/THE LOLLIPOP - WITHOUT BG (1).png" 
                    alt="Shibuya Xing Logo" 
                    className="w-full h-49 object-contain"
                  />
                </div>

                {/* Desktop Button - Perfectly centered */}
                <div className="mb-5 flex justify-center">
                  <a 
                    href="https://order.tmbill.com/outlet/26084511970566/ReserveTable"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] hover:from-[#7f1d1d] hover:to-[#b91c1c] text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 font-heading tracking-wide transform hover:scale-105 active:scale-95"
                    style={{ 
                      letterSpacing: '0.02em', 
                      boxShadow: '0 4px 16px rgba(185, 28, 28, 0.4)'
                    }}
                  >
                    Savor The Flavour - Reserve Now
                  </a>
                </div>
                
                {/* Desktop Contact Info - Enhanced Visibility */}
                <div
                  ref={contactInfoRef}
                  className="text-white text-sm space-y-2"
                  style={{ fontFamily: 'AsianHiro, sans-serif' }}
                >
                  <p className="flex items-center justify-center">
                    <span className="mr-3 text-[#d4af37] text-xl">📍</span>
                    <span className="text-sm">621/B, San-Jose, Indiranagar</span>
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="mr-3 text-[#d4af37] text-xl">🕒</span>
                    <span className="text-sm">Open Daily: 11:00 AM - 11:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="text-primary hover:text-white transition-all duration-300 bg-black/50 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/40"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
      
      {/* Global Shimmer Animation */}
      <style>
        {`
          @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
