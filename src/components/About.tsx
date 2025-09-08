import React, { useEffect, useRef } from 'react';
import BrandName from './BrandName';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text content stagger animation
      gsap.fromTo(textContentRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.25,
          ease: "circ.out",
          scrollTrigger: {
            trigger: textContentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image animation with scale and rotation
      gsap.fromTo(imageRef.current,
        { x: 50, opacity: 0, scale: 0.8, rotation: 5 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Mission box animation
      gsap.fromTo(missionRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );


      // Continuous floating animation for background particles
      gsap.to(".bg-particle", {
        y: -30,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random"
        }
      });

      // Parallax effect for decorative elements
      gsap.to(".decorative-float", {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        stagger: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
      <section
        ref={sectionRef}
        id="about"
        className="py-12 relative overflow-hidden"
      >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5 z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-particle absolute w-4 h-4 bg-[#b91c1c] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textContentRef}>
            <div className="mb-10 text-center">
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold text-center mb-6 font-heading drop-shadow-lg border-4 border-[#d4af37] rounded-xl px-8 py-4"
                style={{
                  display: "inline-block",
                  margin: "0 auto",
                  background: "#fff",
                  boxShadow: "0 4px 32px #0003"
                }}
              >
                <span className="text-black">The </span>
                <span>
                  {"Crossing".split("").map((char, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: idx % 2 === 0 ? "#111" : "#fff",
                        backgroundColor: idx % 2 === 0 ? "#fff" : "#111",
                        padding: "0 2px",
                        borderRadius: "2px",
                        textShadow: idx % 2 === 0 ? "0 1px 2px #0002" : "0 1px 2px #fff8"
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>{" "}
                <span className="text-black drop-shadow-lg">Story</span>
              </h2>
              <div className="bg-black/60 rounded-2xl shadow-xl border border-[#d4af37]/40 px-8 py-8 max-w-2xl mx-auto">
                <hr className="w-24 border-t-2 border-[#d4af37] mx-auto mb-6" />
                <div className="text-xl md:text-2xl text-[#f8f5f2] font-light leading-relaxed tracking-wide text-center space-y-4" style={{ fontFamily: 'AsianHiro, sans-serif' }}>
                  <p>
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Shibuya
                    </span>
                    {' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #a16207, #ca8a04, #eab308, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Xing
                    </span>
                    : Where cultures collide and flavors unite.
                  </p>
                  
                  <p>
                    Inspired by Tokyo's iconic{' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Shibuya
                    </span>
                    {' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Crossing
                    </span>
                    {' '}– the world's biggest pedestrian scramble – our name,{' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Shibuya
                    </span>
                    {' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #a16207, #ca8a04, #eab308, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Xing
                    </span>
                    , captures the vibrant energy & culinary diversity of this legendary district. The "X" in our logo isn't just a zebra{' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #a16207, #ca8a04, #eab308, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      crossing
                    </span>
                    ; it's the intersection of incredible Pan-Asian tastes.
                  </p>
                  
                  <p>
                    Your go-to for any occasion,{' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Shibuya
                    </span>
                    {' '}
                    <span 
                      className="font-bold text-2xl md:text-3xl"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #a16207, #ca8a04, #eab308, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      Xing
                    </span>
                    {' '}is a cozy escape. From cozy lunches to lively evening gatherings, every visit is crafted with care. Step in, relax, and we'll spice up your visit for sure.
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={missionRef}
              className="bg-white text-black p-6 rounded-xl transition-all duration-500 shadow-lg max-w-xl mx-auto mt-8 border-4 border-[#d4af37]"
            >
              <h3 className="text-xl font-semibold mb-2 font-heading text-black">Vision and Mission</h3>
              <p style={{ fontFamily: 'AsianHiro, sans-serif' }}>
                To be Bangalore's vibrant heart for authentic Pan-Asian flavours,
                offering a delightful and memorable dining experience.
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef}>
            <div className="relative">
              <img
                src="/Shibuya Scramble.jpg"
                alt="Shibuya Scramble"
                className="rounded-lg shadow-2xl mx-auto w-full max-w-xs md:max-w-sm h-auto object-contain"
                style={{ display: "block" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              
              {/* Decorative floating elements */}
              <div className="decorative-float absolute -top-6 -right-6 w-12 h-12 bg-[#b91c1c]/20 rounded-full"></div>
              <div className="decorative-float absolute -bottom-6 -left-6 w-16 h-16 bg-[#7f1d1d]/20 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
