import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  targetQuestId: string;
}

/**
 * Ship that sails from current position to the completed quest,
 * leaving a trail of sparkles behind.
 */
export function SailingShipMini({ targetQuestId }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkleId = useRef(0);

  useEffect(() => {
    // Find the target quest element
    const targetEl = document.querySelector(`[data-quest-id="${targetQuestId}"]`);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const mapRect = targetEl.closest('.map-surface')?.getBoundingClientRect();
      if (mapRect) {
        setTarget({
          x: rect.left + rect.width / 2 - mapRect.left,
          y: rect.top + rect.height / 2 - mapRect.top,
        });
      }
    }
  }, [targetQuestId]);

  // Generate sparkles along the path
  useEffect(() => {
    const interval = setInterval(() => {
      sparkleId.current += 1;
      setSparkles(prev => [
        ...prev.slice(-15), // Keep last 15
        {
          id: sparkleId.current,
          x: pos.x + (Math.random() - 0.5) * 30,
          y: pos.y + (Math.random() - 0.5) * 20 + 10,
        },
      ]);
    }, 100);

    const timeout = setTimeout(() => clearInterval(interval), 2500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [pos.x, pos.y]);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Sparkle trail */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: s.x,
            top: s.y,
            background: ['#DAA520', '#FFD700', '#B8860B', '#F0E4C8'][s.id % 4],
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        />
      ))}

      {/* The ship */}
      <motion.div
        className="absolute"
        style={{
          left: pos.x - 30,
          top: pos.y - 30,
        }}
        animate={{
          left: target.x - 30,
          top: target.y - 30,
        }}
        transition={{
          duration: 2.5,
          ease: [0.25, 0.1, 0.25, 1],
          onUpdate: (latest) => {
            setPos({ x: (latest as any).left + 30, y: (latest as any).top + 30 });
          },
        }}
      >
        <motion.svg
          width="60" height="45" viewBox="0 0 140 105" fill="none"
          animate={{ y: [0, -3, 0, 2, 0], rotate: [-1, 0.5, -0.5, 0, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(2px 3px 4px rgba(44,24,16,.3))' }}
        >
          <defs>
            <linearGradient id="miniShipHull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A0724A" />
              <stop offset="60%" stopColor="#704214" />
              <stop offset="100%" stopColor="#5C3D2E" />
            </linearGradient>
            <linearGradient id="miniShipSail" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="100%" stopColor="#E8D5A3" />
            </linearGradient>
          </defs>
          <path d="M20 72 C24 78, 30 84, 70 86 C110 84, 116 78, 120 72 L116 66 C96 72, 70 76, 44 72 L20 66 Z"
            fill="url(#miniShipHull)" stroke="#5C3D2E" strokeWidth="1.2" strokeLinejoin="round" />
          <line x1="70" y1="12" x2="70" y2="68" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 14 C92 20, 96 35, 92 52 C88 60, 74 64, 72 64 Z" fill="url(#miniShipSail)" stroke="#C4A265" strokeWidth="1" />
          <path d="M68 14 C48 20, 44 35, 48 52 C52 60, 66 64, 68 64 Z" fill="url(#miniShipSail)" stroke="#C4A265" strokeWidth="1" />
          <line x1="40" y1="28" x2="40" y2="66" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 30 C54 34, 56 46, 52 58 C50 62, 44 64, 42 64 Z" fill="url(#miniShipSail)" stroke="#C4A265" strokeWidth="0.8" opacity="0.85" />
          <line x1="26" y1="62" x2="8" y2="44" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 12 L70 4 L88 8 L70 12" fill="#C44B2B" stroke="#8B2500" strokeWidth="0.6" opacity="0.85" />
          {/* Waves below ship */}
          <path d="M8 88 C14 84, 20 84, 26 88 C32 92, 38 92, 44 88 C50 84, 56 84, 62 88 C68 92, 74 92, 80 88 C86 84, 92 84, 98 88 C104 92, 110 92, 116 88 C122 84, 128 84, 134 88"
            stroke="#2E6B6B" strokeWidth="1" opacity="0.3" fill="none" strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
