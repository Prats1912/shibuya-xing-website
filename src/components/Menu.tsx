import React, { useEffect, useRef, useState } from 'react';
import { Star, Flame, Leaf, GlassWater } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'signature', name: 'Menu Favourites', icon: <Star className="w-5 h-5" /> },
  { id: 'spicy', name: 'Signature Dishes', icon: <Flame className="w-5 h-5" /> },
  { id: 'liquor', name: 'Mocktails & Kombuchas', icon: <Leaf className="w-5 h-5" /> }
];

const menuCarousels = {
  signature: [
    {
      name: "Japanese Ramen",
      description: "Classic Japanese ramen with rich broth, noodles, and traditional toppings.",
      images: ["/Japanese-Ramen.svg"]
    },
    {
      name: "Seafood Shio Ramen",
      description: "A delicate salt broth with prawns, squid, and clams, finished with seaweed and scallions.",
      images: ["/seafoodshio.png"]
    },
    {
      name: "Japanese Veg Yakitori",
      description: "Grilled skewers of assorted vegetables in authentic yakitori style.",
      images: ["/Japanese-Veg-Yakitori.svg"]
    },
    {
      name: "Japanese Vegetable Gyoza",
      description: "Pan-fried Japanese dumplings filled with fresh vegetables.",
      images: ["/Japanese-Vegetable-Gyoza.svg"]
    },
    
  ],
  spicy: [
    {
      name: "Huraideu-Chikin (Crispy Fried Chicken)",
      description: "Classic Korean-style crispy fried chicken, double-fried for an ultra-crunchy bite with a light, seasoned coating. Served with Wasabi Mayo, BBQ Aioli, Cheongyang Sauce.",
      images: [
        "/Korean-Fried-Chicken.svg"
      ]
    },
    {
      name: "Prawn Hargao Steamed Dim Sum",
      description: "A Cantonese classic, finely chopped prawns encased in a translucent wrapper, steamed to a tender, springy bite.",
      images: [
        "/prawnhargow.jpg"
      ]
    },
    {
      name: "Smoky Chili Garlic Squid Yakitori",
      description: "Tender squid skewers are perfectly grilled and glazed with a spicy garlic chili butter for a bold, smoky bite.",
      images: [
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
      ]
    }
  ],
  liquor: [
    {
      name: "Yuzu Kombucha",
      description: "A refreshing house made kombucha infused with yuzu, a tart Japanese citrus fruit, offering a sweet-tart balance perfect for pairing with food.",
      images: ["/pexels-olenkabohovyk-3323682.jpg"]
    },
    {
      name: "Sparkling Mint Mocktail",
      description: "A smooth mocktail created with sparkling water, fresh mint leaves, and lime juice for a refreshing taste",
      images: ["/wine1.jpg"]
    },
    {
      name: "Choya Sonic Mocktail!",
      description: "A refreshing mocktail using a CHOYA umeshu-inspired base, mixed with tonic water, soda, and a lemon peel",
      images: ["/wine2.jpg"]
    }
  ]
};

type MenuItem = {
  name: string;
  description: string;
  images: string[];
};

type CarouselColumnProps = {
  categoryId: string;
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
};

