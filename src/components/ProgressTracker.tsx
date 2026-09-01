import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Level } from '../types/course';
import type { QuestStatus } from '../types/course';

interface ProgressMap {
  [questId: string]: QuestStatus;
}

interface Props {
  levels: Level[];
  progress: ProgressMap;
}

export function ProgressTracker({ levels, progress }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';

  // Calculate overall progress
  const allQuests = levels.flatMap(l => l.modules.flatMap(m => m.quests));
  const completedCount = allQuests.filter(q => progress[q.id] === 'completed').length;
  const totalCount = allQuests.length;
  const overallPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="map-card p-4 sm:p-5">
        {/* Overall progress */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-handwritten text-[10px] uppercase tracking-[.15em] text-[var(--color-ink-muted)]">
            {lang === 'en' ? 'Overall Progress' : 'Keseluruhan'}
          </span>
          <span className="font-handwritten text-sm text-[var(--color-ocean)] font-bold">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="trail-track h-2 mb-4">
          <motion.div
            className="trail-fill"
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(90deg, var(--color-ocean), var(--color-gold), var(--color-stamp-green))',
            }}
          />
        </div>

        {/* Per-level breakdown */}
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
                    : 'linear-gradient(135deg, rgba(180,160,120,.15), rgba(180,160,120,.05))',
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
                    style={{
                      background: isComplete ? 'var(--color-stamp-green)' : 'var(--color-ocean)',
                    }}
                  />
                </div>
                <span className="font-handwritten text-[9px] text-[var(--color-ink-muted)]">
                  {levelCompleted}/{levelTotal}
                  {isComplete && ' ✓'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
