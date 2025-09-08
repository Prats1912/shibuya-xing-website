import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const images = [
  {
    url: "Interior1.svg",
    caption: "Interior View 1"
  },
  {
    url: "Interior2.svg",
    caption: "Interior View 2"
  },
  {
    url: "Interior3.svg",
    caption: "Interior View 3"
  },
  {
    url: "Interior4.svg",
    caption: "Interior View 4"
  },
  {
    url: "Interior5.svg",
    caption: "Interior View 5"
  },
  {
    url: "Interior6.svg",
    caption: "Interior View 6"
  }
];

const Gallery = () => {

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Auto-advance images every 4 seconds with smooth animation
  useEffect(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    autoAdvanceRef.current = setInterval(() => {
      if (!isTransitioning) {
        const newIndex = (currentImage + 1) % images.length;
        changeImage(newIndex, 'next');
      }
    }, 4000);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [isTransitioning, images.length, currentImage]);

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

      // Main image container animation
      gsap.fromTo(mainImageRef.current,
        { scale: 0.8, opacity: 0, rotationY: 15 },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: mainImageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Thumbnails animation
      gsap.fromTo(thumbnailsRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          stagger: 0.18,
          ease: "circ.out",
          scrollTrigger: {
            trigger: thumbnailsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Counter animation
      gsap.fromTo(counterRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: counterRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating stars animation
      gsap.to(".bg-star", {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  

  const changeImage = (newIndex: number, direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    const currentImg = mainImageRef.current?.querySelector('img');
    if (currentImg) {
      gsap.to(currentImg, {
        x: direction === 'next' ? -100 : 100,
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentImage(newIndex);
          gsap.fromTo(currentImg, 
            { x: direction === 'next' ? 100 : -100, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
          );
          setIsTransitioning(false);
        }
      });
    }
  };

  const nextImage = () => {
    const newIndex = (currentImage + 1) % images.length;
    changeImage(newIndex, 'next');
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }
      }, 4000);
    }
  };

  const prevImage = () => {
    const newIndex = (currentImage - 1 + images.length) % images.length;
    changeImage(newIndex, 'prev');
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }
      }, 4000);
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentImage || isTransitioning) return;
    
    const direction = index > currentImage ? 'next' : 'prev';
    changeImage(index, direction);
    
    // Animate clicked thumbnail
    const thumbnail = thumbnailsRef.current?.children[index] as HTMLElement;
    if (thumbnail) {
      gsap.to(thumbnail, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-12 relative overflow-hidden"
    >
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="bg-star absolute w-1 h-1 bg-[#b91c1c] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-black mb-6 font-heading drop-shadow-lg">
            <span className="text-[#b91c1c]">Shibuya</span> <span className="text-black">Selfies</span>
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto font-heading">
            A glimpse into our world of culinary artistry and elegant dining
          </p>
        </div>

        {/* Featured Image Display */}
        <div ref={mainImageRef} className="relative mb-8">
          <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
            <img
              src={images[currentImage].url}
              alt={images[currentImage].caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7f1d1d]/30 to-transparent"></div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#b91c1c]"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#7f1d1d]"></div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 disabled:opacity-50 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 disabled:opacity-50 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Gallery */}
        <div ref={thumbnailsRef} className="flex justify-center space-x-2 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-500 ${
                index === currentImage
                  ? 'ring-4 ring-primary scale-110'
                  : 'opacity-70 hover:opacity-100 hover:ring-2 hover:ring-primary/50 hover:scale-105'
              }`}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Image Counter */}
        <div ref={counterRef} className="text-center mt-6">
          <span className="text-primary text-lg font-medium">
            {currentImage + 1} / {images.length}
          </span>
          <div className="mt-2 flex justify-center space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'bg-primary w-8' : 'bg-white/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
