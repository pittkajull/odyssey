import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Level, QuestStatus } from '../types/course';
import { MountainRange, Waves, PalmTree, CompassRoseFull } from './MapIllustrations';

interface ProgressTrackerProps {
  levels: Level[];
  progress: { [questId: string]: QuestStatus };
}

const levelDecorations = [
  <PalmTree size={28} />,
  <CompassRoseFull size={28} />,
  <MountainRange size={40} />,
  <Waves size={40} />,
];

export function ProgressTracker({ levels, progress }: ProgressTrackerProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  const totalQuests = levels.reduce((sum, l) => sum + l.modules.reduce((s, m) => s + m.quests.length, 0), 0);
  const completedQuests = levels.reduce((sum, l) =>
    sum + l.modules.reduce((s, m) => s + m.quests.filter((q) => progress[q.id] === 'completed').length, 0), 0);
  const overallPercent = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  return (
    <div className="progress-ribbon max-w-4xl mx-auto px-4 sm:px-6 mb-10">
      {/* Overall progress */}
      <motion.div
        className="progress-ribbon__overall mb-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-handwritten text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            {lang === 'en' ? 'Overall Progress' : 'Keseluruhan'}
          </span>
          <span className="font-handwritten text-[10px] text-[var(--color-ink-muted)]">
            {completedQuests}/{totalQuests} {lang === 'en' ? 'quests' : 'quest'}
          </span>
        </div>
        <div className="trail-track">
          <motion.div
            className="trail-fill"
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          />
        </div>
      </motion.div>

      {/* Per-level progress */}
      <div className="progress-ribbon__levels grid grid-cols-2 sm:grid-cols-4 gap-3">
        {levels.map((level, i) => {
          const total = level.modules.reduce((s, m) => s + m.quests.length, 0);
          const done = level.modules.reduce((s, m) => s + m.quests.filter((q) => progress[q.id] === 'completed').length, 0);
          const pct = total > 0 ? (done / total) * 100 : 0;
          const isComplete = done === total && total > 0;

          return (
            <motion.div
              key={level.id}
              className="progress-ribbon__level relative bg-[var(--color-parchment-light)] border border-[var(--color-ink-faded)] border-opacity-15 rounded-sm p-3 overflow-hidden"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              {/* Decorative illustration in background */}
              <div className="absolute bottom-0 right-0 opacity-[0.06] translate-x-1 translate-y-1">
                {levelDecorations[i]}
              </div>

              <div className="relative">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm">{level.emoji}</span>
                  <span className="font-display text-[11px] text-[var(--color-ink)] italic leading-tight truncate">
                    {lang === 'en' ? level.title_en : level.title_id}
                  </span>
                </div>

                <div className="trail-track mb-1.5">
                  <motion.div
                    className="trail-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.1 }}
                    style={{
                      background: isComplete ? 'var(--color-stamp-green)' : 'var(--color-ocean)',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-handwritten text-[9px] text-[var(--color-ink-muted)]">
                    {done}/{total}
                  </span>
                  {isComplete && (
                    <span className="font-handwritten text-[8px] text-[var(--color-stamp-green)]">
                      {lang === 'en' ? 'Complete' : 'Selesai'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
