import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { courseData } from '../data/courseData';

interface Badge { level_id: string; earned_at: string; }

export function Profile() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from('user_badges').select('*').eq('user_id', user.id).then(({ data }) => {
      if (data) setBadges(data);
    });
  }, [user]);

  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  if (!profile) return null;

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(160deg, #2b2015, #1a130c)' }}>
      <div className="max-w-lg mx-auto px-4 py-10">
        <motion.div className="overflow-hidden mb-6" style={{ background: 'var(--sand)', border: '2px solid var(--wood-dark)', borderRadius: 16 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Banner */}
          <div className="h-24 relative overflow-hidden" style={{ background: 'var(--ocean)' }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)' }} />
            <div className="absolute right-5 top-3 text-4xl opacity-30">🧭</div>
          </div>

          {/* Avatar */}
          <div className="px-6 pb-6 -mt-8">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-18 h-18 rounded-full flex items-center justify-center text-3xl font-bold font-display shadow-lg"
                style={{ width: 72, height: 72, background: 'var(--wood)', border: '4px solid var(--sand)', color: 'var(--cream)' }}>
                {profile.username?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="pb-1">
                <h2 className="text-xl font-bold font-display" style={{ color: 'var(--ink)' }}>{profile.username}</h2>
                <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>{user?.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'XP', value: profile.xp.toLocaleString(), color: 'var(--gold)' },
                { label: 'Streak', value: String(profile.streak_count), color: 'var(--flag)' },
                { label: 'Badge', value: String(badges.length), color: 'var(--island-green)' },
              ].map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid var(--sand-dark)' }}>
                  <div className="font-display font-extrabold text-xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px] font-bold uppercase" style={{ color: 'var(--ink-soft)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <h3 className="font-display font-bold text-base mb-3" style={{ color: 'var(--ink)' }}>Badge</h3>
            <div className="space-y-2 mb-6">
              {courseData.map(level => {
                const earned = badges.find(b => b.level_id === level.id);
                return (
                  <div key={level.id} className="flex items-center gap-3 p-3 rounded-xl" style={{
                    background: earned ? 'rgba(61,107,63,0.08)' : 'rgba(255,255,255,0.4)',
                    border: `1px solid ${earned ? 'rgba(61,107,63,0.2)' : 'var(--sand-dark)'}`,
                    opacity: earned ? 1 : 0.5,
                  }}>
                    <span className="text-2xl">{level.badge_icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm" style={{ color: 'var(--ink)' }}>
                        {lang === 'en' ? level.badge_name_en : level.badge_name_id}
                      </div>
                      <div className="text-[10px]" style={{ color: 'var(--ink-soft)' }}>
                        {earned ? `Diraih ${new Date(earned.earned_at).toLocaleDateString()}` : 'Belum diraih'}
                      </div>
                    </div>
                    <span className="text-lg">{level.emoji}</span>
                  </div>
                );
              })}
            </div>

            {/* Language */}
            <h3 className="font-display font-bold text-base mb-3" style={{ color: 'var(--ink)' }}>Bahasa</h3>
            <div className="flex gap-3 mb-6">
              {(['id', 'en'] as const).map(l => (
                <button key={l} onClick={() => { i18n.changeLanguage(l); localStorage.setItem('odyssey-lang', l); }}
                  className="flex-1 p-3 rounded-xl text-center font-bold text-sm transition-all" style={{
                    background: i18n.language === l ? 'rgba(61,107,63,0.1)' : 'rgba(255,255,255,0.5)',
                    border: `2px solid ${i18n.language === l ? 'var(--island-green)' : 'var(--sand-dark)'}`,
                    color: i18n.language === l ? 'var(--island-green)' : 'var(--ink-soft)',
                  }}>
                  {l === 'id' ? '🇮🇩 Indonesia' : '🇬🇧 English'}
                </button>
              ))}
            </div>

            <button onClick={handleSignOut} className="btn btn--ghost w-full" style={{ color: 'var(--flag)' }}>
              Keluar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
