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

// Anchored to the bottom 60% of the card with stronger opacity so the
// artwork actually shows through. Data sits in the top 40%.
const SHARED_CLASS =
  "absolute -bottom-2 left-0 right-0 h-[65%] w-full opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 origin-bottom";

export function CityArtwork({ slug, className = "" }: CityArtworkProps) {
  const fullClass = `${SHARED_CLASS} ${className}`;

  switch (slug) {
    // ============================================================
    // MIAMI — Art Deco facade + flamingo + ocean (South Beach vibe)
    // ============================================================
    case "miami-fl":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="miamiSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="miamiBuilding" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbcfe8" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Sky gradient */}
          <rect x="0" y="0" width="400" height="200" fill="url(#miamiSky)" opacity="0.7" />

          {/* Pulsing setting sun */}
          <circle cx="320" cy="100" r="28" fill="#fef3c7" opacity="0.95" className="animate-[pulse_4s_ease-in-out_infinite]" />
          <circle cx="320" cy="100" r="40" fill="#fbbf24" opacity="0.4" />

          {/* Iconic Art Deco hotel — pastel pink with curved corner */}
          <g>
            {/* Main building */}
            <rect x="100" y="120" width="120" height="180" rx="6" fill="url(#miamiBuilding)" />
            {/* Curved corner detail (Art Deco hallmark) */}
            <rect x="100" y="120" width="14" height="180" fill="#f9a8d4" />
            {/* Horizontal accent stripes (eyebrows) */}
            <rect x="120" y="155" width="90" height="3" fill="#0891b2" opacity="0.7" />
            <rect x="120" y="200" width="90" height="3" fill="#0891b2" opacity="0.7" />
            {/* Window grid */}
            <g fill="#3b82f6" opacity="0.6">
              <rect x="125" y="170" width="14" height="20" />
              <rect x="148" y="170" width="14" height="20" />
              <rect x="171" y="170" width="14" height="20" />
              <rect x="194" y="170" width="14" height="20" />
              <rect x="125" y="215" width="14" height="20" />
              <rect x="148" y="215" width="14" height="20" />
              <rect x="171" y="215" width="14" height="20" />
              <rect x="194" y="215" width="14" height="20" />
              <rect x="125" y="250" width="14" height="20" />
              <rect x="148" y="250" width="14" height="20" />
              <rect x="171" y="250" width="14" height="20" />
              <rect x="194" y="250" width="14" height="20" />
            </g>
            {/* Hotel rooftop sign */}
            <rect x="135" y="105" width="50" height="15" rx="2" fill="#ec4899" />
          </g>

          {/* Pink flamingo silhouette */}
          <g style={{ transformOrigin: "60px 200px" }} className="animate-[float_5s_ease-in-out_infinite]">
            {/* Body */}
            <ellipse cx="55" cy="220" rx="22" ry="14" fill="#ec4899" opacity="0.95" />
            {/* Neck (S curve) */}
            <path d="M 50 215 Q 35 195 40 175 Q 45 160 55 155" stroke="#ec4899" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.95" />
            {/* Head */}
            <circle cx="55" cy="153" r="5" fill="#ec4899" />
            {/* Beak */}
            <path d="M 56 153 L 65 155 L 56 156 Z" fill="#1e293b" />
            {/* Single leg */}
            <line x1="55" y1="234" x2="55" y2="265" stroke="#ec4899" strokeWidth="2.5" opacity="0.95" />
            <line x1="55" y1="265" x2="62" y2="270" stroke="#ec4899" strokeWidth="2.5" opacity="0.95" />
          </g>

          {/* Tall palm tree right */}
          <path d="M 360 300 Q 358 230 362 165 Q 365 130 360 105" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "360px 105px" }} className="animate-[sway_5s_ease-in-out_infinite]">
            <path d="M 360 105 Q 335 90 318 95" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 360 105 Q 385 88 400 90" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 360 105 Q 345 75 332 65" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 360 105 Q 375 75 388 65" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 360 105 Q 360 70 365 55" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>

          {/* Beach sand */}
          <path d="M 0 270 L 400 270 L 400 300 L 0 300 Z" fill="#fde68a" opacity="0.6" />

          {/* Ocean wave overlay (above sand to bottom) */}
          <path d="M 0 280 Q 50 273 100 280 T 200 280 T 300 280 T 400 280 L 400 300 L 0 300 Z" fill="#06b6d4" opacity="0.7" />
          <path d="M 0 290 Q 60 285 120 290 T 240 290 T 360 290 T 400 290 L 400 300 L 0 300 Z" fill="#0e7490" opacity="0.7" />
        </svg>
      );

    // ============================================================
    // NEW YORK — iconic Empire State + Chrysler Building + Statue of Liberty
    // ============================================================
    case "new-york-ny":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="nycSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Twilight sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#nycSky)" opacity="0.6" />

          {/* Moon */}
          <circle cx="60" cy="60" r="22" fill="#fef3c7" opacity="0.95" />
          <circle cx="55" cy="55" r="6" fill="#fbbf24" opacity="0.4" />

          {/* Stars */}
          <g fill="#fef3c7">
            <circle cx="120" cy="40" r="1" />
            <circle cx="180" cy="55" r="1" />
            <circle cx="240" cy="35" r="1.2" />
            <circle cx="290" cy="60" r="0.8" />
            <circle cx="340" cy="40" r="1" />
            <circle cx="100" cy="80" r="0.8" />
          </g>

          {/* Statue of Liberty silhouette - left edge */}
          <g fill="#0f766e" opacity="0.8">
            {/* Pedestal */}
            <rect x="30" y="220" width="22" height="50" />
            <rect x="34" y="210" width="14" height="10" />
            {/* Body/robe */}
            <path d="M 35 210 L 47 210 L 50 175 L 45 165 L 37 165 L 32 175 Z" />
            {/* Head */}
            <circle cx="41" cy="158" r="5" />
            {/* Crown spikes */}
            <path d="M 36 154 L 36 148 M 38 152 L 38 144 M 41 151 L 41 142 M 44 152 L 44 144 M 46 154 L 46 148" stroke="#0f766e" strokeWidth="1.2" />
            {/* Torch arm raised */}
            <path d="M 47 175 Q 52 160 50 142 Q 48 130 50 118" stroke="#0f766e" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Torch flame */}
            <path d="M 50 118 L 47 110 L 53 112 L 50 105 L 52 112 Z" fill="#fbbf24" />
            <circle cx="50" cy="115" r="5" fill="#fde68a" opacity="0.5" className="animate-[pulse_2s_ease-in-out_infinite]" />
            {/* Tablet in left arm */}
            <rect x="29" y="180" width="6" height="10" fill="#0f766e" />
          </g>

          {/* Far skyline (back layer) */}
          <g fill="#1e293b" opacity="0.55">
            <rect x="80" y="180" width="35" height="120" />
            <rect x="115" y="155" width="28" height="145" />
            <rect x="143" y="170" width="40" height="130" />
          </g>

          {/* CHRYSLER BUILDING — distinctive stepped art-deco crown */}
          <g fill="#0f172a" opacity="0.92">
            {/* Main shaft */}
            <rect x="195" y="135" width="30" height="165" />
            {/* Stepped crown - 3 tiers of arches */}
            <path d="M 195 135 L 195 125 L 200 120 L 205 115 L 210 110 L 215 115 L 220 120 L 225 125 L 225 135 Z" />
            <path d="M 200 120 L 200 110 L 205 102 L 210 95 L 215 102 L 220 110 L 220 120 Z" />
            <path d="M 205 102 L 205 92 L 210 84 L 215 92 L 215 102 Z" />
            {/* Spire */}
            <line x1="210" y1="84" x2="210" y2="55" stroke="#0f172a" strokeWidth="3" />
          </g>

          {/* EMPIRE STATE BUILDING — distinctive setback profile + antenna */}
          <g fill="#0f172a" opacity="0.92">
            {/* Wide base */}
            <rect x="245" y="180" width="55" height="120" />
            {/* First setback */}
            <rect x="252" y="155" width="41" height="25" />
            {/* Second setback */}
            <rect x="258" y="125" width="29" height="30" />
            {/* Tower */}
            <rect x="263" y="95" width="19" height="30" />
            {/* Observation deck */}
            <rect x="266" y="80" width="13" height="15" />
            {/* Antenna */}
            <line x1="272.5" y1="80" x2="272.5" y2="40" stroke="#0f172a" strokeWidth="2" />
            <circle cx="272.5" cy="50" r="2" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
          </g>

          {/* More skyline right */}
          <g fill="#1e293b" opacity="0.7">
            <rect x="305" y="170" width="35" height="130" />
            <rect x="340" y="155" width="40" height="145" />
            <rect x="380" y="180" width="20" height="120" />
          </g>

          {/* Window lights — warm glow */}
          <g fill="#fbbf24" opacity="0.85">
            {/* Empire State lights */}
            <rect x="252" y="195" width="2" height="2" />
            <rect x="262" y="200" width="2" height="2" />
            <rect x="270" y="220" width="2" height="2" />
            <rect x="280" y="230" width="2" height="2" />
            <rect x="290" y="195" width="2" height="2" />
            {/* Chrysler lights */}
            <rect x="200" y="160" width="2" height="2" />
            <rect x="208" y="180" width="2" height="2" />
            <rect x="215" y="200" width="2" height="2" />
            <rect x="220" y="240" width="2" height="2" />
            {/* Other lights */}
            <rect x="100" y="220" width="2" height="2" />
            <rect x="125" y="200" width="2" height="2" />
            <rect x="160" y="210" width="2" height="2" />
            <rect x="320" y="220" width="2" height="2" />
            <rect x="350" y="195" width="2" height="2" />
          </g>
        </svg>
      );

    // ============================================================
    // LOS ANGELES — Hollywood sign + hills + palm trees + sunset
    // ============================================================
    case "los-angeles-ca":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="laSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Warm sunset sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#laSky)" opacity="0.65" />

          {/* Big sun behind hills */}
          <circle cx="200" cy="180" r="55" fill="#fef3c7" opacity="0.9" className="animate-[pulse_5s_ease-in-out_infinite]" />
          <circle cx="200" cy="180" r="80" fill="#fbbf24" opacity="0.4" />

          {/* Distant mountains (back layer) */}
          <path
            d="M 0 200 L 60 160 L 110 175 L 170 145 L 220 165 L 280 155 L 340 170 L 400 150 L 400 300 L 0 300 Z"
            fill="#7c2d12"
            opacity="0.55"
          />

          {/* Front hill where Hollywood sign sits */}
          <path
            d="M 0 245 Q 100 210 200 235 Q 280 250 400 230 L 400 300 L 0 300 Z"
            fill="#92400e"
            opacity="0.7"
          />

          {/* HOLLYWOOD sign - the iconic 9-letter wooden sign */}
          {/* Each letter is a tall white rectangle on the hillside */}
          <g fill="#f8fafc" opacity="0.95" stroke="#1e293b" strokeWidth="0.5">
            {/* H */}
            <g transform="translate(110, 195)">
              <rect x="0" y="0" width="3" height="18" />
              <rect x="0" y="7" width="9" height="3" />
              <rect x="6" y="0" width="3" height="18" />
            </g>
            {/* O */}
            <g transform="translate(125, 196)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="6" y="0" width="3" height="17" />
              <rect x="0" y="0" width="9" height="3" />
              <rect x="0" y="14" width="9" height="3" />
            </g>
            {/* L */}
            <g transform="translate(140, 197)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="0" y="14" width="8" height="3" />
            </g>
            {/* L */}
            <g transform="translate(153, 197)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="0" y="14" width="8" height="3" />
            </g>
            {/* Y */}
            <g transform="translate(166, 197)">
              <rect x="0" y="0" width="3" height="9" />
              <rect x="6" y="0" width="3" height="9" />
              <rect x="3" y="9" width="3" height="9" />
            </g>
            {/* W */}
            <g transform="translate(180, 198)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="4" y="9" width="3" height="8" />
              <rect x="8" y="0" width="3" height="17" />
            </g>
            {/* O */}
            <g transform="translate(197, 198)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="6" y="0" width="3" height="17" />
              <rect x="0" y="0" width="9" height="3" />
              <rect x="0" y="14" width="9" height="3" />
            </g>
            {/* O */}
            <g transform="translate(212, 199)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="6" y="0" width="3" height="17" />
              <rect x="0" y="0" width="9" height="3" />
              <rect x="0" y="14" width="9" height="3" />
            </g>
            {/* D */}
            <g transform="translate(227, 199)">
              <rect x="0" y="0" width="3" height="17" />
              <rect x="0" y="0" width="8" height="3" />
              <rect x="0" y="14" width="8" height="3" />
              <rect x="6" y="0" width="3" height="17" />
            </g>
          </g>

          {/* Tall skinny palms left */}
          <path d="M 60 300 Q 58 220 62 130" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "62px 130px" }} className="animate-[sway_7s_ease-in-out_infinite]">
            <path d="M 62 130 Q 40 115 30 125" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 62 130 Q 85 115 95 125" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 62 130 Q 50 100 40 95" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 62 130 Q 75 100 85 95" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* Tall skinny palms right */}
          <path d="M 350 300 Q 348 220 352 145" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g style={{ transformOrigin: "352px 145px" }} className="animate-[sway_5s_ease-in-out_infinite]">
            <path d="M 352 145 Q 330 130 320 140" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 352 145 Q 375 130 385 140" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 352 145 Q 340 115 330 110" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 352 145 Q 365 115 375 110" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      );

    // ============================================================
    // PHOENIX — Camelback Mountain (iconic camel-shaped) + saguaro forest
    // ============================================================
    case "phoenix-az":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="phxSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#ea580c" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="phxSun" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sonoran sunset sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#phxSky)" opacity="0.7" />

          {/* Big desert sun */}
          <circle cx="200" cy="120" r="50" fill="url(#phxSun)" className="animate-[pulse_4s_ease-in-out_infinite]" />
          <circle cx="200" cy="120" r="32" fill="#fef3c7" opacity="0.95" />

          {/* CAMELBACK MOUNTAIN — distinctive camel-shaped silhouette */}
          {/* The mountain literally looks like a kneeling camel */}
          <path
            d="M 50 220
               Q 80 215 100 210
               L 120 195
               Q 140 175 160 185
               L 175 200
               Q 185 215 195 215
               L 220 215
               Q 240 195 260 175
               Q 280 165 300 175
               Q 330 200 360 215
               L 400 220
               L 400 300 L 0 300 Z"
            fill="#7c2d12"
            opacity="0.85"
          />
          {/* The "head" peak (left side - lower hump) */}
          <path
            d="M 100 210 L 120 195 Q 140 175 160 185 L 175 200 L 175 220 L 100 220 Z"
            fill="#92400e"
            opacity="0.7"
          />
          {/* The "hump" (right side - taller peak) */}
          <path
            d="M 220 215 Q 240 195 260 175 Q 280 165 300 175 L 320 215 Z"
            fill="#92400e"
            opacity="0.65"
          />
          {/* Subtle ridge highlights for dimension */}
          <path d="M 140 180 L 160 188" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5" />
          <path d="M 270 168 L 290 175" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5" />

          {/* Foreground desert floor */}
          <path d="M 0 270 Q 100 260 200 270 T 400 268 L 400 300 L 0 300 Z" fill="#fde68a" opacity="0.4" />

          {/* Tall saguaro cactus center-foreground (3-arm) */}
          <g fill="#16a34a" opacity="0.95">
            {/* Trunk */}
            <rect x="190" y="170" width="22" height="130" rx="11" />
            {/* Subtle ribs (vertical lines) */}
            <line x1="195" y1="180" x2="195" y2="290" stroke="#15803d" strokeWidth="0.6" opacity="0.6" />
            <line x1="201" y1="180" x2="201" y2="290" stroke="#15803d" strokeWidth="0.6" opacity="0.6" />
            <line x1="207" y1="180" x2="207" y2="290" stroke="#15803d" strokeWidth="0.6" opacity="0.6" />
            {/* Left arm — bends up like classic saguaro */}
            <rect x="155" y="210" width="38" height="13" rx="6.5" />
            <rect x="155" y="210" width="13" height="55" rx="6.5" />
            {/* Right arm */}
            <rect x="207" y="190" width="38" height="13" rx="6.5" />
            <rect x="232" y="170" width="13" height="40" rx="6.5" />
            {/* Tiny third arm */}
            <rect x="207" y="220" width="22" height="10" rx="5" />
            <rect x="220" y="210" width="9" height="18" rx="4.5" />
            {/* Cactus spines indicators (small marks) */}
            <g stroke="#fef3c7" strokeWidth="0.4" opacity="0.4">
              <line x1="190" y1="200" x2="186" y2="200" />
              <line x1="212" y1="200" x2="216" y2="200" />
              <line x1="190" y1="240" x2="186" y2="240" />
              <line x1="212" y1="240" x2="216" y2="240" />
              <line x1="190" y1="270" x2="186" y2="270" />
              <line x1="212" y1="270" x2="216" y2="270" />
            </g>
          </g>

          {/* Smaller saguaro left */}
          <g fill="#15803d" opacity="0.85">
            <rect x="55" y="225" width="18" height="75" rx="9" />
            <rect x="35" y="245" width="25" height="11" rx="5.5" />
            <rect x="35" y="245" width="11" height="32" rx="5.5" />
          </g>

          {/* Smaller saguaro right */}
          <g fill="#15803d" opacity="0.85">
            <rect x="320" y="240" width="16" height="60" rx="8" />
            <rect x="335" y="255" width="22" height="10" rx="5" />
            <rect x="348" y="245" width="9" height="22" rx="4.5" />
          </g>

          {/* Roadrunner silhouette running across (small detail) */}
          <g fill="#1e293b" opacity="0.65" transform="translate(80, 285)">
            <ellipse cx="0" cy="0" rx="9" ry="4" />
            <path d="M -8 -1 L -14 -3 L -10 0 Z" />
            <path d="M 7 -2 L 13 -1 L 7 1 Z" />
            <line x1="-2" y1="3" x2="-3" y2="8" stroke="#1e293b" strokeWidth="1" />
            <line x1="2" y1="3" x2="1" y2="8" stroke="#1e293b" strokeWidth="1" />
          </g>
        </svg>
      );

    // ============================================================
    // HOUSTON — Saturn V rocket + Williams Tower obelisk + JPMorgan + space
    // ============================================================
    case "houston-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="houstonSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c0a4d" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Deep space sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#houstonSky)" opacity="0.7" />

          {/* Stars */}
          <g fill="#fef3c7">
            <circle cx="50" cy="35" r="1.5" />
            <circle cx="120" cy="25" r="1" />
            <circle cx="280" cy="40" r="1.5" />
            <circle cx="350" cy="30" r="1" />
            <circle cx="180" cy="15" r="1" />
            <circle cx="320" cy="70" r="1" />
            <circle cx="100" cy="65" r="0.8" />
            <circle cx="375" cy="55" r="1.2" />
            <circle cx="220" cy="45" r="0.8" />
          </g>

          {/* Earth/moon in distance */}
          <circle cx="345" cy="80" r="14" fill="#3b82f6" opacity="0.6" />
          <circle cx="342" cy="77" r="5" fill="#10b981" opacity="0.5" />

          {/* SATURN V ROCKET — three-stage with American flag stripe */}
          <g style={{ transformOrigin: "100px 230px" }} className="animate-[float_7s_ease-in-out_infinite]">
            {/* Tip / nose cone */}
            <path d="M 95 35 L 105 35 L 105 55 L 95 55 Z" fill="#f8fafc" />
            <path d="M 95 35 L 100 20 L 105 35 Z" fill="#f8fafc" />
            {/* Stage 3 (top) - thinner */}
            <rect x="93" y="55" width="14" height="25" fill="#f8fafc" />
            {/* Stage 2 (middle) - wider */}
            <rect x="89" y="80" width="22" height="55" fill="#f8fafc" />
            {/* "USA" American flag stripe */}
            <rect x="89" y="100" width="22" height="3" fill="#dc2626" />
            <rect x="89" y="106" width="22" height="3" fill="#dc2626" />
            {/* Stage 1 (bottom) - widest */}
            <rect x="84" y="135" width="32" height="65" fill="#f8fafc" />
            {/* Black stripe pattern (Saturn V signature) */}
            <rect x="84" y="155" width="32" height="6" fill="#0f172a" />
            <rect x="84" y="180" width="32" height="6" fill="#0f172a" />
            {/* Window */}
            <circle cx="100" cy="92" r="3" fill="#3b82f6" opacity="0.9" />
            {/* Fins */}
            <path d="M 84 185 L 70 215 L 84 205 Z" fill="#dc2626" />
            <path d="M 116 185 L 130 215 L 116 205 Z" fill="#dc2626" />
            {/* Engine bell at bottom */}
            <path d="M 86 200 L 88 215 L 112 215 L 114 200 Z" fill="#475569" />
            {/* Massive rocket flame */}
            <g className="animate-[flicker_0.5s_ease-in-out_infinite]">
              <path d="M 86 215 L 90 245 L 100 260 L 110 245 L 114 215 Z" fill="#f97316" />
              <path d="M 90 215 L 95 235 L 100 250 L 105 235 L 110 215 Z" fill="#fbbf24" />
              <path d="M 95 215 L 100 235 L 105 215 Z" fill="#fef3c7" />
            </g>
            {/* Smoke trail */}
            <ellipse cx="100" cy="270" rx="20" ry="4" fill="#cbd5e1" opacity="0.6" />
            <ellipse cx="100" cy="280" rx="30" ry="4" fill="#94a3b8" opacity="0.4" />
          </g>

          {/* WILLIAMS TOWER — Houston's iconic 64-story granite obelisk */}
          <g fill="#0f172a" opacity="0.92">
            {/* Tall narrow obelisk with chamfered corners */}
            <rect x="200" y="115" width="30" height="185" />
            {/* Tapered top */}
            <polygon points="200,115 215,90 230,115" />
            {/* Pyramid cap */}
            <polygon points="208,90 215,80 222,90" />
          </g>
          {/* Williams Tower lit windows (vertical strips) */}
          <g fill="#fbbf24" opacity="0.7">
            <rect x="205" y="130" width="2" height="160" />
            <rect x="212" y="130" width="2" height="160" />
            <rect x="219" y="130" width="2" height="160" />
            <rect x="225" y="130" width="2" height="160" />
          </g>
          {/* Beacon at top (signature feature) */}
          <circle cx="215" cy="83" r="2" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />

          {/* JPMORGAN CHASE TOWER — tallest in Texas, distinctive shape */}
          <g fill="#1e293b" opacity="0.9">
            <rect x="265" y="130" width="35" height="170" />
            {/* Stepped roofline */}
            <rect x="270" y="120" width="25" height="10" />
            <rect x="276" y="113" width="13" height="7" />
          </g>
          <g fill="#fbbf24" opacity="0.65">
            <rect x="270" y="150" width="2" height="2" />
            <rect x="282" y="170" width="2" height="2" />
            <rect x="290" y="200" width="2" height="2" />
            <rect x="275" y="220" width="2" height="2" />
            <rect x="290" y="240" width="2" height="2" />
          </g>

          {/* Other Houston skyline */}
          <g fill="#1e293b" opacity="0.65">
            <rect x="155" y="210" width="35" height="90" />
            <rect x="305" y="180" width="30" height="120" />
            <rect x="335" y="220" width="35" height="80" />
            <rect x="370" y="200" width="30" height="100" />
          </g>
        </svg>
      );

    // ============================================================
    // AUSTIN — Texas State Capitol dome + Frost Bank "Owl" Tower + bats
    // ============================================================
    case "austin-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="austinSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Austin sunset sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#austinSky)" opacity="0.65" />

          {/* Big sun */}
          <circle cx="320" cy="100" r="35" fill="#fef3c7" opacity="0.9" className="animate-[pulse_4s_ease-in-out_infinite]" />

          {/* TEXAS STATE CAPITOL — pink granite dome (taller than US Capitol) */}
          <g>
            {/* Wide base */}
            <rect x="50" y="240" width="100" height="60" fill="#fda4af" opacity="0.85" />
            <rect x="60" y="225" width="80" height="15" fill="#fb7185" opacity="0.85" />
            {/* Columns */}
            <g fill="#fda4af" opacity="0.95">
              <rect x="65" y="245" width="4" height="50" />
              <rect x="80" y="245" width="4" height="50" />
              <rect x="95" y="245" width="4" height="50" />
              <rect x="110" y="245" width="4" height="50" />
              <rect x="125" y="245" width="4" height="50" />
              <rect x="140" y="245" width="4" height="50" />
            </g>
            {/* Drum (cylinder beneath dome) */}
            <rect x="80" y="200" width="40" height="25" fill="#fda4af" opacity="0.9" />
            <line x1="88" y1="208" x2="88" y2="222" stroke="#9f1239" strokeWidth="0.8" opacity="0.7" />
            <line x1="100" y1="208" x2="100" y2="222" stroke="#9f1239" strokeWidth="0.8" opacity="0.7" />
            <line x1="112" y1="208" x2="112" y2="222" stroke="#9f1239" strokeWidth="0.8" opacity="0.7" />
            {/* The dome itself */}
            <ellipse cx="100" cy="200" rx="30" ry="22" fill="#fb7185" opacity="0.92" />
            <ellipse cx="100" cy="200" rx="22" ry="16" fill="#fda4af" opacity="0.7" />
            {/* Lantern on top */}
            <rect x="95" y="170" width="10" height="12" fill="#fda4af" />
            <rect x="92" y="166" width="16" height="5" fill="#fb7185" />
            {/* Goddess of Liberty statue (small figure) */}
            <line x1="100" y1="166" x2="100" y2="155" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="100" cy="153" r="2" fill="#fbbf24" />
            {/* Star above (Texas Lone Star) */}
            <polygon
              points="100,140 102,146 108,146 103,150 105,156 100,152 95,156 97,150 92,146 98,146"
              fill="#fbbf24"
              className="animate-[pulse_2s_ease-in-out_infinite]"
            />
          </g>

          {/* FROST BANK TOWER — "The Owl" with distinctive crown */}
          <g fill="#0f172a" opacity="0.92">
            {/* Main shaft - tapered top */}
            <rect x="220" y="155" width="28" height="145" />
            {/* The distinctive crown that resembles owl ears */}
            <polygon points="215,155 234,130 253,155" />
            {/* Two "owl ear" peaks */}
            <polygon points="215,155 222,128 226,155" />
            <polygon points="240,155 246,128 253,155" />
          </g>
          {/* Glass lights on Frost Bank */}
          <g fill="#06b6d4" opacity="0.5">
            <rect x="223" y="170" width="22" height="3" />
            <rect x="225" y="190" width="18" height="3" />
            <rect x="225" y="210" width="18" height="3" />
            <rect x="225" y="230" width="18" height="3" />
            <rect x="225" y="250" width="18" height="3" />
          </g>

          {/* Other Austin skyline */}
          <g fill="#1e293b" opacity="0.65">
            <rect x="170" y="220" width="35" height="80" />
            <rect x="260" y="200" width="32" height="100" />
            <rect x="295" y="225" width="28" height="75" />
            <rect x="345" y="215" width="40" height="85" />
          </g>

          {/* Congress Avenue Bridge bats — flying silhouettes */}
          <g fill="#1e293b" opacity="0.85" className="animate-[float_4s_ease-in-out_infinite]">
            <path d="M 280 75 Q 286 70 290 75 Q 294 70 300 75 L 296 80 Q 293 78 290 80 Q 287 78 284 80 Z" />
            <path d="M 320 55 Q 326 50 330 55 Q 334 50 340 55 L 336 60 Q 333 58 330 60 Q 327 58 324 60 Z" />
            <path d="M 360 85 Q 366 80 370 85 Q 374 80 380 85 L 376 90 Q 373 88 370 90 Q 367 88 364 90 Z" />
            <path d="M 250 60 Q 256 55 260 60 Q 264 55 270 60 L 266 65 Q 263 63 260 65 Q 257 63 254 65 Z" />
          </g>

          {/* "Keep Austin Weird" — tiny guitar in lower corner */}
          <g transform="translate(15, 270) rotate(-15)" opacity="0.7">
            <ellipse cx="0" cy="0" rx="14" ry="17" fill="#92400e" />
            <circle cx="0" cy="-3" r="4" fill="#1e293b" />
            <rect x="-1.5" y="-30" width="3" height="22" fill="#92400e" />
          </g>
        </svg>
      );

    // ============================================================
    // ATLANTA — Bank of America Plaza pyramid + Westin Peachtree + peach
    // ============================================================
    case "atlanta-ga":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="atlSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="atlGlow" cx="0.5" cy="0.3" r="0.6">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Atlanta dusk sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#atlSky)" opacity="0.7" />
          <rect x="0" y="0" width="400" height="300" fill="url(#atlGlow)" />

          {/* Stars/lights in sky */}
          <g fill="#fef3c7" opacity="0.85">
            <circle cx="80" cy="50" r="1" />
            <circle cx="200" cy="35" r="1" />
            <circle cx="320" cy="55" r="1.2" />
          </g>

          {/* Peach (Georgia state symbol) — floating in upper left */}
          <g style={{ transformOrigin: "75px 90px" }} className="animate-[float_7s_ease-in-out_infinite]">
            <ellipse cx="75" cy="95" rx="32" ry="35" fill="#fb923c" opacity="0.95" />
            {/* Highlight */}
            <ellipse cx="65" cy="85" rx="12" ry="14" fill="#fdba74" opacity="0.8" />
            {/* The signature peach cleft (vertical line) */}
            <path d="M 75 65 Q 73 95 75 125" stroke="#c2410c" strokeWidth="0.8" fill="none" opacity="0.5" />
            {/* Stem */}
            <path d="M 75 60 Q 80 50 88 47" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Leaf */}
            <ellipse cx="92" cy="48" rx="10" ry="5" fill="#16a34a" opacity="0.9" transform="rotate(30 92 48)" />
            {/* Leaf vein */}
            <line x1="84" y1="49" x2="100" y2="47" stroke="#15803d" strokeWidth="0.4" opacity="0.7" />
          </g>

          {/* BANK OF AMERICA PLAZA — distinctive pyramid spire on top */}
          {/* The tallest building in Atlanta, immediately recognizable */}
          <g fill="#0f172a" opacity="0.92">
            {/* Tall main shaft */}
            <rect x="180" y="120" width="40" height="180" />
            {/* Tapered top section */}
            <polygon points="180,120 185,105 215,105 220,120" />
            {/* The famous pyramid spire (gold-lit at top) */}
            <polygon points="185,105 200,75 215,105" />
          </g>
          {/* The gold pyramid lighting (a Atlanta nightly signature) */}
          <polygon points="185,105 200,75 215,105" fill="#fbbf24" opacity="0.6" />
          {/* Gold edge highlights */}
          <line x1="200" y1="75" x2="185" y2="105" stroke="#fbbf24" strokeWidth="2" opacity="0.85" />
          <line x1="200" y1="75" x2="215" y2="105" stroke="#fbbf24" strokeWidth="2" opacity="0.85" />
          {/* Pyramid tip beacon */}
          <circle cx="200" cy="73" r="2" fill="#fbbf24" className="animate-[pulse_2s_ease-in-out_infinite]" />
          {/* BoA windows */}
          <g fill="#fbbf24" opacity="0.55">
            <rect x="186" y="140" width="2" height="2" />
            <rect x="195" y="160" width="2" height="2" />
            <rect x="205" y="180" width="2" height="2" />
            <rect x="190" y="220" width="2" height="2" />
            <rect x="210" y="240" width="2" height="2" />
            <rect x="195" y="260" width="2" height="2" />
          </g>

          {/* WESTIN PEACHTREE PLAZA — cylindrical glass tower (very distinctive) */}
          <g fill="#1e293b" opacity="0.88">
            {/* Cylindrical body — render as ellipses + rect */}
            <ellipse cx="270" cy="155" rx="18" ry="5" />
            <rect x="252" y="155" width="36" height="145" />
            <ellipse cx="270" cy="300" rx="18" ry="5" />
          </g>
          {/* Cylindrical reflective windows — subtle vertical bands */}
          <g fill="#3b82f6" opacity="0.4">
            <rect x="254" y="160" width="32" height="135" />
          </g>
          <g stroke="#06b6d4" strokeWidth="0.5" opacity="0.6">
            <line x1="258" y1="165" x2="258" y2="295" />
            <line x1="265" y1="165" x2="265" y2="295" />
            <line x1="272" y1="165" x2="272" y2="295" />
            <line x1="279" y1="165" x2="279" y2="295" />
            <line x1="285" y1="165" x2="285" y2="295" />
          </g>

          {/* Other ATL skyline buildings */}
          <g fill="#1e293b" opacity="0.65">
            <rect x="125" y="200" width="30" height="100" />
            <rect x="155" y="220" width="25" height="80" />
            <rect x="225" y="195" width="25" height="105" />
            <rect x="295" y="175" width="32" height="125" />
            {/* SunTrust Plaza-style with crown */}
            <polygon points="295,175 302,160 320,160 327,175" />
            <rect x="330" y="210" width="30" height="90" />
            <rect x="360" y="225" width="40" height="75" />
          </g>

          {/* Window lights scattered through skyline */}
          <g fill="#fbbf24" opacity="0.7">
            <rect x="135" y="220" width="2" height="2" />
            <rect x="145" y="250" width="2" height="2" />
            <rect x="232" y="220" width="2" height="2" />
            <rect x="240" y="270" width="2" height="2" />
            <rect x="305" y="200" width="2" height="2" />
            <rect x="315" y="240" width="2" height="2" />
            <rect x="340" y="240" width="2" height="2" />
            <rect x="375" y="260" width="2" height="2" />
          </g>
        </svg>
      );

    // ============================================================
    // DALLAS — iconic Reunion Tower (ball on stem) + skyline + Texas star
    // ============================================================
    case "dallas-tx":
      return (
        <svg viewBox="0 0 400 300" className={fullClass} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="dallasSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#7c2d12" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Texas sunset sky */}
          <rect x="0" y="0" width="400" height="220" fill="url(#dallasSky)" opacity="0.65" />

          {/* Lone Star Texas symbol — slow rotation */}
          <g style={{ transformOrigin: "70px 80px" }} className="animate-[spin_60s_linear_infinite]">
            <polygon
              points="70,40 79,67 108,67 84,84 93,113 70,95 47,113 56,84 32,67 61,67"
              fill="#fbbf24"
              opacity="0.85"
            />
          </g>

          {/* REUNION TOWER — the iconic Dallas geodesic ball on a stem */}
          <g style={{ transformOrigin: "200px 230px" }}>
            {/* Three legs (the actual tower has triangular shaft) */}
            <line x1="195" y1="155" x2="190" y2="280" stroke="#0f172a" strokeWidth="3" opacity="0.92" />
            <line x1="200" y1="155" x2="200" y2="280" stroke="#0f172a" strokeWidth="3" opacity="0.92" />
            <line x1="205" y1="155" x2="210" y2="280" stroke="#0f172a" strokeWidth="3" opacity="0.92" />
            {/* Cross supports */}
            <line x1="190" y1="280" x2="210" y2="280" stroke="#0f172a" strokeWidth="2" opacity="0.92" />
            <line x1="192" y1="240" x2="208" y2="240" stroke="#0f172a" strokeWidth="1.5" opacity="0.7" />
            <line x1="194" y1="200" x2="206" y2="200" stroke="#0f172a" strokeWidth="1.5" opacity="0.7" />

            {/* The famous ball at the top */}
            <circle cx="200" cy="145" r="22" fill="#0f172a" opacity="0.92" />
            {/* Geodesic pattern on the ball — dots representing the lit spheres */}
            <g fill="#fbbf24" className="animate-[pulse_3s_ease-in-out_infinite]">
              <circle cx="195" cy="138" r="1.5" />
              <circle cx="200" cy="135" r="1.5" />
              <circle cx="205" cy="138" r="1.5" />
              <circle cx="190" cy="143" r="1.5" />
              <circle cx="200" cy="142" r="1.5" />
              <circle cx="210" cy="143" r="1.5" />
              <circle cx="187" cy="148" r="1.5" />
              <circle cx="195" cy="148" r="1.5" />
              <circle cx="205" cy="148" r="1.5" />
              <circle cx="213" cy="148" r="1.5" />
              <circle cx="190" cy="153" r="1.5" />
              <circle cx="200" cy="155" r="1.5" />
              <circle cx="210" cy="153" r="1.5" />
              <circle cx="195" cy="158" r="1.5" />
              <circle cx="205" cy="158" r="1.5" />
            </g>
            {/* Antenna spike on top */}
            <line x1="200" y1="123" x2="200" y2="100" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="200" cy="105" r="1.5" fill="#dc2626" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
          </g>

          {/* Bank of America Plaza — the green-lit Dallas building */}
          <g fill="#0f172a" opacity="0.9">
            {/* Distinctive tall narrow profile */}
            <rect x="265" y="120" width="32" height="180" />
            {/* Top setbacks */}
            <rect x="270" y="105" width="22" height="15" />
            <rect x="275" y="92" width="12" height="13" />
          </g>
          {/* Green argon lights along the edges (BoA's signature) */}
          <g fill="#10b981" opacity="0.7">
            <rect x="263" y="125" width="2" height="170" />
            <rect x="297" y="125" width="2" height="170" />
          </g>

          {/* Other skyline buildings */}
          <g fill="#1e293b" opacity="0.7">
            <rect x="100" y="225" width="40" height="75" />
            <rect x="140" y="200" width="35" height="100" />
            <rect x="240" y="210" width="25" height="90" />
            <rect x="305" y="180" width="35" height="120" />
            <rect x="340" y="220" width="30" height="80" />
            <rect x="370" y="195" width="30" height="105" />
          </g>

          {/* Window lights */}
          <g fill="#fbbf24" opacity="0.8">
            <rect x="115" y="240" width="2" height="2" />
            <rect x="150" y="220" width="2" height="2" />
            <rect x="280" y="180" width="2" height="2" />
            <rect x="315" y="200" width="2" height="2" />
            <rect x="320" y="240" width="2" height="2" />
            <rect x="350" y="240" width="2" height="2" />
            <rect x="385" y="220" width="2" height="2" />
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
