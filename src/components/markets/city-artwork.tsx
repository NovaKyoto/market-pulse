/**
 * Hand-crafted SVG motifs for featured cities.
 * Each city gets a unique landmark/scene that fills the card background
 * behind a sentiment-based gradient overlay.
 *
 * All artwork is original SVG (no licensing concerns) and renders at <1KB each.
 * Animations use CSS classes from globals.css for performance.
 */

interface CityArtworkProps {
  slug: string;
  className?: string;
}

const SHARED_CLASS =
  "absolute inset-0 w-full h-full opacity-30 transition-all duration-700 group-hover:opacity-50 group-hover:scale-110";

export function CityArtwork({ slug, className = "" }: CityArtworkProps) {
  const fullClass = `${SHARED_CLASS} ${className}`;

  switch (slug) {
    // ============================================================
    // MIAMI — palm trees + setting sun + ocean waves
    // ============================================================
    case "miami-fl":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="miamiSun" cx="0.7" cy="0.4" r="0.4">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Sun */}
          <circle cx="280" cy="120" r="50" fill="url(#miamiSun)" className="origin-center animate-[pulse_4s_ease-in-out_infinite]" />
          {/* Palm tree trunk left */}
          <path d="M 60 280 Q 55 220 65 160 Q 70 130 65 110" stroke="#92400e" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Palm fronds left */}
          <g className="origin-[65px_110px] animate-[sway_5s_ease-in-out_infinite]" style={{ transformOrigin: "65px 110px" }}>
            <path d="M 65 110 Q 30 90 10 100" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 65 110 Q 100 85 130 95" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 65 110 Q 50 70 30 60" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 65 110 Q 80 70 100 60" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
          {/* Palm tree trunk right */}
          <path d="M 350 280 Q 345 230 355 180 Q 360 150 358 130" stroke="#92400e" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "358px 130px" }} className="animate-[sway_6s_ease-in-out_infinite]">
            <path d="M 358 130 Q 330 115 315 120" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 358 130 Q 380 110 395 115" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 358 130 Q 350 100 340 90" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 358 130 Q 370 100 380 90" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
          {/* Ocean waves */}
          <path d="M 0 240 Q 50 230 100 240 T 200 240 T 300 240 T 400 240 L 400 300 L 0 300 Z" fill="#06b6d4" opacity="0.4" />
          <path d="M 0 260 Q 60 250 120 260 T 240 260 T 360 260 T 400 260 L 400 300 L 0 300 Z" fill="#0891b2" opacity="0.5" />
        </svg>
      );

    // ============================================================
    // NEW YORK — Manhattan skyline silhouette
    // ============================================================
    case "new-york-ny":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          {/* Moon */}
          <circle cx="320" cy="80" r="20" fill="#fef3c7" opacity="0.6" />
          {/* Skyline silhouettes - back layer */}
          <g fill="#1e293b" opacity="0.6">
            <rect x="0" y="180" width="40" height="120" />
            <rect x="40" y="160" width="30" height="140" />
            <rect x="70" y="140" width="50" height="160" />
            <rect x="120" y="170" width="35" height="130" />
            <rect x="155" y="120" width="40" height="180" />
            {/* Empire State-ish */}
            <polygon points="195,80 215,80 215,120 220,120 220,300 190,300 190,120 195,120" />
            <rect x="225" y="150" width="50" height="150" />
            <rect x="275" y="170" width="35" height="130" />
            <rect x="310" y="130" width="40" height="170" />
            <rect x="350" y="160" width="50" height="140" />
          </g>
          {/* Front layer */}
          <g fill="#0f172a" opacity="0.7">
            <rect x="20" y="220" width="35" height="80" />
            <rect x="60" y="200" width="40" height="100" />
            <rect x="105" y="210" width="30" height="90" />
            <rect x="145" y="230" width="45" height="70" />
            <rect x="200" y="220" width="35" height="80" />
            <rect x="240" y="200" width="50" height="100" />
            <rect x="295" y="215" width="40" height="85" />
            <rect x="340" y="225" width="45" height="75" />
          </g>
          {/* Window lights */}
          <g fill="#fde68a" opacity="0.8">
            <rect x="45" y="220" width="3" height="3" />
            <rect x="80" y="200" width="3" height="3" />
            <rect x="170" y="160" width="3" height="3" />
            <rect x="205" y="100" width="3" height="3" />
            <rect x="240" y="180" width="3" height="3" />
            <rect x="320" y="150" width="3" height="3" />
            <rect x="365" y="180" width="3" height="3" />
            <rect x="100" y="240" width="3" height="3" />
            <rect x="260" y="230" width="3" height="3" />
          </g>
        </svg>
      );

    // ============================================================
    // LOS ANGELES — palm trees + Hollywood hills
    // ============================================================
    case "los-angeles-ca":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          {/* Sun behind hills */}
          <circle cx="200" cy="160" r="40" fill="#fb923c" opacity="0.7" className="animate-[pulse_5s_ease-in-out_infinite]" />
          {/* Hills back */}
          <path d="M 0 200 Q 80 150 160 180 T 320 170 T 400 200 L 400 300 L 0 300 Z" fill="#7c2d12" opacity="0.5" />
          {/* Hills front */}
          <path d="M 0 240 Q 100 200 200 230 T 400 240 L 400 300 L 0 300 Z" fill="#92400e" opacity="0.6" />
          {/* Tall skinny palms */}
          <path d="M 80 290 Q 78 200 82 130" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <g style={{ transformOrigin: "82px 130px" }} className="animate-[sway_7s_ease-in-out_infinite]">
            <path d="M 82 130 Q 60 115 50 125" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 82 130 Q 105 115 115 125" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 82 130 Q 70 100 60 95" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 82 130 Q 95 100 105 95" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <path d="M 320 290 Q 318 220 322 150" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <g style={{ transformOrigin: "322px 150px" }} className="animate-[sway_5s_ease-in-out_infinite]">
            <path d="M 322 150 Q 300 135 290 145" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 322 150 Q 345 135 355 145" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 322 150 Q 310 120 300 115" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 322 150 Q 335 120 345 115" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      );

    // ============================================================
    // PHOENIX — saguaro cactus + desert sun
    // ============================================================
    case "phoenix-az":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="phxSun" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          {/* Hot desert sun */}
          <circle cx="200" cy="100" r="80" fill="url(#phxSun)" className="animate-[pulse_4s_ease-in-out_infinite]" />
          {/* Distant mountains */}
          <path d="M 0 240 L 80 180 L 140 220 L 220 170 L 300 215 L 380 175 L 400 200 L 400 300 L 0 300 Z" fill="#7c2d12" opacity="0.5" />
          {/* Saguaro cactus center */}
          <g fill="#16a34a" opacity="0.7">
            <rect x="190" y="160" width="20" height="140" rx="10" />
            <rect x="160" y="200" width="35" height="12" rx="6" />
            <rect x="160" y="200" width="12" height="50" rx="6" />
            <rect x="205" y="180" width="35" height="12" rx="6" />
            <rect x="228" y="160" width="12" height="50" rx="6" />
          </g>
          {/* Smaller cactus left */}
          <g fill="#15803d" opacity="0.6">
            <rect x="60" y="220" width="14" height="80" rx="7" />
            <rect x="40" y="240" width="25" height="9" rx="4.5" />
            <rect x="40" y="240" width="9" height="30" rx="4.5" />
          </g>
          {/* Smaller cactus right */}
          <g fill="#15803d" opacity="0.6">
            <rect x="320" y="230" width="14" height="70" rx="7" />
            <rect x="335" y="245" width="20" height="9" rx="4.5" />
            <rect x="346" y="235" width="9" height="25" rx="4.5" />
          </g>
        </svg>
      );

    // ============================================================
    // HOUSTON — space/rocket + skyline
    // ============================================================
    case "houston-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          {/* Stars */}
          <g fill="#fef3c7" opacity="0.9">
            <circle cx="50" cy="40" r="1.5" />
            <circle cx="120" cy="30" r="1" />
            <circle cx="280" cy="50" r="1.5" />
            <circle cx="350" cy="35" r="1" />
            <circle cx="180" cy="20" r="1" />
            <circle cx="80" cy="80" r="1" />
            <circle cx="320" cy="80" r="1" />
          </g>
          {/* Rocket — Houston, we have a launch */}
          <g style={{ transformOrigin: "200px 200px" }} className="animate-[float_6s_ease-in-out_infinite]">
            <path d="M 200 60 L 215 140 L 215 200 L 185 200 L 185 140 Z" fill="#e2e8f0" />
            <path d="M 200 60 L 215 140 L 185 140 Z" fill="#cbd5e1" />
            {/* Window */}
            <circle cx="200" cy="120" r="6" fill="#3b82f6" opacity="0.8" />
            {/* Fins */}
            <path d="M 185 175 L 165 210 L 185 200 Z" fill="#94a3b8" />
            <path d="M 215 175 L 235 210 L 215 200 Z" fill="#94a3b8" />
            {/* Flames */}
            <path d="M 185 200 L 200 240 L 215 200 Z" fill="#f97316" className="animate-[flicker_0.5s_ease-in-out_infinite]" />
            <path d="M 192 200 L 200 220 L 208 200 Z" fill="#fbbf24" />
          </g>
          {/* Houston skyline */}
          <g fill="#1e293b" opacity="0.6">
            <rect x="0" y="240" width="40" height="60" />
            <rect x="40" y="220" width="30" height="80" />
            <rect x="70" y="250" width="40" height="50" />
            <rect x="270" y="240" width="35" height="60" />
            <rect x="305" y="220" width="40" height="80" />
            <rect x="345" y="245" width="55" height="55" />
          </g>
        </svg>
      );

    // ============================================================
    // AUSTIN — guitar (live music capital) + bat (Congress bridge)
    // ============================================================
    case "austin-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          {/* Sunset gradient bg accent */}
          <defs>
            <linearGradient id="austinSunset" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="400" height="200" fill="url(#austinSunset)" />
          {/* Guitar body */}
          <g transform="translate(120, 180) rotate(-20)" style={{ transformOrigin: "0 0" }} className="animate-[float_8s_ease-in-out_infinite]">
            <ellipse cx="0" cy="0" rx="50" ry="60" fill="#92400e" opacity="0.7" />
            <ellipse cx="0" cy="0" rx="40" ry="48" fill="#7c2d12" opacity="0.7" />
            <circle cx="0" cy="-10" r="14" fill="#1e293b" />
            {/* Neck */}
            <rect x="-6" y="-130" width="12" height="80" fill="#92400e" opacity="0.7" />
            {/* Strings */}
            <line x1="-2" y1="-130" x2="-2" y2="50" stroke="#fef3c7" strokeWidth="0.5" opacity="0.6" />
            <line x1="0" y1="-130" x2="0" y2="50" stroke="#fef3c7" strokeWidth="0.5" opacity="0.6" />
            <line x1="2" y1="-130" x2="2" y2="50" stroke="#fef3c7" strokeWidth="0.5" opacity="0.6" />
          </g>
          {/* Bats flying (Congress Avenue bridge famous bat colony) */}
          <g fill="#1e293b" opacity="0.7" className="animate-[float_4s_ease-in-out_infinite]">
            <path d="M 280 80 Q 285 75 290 80 Q 295 75 300 80 L 295 85 Q 290 82 285 85 Z" />
            <path d="M 320 50 Q 325 45 330 50 Q 335 45 340 50 L 335 55 Q 330 52 325 55 Z" />
            <path d="M 350 90 Q 355 85 360 90 Q 365 85 370 90 L 365 95 Q 360 92 355 95 Z" />
          </g>
        </svg>
      );

    // ============================================================
    // ATLANTA — peach (Georgia state symbol) + skyline
    // ============================================================
    case "atlanta-ga":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          {/* Soft sky gradient */}
          <defs>
            <radialGradient id="atlGlow" cx="0.5" cy="0.3" r="0.6">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="400" height="300" fill="url(#atlGlow)" />
          {/* Big peach center-right */}
          <g style={{ transformOrigin: "270px 130px" }} className="animate-[float_7s_ease-in-out_infinite]">
            <ellipse cx="270" cy="130" rx="55" ry="60" fill="#fb923c" opacity="0.8" />
            <ellipse cx="260" cy="125" rx="20" ry="22" fill="#fdba74" opacity="0.7" />
            {/* Stem */}
            <path d="M 270 70 Q 275 60 285 55" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Leaf */}
            <ellipse cx="290" cy="55" rx="12" ry="6" fill="#16a34a" opacity="0.8" transform="rotate(30 290 55)" />
          </g>
          {/* ATL skyline */}
          <g fill="#1e293b" opacity="0.6">
            <rect x="0" y="240" width="35" height="60" />
            <rect x="35" y="220" width="40" height="80" />
            <rect x="75" y="200" width="35" height="100" />
            <rect x="110" y="230" width="30" height="70" />
            <polygon points="140,180 155,180 160,210 145,210" />
            <rect x="155" y="210" width="40" height="90" />
            <rect x="195" y="225" width="35" height="75" />
            <rect x="350" y="240" width="50" height="60" />
          </g>
        </svg>
      );

    // ============================================================
    // DALLAS — cowboy boot + Texas star
    // ============================================================
    case "dallas-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          {/* Texas star background */}
          <g style={{ transformOrigin: "320px 90px" }} className="animate-[spin_30s_linear_infinite]">
            <polygon
              points="320,40 333,80 375,80 341,105 354,148 320,123 286,148 299,105 265,80 307,80"
              fill="#fbbf24"
              opacity="0.5"
            />
          </g>
          {/* Cowboy boot */}
          <g style={{ transformOrigin: "150px 200px" }} className="animate-[float_6s_ease-in-out_infinite]">
            {/* Boot shaft */}
            <path d="M 110 100 L 110 200 L 145 200 L 145 100 Q 145 90 138 90 L 117 90 Q 110 90 110 100 Z" fill="#92400e" opacity="0.8" />
            {/* Decorative stitching on shaft */}
            <path d="M 115 130 Q 127 125 140 130" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.7" />
            <path d="M 115 150 Q 127 145 140 150" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.7" />
            {/* Foot */}
            <path d="M 145 200 L 195 200 Q 210 200 210 215 L 210 230 L 110 230 L 110 200 Z" fill="#7c2d12" opacity="0.85" />
            {/* Heel */}
            <rect x="180" y="230" width="25" height="15" fill="#451a03" />
            {/* Spur */}
            <circle cx="215" cy="215" r="8" fill="#fbbf24" opacity="0.6" />
            <circle cx="215" cy="215" r="3" fill="#92400e" />
          </g>
          {/* Skyline at bottom */}
          <g fill="#1e293b" opacity="0.5">
            <rect x="240" y="240" width="40" height="60" />
            <rect x="280" y="225" width="35" height="75" />
            <rect x="315" y="245" width="30" height="55" />
            <rect x="345" y="220" width="55" height="80" />
          </g>
        </svg>
      );

    // ============================================================
    // DEFAULT — generic skyline (used for any city without custom artwork)
    // ============================================================
    default:
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <g fill="#1e293b" opacity="0.4">
            <rect x="0" y="200" width="50" height="100" />
            <rect x="50" y="180" width="40" height="120" />
            <rect x="90" y="160" width="60" height="140" />
            <rect x="150" y="140" width="50" height="160" />
            <rect x="200" y="170" width="45" height="130" />
            <rect x="245" y="155" width="55" height="145" />
            <rect x="300" y="180" width="45" height="120" />
            <rect x="345" y="190" width="55" height="110" />
          </g>
        </svg>
      );
  }
}
