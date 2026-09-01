import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Level, QuestStatus } from '../types/course';

interface ProgressMap { [questId: string]: QuestStatus }

interface Props {
  levels: Level[];
  progress: ProgressMap;
}

export function ProgressTracker({ levels, progress }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  const allQuests = levels.flatMap(l => l.modules.flatMap(m => m.quests));
  const completedCount = allQuests.filter(q => progress[q.id] === 'completed').length;
  const totalCount = allQuests.length;
  const overallPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="scroll-panel paper-texture p-4 sm:p-5">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-sepia)" strokeWidth="2" strokeLinecap="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="font-handwritten text-[10px] uppercase tracking-[.15em] text-[var(--color-ink-muted)]">
            {lang === 'en' ? 'Voyage Log' : 'Log Perjalanan'}
          </span>
        </div>

        {/* Overall progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-handwritten text-[10px] uppercase tracking-[.15em] text-[var(--color-ink-muted)]">
            {lang === 'en' ? 'Distance Sailed' : 'Jarak Tempuh'}
          </span>
          <span className="font-handwritten text-sm text-[var(--color-gold)] font-bold">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="trail-track h-2 mb-4">
          <motion.div
            className="trail-fill"
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Per-level islands */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {levels.map((level, li) => {
            const levelQuests = level.modules.flatMap(m => m.quests);
            const levelCompleted = levelQuests.filter(q => progress[q.id] === 'completed').length;
            const levelTotal = levelQuests.length;
            const levelPercent = levelTotal > 0 ? Math.round((levelCompleted / levelTotal) * 100) : 0;
            const isComplete = levelCompleted === levelTotal && levelTotal > 0;

            return (
              <motion.div
                key={level.id}
                className="text-center p-3 rounded-sm"
                style={{
                  background: isComplete
                    ? 'linear-gradient(135deg, rgba(46,94,62,.08), rgba(46,94,62,.04))'
                    : 'linear-gradient(135deg, rgba(180,160,120,.1), rgba(180,160,120,.03))',
                  border: `1px solid ${isComplete ? 'rgba(46,94,62,.2)' : 'rgba(112,66,20,.1)'}`,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + li * 0.1 }}
              >
                <span className="text-lg block mb-1">{level.emoji}</span>
                <span className="font-display text-[11px] text-[var(--color-ink)] block mb-1">
                  {lang === 'en' ? level.title_en : level.title_id}
                </span>
                <div className="trail-track h-1 mb-1">
                  <motion.div
                    className="trail-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${levelPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + li * 0.1 }}
                  />
                </div>
                <span className="font-handwritten text-[9px] text-[var(--color-ink-muted)]">
                  {levelCompleted}/{levelTotal}{isComplete ? ' ✓' : ''}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
