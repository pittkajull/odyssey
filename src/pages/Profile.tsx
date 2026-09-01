import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { courseData } from '../data/courseData';
import { CompassRoseFull } from '../components/MapIllustrations';

interface Badge {
  level_id: string;
  earned_at: string;
}

export function Profile() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const { user, profile, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const [badges, setBadges] = useState<Badge[]>([]);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function fetchBadges() {
      const { data } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user!.id);
      if (data) setBadges(data);
    }

    fetchBadges();
  }, [user]);

  const handleSaveUsername = async () => {
    if (!newUsername.trim() || newUsername.length < 3) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername.trim() })
      .eq('id', user!.id);

    if (!error) {
      setEditUsername(false);
      await refreshProfile();
    }
    setSaving(false);
  };

  const handleLanguageChange = async (lang: 'id' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('odyssey-lang', lang);

    if (user) {
      await supabase
        .from('profiles')
        .update({ preferred_lang: lang })
        .eq('id', user.id);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Profile card */}
        <motion.div
          className="map-card overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Banner */}
          <div className="h-24 relative overflow-hidden bg-[var(--color-ocean)]">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(30deg, transparent 48%, rgba(244,232,193,.45) 49%, transparent 50%), linear-gradient(150deg, transparent 48%, rgba(244,232,193,.3) 49%, transparent 50%)', backgroundSize: '42px 42px' }} />
            <div className="absolute right-6 top-2 opacity-40"><CompassRoseFull size={86} /></div>
            <span className="absolute left-6 top-5 ribbon-label">Captain&apos;s log</span>
          </div>

          {/* Avatar & info */}
          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-[var(--color-sepia)] border-4 border-[var(--color-parchment-light)] flex items-center justify-center text-3xl font-bold font-display text-[var(--color-parchment-light)] shadow-md">
                {profile.username?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="pb-1">
                {editUsername ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                        className="input-field text-sm py-1"
                      placeholder="Username"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveUsername}
                      disabled={saving}
                      className="btn-adventure text-xs py-1 px-3"
                    >
                      {saving ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditUsername(false)}
                      className="btn-parchment text-xs py-1 px-3"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setNewUsername(profile.username ?? '');
                      setEditUsername(true);
                    }}
                    className="text-xl font-bold font-display hover:text-[var(--color-ocean)] transition-colors"
                  >
                    {profile.username ?? 'No username'}
                    <span className="text-xs text-[var(--color-bark)] ml-2">edit</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-[var(--color-ink-muted)] font-body">{user?.email}</p>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card p-4 text-center">
            <div className="font-mono text-xl font-bold text-[var(--color-amber)]">
              {profile.xp.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono uppercase text-[var(--color-bark)]">
              {t('xp')}
            </div>
          </div>

          <div className="card p-4 text-center">
            <div className="font-mono text-xl font-bold text-[var(--color-terracotta)]">
              {profile.streak_count}
            </div>
            <div className="text-[10px] font-mono uppercase text-[var(--color-bark)]">
              {t('streak')}
            </div>
          </div>

          <div className="card p-4 text-center">
            <div className="font-mono text-xl font-bold text-[var(--color-emerald)]">
              {badges.length}
            </div>
            <div className="text-[10px] font-mono uppercase text-[var(--color-bark)]">
              {t('badges')}
            </div>
          </div>
        </motion.div>

        {/* Badge collection */}
        <motion.div
          className="card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-lg text-[var(--color-ink)] mb-4">
            {t('badges')}
          </h2>

          <div className="space-y-3">
            {courseData.map((level) => {
              const earned = badges.find((b) => b.level_id === level.id);
              return (
                <div
                  key={level.id}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${
                    earned
                      ? 'bg-[var(--color-emerald-bg)] border-[var(--color-emerald)]/20'
                    : 'bg-[var(--color-parchment)] border-[var(--color-sand)] opacity-50'
                  }`}
                >
                  <div className="text-3xl">{level.badge_icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      {lang === 'en' ? level.badge_name_en : level.badge_name_id}
                    </div>
                    <div className="text-[10px] font-mono text-odyssey-muted">
                      {earned
                        ? `${lang === 'en' ? 'Earned' : 'Diraih'} ${new Date(earned.earned_at).toLocaleDateString()}`
                        : lang === 'en' ? 'Not yet earned' : 'Belum diraih'}
                    </div>
                  </div>
                  <div className="text-xl">{level.emoji}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Language preference */}
        <motion.div
          className="card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-lg text-[var(--color-ink)] mb-4">
            {t('select_language')}
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => handleLanguageChange('id')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all text-center ${
                i18n.language === 'id'
                  ? 'border-[var(--color-emerald)] bg-[var(--color-emerald-bg)] text-[var(--color-emerald)]'
                  : 'border-[var(--color-sand)] bg-[var(--color-parchment-light)] text-[var(--color-bark)] hover:border-[var(--color-stone)]'
              }`}
            >
              <div className="text-2xl mb-1">🇮🇩</div>
              <div className="font-semibold text-sm">{t('indonesian')}</div>
            </button>

            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all text-center ${
                i18n.language === 'en'
                  ? 'border-[var(--color-emerald)] bg-[var(--color-emerald-bg)] text-[var(--color-emerald)]'
                  : 'border-[var(--color-sand)] bg-[var(--color-parchment-light)] text-[var(--color-bark)] hover:border-[var(--color-stone)]'
              }`}
            >
              <div className="text-2xl mb-1">🇬🇧</div>
              <div className="font-semibold text-sm">{t('english')}</div>
            </button>
          </div>
        </motion.div>

        {/* Account actions */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleSignOut}
            className="btn-parchment w-full text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-bg)] hover:border-[var(--color-terracotta)]/20"
          >
            {lang === 'en' ? 'Sign Out' : 'Keluar'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
