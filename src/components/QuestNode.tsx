import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Quest, QuestStatus } from '../types/course';
import { Island, MountainRange, PalmTree, SailingShip, Castle, SeaMonster, Cactus, Anchor, CompassRoseFull, Treasure } from './MapIllustrations';

interface QuestNodeProps {
  quest: Quest;
  status: QuestStatus;
  index: number;
  onClick: () => void;
}

const landmarks = [
  { Component: Island, size: 100 },
  { Component: MountainRange, size: 120 },
  { Component: PalmTree, size: 70 },
  { Component: SailingShip, size: 110 },
  { Component: Castle, size: 80 },
  { Component: SeaMonster, size: 100 },
  { Component: Cactus, size: 60 },
  { Component: Anchor, size: 60 },
];

export function QuestNode({ quest, status, index, onClick }: QuestNodeProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const navigate = useNavigate();
  const isDisabled = status === 'locked';
  const title = lang === 'en' ? quest.title_en : quest.title_id;

  const isCheckpoint = quest.type === 'checkpoint' || quest.type === 'final_review';
  const isProject = quest.type === 'project';

  let Illustration, illSize;
  if (isCheckpoint || quest.type === 'final_review') {
    Illustration = CompassRoseFull;
    illSize = 95;
  } else if (isProject) {
    Illustration = Treasure;
    illSize = 100;
  } else {
    const lm = landmarks[index % landmarks.length];
    Illustration = lm.Component;
    illSize = lm.size;
  }

  const handleClick = () => {
    if (isDisabled) return;
    if (isCheckpoint && quest.quiz_questions && quest.quiz_questions.length > 0) {
      navigate(`/quiz/${quest.id}`);
    } else {
      onClick();
    }
  };

  const renderPinContent = () => {
    if (status === 'completed') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    }
    if (status === 'in_progress') {
      return <div className="w-2.5 h-2.5 rounded-full bg-current" />;
    }
    if (status === 'unlocked') {
      if (isCheckpoint || quest.type === 'final_review') {
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
            <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
          </svg>
        );
      }
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    }
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  };

  return (
    <motion.div
      className={`quest-pin quest-pin--${status}`}
      data-quest-id={quest.id}
      onClick={handleClick}
      whileHover={!isDisabled ? { scale: 1.06, y: -8 } : {}}
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
    >
      {/* Island base with illustration */}
      <div className="quest-pin__island">
        <motion.div
          style={{
            filter: isDisabled ? 'grayscale(0.7) brightness(0.6)' : 'saturate(0.9)',
            opacity: isDisabled ? 0.35 : 0.9,
          }}
          animate={status === 'in_progress' ? {
            y: [0, -5, 0],
          } : status === 'unlocked' ? {
            y: [0, -2, 0],
          } : {}}
          transition={{
            duration: status === 'in_progress' ? 2.5 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Illustration size={illSize} />
        </motion.div>
      </div>

      {/* Map pin marker */}
      <div className="quest-pin__marker">
        {renderPinContent()}
      </div>
      <div className="quest-pin__shadow" />

      {/* Paper label */}
      <div className="quest-pin__label corner-fold">
        <span className="quest-pin__title">{title}</span>
        <div className="quest-pin__meta">
          <span style={{ color: isDisabled ? undefined : 'var(--color-gold)' }}>+{quest.xp_reward} XP</span>
          {(isCheckpoint || isProject) && (
            <span style={{ color: 'var(--color-ink-muted)' }}>
              {isCheckpoint ? '• Quiz' : '• Proyek'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
