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
import { SailingShip, PalmTree, MountainRange, Waves, SeaMonster, Island, CompassRoseFull, Binoculars } from '../components/MapIllustrations';
import { SailingShipMini } from '../components/SailingShipAnimation';
import type { Quest, QuestStatus, Level } from '../types/course';

interface ProgressMap { [questId: string]: QuestStatus }
interface DbProgress { quest_id: string; status: string }

/* Animated wave SVG for ocean feel */
function OceanWaves({ flip = false, opacity = 0.2 }: { flip?: boolean; opacity?: number }) {
  return (
    <div className="w-full overflow-hidden pointer-events-none" style={{ height: 40, opacity, transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z"
          fill="rgba(46,125,155,0.3)"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z;
              M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30 L1440,60 L0,60 Z;
              M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z
            "
          />
        </path>
        <path
          d="M0,40 C360,25 720,55 1080,40 C1260,32 1380,45 1440,40 L1440,60 L0,60 Z"
          fill="rgba(46,125,155,0.2)"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,40 C360,25 720,55 1080,40 C1260,32 1380,45 1440,40 L1440,60 L0,60 Z;
              M0,40 C360,55 720,25 1080,40 C1260,48 1380,35 1440,40 L1440,60 L0,60 Z;
              M0,40 C360,25 720,55 1080,40 C1260,32 1380,45 1440,40 L1440,60 L0,60 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}

/* Floating debris / ocean particles */
function OceanParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: [
              'rgba(184,224,240,.15)',
              'rgba(255,215,0,.1)',
              'rgba(255,255,255,.08)',
            ][i % 3],
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

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
    setTimeout(() => setSailingTo(null), 2800);
  }, [user, levels, checkBadge, refreshProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <CompassRose size={48} className="text-[var(--color-gold)] mx-auto mb-3 animate-[compass-spin_3s_linear_infinite]" />
          <p className="font-handwritten text-sm text-[var(--color-ocean-foam)]">Memuat peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voyage-page min-h-screen pb-24 relative">
      {/* Ocean particles */}
      <OceanParticles />

      {/* Scattered decorations on the ocean */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 right-4 sm:right-12 opacity-[0.08] rotate-12"><CompassRoseFull size={200} /></div>
        <div className="absolute top-40 -left-4 sm:left-8 opacity-[0.06] -rotate-12"><SailingShip size={220} /></div>
        <div className="absolute top-[50%] -right-8 sm:right-0 opacity-[0.05] rotate-3"><MountainRange size={260} /></div>
        <div className="absolute bottom-32 -left-8 sm:left-4 opacity-[0.05] rotate-6"><SeaMonster size={200} /></div>
        <div className="absolute top-[30%] left-[2%] opacity-[0.06] -rotate-6"><Waves size={180} /></div>
        <div className="absolute top-[70%] right-[5%] opacity-[0.04]"><Island size={120} /></div>
        <div className="absolute bottom-12 right-8 opacity-[0.04] -rotate-12"><Binoculars size={90} /></div>
        {/* Coordinate markers */}
        <div className="absolute top-28 left-[18%] font-handwritten text-[9px] text-[var(--color-ocean-foam)] opacity-15 rotate-[-3deg]">12°45'N</div>
        <div className="absolute top-[40%] right-[12%] font-handwritten text-[9px] text-[var(--color-ocean-foam)] opacity-15 rotate-[5deg]">95°30'E</div>
        <div className="absolute bottom-[30%] left-[25%] font-handwritten text-[9px] text-[var(--color-ocean-foam)] opacity-15 rotate-[-2deg]">7°12'S</div>
      </div>

      {/* Hero — sky and sea horizon */}
      <motion.section className="voyage-hero relative max-w-5xl mx-auto mt-6 sm:mt-10 px-6 py-10 sm:px-12 sm:py-14" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="voyage-hero__compass"><CompassRoseFull size={154} /></div>
        <div className="voyage-hero__copy">
          <div className="flex items-center gap-3 mb-4">
            <span className="ribbon-label"><CompassRose size={12} /> {lang === 'en' ? "Navigator's edition · 01" : 'Edisi navigator · 01'}</span>
          </div>
          <h1 className="voyage-title font-display text-4xl sm:text-5xl md:text-6xl text-[var(--color-parchment-light)] mb-3 leading-[.98]">
            {lang === 'en' ? <>Chart your<br /><em>AI journey.</em></> : <>Petakan<br /><em>perjalanan AI-mu.</em></>}
          </h1>
          <p className="text-[var(--color-ocean-foam)] max-w-md text-[15px] leading-relaxed font-body opacity-80">
            {lang === 'en'
              ? 'Set sail across the ocean of knowledge. Visit islands of learning, complete each quest, and find the treasure at journey\'s end.'
              : 'Berlayar melintasi lautan pengetahuan. Kunjungi pulau-pulau pembelajaran, selesaikan tiap quest, dan temukan harta karun di ujung perjalanan.'}
          </p>
          <div className="flex items-center gap-2 mt-6">
            {error && source === 'local' && <span className="stamp stamp-red">Offline</span>}
            {source === 'supabase' && <span className="stamp stamp-green">Live</span>}
            <span className="font-handwritten text-[10px] text-[var(--color-ocean-foam)] uppercase tracking-[.15em] opacity-50">
              {lang === 'en' ? 'Follow the golden trail' : 'Ikuti jalur emas'}
            </span>
          </div>
        </div>
        <div className="voyage-hero__note hidden sm:block">
          <span className="font-handwritten text-[10px] uppercase tracking-[.12em]">Est. 2024</span>
          <span className="block font-display text-lg italic mt-1" style={{ color: 'var(--color-gold-light)' }}>Odyssey</span>
          <span className="block text-[10px] text-[var(--color-ocean-foam)] mt-1 opacity-50">Learn · Explore · Master</span>
        </div>
      </motion.section>

      <OceanWaves />

      {user && Object.keys(progress).length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
          <ProgressTracker levels={levels} progress={progress} />
        </div>
      )}

      {/* Ship sailing animation overlay */}
      <AnimatePresence>
        {sailingTo && <SailingShipMini targetQuestId={sailingTo} />}
      </AnimatePresence>

      {/* Main map area */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 mt-6" ref={mapRef}>
        <div className="map-surface paper-texture rounded-sm p-4 sm:p-10">
          <div className="map-surface__header">
            <div>
              <span className="font-handwritten text-[10px] uppercase tracking-[.18em]" style={{ color: 'var(--color-gold-bright)' }}>Route map / 001</span>
              <p className="font-display italic text-lg mt-1" style={{ color: 'var(--color-ocean-foam)' }}>{lang === 'en' ? 'The waters of artificial intelligence' : 'Perairan kecerdasan artifisial'}</p>
            </div>
            <div className="map-legend hidden sm:flex" style={{ color: 'rgba(184,224,240,.5)' }}>
              <span><i className="legend-dot legend-dot--done" /> {lang === 'en' ? 'Charted' : 'Selesai'}</span>
              <span><i className="legend-dot legend-dot--current" /> {lang === 'en' ? 'Current' : 'Posisi kini'}</span>
              <span><i className="legend-dot legend-dot--locked" /> {lang === 'en' ? 'Uncharted' : 'Belum terbuka'}</span>
            </div>
          </div>

          {levels.map((level, li) => (
            <motion.section key={level.id} className="level-region" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: li * 0.15 }}>
              <div className="level-heading relative mb-7 sm:mb-9">
                <div className="level-heading__rule" />
                <div className="relative inline-flex items-center gap-3 px-4 py-2.5" style={{ background: 'rgba(12,35,64,.7)', border: '1px solid rgba(255,255,255,.1)', backdropFilter: 'blur(8px)' }}>
                  <span className="level-heading__number">{String(li + 1).padStart(2, '0')}</span>
                  <span className="text-xl">{level.emoji}</span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl text-[var(--color-ink)] italic leading-tight">{lang === 'en' ? level.title_en : level.title_id}</h2>
                    <p className="text-[11px] text-[var(--color-ink-muted)] font-body mt-0.5">{lang === 'en' ? level.theme_en : level.theme_id}</p>
                  </div>
                  <span className="stamp text-[9px] ml-2 hidden sm:inline-flex" style={{ color: 'var(--color-gold-bright)', borderColor: 'var(--color-gold)' }}>{lang === 'en' ? level.badge_name_en : level.badge_name_id}</span>
                </div>
              </div>

              {level.modules.map((module, mi) => (
                <div key={module.id} className="module-region">
                  <div className="module-region__label">
                    <span className="module-region__line" />
                    <span>{lang === 'en' ? module.title_en : module.title_id}</span>
                    <span className="module-region__line" />
                  </div>

                  {/* Quest islands along the trail */}
                  <div className="map-trail">
                    <div className="flex flex-col gap-8 sm:gap-10 py-6 px-2 sm:px-8">
                      {module.quests.map((quest, index) => {
                        const isLeft = index % 2 === 0;
                        const offset = isLeft ? 'ml-0 sm:ml-[8%]' : 'ml-auto sm:mr-[8%] mr-0';
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

                  {mi < level.modules.length - 1 && (
                    <>
                      <OceanWaves opacity={0.15} />
                      <div className="module-divider"><span style={{ color: 'var(--color-gold-light)' }}>⚓</span></div>
                    </>
                  )}
                </div>
              ))}

              {li < levels.length - 1 && (
                <div className="region-divider">
                  <div className="region-divider__line" />
                  <div className="region-divider__art">
                    {li === 0 ? <><MountainRange size={100} /><PalmTree size={50} /></>
                      : li === 1 ? <><SailingShip size={100} /><Island size={70} /></>
                        : <><SeaMonster size={100} /><Waves size={80} /></>}
                  </div>
                  <div className="region-divider__line" />
                </div>
              )}
            </motion.section>
          ))}

          {/* X marks the spot — treasure! */}
          <motion.div className="map-endmark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
            <motion.span
              className="map-endmark__x"
              animate={{ scale: [1, 1.05, 1], rotate: [-9, -7, -9] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ×
            </motion.span>
            <span className="font-handwritten text-[10px] uppercase tracking-[.18em]">
              {lang === 'en' ? 'X marks the treasure' : 'X menandai harta karun'}
            </span>
          </motion.div>
        </div>
      </div>

      <OceanWaves flip opacity={0.15} />

      <AnimatePresence>{selectedQuest && <QuestModal quest={selectedQuest} onClose={() => setSelectedQuest(null)} onComplete={handleQuestComplete} />}</AnimatePresence>
    </div>
  );
}

/* =============================================
   WINDING QUEST STOP — island on the ocean
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
      className={`relative ${offset} max-w-[220px] sm:max-w-[260px]`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Dashed connector line to center */}
      <div
        className="hidden sm:block absolute top-1/2 h-[2px] opacity-20"
        style={{
          [isLeft ? 'right' : 'left']: '-80px',
          width: '80px',
          background: 'repeating-linear-gradient(90deg, rgba(255,255,255,.3) 0px, rgba(255,255,255,.3) 5px, transparent 5px, transparent 10px)',
          transform: 'translateY(-50%)',
        }}
      />

      {/* The island quest node */}
      <QuestNode quest={quest} status={status} index={index} onClick={onClick} />

      {/* Trail arrow between nodes */}
      {index < totalInModule - 1 && (
        <motion.div
          className="absolute left-1/2 -bottom-6 sm:-bottom-8 -translate-x-1/2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" opacity="0.3">
            <path d="M10 0 L14 8 L10 6 L6 8 Z" fill="var(--color-gold-light)" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
