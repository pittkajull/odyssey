import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCourseData } from '../hooks/useCourseData';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { QuestNode } from '../components/QuestNode';
import { QuestModal } from '../components/QuestModal';
import { ProgressTracker } from '../components/ProgressTracker';
import { CompassRose } from '../components/AdventureIcons';
import { SailingShip, PalmTree, MountainRange, Waves, SeaMonster, Island, CompassRoseFull, Binoculars, Castle } from '../components/MapIllustrations';
import { SailingShipMini } from '../components/SailingShipAnimation';
import type { Quest, QuestStatus, Level } from '../types/course';

interface ProgressMap { [questId: string]: QuestStatus }
interface DbProgress { quest_id: string; status: string }

export function PathMap() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const { user, refreshProfile } = useAuth();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});
  const { levels, loading, error, source } = useCourseData();
  const [sailingTo, setSailingTo] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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
      const all = levels.flatMap((l) => l.modules.flatMap((m) => m.quests));
      const init: ProgressMap = {};
      all.forEach((q, i) => { init[q.id] = i === 0 ? 'in_progress' : 'locked'; });
      setProgress(init);
      if (all.length > 0) {
        supabase.from('user_progress').upsert({ user_id: user.id, quest_id: all[0].id, status: 'in_progress' }, { onConflict: 'user_id,quest_id' });
      }
    }
  }, [levels, user, loading, progress]);

  const checkBadge = useCallback(async (levelId: string) => {
    if (!user) return;
    const level = levels.find((l: Level) => l.id === levelId);
    if (!level) return;
    const ids = level.modules.flatMap((m) => m.quests.map((q) => q.id));
    const done = ids.filter((id) => progress[id] === 'completed').length;
    if (done === ids.length && done > 0) {
      await supabase.from('user_badges').upsert({ user_id: user.id, level_id: levelId, earned_at: new Date().toISOString() }, { onConflict: 'user_id,level_id' });
    }
  }, [user, levels, progress]);

  const handleQuestComplete = useCallback(async (questId: string, score?: number) => {
    if (!user) return;
    const allQuests = levels.flatMap((l) => l.modules.flatMap((m) => m.quests));
    const quest = allQuests.find((q) => q.id === questId);
    if (!quest) return;

    // Show ship sailing animation
    setSailingTo(questId);

    await supabase.from('user_progress').upsert({ user_id: user.id, quest_id: questId, status: 'completed', quiz_score: score ?? null, completed_at: new Date().toISOString() }, { onConflict: 'user_id,quest_id' });
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
    const idx = allQuests.findIndex((q) => q.id === questId);
    setProgress((prev) => {
      const up: ProgressMap = { ...prev, [questId]: 'completed' };
      if (idx < allQuests.length - 1) {
        const next = allQuests[idx + 1];
        if (up[next.id] === 'locked' || !up[next.id]) {
          up[next.id] = 'unlocked';
          supabase.from('user_progress').upsert({ user_id: user.id, quest_id: next.id, status: 'unlocked' }, { onConflict: 'user_id,quest_id' });
        }
      }
      return up;
    });
    if (quest.level_id) await checkBadge(quest.level_id);
    await refreshProfile();

    // Clear ship animation after delay
    setTimeout(() => setSailingTo(null), 2800);
  }, [user, levels, checkBadge, refreshProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <CompassRose size={48} className="text-[var(--color-sepia)] mx-auto mb-3 animate-[compass-spin_3s_linear_infinite]" />
          <p className="font-handwritten text-sm text-[var(--color-ink-muted)]">Memuat peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voyage-page min-h-screen pb-24 relative overflow-hidden">
      {/* Scattered background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-4 sm:right-12 opacity-[0.12] rotate-12"><CompassRoseFull size={200} /></div>
        <div className="absolute top-48 -left-4 sm:left-8 opacity-[0.1] -rotate-12"><SailingShip size={220} /></div>
        <div className="absolute top-[42%] -right-8 sm:right-0 opacity-[0.08] rotate-3"><MountainRange size={260} /></div>
        <div className="absolute bottom-40 -left-8 sm:left-4 opacity-[0.08] rotate-6"><SeaMonster size={200} /></div>
        <div className="absolute top-[28%] left-[3%] opacity-[0.1] -rotate-6"><Waves size={180} /></div>
        <div className="absolute top-[65%] right-[8%] opacity-[0.08] rotate-8"><Waves size={160} /></div>
        <div className="absolute top-[50%] left-[1%] opacity-[0.08]"><PalmTree size={90} /></div>
        <div className="absolute bottom-16 right-8 opacity-[0.07] -rotate-12"><Binoculars size={90} /></div>
        <div className="absolute top-[75%] left-[15%] opacity-[0.06] rotate-12"><Island size={120} /></div>
        <div className="absolute top-[85%] right-[5%] opacity-[0.06]"><Castle size={100} /></div>
        {/* Coordinate markers scattered around */}
        <div className="absolute top-32 left-[20%] font-handwritten text-[9px] text-[var(--color-ink-faded)] opacity-20 rotate-[-3deg]">12°45'N</div>
        <div className="absolute top-[35%] right-[15%] font-handwritten text-[9px] text-[var(--color-ink-faded)] opacity-20 rotate-[5deg]">95°30'E</div>
        <div className="absolute bottom-[25%] left-[30%] font-handwritten text-[9px] text-[var(--color-ink-faded)] opacity-20 rotate-[-2deg]">7°12'S</div>
        {/* Skull and crossbones watermark */}
        <div className="absolute bottom-[15%] right-[20%] opacity-[0.05] rotate-[-15deg]">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="var(--color-ink)">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
          </svg>
        </div>
      </div>

      {/* Hero section */}
      <motion.section className="voyage-hero relative max-w-5xl mx-auto mt-8 sm:mt-12 px-6 py-10 sm:px-12 sm:py-14" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="voyage-hero__compass"><CompassRoseFull size={154} /></div>
        <div className="voyage-hero__copy">
          <div className="flex items-center gap-3 mb-4">
            <span className="ribbon-label"><CompassRose size={12} /> {lang === 'en' ? "Navigator's edition · 01" : 'Edisi navigator · 01'}</span>
          </div>
          <h1 className="voyage-title font-display text-4xl sm:text-5xl md:text-6xl text-[var(--color-ink)] mb-3 leading-[.98]">
            {lang === 'en' ? <>Chart your<br /><em>AI journey.</em></> : <>Petakan<br /><em>perjalanan AI-mu.</em></>}
          </h1>
          <p className="text-[var(--color-ink-muted)] max-w-md text-[15px] leading-relaxed font-body">
            {lang === 'en' ? 'Every lesson is a new shore. Read the landmarks, follow the red trail, and find your way to mastery.' : 'Setiap pelajaran adalah pantai baru. Baca penandanya, ikuti jalur merah, dan temukan jalan menuju penguasaan AI.'}
          </p>
          <div className="flex items-center gap-2 mt-6">
            {error && source === 'local' && <span className="stamp stamp-red">Offline</span>}
            {source === 'supabase' && <span className="stamp stamp-green">Live</span>}
            <span className="font-handwritten text-[10px] text-[var(--color-ink-faded)] uppercase tracking-[.15em]">{lang === 'en' ? 'Follow the red trail' : 'Ikuti jalur merah'}</span>
          </div>
        </div>
        <div className="voyage-hero__note hidden sm:block">
          <span className="font-handwritten text-[10px] uppercase tracking-[.12em]">Est. 2024</span>
          <span className="block font-display text-lg italic mt-1">Odyssey</span>
          <span className="block text-[10px] text-[var(--color-ink-muted)] mt-1">Learn · Explore · Master</span>
        </div>
      </motion.section>

      {user && Object.keys(progress).length > 0 && <ProgressTracker levels={levels} progress={progress} />}

      {/* Ship sailing animation overlay */}
      <AnimatePresence>
        {sailingTo && (
          <SailingShipMini targetQuestId={sailingTo} />
        )}
      </AnimatePresence>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6" ref={mapRef}>
        <div className="map-surface rounded-sm p-4 sm:p-10">
          <div className="map-surface__header">
            <div>
              <span className="font-handwritten text-[10px] uppercase tracking-[.18em] text-[var(--color-stamp-red)]">Route map / 001</span>
              <p className="font-display italic text-lg mt-1">{lang === 'en' ? 'The waters of artificial intelligence' : 'Perairan kecerdasan artifisial'}</p>
            </div>
            <div className="map-legend hidden sm:flex">
              <span><i className="legend-dot legend-dot--done" /> {lang === 'en' ? 'Charted' : 'Selesai'}</span>
              <span><i className="legend-dot legend-dot--current" /> {lang === 'en' ? 'Current' : 'Posisi kini'}</span>
              <span><i className="legend-dot legend-dot--locked" /> {lang === 'en' ? 'Uncharted' : 'Belum terbuka'}</span>
            </div>
          </div>

          {levels.map((level, li) => (
            <motion.section key={level.id} className="level-region" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: li * 0.15 }}>
              <div className="level-heading relative mb-7 sm:mb-9">
                <div className="level-heading__rule" />
                <div className="relative inline-flex items-center gap-3 bg-[var(--color-parchment)] px-4 py-2.5" style={{ boxShadow: '0 2px 8px rgba(44,24,16,.08)' }}>
                  <span className="level-heading__number">{String(li + 1).padStart(2, '0')}</span>
                  <span className="text-xl">{level.emoji}</span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl text-[var(--color-ink)] italic leading-tight">{lang === 'en' ? level.title_en : level.title_id}</h2>
                    <p className="text-[11px] text-[var(--color-ink-muted)] font-body mt-0.5">{lang === 'en' ? level.theme_en : level.theme_id}</p>
                  </div>
                  <span className="stamp stamp-gold text-[9px] ml-2 hidden sm:inline-flex">{lang === 'en' ? level.badge_name_en : level.badge_name_id}</span>
                </div>
              </div>

              {level.modules.map((module, mi) => (
                <div key={module.id} className="module-region">
                  <div className="module-region__label">
                    <span className="module-region__line" />
                    <span>{lang === 'en' ? module.title_en : module.title_id}</span>
                    <span className="module-region__line" />
                  </div>

                  {/* Winding quest trail */}
                  <div className="map-trail">
                    <div className="flex flex-col gap-4 sm:gap-6 py-6 px-2 sm:px-8">
                      {module.quests.map((quest, index) => {
                        // Alternate left/right for winding effect
                        const isLeft = index % 2 === 0;
                        // Calculate offset for winding
                        const offset = isLeft ? 'ml-0 sm:ml-[5%]' : 'ml-auto sm:mr-[5%] mr-0';

                        return (
                          <WindingQuestStop
                            key={quest.id}
                            quest={quest}
                            status={progress[quest.id] || 'locked'}
                            index={index}
                            isLeft={isLeft}
                            offset={offset}
                            onClick={() => setSelectedQuest(quest)}
                            totalInModule={module.quests.length}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {mi < level.modules.length - 1 && <div className="module-divider"><span>✦</span></div>}
                </div>
              ))}

              {li < levels.length - 1 && (
                <div className="region-divider">
                  <div className="region-divider__line" />
                  <div className="region-divider__art">{li === 0 ? <><MountainRange size={100} /><PalmTree size={50} /></> : li === 1 ? <><SailingShip size={100} /><Island size={70} /></> : <><SeaMonster size={100} /><Waves size={80} /></>}</div>
                  <div className="region-divider__line" />
                </div>
              )}
            </motion.section>
          ))}

          <motion.div className="map-endmark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
            <span className="map-endmark__x">×</span>
            <span className="font-handwritten text-[10px] uppercase tracking-[.18em]">{lang === 'en' ? 'The next shore is yours' : 'Pantai berikutnya menunggumu'}</span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>{selectedQuest && <QuestModal quest={selectedQuest} onClose={() => setSelectedQuest(null)} onComplete={handleQuestComplete} />}</AnimatePresence>
    </div>
  );
}

/* =============================================
   WINDING QUEST STOP — pin along the trail
   ============================================= */
function WindingQuestStop({ quest, status, index, isLeft, offset, onClick, totalInModule }: {
  quest: Quest;
  status: QuestStatus;
  index: number;
  isLeft: boolean;
  offset: string;
  onClick: () => void;
  totalInModule: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${offset} max-w-[260px] sm:max-w-[280px]`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Connector line to center */}
      <div
        className="hidden sm:block absolute top-1/2 h-[2px] opacity-30"
        style={{
          [isLeft ? 'right' : 'left']: '-60px',
          width: '60px',
          background: `repeating-linear-gradient(90deg, var(--color-ink-muted) 0px, var(--color-ink-muted) 4px, transparent 4px, transparent 8px)`,
          transform: 'translateY(-50%)',
        }}
      />

      {/* The quest node */}
      <QuestNode
        quest={quest}
        status={status}
        index={index}
        onClick={onClick}
      />

      {/* Trail marker between nodes */}
      {index < totalInModule - 1 && (
        <div className="absolute left-1/2 -bottom-4 sm:-bottom-6 -translate-x-1/2 opacity-25">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M10 0 L13 7 L10 5 L7 7 Z" fill="var(--color-stamp-red)" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
