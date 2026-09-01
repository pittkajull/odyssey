import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  from: string;
  to: string;
  positions: Map<string, DOMRect>;
  boardRef: React.RefObject<HTMLDivElement>;
  onComplete: () => void;
}

export function ShipSailing({ from, to, positions, boardRef, onComplete }: Props) {
  const shipRef = useRef<HTMLDivElement>(null);
  const [wake, setWake] = useState<{ id: number; x: number; y: number }[]>([]);
  const [visible, setVisible] = useState(false);
  const wakeId = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const fromRect = positions.get(from);
    const toRect = positions.get(to);
    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!fromRect || !toRect || !boardRect || !shipRef.current) {
      onComplete();
      return;
    }

    const fromX = fromRect.left + fromRect.width / 2 - boardRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - boardRect.top;
    const toX = toRect.left + toRect.width / 2 - boardRect.left;
    const toY = toRect.top + toRect.height / 2 - boardRect.top;

    // Bézier control point — bulge perpendicular
    const mx = (fromX + toX) / 2;
    const my = (fromY + toY) / 2;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const bulge = 40 * (Math.random() > 0.5 ? 1 : -1);
    const cx = mx - (dy / dist) * bulge;
    const cy = my + (dx / dist) * bulge;

    setVisible(true);
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      let t = Math.min((now - start) / duration, 1);

      // Quadratic Bézier
      const x = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * cx + t * t * toX;
      const y = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * cy + t * t * toY;

      // Heading
      const dxT = 2 * (1 - t) * (cx - fromX) + 2 * t * (toX - cx);
      const dyT = 2 * (1 - t) * (cy - fromY) + 2 * t * (toY - cy);
      const angle = Math.atan2(dyT, dxT) * (180 / Math.PI);

      // Bobbing
      const bob = Math.sin(t * Math.PI * 6) * 3;

      const el = shipRef.current;
      if (el) {
        el.style.left = (x - 13) + 'px';
        el.style.top = (y - 13 + bob) + 'px';
        el.style.transform = `rotate(${angle + 90}deg)`;
      }

      // Wake dots
      if (Math.random() > 0.6) {
        wakeId.current += 1;
        setWake(prev => [...prev.slice(-10), { id: wakeId.current, x, y: y + 10 }]);
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        setTimeout(onComplete, 100);
      }
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [from, to, positions, boardRef, onComplete]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      {/* Wake */}
      <AnimatePresence>
        {wake.map(w => (
          <motion.div
            key={w.id}
            style={{
              position: 'absolute', left: w.x - 3, top: w.y,
              width: 6, height: 6, borderRadius: '50%',
              background: 'rgba(255,255,255,0.6)',
            }}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>

      {/* Ship */}
      {visible && (
        <div
          ref={shipRef}
          style={{
            position: 'absolute',
            fontSize: 26,
            filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.4))',
            zIndex: 101,
            transition: 'none',
          }}
        >
          ⛵
        </div>
      )}
    </div>
  );
}
