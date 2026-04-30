/**
 * Travel-poster style SVG artwork for featured cities.
 *
 * Design philosophy:
 * - ONE bold hero landmark per card (instantly recognizable at small sizes)
 * - Atmospheric gradient sky for depth
 * - 1-2 supporting context elements
 * - Refined per-city color palettes
 * - All original SVG, no licensing concerns, ~2KB each
 */

interface CityArtworkProps {
  slug: string;
  className?: string;
}

const SHARED_CLASS =
  "absolute inset-0 w-full h-full opacity-95 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03] origin-center";

export function CityArtwork({ slug, className = "" }: CityArtworkProps) {
  const fullClass = `${SHARED_CLASS} ${className}`;

  switch (slug) {
    // ============================================================
    // MIAMI — Big Art Deco hotel, pastel sunset, palm silhouette
    // ============================================================
    case "miami-fl":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="miamiSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#f472b6" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="miamiBuilding" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
            <radialGradient id="miamiSun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tropical sunset sky */}
          <rect x="0" y="0" width="400" height="300" fill="url(#miamiSky)" />

          {/* Big atmospheric setting sun */}
          <circle cx="280" cy="160" r="55" fill="url(#miamiSun)" className="animate-[pulse_5s_ease-in-out_infinite]" />
          <circle cx="280" cy="160" r="35" fill="#fef3c7" opacity="0.95" />

          {/* Sun reflection on water shimmer */}
          <ellipse cx="280" cy="265" rx="75" ry="8" fill="#fef3c7" opacity="0.5" />
          <ellipse cx="280" cy="278" rx="50" ry="4" fill="#fef3c7" opacity="0.4" />

          {/* BIG ICONIC ART DECO HOTEL — fills center-left of card */}
          <g>
            {/* Step pyramid silhouette behind for depth */}
            <rect x="155" y="140" width="120" height="160" fill="#1e293b" opacity="0.15" />

            {/* Main building body */}
            <rect x="80" y="100" width="170" height="200" rx="3" fill="url(#miamiBuilding)" />

            {/* Curved corner left side (Art Deco signature) */}
            <path d="M 80 100 L 80 300 L 95 300 L 95 110 Q 95 100 105 100 Z" fill="#f9a8d4" />

            {/* Top stepped roof tiers (classic Art Deco) */}
            <rect x="100" y="80" width="130" height="20" fill="#fbcfe8" />
            <rect x="115" y="65" width="100" height="15" fill="#f9a8d4" />
            <rect x="130" y="50" width="70" height="15" fill="#fbcfe8" />

            {/* Hotel sign (vertical neon-style) */}
            <rect x="160" y="55" width="14" height="40" fill="#ec4899" rx="1" />
            <rect x="162" y="58" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="167" y="58" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="162" y="65" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="167" y="65" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="162" y="72" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="167" y="72" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="162" y="79" width="3" height="3" fill="#fef3c7" opacity="0.95" />
            <rect x="167" y="79" width="3" height="3" fill="#fef3c7" opacity="0.95" />

            {/* Eyebrow horizontal accent stripes — Art Deco hallmark */}
            <rect x="105" y="135" width="135" height="3" fill="#0e7490" opacity="0.7" />
            <rect x="105" y="195" width="135" height="3" fill="#0e7490" opacity="0.7" />
            <rect x="105" y="255" width="135" height="3" fill="#0e7490" opacity="0.7" />

            {/* Window grid — pastel teal */}
            <g fill="#0891b2" opacity="0.55">
              <rect x="110" y="148" width="22" height="35" rx="2" />
              <rect x="138" y="148" width="22" height="35" rx="2" />
              <rect x="166" y="148" width="22" height="35" rx="2" />
              <rect x="194" y="148" width="22" height="35" rx="2" />
              <rect x="222" y="148" width="22" height="35" rx="2" />
              <rect x="110" y="208" width="22" height="35" rx="2" />
              <rect x="138" y="208" width="22" height="35" rx="2" />
              <rect x="166" y="208" width="22" height="35" rx="2" />
              <rect x="194" y="208" width="22" height="35" rx="2" />
              <rect x="222" y="208" width="22" height="35" rx="2" />
              <rect x="110" y="268" width="22" height="35" rx="2" />
              <rect x="138" y="268" width="22" height="35" rx="2" />
              <rect x="166" y="268" width="22" height="35" rx="2" />
              <rect x="194" y="268" width="22" height="35" rx="2" />
              <rect x="222" y="268" width="22" height="35" rx="2" />
            </g>
          </g>

          {/* Tall iconic palm tree right side */}
          <path d="M 360 300 Q 358 220 363 140 Q 366 105 362 80" stroke="#451a03" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "362px 80px" }} className="animate-[sway_5s_ease-in-out_infinite]">
            <path d="M 362 80 Q 335 65 318 70" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 362 80 Q 387 60 400 65" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 362 80 Q 348 45 332 35" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 362 80 Q 378 45 392 35" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 362 80 Q 362 40 365 25" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" />
          </g>

          {/* Sand foreground */}
          <path d="M 0 280 Q 100 275 200 280 T 400 280 L 400 300 L 0 300 Z" fill="#fde68a" opacity="0.7" />
        </svg>
      );

    // ============================================================
    // LOS ANGELES — Massive HOLLYWOOD sign on hills + sunset
    // ============================================================
    case "los-angeles-ca":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="laSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#ea580c" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="laSun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dramatic sunset sky */}
          <rect x="0" y="0" width="400" height="300" fill="url(#laSky)" />

          {/* HUGE setting sun behind hills */}
          <circle cx="200" cy="220" r="100" fill="url(#laSun)" className="animate-[pulse_5s_ease-in-out_infinite]" />
          <circle cx="200" cy="220" r="65" fill="#fef3c7" opacity="0.95" />

          {/* Distant mountains layer */}
          <path
            d="M 0 215 L 60 180 L 110 195 L 160 165 L 220 185 L 280 170 L 340 190 L 400 175 L 400 300 L 0 300 Z"
            fill="#7c2d12"
            opacity="0.55"
          />

          {/* Front Hollywood Hills (where the sign sits) */}
          <path
            d="M 0 270 Q 70 230 140 240 Q 200 250 260 235 Q 320 225 400 245 L 400 300 L 0 300 Z"
            fill="#451a03"
            opacity="0.85"
          />

          {/* MASSIVE HOLLYWOOD SIGN — fills the upper-middle of the card */}
          {/* Each letter is much bigger and bolder now */}
          <g fill="#f8fafc" stroke="#0f172a" strokeWidth="1">
            {/* H */}
            <g transform="translate(60, 145)">
              <rect x="0" y="0" width="6" height="40" />
              <rect x="0" y="17" width="20" height="6" />
              <rect x="14" y="0" width="6" height="40" />
            </g>
            {/* O */}
            <g transform="translate(90, 147)">
              <rect x="0" y="0" width="6" height="38" />
              <rect x="14" y="0" width="6" height="38" />
              <rect x="0" y="0" width="20" height="6" />
              <rect x="0" y="32" width="20" height="6" />
            </g>
            {/* L */}
            <g transform="translate(120, 149)">
              <rect x="0" y="0" width="6" height="36" />
              <rect x="0" y="30" width="18" height="6" />
            </g>
            {/* L */}
            <g transform="translate(146, 150)">
              <rect x="0" y="0" width="6" height="35" />
              <rect x="0" y="29" width="18" height="6" />
            </g>
            {/* Y */}
            <g transform="translate(172, 152)">
              <rect x="0" y="0" width="6" height="18" />
              <rect x="14" y="0" width="6" height="18" />
              <rect x="6" y="14" width="8" height="20" />
            </g>
            {/* W */}
            <g transform="translate(199, 154)">
              <rect x="0" y="0" width="6" height="34" />
              <rect x="9" y="18" width="6" height="16" />
              <rect x="18" y="0" width="6" height="34" />
            </g>
            {/* O */}
            <g transform="translate(231, 156)">
              <rect x="0" y="0" width="6" height="32" />
              <rect x="14" y="0" width="6" height="32" />
              <rect x="0" y="0" width="20" height="6" />
              <rect x="0" y="26" width="20" height="6" />
            </g>
            {/* O */}
            <g transform="translate(259, 158)">
              <rect x="0" y="0" width="6" height="30" />
              <rect x="14" y="0" width="6" height="30" />
              <rect x="0" y="0" width="20" height="6" />
              <rect x="0" y="24" width="20" height="6" />
            </g>
            {/* D */}
            <g transform="translate(287, 160)">
              <rect x="0" y="0" width="6" height="28" />
              <rect x="0" y="0" width="16" height="6" />
              <rect x="0" y="22" width="16" height="6" />
              <rect x="14" y="0" width="6" height="28" />
            </g>
          </g>

          {/* Iconic LA palm trees flanking */}
          <path d="M 25 300 Q 23 220 28 110" stroke="#0c0a09" strokeWidth="4" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "28px 110px" }} className="animate-[sway_7s_ease-in-out_infinite]">
            <path d="M 28 110 Q 5 95 -5 105" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 28 110 Q 50 95 60 105" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 28 110 Q 18 80 5 70" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 28 110 Q 38 80 50 70" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 28 110 Q 28 75 30 60" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>

          <path d="M 380 300 Q 378 230 383 130" stroke="#0c0a09" strokeWidth="4" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "383px 130px" }} className="animate-[sway_5s_ease-in-out_infinite]">
            <path d="M 383 130 Q 360 115 350 125" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 383 130 Q 405 115 415 125" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 383 130 Q 372 100 360 90" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 383 130 Q 393 100 405 90" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      );

    // ============================================================
    // NEW YORK — Empire State as massive hero, Chrysler beside
    // ============================================================
    case "new-york-ny":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="nycSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c0a4d" stopOpacity="1" />
              <stop offset="40%" stopColor="#5b21b6" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="nycGlow" cx="0.5" cy="0.7" r="0.6">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Twilight Manhattan sky */}
          <rect x="0" y="0" width="400" height="300" fill="url(#nycSky)" />
          <rect x="0" y="0" width="400" height="300" fill="url(#nycGlow)" />

          {/* Moon */}
          <circle cx="65" cy="55" r="20" fill="#fef3c7" opacity="0.95" />
          <circle cx="60" cy="50" r="6" fill="#fbbf24" opacity="0.4" />

          {/* Stars */}
          <g fill="#fef3c7" opacity="0.95">
            <circle cx="120" cy="35" r="1.2" />
            <circle cx="180" cy="50" r="0.9" />
            <circle cx="240" cy="30" r="1" />
            <circle cx="300" cy="55" r="1" />
            <circle cx="350" cy="40" r="1.2" />
          </g>

          {/* Distant Brooklyn skyline (back layer) */}
          <g fill="#0f172a" opacity="0.55">
            <rect x="0" y="220" width="40" height="80" />
            <rect x="35" y="200" width="30" height="100" />
            <rect x="60" y="215" width="40" height="85" />
          </g>

          {/* CHRYSLER BUILDING — distinctive stepped Art Deco crown */}
          <g fill="#0f172a" opacity="0.95">
            <rect x="115" y="155" width="38" height="145" />
            {/* Stepped crown - 3 tiers of arches */}
            <path d="M 115 155 L 115 142 L 121 135 L 127 128 L 134 121 L 141 128 L 147 135 L 153 142 L 153 155 Z" />
            <path d="M 121 135 L 121 122 L 127 113 L 134 104 L 141 113 L 147 122 L 147 135 Z" />
            <path d="M 127 113 L 127 100 L 134 88 L 141 100 L 141 113 Z" />
            {/* Spire */}
            <line x1="134" y1="88" x2="134" y2="48" stroke="#0f172a" strokeWidth="3.5" />
            <circle cx="134" cy="50" r="2" fill="#dc2626" className="animate-[pulse_2s_ease-in-out_infinite]" />
          </g>
          {/* Chrysler windows */}
          <g fill="#fbbf24" opacity="0.85">
            <rect x="120" y="170" width="2" height="2" />
            <rect x="130" y="190" width="2" height="2" />
            <rect x="140" y="210" width="2" height="2" />
            <rect x="120" y="240" width="2" height="2" />
            <rect x="145" y="260" width="2" height="2" />
            <rect x="125" y="280" width="2" height="2" />
          </g>

          {/* EMPIRE STATE BUILDING — the hero, much bigger */}
          <g fill="#0f172a" opacity="0.97">
            {/* Wide base */}
            <rect x="200" y="195" width="80" height="105" />
            {/* First setback */}
            <rect x="208" y="170" width="64" height="25" />
            {/* Second setback */}
            <rect x="215" y="140" width="50" height="30" />
            {/* Third setback */}
            <rect x="222" y="110" width="36" height="30" />
            {/* Tower */}
            <rect x="228" y="80" width="24" height="30" />
            {/* Observation deck */}
            <rect x="232" y="65" width="16" height="15" />
            {/* Antenna mast */}
            <rect x="238" y="35" width="4" height="30" />
            <line x1="240" y1="35" x2="240" y2="15" stroke="#0f172a" strokeWidth="2.5" />
            {/* Iconic red beacon at top */}
            <circle cx="240" cy="20" r="3" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
          </g>
          {/* Empire State window lights — warm glow rows */}
          <g fill="#fbbf24" opacity="0.9">
            <rect x="208" y="210" width="2" height="2" />
            <rect x="220" y="220" width="2" height="2" />
            <rect x="235" y="215" width="2" height="2" />
            <rect x="250" y="225" width="2" height="2" />
            <rect x="265" y="220" width="2" height="2" />
            <rect x="275" y="240" width="2" height="2" />
            <rect x="218" y="250" width="2" height="2" />
            <rect x="240" y="260" width="2" height="2" />
            <rect x="260" y="280" width="2" height="2" />
            <rect x="220" y="180" width="2" height="2" />
            <rect x="245" y="180" width="2" height="2" />
            <rect x="265" y="180" width="2" height="2" />
            <rect x="225" y="150" width="2" height="2" />
            <rect x="245" y="150" width="2" height="2" />
            <rect x="232" y="120" width="2" height="2" />
            <rect x="245" y="120" width="2" height="2" />
            <rect x="234" y="90" width="2" height="2" />
            <rect x="245" y="90" width="2" height="2" />
          </g>

          {/* Other skyline buildings right side */}
          <g fill="#1e293b" opacity="0.85">
            <rect x="295" y="180" width="35" height="120" />
            <rect x="328" y="160" width="40" height="140" />
            <rect x="365" y="200" width="35" height="100" />
          </g>
          {/* Right side window lights */}
          <g fill="#fbbf24" opacity="0.7">
            <rect x="300" y="220" width="2" height="2" />
            <rect x="320" y="240" width="2" height="2" />
            <rect x="340" y="200" width="2" height="2" />
            <rect x="355" y="240" width="2" height="2" />
            <rect x="375" y="240" width="2" height="2" />
          </g>
        </svg>
      );

    // ============================================================
    // DALLAS — Reunion Tower MASSIVE hero + skyline + Texas star
    // ============================================================
    case "dallas-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="dallasSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#7c2d12" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Texas sunset */}
          <rect x="0" y="0" width="400" height="300" fill="url(#dallasSky)" />

          {/* Lone Star Texas symbol — slow rotation, larger */}
          <g style={{ transformOrigin: "335px 70px" }} className="animate-[spin_60s_linear_infinite]">
            <polygon
              points="335,30 348,67 387,67 357,89 367,127 335,105 303,127 313,89 283,67 322,67"
              fill="#fbbf24"
              opacity="0.9"
            />
            <polygon
              points="335,40 345,67 372,67 351,82 360,108 335,93 310,108 319,82 298,67 325,67"
              fill="#fef3c7"
              opacity="0.4"
            />
          </g>

          {/* REUNION TOWER — much bigger now, the hero of the card */}
          <g style={{ transformOrigin: "150px 200px" }}>
            {/* Three triangular legs (the iconic shaft) */}
            <path d="M 145 130 L 130 295 L 138 295 L 150 130 Z" fill="#0f172a" opacity="0.95" />
            <path d="M 150 130 L 145 295 L 155 295 L 150 130 Z" fill="#1e293b" opacity="0.95" />
            <path d="M 155 130 L 162 295 L 170 295 L 155 130 Z" fill="#0f172a" opacity="0.95" />

            {/* Cross-bracing */}
            <line x1="135" y1="280" x2="167" y2="280" stroke="#0f172a" strokeWidth="2" opacity="0.85" />
            <line x1="138" y1="240" x2="163" y2="240" stroke="#0f172a" strokeWidth="2" opacity="0.7" />
            <line x1="141" y1="200" x2="159" y2="200" stroke="#0f172a" strokeWidth="2" opacity="0.7" />
            <line x1="144" y1="160" x2="156" y2="160" stroke="#0f172a" strokeWidth="2" opacity="0.7" />

            {/* THE FAMOUS BALL — much bigger and more detailed */}
            <circle cx="150" cy="115" r="38" fill="#0f172a" opacity="0.97" />
            <circle cx="150" cy="115" r="32" fill="#1e293b" opacity="0.95" />

            {/* Geodesic dot pattern — the lit spheres that form Dallas' skyline signature */}
            <g fill="#fbbf24" className="animate-[pulse_3s_ease-in-out_infinite]">
              {/* Top row */}
              <circle cx="142" cy="92" r="2" />
              <circle cx="150" cy="89" r="2" />
              <circle cx="158" cy="92" r="2" />
              {/* Row 2 */}
              <circle cx="135" cy="100" r="2" />
              <circle cx="145" cy="98" r="2" />
              <circle cx="155" cy="98" r="2" />
              <circle cx="165" cy="100" r="2" />
              {/* Row 3 (middle) */}
              <circle cx="130" cy="110" r="2" />
              <circle cx="140" cy="108" r="2" />
              <circle cx="150" cy="107" r="2.5" />
              <circle cx="160" cy="108" r="2" />
              <circle cx="170" cy="110" r="2" />
              {/* Row 4 */}
              <circle cx="130" cy="120" r="2" />
              <circle cx="140" cy="120" r="2" />
              <circle cx="150" cy="120" r="2" />
              <circle cx="160" cy="120" r="2" />
              <circle cx="170" cy="120" r="2" />
              {/* Row 5 */}
              <circle cx="135" cy="130" r="2" />
              <circle cx="145" cy="132" r="2" />
              <circle cx="155" cy="132" r="2" />
              <circle cx="165" cy="130" r="2" />
              {/* Bottom */}
              <circle cx="142" cy="138" r="2" />
              <circle cx="150" cy="140" r="2" />
              <circle cx="158" cy="138" r="2" />
            </g>

            {/* Halo around ball */}
            <circle cx="150" cy="115" r="48" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.4" />

            {/* Antenna spike */}
            <line x1="150" y1="78" x2="150" y2="40" stroke="#0f172a" strokeWidth="2" />
            <circle cx="150" cy="46" r="2.5" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
          </g>

          {/* Bank of America Plaza — distinctive Dallas building with green argon edges */}
          <g fill="#0f172a" opacity="0.93">
            <rect x="245" y="125" width="40" height="175" />
            {/* Tapered top */}
            <rect x="252" y="105" width="26" height="20" />
            <rect x="258" y="92" width="14" height="13" />
          </g>
          {/* Iconic green argon edge lighting */}
          <g fill="#10b981" opacity="0.85">
            <rect x="243" y="135" width="2" height="160" />
            <rect x="285" y="135" width="2" height="160" />
          </g>
          {/* BoA window lights */}
          <g fill="#fbbf24" opacity="0.7">
            <rect x="252" y="160" width="2" height="2" />
            <rect x="265" y="180" width="2" height="2" />
            <rect x="275" y="220" width="2" height="2" />
            <rect x="258" y="240" width="2" height="2" />
            <rect x="278" y="270" width="2" height="2" />
          </g>

          {/* Background skyline */}
          <g fill="#1e293b" opacity="0.65">
            <rect x="195" y="220" width="40" height="80" />
            <rect x="295" y="195" width="30" height="105" />
            <rect x="325" y="215" width="35" height="85" />
            <rect x="360" y="180" width="40" height="120" />
          </g>
        </svg>
      );

    // ============================================================
    // AUSTIN — Capitol dome MASSIVE + Frost Bank "Owl"
    // ============================================================
    case "austin-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="austinSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b21b6" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#ea580c" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#fbbf24" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Austin sunset */}
          <rect x="0" y="0" width="400" height="300" fill="url(#austinSky)" />

          {/* Big sun */}
          <circle cx="60" cy="80" r="28" fill="#fef3c7" opacity="0.95" className="animate-[pulse_4s_ease-in-out_infinite]" />
          <circle cx="60" cy="80" r="40" fill="#fbbf24" opacity="0.4" />

          {/* TEXAS STATE CAPITOL — pink granite dome, MUCH bigger */}
          <g>
            {/* Wide stately base */}
            <rect x="80" y="240" width="170" height="60" fill="#fda4af" opacity="0.95" />
            {/* Cornice */}
            <rect x="75" y="232" width="180" height="10" fill="#fb7185" opacity="0.95" />
            {/* Pediment / portico */}
            <rect x="100" y="210" width="130" height="22" fill="#fda4af" opacity="0.95" />
            <polygon points="100,210 165,180 230,210" fill="#fb7185" opacity="0.95" />

            {/* Columns (more, taller) */}
            <g fill="#fda4af" opacity="0.98">
              <rect x="105" y="218" width="6" height="72" />
              <rect x="125" y="218" width="6" height="72" />
              <rect x="145" y="218" width="6" height="72" />
              <rect x="165" y="218" width="6" height="72" />
              <rect x="185" y="218" width="6" height="72" />
              <rect x="205" y="218" width="6" height="72" />
              <rect x="225" y="218" width="6" height="72" />
            </g>
            {/* Column capitals */}
            <g fill="#fb7185" opacity="0.95">
              <rect x="103" y="216" width="10" height="3" />
              <rect x="123" y="216" width="10" height="3" />
              <rect x="143" y="216" width="10" height="3" />
              <rect x="163" y="216" width="10" height="3" />
              <rect x="183" y="216" width="10" height="3" />
              <rect x="203" y="216" width="10" height="3" />
              <rect x="223" y="216" width="10" height="3" />
            </g>

            {/* Drum (cylinder beneath dome) */}
            <rect x="125" y="160" width="80" height="22" fill="#fda4af" opacity="0.95" />
            {/* Drum columns/windows */}
            <g stroke="#9f1239" strokeWidth="0.8" opacity="0.6">
              <line x1="135" y1="165" x2="135" y2="180" />
              <line x1="148" y1="165" x2="148" y2="180" />
              <line x1="161" y1="165" x2="161" y2="180" />
              <line x1="174" y1="165" x2="174" y2="180" />
              <line x1="187" y1="165" x2="187" y2="180" />
              <line x1="200" y1="165" x2="200" y2="180" />
            </g>

            {/* THE BIG DOME — pink granite */}
            <ellipse cx="165" cy="160" rx="50" ry="40" fill="#fb7185" opacity="0.97" />
            {/* Highlight */}
            <ellipse cx="155" cy="148" rx="22" ry="16" fill="#fecaca" opacity="0.5" />

            {/* Lantern on top of dome */}
            <rect x="158" y="110" width="14" height="16" fill="#fda4af" />
            <rect x="153" y="105" width="24" height="6" fill="#fb7185" />
            {/* Mini-dome on lantern */}
            <ellipse cx="165" cy="105" rx="12" ry="6" fill="#fb7185" />

            {/* Goddess of Liberty statue */}
            <line x1="165" y1="100" x2="165" y2="83" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="165" cy="80" r="4" fill="#fbbf24" />
            {/* Goddess holding the Lone Star aloft */}
            <line x1="165" y1="78" x2="170" y2="65" stroke="#fbbf24" strokeWidth="1.5" />

            {/* THE LONE STAR — animated */}
            <g style={{ transformOrigin: "172px 60px" }} className="animate-[pulse_2s_ease-in-out_infinite]">
              <polygon
                points="172,48 176,58 187,58 178,65 181,76 172,69 163,76 166,65 157,58 168,58"
                fill="#fbbf24"
              />
            </g>
          </g>

          {/* FROST BANK TOWER — "The Owl" with iconic dual-peak crown */}
          <g fill="#0f172a" opacity="0.95">
            <rect x="290" y="150" width="35" height="150" />
            {/* The "owl" crown - distinctive twin peaks like ears */}
            <polygon points="285,150 300,118 307,150" />
            <polygon points="308,150 315,118 323,150" />
            <polygon points="324,150 330,118 338,150" />
            {/* Connecting roof */}
            <rect x="288" y="148" width="40" height="4" />
          </g>
          {/* Glass facade lighting */}
          <g fill="#06b6d4" opacity="0.6">
            <rect x="293" y="165" width="28" height="3" />
            <rect x="293" y="185" width="28" height="3" />
            <rect x="293" y="205" width="28" height="3" />
            <rect x="293" y="225" width="28" height="3" />
            <rect x="293" y="245" width="28" height="3" />
            <rect x="293" y="265" width="28" height="3" />
          </g>

          {/* Other Austin skyline */}
          <g fill="#1e293b" opacity="0.65">
            <rect x="335" y="200" width="30" height="100" />
            <rect x="365" y="220" width="35" height="80" />
          </g>

          {/* Bats from Congress Bridge — silhouettes */}
          <g fill="#1e293b" opacity="0.8" className="animate-[float_4s_ease-in-out_infinite]">
            <path d="M 280 65 Q 286 60 290 65 Q 294 60 300 65 L 296 70 Q 293 68 290 70 Q 287 68 284 70 Z" />
            <path d="M 310 35 Q 316 30 320 35 Q 324 30 330 35 L 326 40 Q 323 38 320 40 Q 317 38 314 40 Z" />
            <path d="M 350 55 Q 356 50 360 55 Q 364 50 370 55 L 366 60 Q 363 58 360 60 Q 357 58 354 60 Z" />
          </g>
        </svg>
      );

    // ============================================================
    // HOUSTON — MASSIVE Saturn V rocket dominating, deep space
    // ============================================================
    case "houston-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="houstonSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c0a4d" stopOpacity="1" />
              <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="rocketGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep space night sky */}
          <rect x="0" y="0" width="400" height="300" fill="url(#houstonSky)" />

          {/* Engine flame glow halo */}
          <circle cx="180" cy="240" r="80" fill="url(#rocketGlow)" />

          {/* Stars */}
          <g fill="#fef3c7">
            <circle cx="50" cy="30" r="1.5" />
            <circle cx="100" cy="20" r="1" />
            <circle cx="320" cy="35" r="1.5" />
            <circle cx="380" cy="25" r="1" />
            <circle cx="280" cy="65" r="1.2" />
            <circle cx="60" cy="80" r="0.9" />
            <circle cx="350" cy="80" r="1" />
            <circle cx="40" cy="120" r="0.9" />
            <circle cx="370" cy="130" r="1" />
            <circle cx="35" cy="180" r="0.8" />
            <circle cx="380" cy="200" r="1" />
          </g>

          {/* Earth in distance */}
          <circle cx="340" cy="80" r="22" fill="#1e40af" opacity="0.85" />
          <circle cx="335" cy="75" r="6" fill="#10b981" opacity="0.7" />
          <circle cx="345" cy="85" r="4" fill="#10b981" opacity="0.5" />
          <ellipse cx="340" cy="90" rx="15" ry="2" fill="#06b6d4" opacity="0.4" />

          {/* SATURN V — massive, dominating */}
          <g style={{ transformOrigin: "180px 230px" }} className="animate-[float_8s_ease-in-out_infinite]">
            {/* Nose cone (very top) */}
            <polygon points="170,30 190,30 180,5" fill="#f8fafc" />
            {/* Capsule */}
            <path d="M 168 30 L 192 30 L 195 50 L 165 50 Z" fill="#f8fafc" />
            {/* Stage 3 (top, slim) */}
            <rect x="170" y="50" width="20" height="35" fill="#f8fafc" />
            <rect x="170" y="76" width="20" height="6" fill="#0f172a" />
            {/* Stage 2 (wider) */}
            <rect x="160" y="85" width="40" height="65" fill="#f8fafc" />
            {/* USA red & white stripes */}
            <rect x="160" y="105" width="40" height="4" fill="#dc2626" />
            <rect x="160" y="113" width="40" height="4" fill="#dc2626" />
            <rect x="160" y="121" width="40" height="4" fill="#dc2626" />
            {/* "USA" letters */}
            <text x="180" y="143" fontSize="9" fontFamily="Arial" fontWeight="900" fill="#0f172a" textAnchor="middle">USA</text>
            {/* Window porthole */}
            <circle cx="180" cy="93" r="4" fill="#3b82f6" opacity="0.95" stroke="#0f172a" strokeWidth="1" />
            {/* Stage 1 (widest, bottom) */}
            <rect x="150" y="150" width="60" height="80" fill="#f8fafc" />
            {/* Black stripe accents (Saturn V signature) */}
            <rect x="150" y="170" width="60" height="8" fill="#0f172a" />
            <rect x="150" y="200" width="60" height="8" fill="#0f172a" />
            {/* Engine bell */}
            <path d="M 152 230 L 156 250 L 204 250 L 208 230 Z" fill="#475569" />
            <path d="M 156 250 L 160 260 L 200 260 L 204 250 Z" fill="#1e293b" />

            {/* Fins */}
            <path d="M 150 215 L 130 245 L 150 235 Z" fill="#dc2626" />
            <path d="M 210 215 L 230 245 L 210 235 Z" fill="#dc2626" />

            {/* MASSIVE flame trail */}
            <g className="animate-[flicker_0.5s_ease-in-out_infinite]">
              <path d="M 156 260 L 165 290 L 180 300 L 195 290 L 204 260 Z" fill="#f97316" />
              <path d="M 162 260 L 170 285 L 180 295 L 190 285 L 198 260 Z" fill="#fbbf24" />
              <path d="M 168 260 L 175 280 L 180 290 L 185 280 L 192 260 Z" fill="#fef3c7" />
            </g>
          </g>

          {/* Smoke trail at very bottom */}
          <ellipse cx="180" cy="290" rx="35" ry="6" fill="#cbd5e1" opacity="0.4" />
          <ellipse cx="180" cy="298" rx="50" ry="5" fill="#94a3b8" opacity="0.3" />

          {/* Houston skyline silhouettes left and right */}
          <g fill="#0f172a" opacity="0.9">
            {/* Left */}
            <rect x="0" y="240" width="35" height="60" />
            <rect x="35" y="220" width="30" height="80" />
            <rect x="65" y="245" width="40" height="55" />
            {/* Right - Williams Tower obelisk */}
            <rect x="240" y="170" width="22" height="130" />
            <polygon points="240,170 251,150 262,170" />
            <polygon points="246,150 251,142 256,150" />
            {/* JPMorgan Chase Tower */}
            <rect x="270" y="190" width="28" height="110" />
            <rect x="275" y="180" width="18" height="10" />
            {/* Other */}
            <rect x="305" y="220" width="30" height="80" />
            <rect x="335" y="240" width="65" height="60" />
          </g>

          {/* Williams Tower beacon */}
          <circle cx="251" cy="146" r="2" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
          {/* Window lights */}
          <g fill="#fbbf24" opacity="0.75">
            <rect x="246" y="220" width="2" height="2" />
            <rect x="255" y="240" width="2" height="2" />
            <rect x="280" y="220" width="2" height="2" />
            <rect x="290" y="260" width="2" height="2" />
            <rect x="315" y="250" width="2" height="2" />
            <rect x="345" y="270" width="2" height="2" />
          </g>
        </svg>
      );

    // ============================================================
    // PHOENIX — Camelback Mountain MASSIVE + saguaro silhouette
    // ============================================================
    case "phoenix-az":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="phxSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#dc2626" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#f97316" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="phxSun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sonoran sunset sky */}
          <rect x="0" y="0" width="400" height="300" fill="url(#phxSky)" />

          {/* MASSIVE desert sun */}
          <circle cx="200" cy="140" r="65" fill="url(#phxSun)" className="animate-[pulse_4s_ease-in-out_infinite]" />
          <circle cx="200" cy="140" r="40" fill="#fef3c7" opacity="0.98" />

          {/* Atmospheric heat shimmer above mountain */}
          <ellipse cx="200" cy="195" rx="160" ry="8" fill="#fbbf24" opacity="0.3" />

          {/* CAMELBACK MOUNTAIN — much more dramatic and clearly camel-shaped */}
          {/* The whole massive silhouette */}
          <path
            d="M 0 230
               L 30 215
               L 70 200
               L 110 175
               Q 130 155 145 165
               L 170 180
               Q 180 195 195 195
               L 220 195
               Q 235 175 250 145
               Q 270 130 290 145
               Q 310 165 330 195
               L 365 215
               L 400 225
               L 400 300 L 0 300 Z"
            fill="#7c2d12"
            opacity="0.95"
          />

          {/* The "camel head" peak (left) — distinctly head-shaped */}
          <path
            d="M 110 175 Q 130 155 145 165 L 170 180 Q 180 195 195 195 L 195 220 L 110 220 Z"
            fill="#92400e"
            opacity="0.85"
          />
          {/* Detail: camel's "ear" on the head */}
          <path d="M 130 170 L 138 158 L 142 170" fill="#7c2d12" opacity="0.8" />

          {/* The "camel hump" peak (right) — taller */}
          <path
            d="M 220 195 Q 235 175 250 145 Q 270 130 290 145 Q 310 165 330 195 L 330 220 L 220 220 Z"
            fill="#92400e"
            opacity="0.8"
          />

          {/* Mountain ridge highlights catching sunset */}
          <path d="M 145 165 L 170 180" stroke="#fb923c" strokeWidth="1.5" opacity="0.7" />
          <path d="M 250 145 Q 270 130 290 145" stroke="#fb923c" strokeWidth="1.5" opacity="0.7" />
          <path d="M 110 175 Q 90 185 70 200" stroke="#dc2626" strokeWidth="1" opacity="0.5" />

          {/* Distant background mountain layer for depth */}
          <path
            d="M 0 240 L 60 220 L 130 230 L 200 215 L 280 225 L 350 215 L 400 230 L 400 250 L 0 250 Z"
            fill="#451a03"
            opacity="0.4"
          />

          {/* Foreground desert floor */}
          <path d="M 0 280 Q 100 275 200 280 T 400 280 L 400 300 L 0 300 Z" fill="#fde68a" opacity="0.6" />

          {/* GIANT hero saguaro cactus left - much taller and more detailed */}
          <g fill="#15803d" opacity="0.97">
            {/* Massive trunk */}
            <rect x="40" y="120" width="28" height="180" rx="14" />
            {/* Vertical ribs */}
            <line x1="46" y1="135" x2="46" y2="290" stroke="#166534" strokeWidth="1" opacity="0.7" />
            <line x1="54" y1="130" x2="54" y2="290" stroke="#166534" strokeWidth="1" opacity="0.7" />
            <line x1="62" y1="135" x2="62" y2="290" stroke="#166534" strokeWidth="1" opacity="0.7" />
            {/* Left arm */}
            <rect x="0" y="170" width="50" height="16" rx="8" />
            <rect x="0" y="170" width="16" height="50" rx="8" />
            {/* Right arm — bigger, raised higher */}
            <rect x="62" y="140" width="50" height="16" rx="8" />
            <rect x="96" y="100" width="16" height="56" rx="8" />
            {/* Tiny third arm */}
            <rect x="62" y="200" width="30" height="12" rx="6" />
            <rect x="80" y="190" width="12" height="22" rx="6" />
            {/* Cactus flowers (white blooms — saguaros bloom this way) */}
            <circle cx="54" cy="125" r="3" fill="#fef3c7" opacity="0.9" />
            <circle cx="104" cy="98" r="2.5" fill="#fef3c7" opacity="0.9" />
          </g>

          {/* Smaller saguaros for context */}
          <g fill="#16a34a" opacity="0.8">
            <rect x="328" y="225" width="14" height="75" rx="7" />
            <rect x="342" y="240" width="22" height="10" rx="5" />
            <rect x="354" y="232" width="9" height="22" rx="4.5" />
          </g>

          <g fill="#16a34a" opacity="0.7">
            <rect x="280" y="245" width="12" height="55" rx="6" />
            <rect x="265" y="258" width="20" height="9" rx="4.5" />
          </g>

          {/* Roadrunner silhouette running */}
          <g fill="#0f172a" opacity="0.85" transform="translate(180, 285)">
            <ellipse cx="0" cy="0" rx="11" ry="5" />
            <path d="M -10 -1 L -17 -3 L -12 1 Z" />
            <path d="M 8 -2 L 16 -1 L 8 2 Z" />
            <line x1="-3" y1="4" x2="-4" y2="9" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="3" y1="4" x2="2" y2="9" stroke="#0f172a" strokeWidth="1.2" />
            {/* Crest feathers */}
            <line x1="-8" y1="-3" x2="-10" y2="-7" stroke="#0f172a" strokeWidth="0.8" />
            <line x1="-7" y1="-3" x2="-7" y2="-8" stroke="#0f172a" strokeWidth="0.8" />
          </g>
        </svg>
      );

    // ============================================================
    // ATLANTA — BoA pyramid MASSIVE glowing + Westin cylinder
    // ============================================================
    case "atlanta-ga":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="atlSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#5b21b6" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#fb923c" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="atlPyramidGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Atlanta dusk sky */}
          <rect x="0" y="0" width="400" height="300" fill="url(#atlSky)" />

          {/* Stars */}
          <g fill="#fef3c7" opacity="0.85">
            <circle cx="50" cy="30" r="1" />
            <circle cx="120" cy="20" r="1.2" />
            <circle cx="380" cy="35" r="1" />
            <circle cx="320" cy="55" r="0.9" />
          </g>

          {/* Floating peach (Georgia state symbol) — top right */}
          <g style={{ transformOrigin: "350px 65px" }} className="animate-[float_7s_ease-in-out_infinite]">
            <ellipse cx="350" cy="65" rx="22" ry="24" fill="#fb923c" opacity="0.95" />
            <ellipse cx="345" cy="58" rx="8" ry="9" fill="#fdba74" opacity="0.8" />
            <path d="M 350 41 Q 348 65 350 89" stroke="#c2410c" strokeWidth="0.6" fill="none" opacity="0.6" />
            <path d="M 350 39 Q 354 33 358 31" stroke="#15803d" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="362" cy="32" rx="7" ry="3" fill="#16a34a" opacity="0.9" transform="rotate(30 362 32)" />
          </g>

          {/* BANK OF AMERICA PLAZA — MASSIVE dominant building */}
          {/* The pyramid glow halo */}
          <circle cx="180" cy="60" r="70" fill="url(#atlPyramidGlow)" />

          <g>
            {/* Tall main shaft - much bigger */}
            <rect x="155" y="115" width="50" height="185" fill="#0f172a" opacity="0.97" />

            {/* Tapered top section */}
            <polygon points="155,115 162,98 198,98 205,115" fill="#0f172a" opacity="0.97" />

            {/* THE FAMOUS GOLD PYRAMID SPIRE — much more prominent */}
            <polygon points="162,98 180,40 198,98" fill="#fbbf24" opacity="0.85" />
            {/* Inner gold layers for depth */}
            <polygon points="166,98 180,55 194,98" fill="#fde68a" opacity="0.65" />
            <polygon points="170,98 180,70 190,98" fill="#fef3c7" opacity="0.55" />

            {/* Gold edge highlights */}
            <line x1="180" y1="40" x2="162" y2="98" stroke="#fbbf24" strokeWidth="3" opacity="0.95" />
            <line x1="180" y1="40" x2="198" y2="98" stroke="#fbbf24" strokeWidth="3" opacity="0.95" />

            {/* Pyramid tip beacon */}
            <circle cx="180" cy="38" r="3.5" fill="#fef3c7" className="animate-[pulse_2s_ease-in-out_infinite]" />
            <circle cx="180" cy="38" r="6" fill="#fbbf24" opacity="0.5" />

            {/* Window light grid on building shaft */}
            <g fill="#fbbf24" opacity="0.65">
              <rect x="160" y="130" width="2" height="2" />
              <rect x="170" y="130" width="2" height="2" />
              <rect x="180" y="130" width="2" height="2" />
              <rect x="190" y="130" width="2" height="2" />
              <rect x="200" y="130" width="2" height="2" />
              <rect x="160" y="155" width="2" height="2" />
              <rect x="180" y="155" width="2" height="2" />
              <rect x="200" y="155" width="2" height="2" />
              <rect x="170" y="180" width="2" height="2" />
              <rect x="190" y="180" width="2" height="2" />
              <rect x="160" y="210" width="2" height="2" />
              <rect x="180" y="210" width="2" height="2" />
              <rect x="200" y="210" width="2" height="2" />
              <rect x="170" y="240" width="2" height="2" />
              <rect x="190" y="240" width="2" height="2" />
              <rect x="160" y="270" width="2" height="2" />
              <rect x="180" y="270" width="2" height="2" />
              <rect x="200" y="270" width="2" height="2" />
            </g>
          </g>

          {/* WESTIN PEACHTREE PLAZA — cylindrical tower right side */}
          <g fill="#0f172a" opacity="0.9">
            <ellipse cx="265" cy="135" rx="20" ry="6" />
            <rect x="245" y="135" width="40" height="165" />
            <ellipse cx="265" cy="300" rx="20" ry="6" />
          </g>
          {/* Cylindrical glass facade */}
          <g fill="#3b82f6" opacity="0.45">
            <rect x="247" y="140" width="36" height="155" />
          </g>
          <g stroke="#06b6d4" strokeWidth="0.6" opacity="0.7">
            <line x1="251" y1="145" x2="251" y2="290" />
            <line x1="258" y1="145" x2="258" y2="290" />
            <line x1="265" y1="145" x2="265" y2="290" />
            <line x1="272" y1="145" x2="272" y2="290" />
            <line x1="279" y1="145" x2="279" y2="290" />
          </g>
          {/* Westin top observation deck (the rotating restaurant) */}
          <ellipse cx="265" cy="135" rx="22" ry="4" fill="#1e293b" opacity="0.8" />
          {/* Antenna */}
          <line x1="265" y1="129" x2="265" y2="118" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="265" cy="121" r="1.5" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />

          {/* Other ATL skyline buildings */}
          <g fill="#1e293b" opacity="0.75">
            <rect x="100" y="220" width="35" height="80" />
            <rect x="100" y="210" width="35" height="10" />
            <rect x="125" y="180" width="30" height="120" />
            <rect x="295" y="195" width="35" height="105" />
            {/* SunTrust-style with peaked crown */}
            <polygon points="295,195 305,180 320,180 330,195" />
            <rect x="328" y="220" width="35" height="80" />
            <rect x="362" y="240" width="38" height="60" />
          </g>
          {/* Window lights */}
          <g fill="#fbbf24" opacity="0.7">
            <rect x="110" y="240" width="2" height="2" />
            <rect x="125" y="260" width="2" height="2" />
            <rect x="135" y="200" width="2" height="2" />
            <rect x="145" y="240" width="2" height="2" />
            <rect x="305" y="220" width="2" height="2" />
            <rect x="320" y="250" width="2" height="2" />
            <rect x="340" y="240" width="2" height="2" />
            <rect x="375" y="260" width="2" height="2" />
          </g>
        </svg>
      );

    // ============================================================
    // DEFAULT — generic skyline
    // ============================================================
    default:
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="defaultSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="400" height="300" fill="url(#defaultSky)" />
          <g fill="#0f172a" opacity="0.7">
            <rect x="0" y="180" width="50" height="120" />
            <rect x="50" y="160" width="40" height="140" />
            <rect x="90" y="140" width="60" height="160" />
            <rect x="150" y="120" width="50" height="180" />
            <rect x="200" y="150" width="45" height="150" />
            <rect x="245" y="135" width="55" height="165" />
            <rect x="300" y="160" width="45" height="140" />
            <rect x="345" y="170" width="55" height="130" />
          </g>
        </svg>
      );
  }
}
