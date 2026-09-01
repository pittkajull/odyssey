interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CompassRose({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* N */}
      <path d="M12 2L13 6H11L12 2Z" fill="currentColor" opacity="0.7" />
      {/* S */}
      <path d="M12 22L11 18H13L12 22Z" fill="currentColor" opacity="0.3" />
      {/* E */}
      <path d="M22 12L18 11V13L22 12Z" fill="currentColor" opacity="0.3" />
      {/* W */}
      <path d="M2 12L6 13V11L2 12Z" fill="currentColor" opacity="0.3" />
      {/* NE */}
      <path d="M19.5 4.5L16 7.5L17 8.5L19.5 4.5Z" fill="currentColor" opacity="0.2" />
      {/* NW */}
      <path d="M4.5 4.5L8 7.5L7 8.5L4.5 4.5Z" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function MapFlag({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 22V2" />
      <path d="M4 2C4 2 8 3 12 2C16 1 20 2 20 2V14C20 14 16 15 12 14C8 13 4 14 4 14" fill="currentColor" opacity="0.15" />
      <path d="M4 2C4 2 8 3 12 2C16 1 20 2 20 2V14C20 14 16 15 12 14C8 13 4 14 4 14" />
    </svg>
  );
}

export function MapPin({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function TreasureChest({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="10" width="18" height="11" rx="1" />
      <path d="M3 10C3 7 7 4 12 4C17 4 21 7 21 10" />
      <path d="M3 10H21" />
      <rect x="10" y="8" width="4" height="4" rx="1" fill="currentColor" opacity="0.15" />
      <path d="M10 14H14" />
      <path d="M10 17H14" />
    </svg>
  );
}

export function Telescope({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 21L10 3" />
      <path d="M18 21L14 3" />
      <path d="M10 3H14" />
      <path d="M4 15H20" />
      <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

export function Scroll({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2H16C17.1 2 18 2.9 18 4V6C18 7.1 17.1 8 16 8H8C6.9 8 6 7.1 6 6V4C6 2.9 6.9 2 8 2Z" />
      <path d="M6 8V20C6 21.1 6.9 22 8 22H18C19.1 22 20 21.1 20 20V8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  );
}

export function Anchor({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="22" x2="12" y2="8" />
      <path d="M5 12H2C2 12 2 17 12 17C22 17 22 12 22 12H19" />
    </svg>
  );
}

export function BookOpen({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3H7C8.1 3 9 3.9 9 5V21L6 19L3 21V5C3 3.9 2.9 3 2 3Z" />
      <path d="M22 3H17C15.9 3 15 3.9 15 5V21L18 19L21 21V5C21 3.9 21.1 3 22 3Z" />
    </svg>
  );
}

export function Shield({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22S4 16 4 10V5L12 2L20 5V10C20 16 12 22 12 22Z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function Mountain({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 21L2 21L8 8L10 13L14 6L22 21H8Z" />
      <path d="M14 6L16 10" opacity="0.3" />
    </svg>
  );
}

export function Flame({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export function Star({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function Check({ size = 14, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Lock({ size = 14, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function LogOut({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

export function User({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function Globe({ size = 14, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
