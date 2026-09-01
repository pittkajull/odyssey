interface Props {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

// =============================================
// SAILING SHIP — hand-drawn style, warm, with personality
// =============================================
export function SailingShip({ size = 120, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 140 105" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="shipHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A0724A" />
          <stop offset="60%" stopColor="#704214" />
          <stop offset="100%" stopColor="#5C3D2E" />
        </linearGradient>
        <linearGradient id="shipSailA" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="50%" stopColor="#F5E6C8" />
          <stop offset="100%" stopColor="#E8D5A3" />
        </linearGradient>
        <linearGradient id="shipSailB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="100%" stopColor="#EDD9B5" />
        </linearGradient>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E6B6B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2E6B6B" stopOpacity="0.05" />
        </linearGradient>
        <filter id="shipShadow">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#2C1810" floodOpacity="0.2" />
        </filter>
      </defs>
      <ellipse cx="70" cy="95" rx="55" ry="6" fill="url(#seaGrad)" />
      <path d="M20 72 C24 78, 30 84, 70 86 C110 84, 116 78, 120 72 L116 66 C96 72, 70 76, 44 72 L20 66 Z"
        fill="url(#shipHull)" stroke="#5C3D2E" strokeWidth="1.2" filter="url(#shipShadow)" strokeLinejoin="round" />
      <path d="M30 68 C50 73, 90 73, 110 68" stroke="#A0724A" strokeWidth="0.7" opacity="0.35" fill="none" />
      <path d="M34 72 C54 76, 86 76, 106 72" stroke="#A0724A" strokeWidth="0.5" opacity="0.25" fill="none" />
      <line x1="70" y1="12" x2="70" y2="68" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M72 14 C92 20, 96 35, 92 52 C88 60, 74 64, 72 64 Z"
        fill="url(#shipSailA)" stroke="#C4A265" strokeWidth="1" />
      <path d="M74 20 C88 24, 90 36, 88 48" stroke="#D4B87A" strokeWidth="0.4" opacity="0.4" fill="none" />
      <path d="M74 30 C86 33, 87 42, 85 50" stroke="#D4B87A" strokeWidth="0.3" opacity="0.3" fill="none" />
      <path d="M68 14 C48 20, 44 35, 48 52 C52 60, 66 64, 68 64 Z"
        fill="url(#shipSailB)" stroke="#C4A265" strokeWidth="1" />
      <path d="M66 22 C52 26, 50 38, 52 50" stroke="#D4B87A" strokeWidth="0.4" opacity="0.35" fill="none" />
      <line x1="40" y1="28" x2="40" y2="66" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 30 C54 34, 56 46, 52 58 C50 62, 44 64, 42 64 Z"
        fill="url(#shipSailA)" stroke="#C4A265" strokeWidth="0.8" opacity="0.85" />
      <line x1="26" y1="62" x2="8" y2="44" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 12 L70 4 L88 8 L70 12" fill="#C44B2B" stroke="#8B2500" strokeWidth="0.6" opacity="0.85">
        <animate attributeName="d" dur="3s" repeatCount="indefinite"
          values="M70 12 L70 4 L88 8 L70 12;M70 12 L70 4 L86 10 L70 12;M70 12 L70 4 L88 8 L70 12" />
      </path>
      <path d="M70 14 C85 35, 110 55, 116 66" stroke="#8B7355" strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M70 14 C55 35, 30 55, 24 66" stroke="#8B7355" strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M40 30 C32 42, 24 56, 20 64" stroke="#8B7355" strokeWidth="0.4" opacity="0.15" fill="none" />
      <path d="M8 88 C14 84, 20 84, 26 88 C32 92, 38 92, 44 88 C50 84, 56 84, 62 88 C68 92, 74 92, 80 88 C86 84, 92 84, 98 88 C104 92, 110 92, 116 88 C122 84, 128 84, 134 88"
        stroke="#2E6B6B" strokeWidth="1" opacity="0.25" fill="none" strokeLinecap="round" />
      <path d="M4 94 C10 90, 16 90, 22 94 C28 98, 34 98, 40 94 C46 90, 52 90, 58 94 C64 98, 70 98, 76 94 C82 90, 88 90, 94 94 C100 98, 106 98, 112 94 C118 90, 124 90, 130 94"
        stroke="#2E6B6B" strokeWidth="0.7" opacity="0.15" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// =============================================
// MOUNTAIN — large, layered, hand-drawn, with trees and snow
// =============================================
export function MountainRange({ size = 180, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 180 100" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="mtBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A0724A" />
          <stop offset="100%" stopColor="#C4A265" />
        </linearGradient>
        <linearGradient id="mtMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#704214" />
          <stop offset="100%" stopColor="#A0724A" />
        </linearGradient>
        <linearGradient id="mtFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C3D2E" />
          <stop offset="100%" stopColor="#8B5E3C" />
        </linearGradient>
        <linearGradient id="mtSnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFEF8" />
          <stop offset="100%" stopColor="#F5F0E0" />
        </linearGradient>
        <filter id="mtShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2C1810" floodOpacity="0.12" />
        </filter>
      </defs>
      <path d="M-10 95 L20 45 L35 60 L55 30 L75 55 L90 38 L110 50 L130 35 L155 55 L190 95"
        fill="url(#mtBack)" opacity="0.25" stroke="#A0724A" strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M-5 95 L30 50 L45 65 L65 28 L85 58 L105 40 L125 55 L145 42 L185 95"
        fill="url(#mtMid)" opacity="0.4" stroke="#8B5E3C" strokeWidth="1" filter="url(#mtShadow)" strokeLinejoin="round" />
      <path d="M62 31 L65 28 L68 31 Q65 36 62 31 Z" fill="url(#mtSnow)" opacity="0.7" />
      <path d="M141 45 L145 42 L149 45 Q145 49 141 45 Z" fill="url(#mtSnow)" opacity="0.6" />
      <path d="M-8 95 L25 55 L40 70 L60 35 L80 62 L100 45 L120 60 L140 48 L170 70 L190 95"
        fill="url(#mtFront)" opacity="0.5" stroke="#5C3D2E" strokeWidth="1.2" filter="url(#mtShadow)" strokeLinejoin="round" />
      <path d="M57 38 L60 35 L63 38 Q60 43 57 38 Z" fill="url(#mtSnow)" opacity="0.75" />
      <path d="M58 40 L60 37 L62 40" stroke="#E8E0C8" strokeWidth="0.5" fill="none" opacity="0.5" />
      <g opacity="0.2" fill="#3D6B3D">
        <path d="M18 88 L20 78 L22 88 Z" />
        <path d="M22 86 L24 76 L26 86 Z" />
        <path d="M28 88 L30 80 L32 88 Z" />
        <path d="M148 86 L150 78 L152 86 Z" />
        <path d="M152 88 L154 79 L156 88 Z" />
        <path d="M158 86 L160 78 L162 86 Z" />
      </g>
      <path d="M-10 95 C30 92, 60 94, 90 92 C120 94, 150 92, 190 95"
        stroke="#8B7355" strokeWidth="0.6" opacity="0.15" fill="none" />
    </svg>
  );
}

// =============================================
// PALM TREE — lush, organic, with coconuts
// =============================================
export function PalmTree({ size = 80, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 70 98" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="palmTrunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B4226" />
          <stop offset="40%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#6B4226" />
        </linearGradient>
        <linearGradient id="palmLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A9B4A" />
          <stop offset="100%" stopColor="#2E6B2E" />
        </linearGradient>
        <filter id="palmShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#2C1810" floodOpacity="0.15" />
        </filter>
      </defs>
      <ellipse cx="35" cy="94" rx="16" ry="3" fill="#2C1810" opacity="0.08" />
      <path d="M35 92 C34 80, 36 68, 34 55 C32 44, 34 34, 30 22"
        stroke="url(#palmTrunk)" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#palmShadow)" />
      <path d="M33 86 C35 84 37 86" stroke="#4A3020" strokeWidth="0.6" opacity="0.3" fill="none" />
      <path d="M33 78 C36 76 38 78" stroke="#4A3020" strokeWidth="0.6" opacity="0.3" fill="none" />
      <path d="M32 70 C35 68 37 70" stroke="#4A3020" strokeWidth="0.6" opacity="0.3" fill="none" />
      <path d="M33 62 C35 60 37 62" stroke="#4A3020" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M30 22 C18 12, 6 10, 0 16" stroke="url(#palmLeaf)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M30 22 C20 14, 10 13, 4 18" stroke="#3D8B3D" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M30 22 C42 10, 56 8, 64 14" stroke="url(#palmLeaf)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M30 22 C44 12, 56 12, 62 18" stroke="#3D8B3D" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M30 22 C26 10, 20 2, 14 0" stroke="#3D7A3D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 22 C36 8, 42 2, 50 0" stroke="#3D7A3D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 22 C14 18, 4 22, -2 32" stroke="#2E5E2E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M30 22 C46 18, 58 24, 66 32" stroke="#2E5E2E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <circle cx="27" cy="25" r="3" fill="#8B6914" stroke="#6B4226" strokeWidth="0.8" />
      <circle cx="33" cy="24" r="3" fill="#8B6914" stroke="#6B4226" strokeWidth="0.8" />
      <circle cx="30" cy="28" r="2.5" fill="#7A5C12" stroke="#6B4226" strokeWidth="0.6" />
    </svg>
  );
}

// =============================================
// SEA MONSTER — kraken style, mysterious, deep ocean
// =============================================
export function SeaMonster({ size = 120, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 130 78" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="monsterBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E6B6B" />
          <stop offset="50%" stopColor="#1A5A5A" />
          <stop offset="100%" stopColor="#0E3E3E" />
        </linearGradient>
        <filter id="monsterShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#0A2020" floodOpacity="0.2" />
        </filter>
      </defs>
      <path d="M10 55 C20 35, 35 28, 50 32 C65 36, 72 24, 85 22 C98 20, 108 26, 115 35 C120 42, 118 50, 110 48"
        stroke="url(#monsterBody)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#monsterShadow)" />
      <path d="M10 55 C20 35, 35 28, 50 32 C65 36, 72 24, 85 22 C98 20, 108 26, 115 35 C120 42, 118 50, 110 48 C105 46, 85 40, 65 42 C45 44, 25 48, 10 55 Z"
        fill="url(#monsterBody)" opacity="0.08" />
      <ellipse cx="112" cy="40" rx="12" ry="10" fill="#1A5A5A" opacity="0.15" stroke="#0E3E3E" strokeWidth="2" />
      <circle cx="116" cy="37" r="3.5" fill="#FFF8E7" opacity="0.7" />
      <circle cx="117" cy="36" r="1.8" fill="#1A150D" />
      <circle cx="117.5" cy="35.5" r="0.6" fill="white" opacity="0.8" />
      <path d="M106 43 C110 47, 116 47, 120 43" stroke="#0E3E3E" strokeWidth="1.2" fill="none" />
      <path d="M108 44 L109 46" stroke="white" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M112 45 L112 47" stroke="white" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M116 44 L115 46" stroke="white" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M35 30 C30 22, 28 16, 32 12" stroke="#1A5A5A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M50 34 C48 26, 46 20, 50 14" stroke="#1A5A5A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M68 28 C65 20, 64 14, 68 8" stroke="#1A5A5A" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M88 24 C85 16, 84 10, 88 4" stroke="#1A5A5A" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M24 44 C28 40 32 44" stroke="#0E3E3E" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M38 38 C42 34 46 38" stroke="#0E3E3E" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M52 34 C56 30 60 34" stroke="#0E3E3E" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M66 28 C70 24 74 28" stroke="#0E3E3E" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M82 24 C86 20 90 24" stroke="#0E3E3E" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M98 30 C102 26 106 30" stroke="#0E3E3E" strokeWidth="0.6" opacity="0.2" fill="none" />
      <path d="M10 55 C6 60, 4 66, 8 70 C12 74, 18 70, 16 64"
        stroke="#1A5A5A" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M6 58 C2 54 -2 58" stroke="#2E6B6B" strokeWidth="0.8" opacity="0.2" fill="none" />
      <path d="M14 62 C10 58 6 62" stroke="#2E6B6B" strokeWidth="0.8" opacity="0.2" fill="none" />
      <path d="M122 42 C126 38 130 42" stroke="#2E6B6B" strokeWidth="0.8" opacity="0.2" fill="none" />
    </svg>
  );
}

// =============================================
// ISLAND — tropical paradise, large and detailed
// =============================================
export function Island({ size = 100, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="islandSand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D5A3" />
          <stop offset="100%" stopColor="#D4C0A0" />
        </linearGradient>
        <linearGradient id="islandGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A9B4A" />
          <stop offset="100%" stopColor="#3D7A3D" />
        </linearGradient>
        <filter id="islandShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2C1810" floodOpacity="0.12" />
        </filter>
      </defs>
      <ellipse cx="50" cy="58" rx="46" ry="8" stroke="#2E6B6B" strokeWidth="0.6" opacity="0.15" fill="none" strokeDasharray="4 3" />
      <path d="M8 52 C12 46, 20 42, 50 40 C80 42, 88 46, 92 52 C94 56, 90 60, 50 62 C10 60, 6 56, 8 52 Z"
        fill="url(#islandSand)" stroke="#B8A88A" strokeWidth="0.8" filter="url(#islandShadow)" />
      <path d="M18 50 C24 44, 35 42, 50 41 C65 42, 76 44, 82 50 C80 52, 65 48, 50 47 C35 48, 20 52, 18 50 Z"
        fill="url(#islandGrass)" opacity="0.35" />
      <path d="M48 48 C46 38, 47 28, 44 18" stroke="#6B4226" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M44 18 C34 10, 22 8, 14 12" stroke="#3D8B3D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M44 18 C54 8, 66 6, 74 10" stroke="#3D8B3D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M44 18 C38 8, 32 4, 24 2" stroke="#3D7A3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M44 18 C50 8, 56 4, 64 4" stroke="#3D7A3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M44 18 C32 16, 22 20, 16 28" stroke="#2E5E2E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M44 18 C56 16, 66 22, 76 28" stroke="#2E5E2E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M62 50 C61 44, 62 38, 60 32" stroke="#6B4226" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M60 32 C54 26, 48 26, 44 28" stroke="#3D8B3D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M60 32 C66 26, 72 28, 76 30" stroke="#3D8B3D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="25" cy="54" r="1" fill="#B8A88A" opacity="0.3" />
      <circle cx="70" cy="53" r="1.2" fill="#B8A88A" opacity="0.3" />
      <circle cx="40" cy="56" r="0.8" fill="#B8A88A" opacity="0.2" />
      <path d="M12 60 C18 57 24 60" stroke="#2E6B6B" strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M76 60 C82 57 88 60" stroke="#2E6B6B" strokeWidth="0.5" opacity="0.2" fill="none" />
    </svg>
  );
}

// =============================================
// CASTLE — fortified, warm stone, with flag
// =============================================
export function Castle({ size = 80, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 80 72" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="castleStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4A265" />
          <stop offset="100%" stopColor="#A0724A" />
        </linearGradient>
        <linearGradient id="castleTower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8956A" />
          <stop offset="100%" stopColor="#8B5E3C" />
        </linearGradient>
        <filter id="castleShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#2C1810" floodOpacity="0.15" />
        </filter>
      </defs>
      <ellipse cx="40" cy="70" rx="32" ry="3" fill="#2C1810" opacity="0.06" />
      <rect x="18" y="28" width="44" height="42" fill="url(#castleStone)" stroke="#8B5E3C" strokeWidth="1.2" filter="url(#castleShadow)" rx="1" />
      <rect x="8" y="14" width="16" height="56" fill="url(#castleTower)" stroke="#704214" strokeWidth="1" rx="1" />
      <rect x="56" y="14" width="16" height="56" fill="url(#castleTower)" stroke="#704214" strokeWidth="1" rx="1" />
      <path d="M8 14 L8 10 L11 10 L11 14 L14 14 L14 10 L17 10 L17 14 L20 14 L20 10 L24 10 L24 14"
        stroke="#704214" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <path d="M56 14 L56 10 L59 10 L59 14 L62 14 L62 10 L65 10 L65 14 L68 14 L68 10 L72 10 L72 14"
        stroke="#704214" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <path d="M33 70 L33 50 Q40 42 47 50 L47 70" stroke="#5C3D2E" strokeWidth="1.2" fill="#5C3D2E" fillOpacity="0.15" />
      <line x1="40" y1="44" x2="40" y2="70" stroke="#5C3D2E" strokeWidth="0.6" opacity="0.3" />
      <path d="M36 54 Q40 50 44 54" stroke="#5C3D2E" strokeWidth="0.5" opacity="0.3" fill="none" />
      <rect x="22" y="34" width="6" height="8" rx="3" fill="#5C3D2E" opacity="0.15" stroke="#704214" strokeWidth="0.6" />
      <rect x="52" y="34" width="6" height="8" rx="3" fill="#5C3D2E" opacity="0.15" stroke="#704214" strokeWidth="0.6" />
      <rect x="22" y="50" width="6" height="8" rx="3" fill="#5C3D2E" opacity="0.12" stroke="#704214" strokeWidth="0.6" />
      <rect x="52" y="50" width="6" height="8" rx="3" fill="#5C3D2E" opacity="0.12" stroke="#704214" strokeWidth="0.6" />
      <rect x="13" y="24" width="5" height="6" rx="2.5" fill="#5C3D2E" opacity="0.12" stroke="#704214" strokeWidth="0.5" />
      <rect x="62" y="24" width="5" height="6" rx="2.5" fill="#5C3D2E" opacity="0.12" stroke="#704214" strokeWidth="0.5" />
      <line x1="40" y1="14" x2="40" y2="4" stroke="#704214" strokeWidth="1" />
      <path d="M40 4 L52 7 L40 10" fill="#C44B2B" opacity="0.7" stroke="#8B2500" strokeWidth="0.5">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M40 4 L52 7 L40 10;M40 4 L50 9 L40 10;M40 4 L52 7 L40 10" />
      </path>
      <line x1="18" y1="40" x2="62" y2="40" stroke="#8B5E3C" strokeWidth="0.3" opacity="0.15" />
      <line x1="18" y1="52" x2="62" y2="52" stroke="#8B5E3C" strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

// =============================================
// COMPASS ROSE — ornate, hand-drawn
// =============================================
export function CompassRoseFull({ size = 80, className = '', style }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="compassGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="compassTeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E6B6B" />
          <stop offset="100%" stopColor="#1A5A5A" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" stroke="#B8A88A" strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="40" cy="40" r="35" stroke="#B8A88A" strokeWidth="0.5" opacity="0.2" fill="none" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line key={deg}
          x1={40 + 35 * Math.cos((deg - 90) * Math.PI / 180)}
          y1={40 + 35 * Math.sin((deg - 90) * Math.PI / 180)}
          x2={40 + 38 * Math.cos((deg - 90) * Math.PI / 180)}
          y2={40 + 38 * Math.sin((deg - 90) * Math.PI / 180)}
          stroke="#B8A88A" strokeWidth={deg % 90 === 0 ? 1.2 : 0.5} opacity="0.3"
        />
      ))}
      <path d="M40 5 L44 35 L40 32 L36 35 Z" fill="url(#compassGold)" stroke="#B8860B" strokeWidth="0.5" opacity="0.8" />
      <path d="M40 75 L36 45 L40 48 L44 45 Z" fill="#B8A88A" stroke="#8B7355" strokeWidth="0.5" opacity="0.5" />
      <path d="M75 40 L45 36 L48 40 L45 44 Z" fill="#B8A88A" stroke="#8B7355" strokeWidth="0.5" opacity="0.5" />
      <path d="M5 40 L35 44 L32 40 L35 36 Z" fill="url(#compassGold)" stroke="#B8860B" strokeWidth="0.5" opacity="0.8" />
      <path d="M65 15 L44 36 L42 34 L40 32 L36 34 Z" fill="#DAA520" opacity="0.3" />
      <path d="M65 65 L44 44 L42 46 L44 48 L46 46 Z" fill="#B8A88A" opacity="0.25" />
      <path d="M15 65 L36 44 L38 46 L40 48 L42 46 Z" fill="#DAA520" opacity="0.3" />
      <path d="M15 15 L36 36 L38 34 L40 32 L42 34 Z" fill="#B8A88A" opacity="0.25" />
      <circle cx="40" cy="40" r="4" fill="url(#compassGold)" stroke="#B8860B" strokeWidth="0.8" />
      <circle cx="40" cy="40" r="2" fill="#5C3D2E" opacity="0.3" />
      <text x="40" y="12" textAnchor="middle" fill="#B8860B" fontSize="7" fontFamily="var(--font-handwritten)" fontWeight="bold" opacity="0.6">N</text>
      <text x="40" y="76" textAnchor="middle" fill="#8B7355" fontSize="6" fontFamily="var(--font-handwritten)" opacity="0.5">S</text>
      <text x="73" y="42" textAnchor="middle" fill="#8B7355" fontSize="6" fontFamily="var(--font-handwritten)" opacity="0.5">E</text>
      <text x="7" y="42" textAnchor="middle" fill="#B8860B" fontSize="7" fontFamily="var(--font-handwritten)" fontWeight="bold" opacity="0.6">W</text>
    </svg>
  );
}

// =============================================
// TREASURE CHEST — open, with gold coins
// =============================================
export function Treasure({ size = 80, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 80 64" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#5C3D2E" />
        </linearGradient>
        <linearGradient id="chestGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
        <filter id="goldGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFD700" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="40" cy="60" rx="30" ry="4" fill="#2C1810" opacity="0.1" />
      <rect x="10" y="30" width="60" height="30" rx="2" fill="url(#chestWood)" stroke="#4A3020" strokeWidth="1.2" />
      <rect x="10" y="38" width="60" height="3" fill="#8B7355" opacity="0.4" />
      <rect x="10" y="48" width="60" height="3" fill="#8B7355" opacity="0.4" />
      <rect x="36" y="40" width="8" height="10" rx="2" fill="#B8860B" stroke="#8B6914" strokeWidth="0.8" />
      <circle cx="40" cy="44" r="1.5" fill="#4A3020" />
      <path d="M8 30 L12 10 Q40 4 68 10 L72 30" fill="url(#chestWood)" stroke="#4A3020" strokeWidth="1.2" />
      <path d="M10 22 Q40 16 70 22" stroke="#8B7355" strokeWidth="2" opacity="0.35" fill="none" />
      <g filter="url(#goldGlow)">
        <circle cx="30" cy="28" r="4" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.6" />
        <circle cx="38" cy="26" r="4.5" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.6" />
        <circle cx="46" cy="27" r="4" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.6" />
        <circle cx="54" cy="29" r="3.5" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.6" />
        <circle cx="42" cy="22" r="3.5" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.5" />
        <circle cx="28" cy="34" r="3" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.5" opacity="0.7" />
        <circle cx="36" cy="32" r="3.5" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.5" opacity="0.8" />
        <circle cx="44" cy="33" r="3" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.5" opacity="0.7" />
        <circle cx="52" cy="34" r="3.5" fill="url(#chestGold)" stroke="#B8860B" strokeWidth="0.5" opacity="0.8" />
      </g>
      <path d="M26 20 L28 18 L30 20 L28 22 Z" fill="#FFD700" opacity="0.5" />
      <path d="M50 18 L52 16 L54 18 L52 20 Z" fill="#FFD700" opacity="0.4" />
      <path d="M38 16 L39 14 L40 16 L39 18 Z" fill="#FFD700" opacity="0.6" />
    </svg>
  );
}

// =============================================
// CACTUS — desert style
// =============================================
export function Cactus({ size = 60, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 50 65" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="cactusGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3D7A3D" />
          <stop offset="50%" stopColor="#4A9B4A" />
          <stop offset="100%" stopColor="#3D7A3D" />
        </linearGradient>
      </defs>
      <ellipse cx="25" cy="62" rx="10" ry="2.5" fill="#2C1810" opacity="0.06" />
      <path d="M25 60 L25 16 Q25 10 25 6" stroke="url(#cactusGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M25 32 L15 32 Q10 32 10 27 L10 18" stroke="url(#cactusGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M25 22 L35 22 Q40 22 40 17 L40 12" stroke="url(#cactusGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="23" y1="56" x2="23" y2="12" stroke="#2E5E2E" strokeWidth="0.5" opacity="0.2" />
      <line x1="27" y1="56" x2="27" y2="12" stroke="#2E5E2E" strokeWidth="0.5" opacity="0.2" />
      <g stroke="#5C8B5C" strokeWidth="0.8" opacity="0.4" strokeLinecap="round">
        <line x1="22" y1="18" x2="18" y2="16" />
        <line x1="28" y1="14" x2="32" y2="12" />
        <line x1="22" y1="24" x2="18" y2="22" />
        <line x1="28" y1="30" x2="32" y2="28" />
        <line x1="22" y1="40" x2="18" y2="38" />
        <line x1="28" y1="48" x2="32" y2="46" />
        <line x1="8" y1="22" x2="4" y2="20" />
        <line x1="12" y1="16" x2="8" y2="14" />
        <line x1="42" y1="14" x2="46" y2="12" />
        <line x1="38" y1="18" x2="42" y2="16" />
      </g>
      <circle cx="25" cy="5" r="3" fill="#FF6B8A" opacity="0.6" />
      <circle cx="25" cy="5" r="1.5" fill="#FFB6C1" opacity="0.8" />
    </svg>
  );
}

// =============================================
// ANCHOR — nautical, detailed
// =============================================
export function Anchor({ size = 60, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 50 55" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="anchorMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="100%" stopColor="#5C3D2E" />
        </linearGradient>
      </defs>
      <circle cx="25" cy="8" r="5" stroke="url(#anchorMetal)" strokeWidth="2.5" fill="none" />
      <line x1="25" y1="13" x2="25" y2="45" stroke="url(#anchorMetal)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="38" y2="22" stroke="url(#anchorMetal)" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 45 Q15 48 8 42 Q5 38 8 35" stroke="url(#anchorMetal)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M25 45 Q35 48 42 42 Q45 38 42 35" stroke="url(#anchorMetal)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M8 35 L5 32" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 35 L45 32" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 16 Q18 18 22 20 Q26 22 22 24" stroke="#B8A88A" strokeWidth="0.8" opacity="0.4" fill="none" />
    </svg>
  );
}

// =============================================
// WAVES — decorative ocean divider
// =============================================
export function Waves({ size = 200, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.12} viewBox="0 0 200 24" fill="none" className={className} style={style}>
      <path d="M0 12 C10 4, 20 4, 30 12 C40 20, 50 20, 60 12 C70 4, 80 4, 90 12 C100 20, 110 20, 120 12 C130 4, 140 4, 150 12 C160 20, 170 20, 180 12 C190 4, 200 4, 210 12"
        stroke="#2E6B6B" strokeWidth="1.5" opacity="0.2" fill="none" strokeLinecap="round" />
      <path d="M0 18 C12 10, 24 10, 36 18 C48 26, 60 26, 72 18 C84 10, 96 10, 108 18 C120 26, 132 26, 144 18 C156 10, 168 10, 180 18 C192 26, 204 26, 216 18"
        stroke="#2E6B6B" strokeWidth="0.8" opacity="0.12" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// =============================================
// BINOCULARS — exploration theme
// =============================================
export function Binoculars({ size = 50, className = '', style }: Props) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 50 40" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id="binoBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C3D2E" />
          <stop offset="100%" stopColor="#3A2518" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="14" height="28" rx="6" fill="url(#binoBody)" stroke="#3A2518" strokeWidth="1" />
      <ellipse cx="11" cy="8" rx="6" ry="3" fill="#3A2518" />
      <ellipse cx="11" cy="8" rx="4" ry="2" fill="#1A150D" opacity="0.4" />
      <rect x="32" y="8" width="14" height="28" rx="6" fill="url(#binoBody)" stroke="#3A2518" strokeWidth="1" />
      <ellipse cx="39" cy="8" rx="6" ry="3" fill="#3A2518" />
      <ellipse cx="39" cy="8" rx="4" ry="2" fill="#1A150D" opacity="0.4" />
      <rect x="16" y="16" width="18" height="8" rx="3" fill="#5C3D2E" stroke="#3A2518" strokeWidth="0.8" />
      <circle cx="25" cy="20" r="3" fill="#8B7355" stroke="#5C3D2E" strokeWidth="0.8" />
      <line x1="23" y1="20" x2="27" y2="20" stroke="#5C3D2E" strokeWidth="0.5" />
    </svg>
  );
}
