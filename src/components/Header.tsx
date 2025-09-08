import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
type NavItemProps = {
  label: string;
  jp: string;
  navWidth: string;
  onClick: () => void;
  flipped: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ label, jp, navWidth, onClick, flipped }) => {
  return (
    <button
      onClick={onClick}
      className={`nav-item transition-all duration-300 text-lg font-normal leading-none tracking-wide font-heading px-6 py-0 border-none rounded-none first:rounded-l-full last:rounded-r-full text-white hover:text-primary focus:outline-none relative z-10 overflow-hidden flex items-center justify-center flex-grow-0 flex-shrink-0`}
      style={{
        margin: 0,
        minWidth: navWidth,
        maxWidth: navWidth,
        height: "32px",
        position: "relative",
        perspective: "600px"
      }}
    >
      <span
        className={`flip-inner${flipped ? " flipped" : ""}`}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "relative",
          transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
          transformStyle: "preserve-3d"
        }}
      >
        <span
          className="flip-front"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap"
          }}
        >
          {label}
        </span>
        <span
          className="flip-back"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff !important",
            fontWeight: 600,
            fontSize: "0.95em",
            whiteSpace: "nowrap",
            transition: "color 0.3s ease"
          }}
        >
          {jp}
        </span>
      </span>
    </button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flipped, setFlipped] = useState([false, false, false, false, false]);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startFlipLoop = () => {
      setFlipped([true, true, true, true, true]);
      timeout = setTimeout(() => {
        setFlipped([false, false, false, false, false]);
      }, 6000); // Show Japanese for 6s
    };

    // Initial flip to Japanese after 0.5s, then alternate every 12s
    startFlipLoop();
    const interval = setInterval(() => {
      startFlipLoop();
    }, 12000); // 6s Japanese + 6s English

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    scrollToSection('hero');
  };

  return (
    <header ref={headerRef} className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-lg transition-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
            <img 
              ref={logoRef}
              src="THE X - WITHOUT BG (2).png" 
              alt="Shibuya Xing Logo"
              className="h-16 w-auto hover:brightness-110 transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center h-16 bg-black backdrop-blur-md rounded-full p-1 pr-8 shadow border border-primary/30 gap-x-2 ml-12">
            {/* Flip effect CSS for all nav items */}
            <style>
              {`
                .flip-inner {
                  transition: transform 1.2s cubic-bezier(.4,0,.2,1);
                }
                .flip-inner.flipped {
                  transform: rotateY(180deg);
                }
                .flip-front, .flip-back {
                  display: block;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  text-align: center;
                }
                .flip-back {
                  color: #fff !important;
                  font-weight: 600;
                  background: transparent;
                  transition: color 0.3s ease;
                }
                .nav-item:hover .flip-back {
                  color: #ff2d2d !important;
                }
                button:hover .mobile-jp-text {
                  color: #ff2d2d !important;
                }
              `}
            </style>
            {[
              { label: 'The Crossing Story', id: 'about', jp: 'Watashitachi no Sutori' },
              { label: 'Dive In', id: 'menu', jp: 'Oishii ryouri' },
              { label: 'Shibuya Selfies', id: 'gallery', jp: 'Gazo' },
              { label: 'Say Hello', id: 'contact', jp: 'Konnichiwa' }
            ].map((item, idx, arr) => {
              const isFirst = idx === 0;
              const isExperience = idx === 2;
              const navWidth = isFirst ? "220px" : isExperience ? "200px" : "150px";
              return (
                <React.Fragment key={item.id + idx}>
                  <NavItem
                    label={item.label}
                    jp={item.jp}
                    navWidth={navWidth}
                    onClick={() => scrollToSection(item.id)}
                    flipped={flipped[idx]}
                  />
                  {idx !== arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex items-center"
                      style={{ height: '32px', margin: '0 2px' }}
                    >
                      <svg width="10" height="32" viewBox="0 0 10 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line
                          x1="5"
                          y1="6"
                          x2="5"
                          y2="26"
                          stroke="#b91c1c"
                          strokeWidth="2"
                          opacity="0.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  )}
                </React.Fragment>
              );
            })}
            {/* Social Icons */}
            <div className="flex items-center space-x-4 ml-4">
              <a
                href="https://www.instagram.com/feastshibuya?igsh=MXQzM2pmb2d0bXE1aA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-all duration-300 text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://maps.google.com/?q=Shibuya+Xing+Indiranagar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-all duration-300 text-2xl"
                aria-label="Google Maps"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </nav>

          {/* Contact Info */}
          {/* Removed phone number and location as per user request */}

          {/* Mobile Menu Button and Social Icons */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Social Icons for Mobile */}
            <a
              href="https://www.instagram.com/feastshibuya?igsh=MXQzM2pmb2d0bXE1aA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black transition-all duration-300 text-xl p-2 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-gray-300/50"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://maps.google.com/?q=Shibuya+Xing+Indiranagar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black transition-all duration-300 text-xl p-2 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-gray-300/50"
              aria-label="Google Maps"
            >
              <FaMapMarkerAlt />
            </a>
            {/* Mobile Menu Button */}
            <button
              className="transition-all duration-300 text-black hover:text-primary bg-white/20 hover:bg-white/40 p-2 rounded-lg backdrop-blur-sm border border-gray-300/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div ref={mobileMenuRef} className={`md:hidden overflow-hidden transition-all duration-300 fixed top-20 left-0 w-full z-50 ${isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-4 pb-4 bg-white/95 backdrop-blur-md shadow-2xl font-heading">
            {[
              { label: 'The Crossing Story', id: 'about', jp: 'Watashitachi no Sutori' },
              { label: 'Dive In', id: 'menu', jp: 'Oishii ryouri' },
              { label: 'Shibuya Selfies', id: 'gallery', jp: 'Gazo' },
              { label: 'Say Hello', id: 'contact', jp: 'Konnichiwa' }
            ].map((item, index, array) => (
              <div key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-6 py-6 hover:bg-gray-50 transition-all duration-300 text-xl font-medium font-aasianhiro border border-gray-200 rounded-lg mb-2 shadow-sm hover:shadow-md relative overflow-hidden text-white hover:text-primary bg-black/90 hover:bg-black/80"
                  style={{ perspective: "600px" }}
                >
                  <span
                    className={`flip-inner${flipped[index] ? " flipped" : ""}`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      transition: "transform 1.8s ease-in-out",
                      transformStyle: "preserve-3d",
                      transform: flipped[index] ? "rotateX(180deg)" : "rotateX(0deg)"
                    }}
                  >
                    <span
                      className="flip-front"
                      style={{
                        backfaceVisibility: "hidden",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        left: 0,
                        top: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        color: "inherit",
                        paddingLeft: "0"
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="flip-back mobile-jp-text"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateX(180deg)",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        left: 0,
                        top: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        color: "#ffffff !important",
                        fontWeight: 600,
                        fontSize: "0.95em",
                        paddingLeft: "0",
                        transition: "color 0.3s ease"
                      }}
                    >
                      {item.jp}
                    </span>
                  </span>
                </button>
                {index < array.length - 1 && (
                  <div className="border-b border-gray-300/50 mx-2 mb-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
