import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CompassRose, Flame, Star, LogOut, User } from './AdventureIcons';

export function Header() {
  useTranslation();
  const { user, profile, signOut } = useAuth();

  return (
    <header className="voyage-header sticky top-0 z-50"
      style={{
        boxShadow: '0 3px 14px rgba(20, 12, 8, 0.2)'
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <span className="voyage-header__mark"><CompassRose size={25} /></span>
          <div>
            <span className="font-display text-lg font-bold text-[var(--color-parchment-light)] italic tracking-wide">
              Odyssey
            </span>
            <span className="voyage-header__sub hidden sm:block">Field guide to AI</span>
          </div>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          {user && profile ? (
            <>
              <nav className="hidden md:flex items-center gap-4 mr-2" aria-label="Primary navigation">
                <Link to="/" className="voyage-header__link">Map</Link>
                <Link to="/profile" className="voyage-header__link">Logbook</Link>
              </nav>
              {/* XP */}
              <div className="voyage-header__stat flex items-center gap-1 px-2 py-1">
                <Star size={12} className="text-[var(--color-gold)]" />
                <span className="text-[11px] font-handwritten text-[var(--color-sepia)] tabular-nums">
                  {profile.xp.toLocaleString()}
                </span>
              </div>

              {/* Streak */}
              <div className="voyage-header__stat voyage-header__stat--streak flex items-center gap-1 px-2 py-1">
                <Flame size={12} className="text-[var(--color-stamp-red)]" />
                <span className="text-[11px] font-handwritten text-[var(--color-sepia)] tabular-nums">
                  {profile.streak_count}
                </span>
              </div>

              {/* User */}
              <div className="flex items-center gap-1.5">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 transition-colors no-underline"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-ocean-light)] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--color-parchment)]">
                      {profile.username?.[0]?.toUpperCase() ?? '?'}
                    </span>
                  </div>
                  <span className="text-[13px] font-body text-[var(--color-parchment-light)] hidden sm:block">
                    {profile.username}
                  </span>
                </Link>

                <button
                  onClick={signOut}
                  className="w-7 h-7 rounded flex items-center justify-center text-white/50 hover:text-[var(--color-parchment-light)] hover:bg-white/10 transition-colors"
                  title="Keluar"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="voyage-header__login text-[11px] no-underline px-4 py-1.5">
              <User size={12} />
              Masuk
            </Link>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
