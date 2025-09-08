import React from "react";

// Ensure the font is loaded in your project (e.g., via index.css or a font-face import)
const PanAsianCulinaryBanner = () => (
  <div className="flex justify-center w-full mb-6">
    <div
      className="flex overflow-hidden rounded-full border-4 relative"
      style={{
        borderColor: "#D4AF37", // Gold
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
        minWidth: 340,
        maxWidth: 600,
        width: "100%",
      }}
    >
      <div
        className="flex-1 flex items-center justify-center py-2 px-6"
        style={{
          background: "#D7262B", // Red
        }}
      >
        <span
          className="text-white text-lg md:text-xl font-heading tracking-wider"
          style={{
            letterSpacing: "0.08em",
            textShadow: "1px 2px 4px rgba(0,0,0,0.10)",
          }}
        >
          PAN ASIAN
        </span>
      </div>
      {/* Diagonal gold separator */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 64,
          background: "linear-gradient(135deg, #D4AF37 80%, #fffbe6 100%)",
          boxShadow: "0 0 12px 2px #d4af37cc, 0 0 0 2px #fffbe6",
          borderRadius: 8,
          transform: "translate(-50%, -50%) rotate(20deg)",
          zIndex: 10,
        }}
      />
      <div
        className="flex-1 flex items-center justify-center py-2 px-6"
        style={{
          background: "#1B5E3C", // Green
        }}
      >
        <span
          className="text-white text-lg md:text-xl font-heading tracking-wider"
          style={{
            letterSpacing: "0.08em",
            textShadow: "1px 2px 4px rgba(0,0,0,0.10)",
          }}
        >
          CULINARY
        </span>
      </div>
    </div>
  </div>
);

export default PanAsianCulinaryBanner;
