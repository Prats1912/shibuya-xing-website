import React from "react";

/**
 * BrandName component renders "Shibuya Xing" with a bold, animated red gradient style.
 * - Strong red gradient text
 * - Animated gradient shift
 * - Larger font size by default
 * - Smooth scale/glow on hover/focus
 * - Custom font and shadow for premium effect
 */
const BrandName: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span
    className={`font-heading font-extrabold tracking-wide text-2xl md:text-3xl transition-all duration-500 hover:scale-105 focus:scale-105 ${className}`}
    style={{
      letterSpacing: "0.04em",
      position: "relative",
      display: "inline-block",
      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
    }}
  >
    <span 
      className="bg-gradient-to-b from-red-900 via-red-700 to-red-500 bg-clip-text text-transparent"
      style={{ 
        backgroundImage: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c, #dc2626)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
      }}
    >
      Shibuya
    </span>
    &nbsp;
    <span 
      className="bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-300 bg-clip-text text-transparent"
      style={{ 
        backgroundImage: 'linear-gradient(to bottom, #a16207, #ca8a04, #eab308, #fbbf24)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
      }}
    >
      Xing
    </span>
  </span>
);

export default BrandName;
