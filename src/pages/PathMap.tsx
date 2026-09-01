import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCourseData } from '../hooks/useCourseData';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import type { Quest, QuestStatus } from '../types/course';
import { ShipSailing } from '../components/SailingShipAnimation';
import { QuestModal } from '../components/QuestModal';

interface ProgressMap { [questId: string]: QuestStatus }
interface DbProgress { quest_id: string; status: string }

const DOODLES = ['🐠', '🌊', '🐚', '✕', '🐟', '🦀', '🦜', '🐙', '⚓', '🗝️', '🐡', '🦈'];
const ISLAND_EMOJIS = ['🌴', '🌿', '🏝️', '🐚', '🦀', '🦜', '🪸', '🐠'];

function getIslandEmoji(type: Quest['type'], i: number) {
  if (type === 'checkpoint' || type === 'final_review') return '🎯';
  if (type === 'project') return '🏗️';
  return ISLAND_EMOJIS[i % ISLAND_EMOJIS.length];
}

export function PathMap() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const { user, profile, refreshProfile } = useAuth();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});
  const { levels, loading } = useCourseData();
  const [sailing, setSailing] = useState<{ from: string; to: string } | null>(null);
  const [questPositions, setQuestPositions] = useState<Map<string, DOMRect>>(new Map());
  const boardRef = useRef<HTMLDivElement>(null);

  const fetchProgress = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('user_progress').select('quest_id, status').eq('user_id', user.id);
    if (!data) return;
    const map: ProgressMap = {};
    data.forEach((r: DbProgress) => { map[r.quest_id] = r.status as QuestStatus; });
    setProgress(map);
  }, [user]);

  useEffect(() => { if (user && levels.length > 0) fetchProgress(); }, [user, levels, fetchProgress]);

  useEffect(() => {
    if (levels.length > 0 && user && Object.keys(progress).length === 0 && !loading) {
      const all = levels.flatMap(l => l.modules.flatMap(m => m.quests));
      const init: ProgressMap = {};
      all.forEach((q, i) => { init[q.id] = i === 0 ? 'in_progress' : 'locked'; });
      setProgress(init);
      if (all.length > 0) {
        supabase.from('user_progress').upsert({ user_id: user.id, quest_id: all[0].id, status: 'in_progress' }, { onConflict: 'user_id,quest_id' });
      }
    }
  }, [levels, user, loading, progress]);

  const capturePositions = useCallback(() => {
    const m = new Map<string, DOMRect>();
    document.querySelectorAll('[data-quest-id]').forEach(el => {
      const id = el.getAttribute('data-quest-id');
      if (id) m.set(id, el.getBoundingClientRect());
    });
    setQuestPositions(m);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(capturePositions, 600);
      window.addEventListener('resize', capturePositions);
      return () => { clearTimeout(t); window.removeEventListener('resize', capturePositions); };
    }
  }, [loading, capturePositions]);

  const handleQuestComplete = useCallback(async (questId: string, score?: number) => {
    if (!user) return;
    const allQuests = levels.flatMap(l => l.modules.flatMap(m => m.quests));
    const quest = allQuests.find(q => q.id === questId);
    if (!quest) return;

    const idx = allQuests.findIndex(q => q.id === questId);
    const nextQuest = idx < allQuests.length - 1 ? allQuests[idx + 1] : null;

    if (nextQuest) setSailing({ from: questId, to: nextQuest.id });

    await supabase.from('user_progress').upsert({
      user_id: user.id, quest_id: questId, status: 'completed',
      quiz_score: score ?? null, completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,quest_id' });

    const { data: prof } = await supabase.from('profiles').select('xp').eq('id', user.id).single();
    if (prof) await supabase.from('profiles').update({ xp: prof.xp + quest.xp_reward }).eq('id', user.id);

    const today = new Date().toISOString().split('T')[0];
    const { data: p } = await supabase.from('profiles').select('streak_count, last_active_date').eq('id', user.id).single();
    if (p) {
      const y = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let s = p.streak_count;
      if (p.last_active_date !== today) s = p.last_active_date === y ? s + 1 : 1;
      await supabase.from('profiles').update({ streak_count: s, last_active_date: today }).eq('id', user.id);
    }

    setProgress(prev => {
      const up = { ...prev, [questId]: 'completed' as QuestStatus };
      if (nextQuest && (up[nextQuest.id] === 'locked' || !up[nextQuest.id])) {
        up[nextQuest.id] = 'in_progress';
        supabase.from('user_progress').upsert({ user_id: user.id, quest_id: nextQuest.id, status: 'in_progress' }, { onConflict: 'user_id,quest_id' });
      }
      return up;
    });
    await refreshProfile();
    if (nextQuest) setTimeout(() => setSailing(null), 1600);
  }, [user, levels, refreshProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-5xl mb-3">🧭</div>
          <p className="text-cream font-display font-bold">Memuat peta...</p>
        </div>
      </div>
    );
  }

  const allQuests = levels.flatMap(l => l.modules.flatMap(m => m.quests));
  const completedCount = Object.values(progress).filter(s => s === 'completed').length;

  return (
    <div className="px-3 py-6 sm:px-5 sm:py-7">
      <div className="board-frame" ref={boardRef}>
        <div className="ocean-surface p-4 sm:p-5">
          {/* Sun glow */}
          <div className="sun-glow" />

          {/* Clouds */}
          <motion.div
            className="absolute top-1 left-[35%] text-2xl opacity-50 z-0 pointer-events-none"
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.div>
          <motion.div
            className="absolute top-14 left-[62%] text-base opacity-30 z-0 pointer-events-none"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️
          </motion.div>

          {/* Compass rose */}
          <svg className="absolute top-2 right-3 w-[48px] h-[48px] z-10 opacity-80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#FFF6DD" strokeWidth="2" opacity="0.6" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#FFF6DD" strokeWidth="1" opacity="0.4" />
            <path d="M50 8 L57 50 L50 92 L43 50 Z" fill="#FFF6DD" opacity="0.8" />
            <path d="M8 50 L50 43 L92 50 L50 57 Z" fill="#FFF6DD" opacity="0.5" />
            <circle cx="50" cy="50" r="4" fill="#E3B23C" />
            <text x="50" y="18" textAnchor="middle" fontSize="9" fill="#FFF6DD" fontFamily="var(--font-display)" fontWeight="700">N</text>
          </svg>

          {/* Topbar — brand */}
          <div className="relative z-10 flex items-center justify-between mb-3">
            <div className="font-display font-extrabold text-xl text-cream" style={{ textShadow: '0 2px 3px rgba(0,0,0,0.35)' }}>
              🧭 ODYSSEY
              <span className="block text-[10px] font-body font-semibold tracking-wider uppercase text-ocean-highlight mt-[-2px]">
                Your Journey Into AI
              </span>
            </div>

            {/* Lang toggle */}
            <button
              onClick={() => i18n.changeLanguage(lang === 'id' ? 'en' : 'id')}
              className="relative z-10 bg-white/15 border border-white/30 rounded-full px-3 py-1 text-[11px] font-display font-bold text-cream hover:bg-white/25 transition-colors"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </div>

          {/* Stat pills */}
          <div className="flex gap-2 mb-4 relative z-10">
            <span className="stat-pill">🔥 {profile?.streak_count ?? 0}</span>
            <span className="stat-pill">⭐ {profile?.xp ?? 0}</span>
            <span className="stat-pill">🗺️ {completedCount}/{allQuests.length}</span>
          </div>

          {/* Levels */}
          {levels.map((level, li) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: li * 0.1 }}
            >
              {/* Region pill */}
              <div className="region-pill mb-5">
                <span className="region-pill__num">{li + 1}</span>
                {level.emoji} {lang === 'en' ? level.title_en : level.title_id}
              </div>

              {/* Modules */}
              {level.modules.map((module, mi) => (
                <div key={module.id} className="mb-4">
                  {/* Module label */}
                  <div className="text-center text-[10px] font-body font-bold text-white/40 tracking-[0.15em] uppercase mb-3 relative z-10">
                    {lang === 'en' ? module.title_en : module.title_id}
                  </div>

                  {/* Quest path */}
                  <div className="relative px-1 pb-3">
                    {/* SVG trail */}
                    <svg className="trail-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d={buildTrailPath(module.quests.length)} vectorEffect="non-scaling-stroke" />
                    </svg>

                    {/* Sea doodles */}
                    {module.quests.slice(0, 4).map((_, i) => (
                      <div
                        key={`d-${mi}-${i}`}
                        className="sea-doodle"
                        style={{
                          top: `${8 + i * 28}%`,
                          ...(i % 2 === 0 ? { right: `${8 + i * 4}%` } : { left: `${6 + i * 3}%` }),
                        }}
                      >
                        {DOODLES[(mi * 4 + i) % DOODLES.length]}
                      </div>
                    ))}

                    {/* Quests */}
                    {module.quests.map((quest, qi) => {
                      const isLeft = qi % 2 === 0;
                      const status = progress[quest.id] || 'locked';
                      const isCP = quest.type === 'checkpoint' || quest.type === 'final_review';

                      return (
                        <motion.div
                          key={quest.id}
                          className={`relative z-10 flex ${isLeft ? 'justify-start' : 'justify-end'} mb-1.5`}
                          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: qi * 0.08, duration: 0.4 }}
                        >
                          {isCP ? (
                            /* Checkpoint buoy */
                            <div
                              className={`cursor-pointer transition-all duration-200 ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
                              data-quest-id={quest.id}
                              onClick={() => {
                                if (status === 'locked') return;
                                if (quest.quiz_questions?.length) window.location.href = `/quiz/${quest.id}`;
                                else setSelectedQuest(quest);
                              }}
                            >
                              <div className="relative">
                                {status === 'in_progress' && <div className="flag-pole" />}
                                <div className="checkpoint-buoy">🎯</div>
                              </div>
                              <div className="text-center mt-1 font-display font-bold text-[11px] text-cream" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                {lang === 'en' ? quest.title_en : quest.title_id}
                              </div>
                            </div>
                          ) : (
                            /* Island */
                            <button
                              className={`group bg-transparent border-0 p-0 cursor-pointer transition-transform duration-200 ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
                              data-quest-id={quest.id}
                              disabled={status === 'locked'}
                              onClick={() => setSelectedQuest(quest)}
                            >
                              <div className="relative">
                                {status === 'in_progress' && (
                                  <>
                                    <div className="flag-pole" />
                                    <div className="ship-float">⛵</div>
                                  </>
                                )}
                                <div className={`island-blob island-blob--${status === 'in_progress' ? 'current' : status}`}>
                                  {getIslandEmoji(quest.type, qi)}
                                </div>
                              </div>
                              <div className="text-center mt-1 font-display font-bold text-[11px] text-cream leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                {lang === 'en' ? quest.title_en : quest.title_id}
                              </div>
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Module divider */}
                  {mi < level.modules.length - 1 && (
                    <div className="text-center text-xl my-5 opacity-60">⚓</div>
                  )}
                </div>
              ))}

              {/* Level divider */}
              {li < levels.length - 1 && (
                <div className="text-center text-2xl my-7 opacity-50">⚓</div>
              )}
            </motion.div>
          ))}

          {/* X marks the treasure */}
          <div className="x-marks pt-4 pb-2">
            <span className="x-marks__sparkle">✦</span>
            <span className="x-marks__x">✕</span>
            <span className="x-marks__sparkle">✦</span>
            <div className="x-marks__label">
              {lang === 'en' ? 'X marks the treasure' : 'X menandai harta karun'}
            </div>
          </div>
        </div>
      </div>

      {/* Ship sailing */}
      <AnimatePresence>
        {sailing && (
          <ShipSailing
            from={sailing.from}
            to={sailing.to}
            positions={questPositions}
            boardRef={boardRef as React.RefObject<HTMLDivElement>}
            onComplete={() => setSailing(null)}
          />
        )}
      </AnimatePresence>

      {/* Quest modal */}
      <AnimatePresence>
        {selectedQuest && (
          <QuestModal
            quest={selectedQuest}
            onClose={() => setSelectedQuest(null)}
            onComplete={(qid, score) => {
              handleQuestComplete(qid, score);
              setSelectedQuest(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function buildTrailPath(count: number): string {
  const seg = 100 / (count + 1);
  const pts: string[] = [];
  for (let i = 0; i <= count; i++) {
    const y = seg * (i + 0.5);
    const x = i % 2 === 0 ? 16 : 84;
    if (i === 0) { pts.push(`M ${x} ${y}`); }
    else {
      const px = (i - 1) % 2 === 0 ? 16 : 84;
      const py = seg * (i - 0.5);
      const my = (py + y) / 2;
      pts.push(`C ${px} ${my}, ${x} ${my}, ${x} ${y}`);
    }
  }
  return pts.join(' ');
}
