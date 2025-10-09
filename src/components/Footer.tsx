import React, { useRef, useEffect } from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Globe } from 'lucide-react';
import BrandName from './BrandName';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand section animation
      gsap.fromTo(brandRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Links section animation
      gsap.fromTo(linksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "circ.out",
          delay: 0.18,
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact section animation
      gsap.fromTo(contactRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          delay: 0.36,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bottom section animation
      gsap.fromTo(bottomRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
          delay: 0.54,
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to(".footer-particle", {
        y: -15,
        x: 8,
        rotation: 180,
        duration: 5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });

    }, footerRef);

    return () => ctx.revert();
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

  const handleSocialHover = (social: string, isEntering: boolean) => {
    setHoveredSocial(isEntering ? social : null);
    
    const socialElement = document.querySelector(`[data-social="${social}"]`) as HTMLElement;
    if (socialElement) {
      if (isEntering) {
        gsap.to(socialElement, {
          scale: 1.2,
          rotation: 360,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        gsap.to(socialElement, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 5,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <footer ref={footerRef} className="bg-black/80 text-white relative overflow-hidden border-t-2 border-[#d4af37]/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-1 h-1 bg-[#d4af37] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div ref={brandRef} className="lg:col-span-2">
            <div className="mb-4">
              <img 
                src="IG LOGO SHIBUYA.png" 
                alt="Shibuya Xing Logo"
                className="h-25 w-40 mb-4 hover:brightness-110 transition-all duration-300"
              />
            </div>
            <p className="text-[#f8e9c0] max-w-md mb-6 font-sans">
              Experience authentic Pan-Asian cuisine at <BrandName />. One Crossing. Exotic Flavours. 
              Located in the heart of Indiranagar, Bangalore.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                data-social="facebook"
                onMouseEnter={() => handleSocialHover('facebook', true)}
                onMouseLeave={() => handleSocialHover('facebook', false)}
                className="text-[#d4af37] hover:text-white transition-all duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                data-social="instagram"
                onMouseEnter={() => handleSocialHover('instagram', true)}
                onMouseLeave={() => handleSocialHover('instagram', false)}
                className="text-[#d4af37] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                data-social="twitter"
                onMouseEnter={() => handleSocialHover('twitter', true)}
                onMouseLeave={() => handleSocialHover('twitter', false)}
                className="text-[#d4af37] hover:text-white transition-all duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h4 className="text-lg font-heading mb-4 text-[#d4af37] ">Quick Links</h4>
            <ul className="space-y-2 font-sans" >
              {[
                { label: 'The Crossing Story', id: 'about' },
                { label: 'Dive In', id: 'menu' },
                { label: 'Shibuya Selfies', id: 'gallery' },
                { label: 'Say Hello', id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={(e) => {
                      handleLinkClick(e);
                      scrollToSection(item.id);
                    }}
                    className="text-[#f8e9c0] hover:text-[#d4af37] transition-all duration-300 text-sm relative group font-sans"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactRef}>
            <h4 className="text-lg font-semibold mb-4 text-[#d4af37] font-heading">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                <div className="text-[#f8e9c0] text-sm font-sans">
                  <p>621/B, San-Jose, 4th & 5th Floor</p>
                  <p>12th Main Road, HAL II Stage</p>
                  <p>Indiranagar, Bangalore - 560038</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[#f8e9c0] text-sm font-sans">+91 98459 81651</span>
              </div>
              <div className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[#f8e9c0] text-sm font-sans">hospitality@shibuyaxing.com</span>
              </div>
              <div className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300">
                <Globe className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[#f8e9c0] text-sm font-sans">www.shibuyaxing.com</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="border-t border-[#d4af37]/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center font-sans">
            <p className="text-[#f8e9c0] text-sm">
              © 2024 <BrandName />. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-[#f8e9c0] hover:text-[#d4af37] transition-colors duration-300 text-sm font-sans">
                Privacy Policy
              </a>
              <a href="#" className="text-[#f8e9c0] hover:text-[#d4af37] transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
