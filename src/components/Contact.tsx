import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
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

      // Contact info items animation
      gsap.fromTo(contactInfoRef.current?.children || [],
        { x: -50, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.22,
          ease: "circ.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Map animation
      gsap.fromTo(mapRef.current,
        { x: 50, opacity: 0, scale: 0.8, rotationY: 15 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to(".contact-particle", {
        y: -30,
        x: 15,
        rotation: 180,
        duration: 6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: [
        "621/B, San-Jose, 4th & 5th Floor",
        "12th Main Road, HAL II Stage",
        "Indiranagar, Bangalore - 560038"
      ]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91 98459 81651"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["hospitality@shibuyaxing.com"]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="contact-particle absolute w-3 h-3 bg-[#b91c1c] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-black mb-4 font-heading drop-shadow-lg">
            Say <span className="text-[#b91c1c]">Hello</span>
          </h2>
          <p className="text-lg text-black max-w-xl mx-auto" style={{ fontFamily: 'AsianHiro, sans-serif' }}>
            Reach out to us for reservations or inquiries
          </p>
        </div>
        <div className="flex justify-center">
          <div ref={contactInfoRef} className="space-y-6 w-full max-w-md">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-black/80 border border-[#b91c1c] rounded-xl shadow-lg flex items-center space-x-4 p-4 transition-transform hover:scale-105"
              >
                <div className="info-icon flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#b91c1c]">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1 font-heading">
                    {info.title}
                  </h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-sm text-white" style={{ fontFamily: 'AsianHiro, sans-serif' }}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
