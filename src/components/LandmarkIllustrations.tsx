import { motion } from 'framer-motion';
import { SailingShip, MountainRange, PalmTree, Island, Castle, SeaMonster, CompassRoseFull, Treasure, Cactus, Anchor } from './MapIllustrations';
import type { Quest, QuestStatus } from '../types/course';

// Map quest type + index to a landmark illustration
const landmarkMap = [
  { Component: Island, label: 'Pulau' },
  { Component: MountainRange, label: 'Pegunungan' },
  { Component: PalmTree, label: 'Pohon Palem' },
  { Component: SailingShip, label: 'Kapal' },
  { Component: Castle, label: 'Benteng' },
  { Component: SeaMonster, label: 'Monster Laut' },
  { Component: Cactus, label: 'Kaktus' },
  { Component: Anchor, label: 'Jangkar' },
];

interface LandmarkProps {
  quest: Quest;
  status: QuestStatus;
  index: number;
  onClick: () => void;
  lang: string;
}

// Status-based colors and effects
const statusConfig = {
  completed: {
    badge: '#4A7C4A',
    badgeBg: 'rgba(74,124,74,0.12)',
    filter: 'none',
    opacity: 1,
  },
  in_progress: {
    badge: '#2E6B6B',
    badgeBg: 'rgba(46,107,107,0.12)',
    filter: 'none',
    opacity: 1,
  },
  unlocked: {
    badge: '#B8860B',
    badgeBg: 'rgba(184,134,11,0.12)',
    filter: 'none',
    opacity: 1,
  },
  locked: {
    badge: '#8B7355',
    badgeBg: 'rgba(139,115,85,0.08)',
    filter: 'grayscale(0.8)',
    opacity: 0.35,
  },
};

export function LandmarkIllustration({ quest, status, index, onClick, lang }: LandmarkProps) {
  const landmark = landmarkMap[index % landmarkMap.length];
  const config = statusConfig[status];
  const isCheckpoint = quest.type === 'checkpoint' || quest.type === 'final_review';
  const isProject = quest.type === 'project';
  const title = lang === 'en' ? quest.title_en : quest.title_id;

  // Choose illustration based on type
  let Illustration;
  if (isCheckpoint || quest.type === 'final_review') {
    Illustration = CompassRoseFull;
  } else if (isProject) {
    Illustration = Treasure;
  } else {
    Illustration = landmark.Component;
  }

  // Size based on type — bigger for special quests
  const size = isCheckpoint ? 130 : isProject ? 140 : 160;

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group relative"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: config.opacity, y: 0 }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={status !== 'locked' ? { scale: 1.06, y: -8 } : {}}
      whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
      style={{ filter: config.filter }}
    >
      {/* The illustration scene */}
      <div className="relative">
        {/* Glow behind for active/unlocked */}
        {(status === 'in_progress' || status === 'unlocked') && (
          <motion.div
            className="absolute inset-0 -m-6"
            style={{
              background: status === 'in_progress'
                ? 'radial-gradient(ellipse at center, rgba(46,107,107,0.15) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at center, rgba(184,134,11,0.12) 0%, transparent 70%)',
            }}
            animate={status === 'in_progress' ? {
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* The SVG illustration */}
        <motion.div
          animate={status === 'in_progress' ? {
            y: [0, -6, 0],
          } : status === 'unlocked' ? {
            y: [0, -3, 0],
          } : {}}
          transition={{
            duration: status === 'in_progress' ? 2.5 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Illustration size={size} />
        </motion.div>

        {/* Status badge — top right */}
        <motion.div
          className="absolute -top-2 -right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.08 + 0.3, type: 'spring', stiffness: 400 }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-sm"
            style={{
              backgroundColor: config.badgeBg,
              borderColor: config.badge,
            }}
          >
            {status === 'completed' && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={config.badge} strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {status === 'in_progress' && (
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.badge }} />
            )}
            {status === 'unlocked' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={config.badge} strokeWidth="2" strokeLinecap="round">
                <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill={config.badge} opacity="0.6" />
              </svg>
            )}
            {status === 'locked' && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={config.badge} strokeWidth="2" opacity="0.5">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
          </div>
        </motion.div>

        {/* Pulse ring for in_progress */}
        {status === 'in_progress' && (
          <motion.div
            className="absolute inset-0 -m-3"
            style={{ border: '2px solid rgba(46,107,107,0.3)', borderRadius: '50%' }}
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.4, 0, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Title card — parchment paper below illustration */}
      <motion.div
        className="relative mt-3 px-4 py-2 text-center max-w-[180px]"
        style={{
          background: 'linear-gradient(135deg, #F5ECD7 0%, #EDE3C8 100%)',
          border: '1px solid rgba(139,115,85,0.2)',
          borderRadius: '2px',
          boxShadow: '2px 3px 8px rgba(44,24,16,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* Corner fold */}
        <div
          className="absolute top-0 right-0 w-4 h-4"
          style={{
            background: 'linear-gradient(225deg, #EDE3C8 50%, rgba(139,115,85,0.15) 50%)',
          }}
        />

        <p
          className="text-[11px] sm:text-[12px] leading-tight font-display italic"
          style={{
            color: status === 'locked' ? '#B8A88A' : '#4A3020',
          }}
        >
          {title}
        </p>

        {/* XP and type label */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <span
            className="text-[8px] font-handwritten font-bold"
            style={{ color: status === 'locked' ? '#C4B896' : '#B8860B' }}
          >
            +{quest.xp_reward} XP
          </span>
          {(isCheckpoint || isProject) && (
            <span
              className="text-[7px] font-handwritten uppercase tracking-wider"
              style={{ color: status === 'locked' ? '#C4B896' : '#8B7355' }}
            >
              {isCheckpoint ? 'Quiz' : 'Proyek'}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