function CarouselColumn({ title, icon, items }: CarouselColumnProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Gather all images for this category
  const images = items.flatMap((item: MenuItem) => item.images || []);
  const names = items.map((item: MenuItem) => item.name);
  const descriptions = items.map((item: MenuItem) => item.description);

  // Manual navigation function
  const goToIndex = (newIndex: number) => {
    if (isAnimating || newIndex === currentIndex || images.length === 0) return;
    
    // Reset auto-advance timer
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
    setIsAnimating(true);
    
    // Restart auto-advance
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        setPrevIndex(currentIndex);
        setCurrentIndex(prev => (prev + 1) % images.length);
        setIsAnimating(true);
      }
    }, 3500);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - next image
      const nextIndex = (currentIndex + 1) % images.length;
      goToIndex(nextIndex);
    }
    
    if (isRightSwipe) {
      // Swipe right - previous image
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      goToIndex(prevIndex);
    }
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart === null) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      const nextIndex = (currentIndex + 1) % images.length;
      goToIndex(nextIndex);
    }
    
    if (isRightSwipe) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      goToIndex(prevIndex);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Smooth auto-advance with animation
  useEffect(() => {
    if (images.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        setPrevIndex(currentIndex);
        setCurrentIndex(prev => (prev + 1) % images.length);
        setIsAnimating(true);
      }
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [images.length, currentIndex, isAnimating]);

  // Animate both outgoing and incoming images
  const prevImgRef = useRef<HTMLImageElement>(null);
  const currImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prevIndex === null || prevIndex === currentIndex) {
      setIsAnimating(false);
      return;
    }
    if (!prevImgRef.current || !currImgRef.current) {
      setIsAnimating(false);
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });
    // Set incoming image to be slightly zoomed and transparent
    tl.set(currImgRef.current, { opacity: 0, scale: 1.08, zIndex: 2 });
    // Outgoing image: gentle fade out and zoom out
    tl.to(prevImgRef.current, { opacity: 0, scale: 0.96, duration: 1.2, ease: "expo.inOut", zIndex: 1 }, 0);
    // Incoming image: fade in and zoom to normal, overlapping for fluidity
    tl.to(currImgRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "expo.inOut", zIndex: 2 }, 0.2);
    // After animation, clear prevIndex
    const timeout = setTimeout(() => setPrevIndex(null), 1300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [currentIndex, prevIndex, images.length]);

  // For empty columns (Pairing)
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg border border-primary/30 p-6 min-h-[420px]">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <span className="text-xl font-heading text-white">{title}</span>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center w-full h-64 bg-black/30 rounded-lg border-2 border-dashed border-primary/30">
          <span className="text-primary/60 font-heading text-lg">Coming Soon</span>
        </div>
      </div>
    );
  }

  // Find which item this image belongs to
  let itemIdx = 0, imgCount = 0;
  for (let i = 0; i < items.length; i++) {
    const imgs = items[i].images || [];
    if (currentIndex < imgCount + imgs.length) {
      itemIdx = i;
      break;
    }
    imgCount += imgs.length;
  }

  // Find previous item index for outgoing image
  let prevItemIdx = 0, prevImgCount = 0;
  if (prevIndex !== null) {
    for (let i = 0; i < items.length; i++) {
      const imgs = items[i].images || [];
      if (prevIndex < prevImgCount + imgs.length) {
        prevItemIdx = i;
        break;
      }
      prevImgCount += imgs.length;
    }
  }

  return (
    <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg border border-primary/30 p-6 min-h-[420px]">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <span className="text-xl font-heading text-white">{title}</span>
      </div>
      <div className="w-full flex flex-col items-center">
        <div 
          ref={containerRef}
          className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-black/30 border border-primary/20 flex items-center justify-center cursor-pointer select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Outgoing image */}
          {prevIndex !== null && prevIndex !== currentIndex && (
            <img
              ref={prevImgRef}
              src={images[prevIndex]}
              alt={names[prevItemIdx]}
              className="object-cover w-full h-full absolute top-0 left-0 pointer-events-none"
              style={{ minHeight: "12rem", zIndex: 1 }}
              draggable={false}
            />
          )}
          {/* Incoming image */}
          <img
            ref={currImgRef}
            src={images[currentIndex]}
            alt={names[itemIdx]}
            className="object-cover w-full h-full absolute top-0 left-0 pointer-events-none"
            style={{ minHeight: "12rem", zIndex: 2 }}
            draggable={false}
          />
          {/* Swipe indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">‹</span>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">›</span>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white font-heading text-center mb-1">{names[itemIdx]}</h3>
        <p className="text-white/80 text-sm text-center" style={{ fontFamily: 'AsianHiro, sans-serif' }}>{descriptions[itemIdx]}</p>
      </div>
      <div className="flex justify-center gap-1 mt-3">
        {images.map((_, idx: number) => (
          <div
            key={idx}
            className={`h-2 w-6 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-primary" : "bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

const Menu = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-black mb-6 font-heading drop-shadow-lg">
            <span className="text-[#b91c1c]">Dive</span> <span className="text-black">In</span>
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto" style={{ fontFamily: 'AsianHiro, sans-serif', fontSize:"20" }}>
            Delight in our heartfelt Culinary artistry
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <CarouselColumn
              key={cat.id}
              categoryId={cat.id}
              title={cat.name}
              icon={cat.icon}
              items={menuCarousels[cat.id as keyof typeof menuCarousels] || []}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
