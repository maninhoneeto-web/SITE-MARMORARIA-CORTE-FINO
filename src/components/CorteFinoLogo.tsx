import React from "react";

interface CorteFinoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function CorteFinoLogo({ className = "", size = "md" }: CorteFinoLogoProps) {
  const sizeMap = {
    sm: "h-11 w-11",
    md: "h-16 w-16",
    lg: "h-32 w-32",
    xl: "h-56 w-56"
  };

  const selectedSize = sizeMap[size];

  return (
    <div className={`relative select-none shrink-0 ${selectedSize} ${className}`}>
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* High-quality metallic gold gradient */}
          <radialGradient id="gold-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="90%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>

          {/* Core drop shadow for 3D medallion look */}
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="2" floodOpacity="0.4" />
          </filter>

          {/* Blur filter for smooth marble veins */}
          <filter id="vein-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.8" />
          </filter>
          <filter id="fine-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.9" />
          </filter>

          {/* Path for lower text arch (smile-shaped, running left-to-right along bottom) */}
          <path id="bottom-text-path" d="M 95,295 A 182,182 0 0,0 405,295" fill="none" />
          
          {/* Path for top "MARMORARIA" brand text arch inside the black tab */}
          <path id="banner-text-path" d="M 172,102 A 190,190 0 0,1 328,102" fill="none" />
        </defs>

        {/* Outer Bezel (Shiny Gold Border) */}
        <circle cx="250" cy="250" r="244" fill="url(#gold-grad)" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.5))" />
        <circle cx="250" cy="250" r="238" fill="#1b1612" />
        
        {/* Double Inner Thin Gold Trim */}
        <circle cx="250" cy="250" r="234" fill="none" stroke="url(#gold-grad)" strokeWidth="3" />

        {/* Concentric Black Textured Ring Plate */}
        <circle cx="250" cy="250" r="215" fill="none" stroke="#1c1917" strokeWidth="34" />

        {/* Golden lines within dark ring */}
        <circle cx="250" cy="250" r="227" fill="none" stroke="url(#gold-grad)" strokeWidth="0.85" opacity="0.6" />
        <circle cx="250" cy="250" r="201" fill="none" stroke="url(#gold-grad)" strokeWidth="1.6" opacity="0.8" />

        {/* Core Carrara / Calacatta Marble Circle */}
        <circle cx="250" cy="250" r="195" fill="#fcfcfd" />
        
        {/* Fine gold ring wrapping the marble edge for clean transition */}
        <circle cx="250" cy="250" r="194" fill="none" stroke="url(#gold-grad)" strokeWidth="2.5" />
        <circle cx="250" cy="250" r="192" fill="none" stroke="#000000" strokeWidth="1.5" opacity="0.8" />

        {/* Organic Marble Veins (Carrara Style with hint of gold) */}
        <g opacity="0.42" style={{ mixBlendMode: "multiply" }}>
          {/* Soft back gray veins */}
          <path d="M 120,110 Q 190,90 230,135 T 350,100 T 400,220" fill="none" stroke="#94a3b8" strokeWidth="9" filter="url(#vein-blur)" />
          <path d="M 80,240 Q 170,290 200,225 T 330,340 T 420,290" fill="none" stroke="#cbd5e1" strokeWidth="12" filter="url(#vein-blur)" />
          <path d="M 150,370 Q 250,330 270,240 T 380,165" fill="none" stroke="#94a3b8" strokeWidth="8" filter="url(#vein-blur)" />
          <path d="M 110,60 Q 185,175 110,295" fill="none" stroke="#cbd5e1" strokeWidth="7" filter="url(#vein-blur)" />

          {/* Sharp overlay gray veins */}
          <path d="M 130,100 Q 185,95 225,130 T 340,105 T 390,205" fill="none" stroke="#475569" strokeWidth="2" filter="url(#fine-blur)" />
          <path d="M 80,240 Q 170,290 200,225 T 335,335 T 400,295" fill="none" stroke="#334155" strokeWidth="2.5" filter="url(#fine-blur)" />
          <path d="M 145,375 Q 250,335 275,245 T 375,170" fill="none" stroke="#475569" strokeWidth="1.8" filter="url(#fine-blur)" />

          {/* Warm gold / calacatta veins linking across marble */}
          <path d="M 140,80 Q 210,120 280,100 T 350,190" fill="none" stroke="#b45309" strokeWidth="2" filter="url(#fine-blur)" opacity="0.4" />
          <path d="M 110,270 Q 190,240 240,270 T 320,200" fill="none" stroke="#ca8a04" strokeWidth="3" filter="url(#vein-blur)" opacity="0.35" />
        </g>

        {/* Polished stone reflection overlay */}
        <path d="M 95,95 A 175,175 0 0,1 405,95" fill="none" stroke="#ffffff" strokeWidth="14" opacity="0.32" filter="url(#vein-blur)" />

        {/* UPPER BLACK ARCH TAB FOR "MARMORARIA" (concentric, dips elegant notch at center) */}
        <path
          d="M 154,84 
             A 210,210 0 0,1 346,84
             C 341,87 336,90 331,94
             C 313,107 291,113 250,113
             C 209,113 187,107 169,94
             C 164,90 159,87 154,84 Z"
          fill="#1c1917"
          stroke="url(#gold-grad)"
          strokeWidth="2.4"
        />

        {/* Top Banner Text "MARMORARIA" curved inside the black tab path */}
        <text fill="#ffffff" dy="-1" filter="url(#soft-shadow)">
          <textPath 
            href="#banner-text-path" 
            startOffset="50%" 
            textAnchor="middle" 
            className="uppercase"
            style={{ 
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: "900",
              fontSize: "14.5px", 
              letterSpacing: "0.22em" 
            }}
          >
            Marmoraria
          </textPath>
        </text>

        {/* CENTRAL LOGO LABEL */}
        <g transform="translate(0, 11)">
          {/* "Corte Fino" title matching Georgia italic-serif luxury display */}
          <text 
            x="250" 
            y="218" 
            textAnchor="middle" 
            fill="#1c1917" 
            style={{
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontWeight: "900",
              fontSize: "56px",
              letterSpacing: "-0.01em"
            }}
          >
            Corte Fino
          </text>

          {/* Subtitle text below brand */}
          <text 
            x="250" 
            y="244" 
            textAnchor="middle" 
            fill="#3f3f46" 
            className="uppercase"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: "800",
              fontSize: "10px",
              letterSpacing: "0.16em"
            }}
          >
            FINO ACABAMENTO EM MÁRMORES
          </text>
        </g>

        {/* BOTTOM CURVED PATH TEXT "FINO ACABAMENTO EM MÁRMORES" */}
        <text 
          fill="#27272a" 
          style={{ 
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: "800",
            letterSpacing: "0.19em" 
          }}
        >
          <textPath 
            href="#bottom-text-path" 
            startOffset="50%" 
            textAnchor="middle" 
            className="uppercase" 
            style={{ fontSize: "11.5px" }}
          >
            FINO ACABAMENTO EM MÁRMORES
          </textPath>
        </text>
      </svg>
    </div>
  );
}
