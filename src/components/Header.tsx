import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CompassRose } from './AdventureIcons';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="voyage-header sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <span className="voyage-header__mark">
            <CompassRose size={28} />
          </span>
          <div>
            <span className="font-display text-lg font-bold tracking-wide text-[var(--color-parchment-light)]">ODYSSEY</span>
            <span className="voyage-header__sub hidden sm:block">Your Journey Into AI</span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {user && profile ? (
            <>
              {/* XP */}
              <span className="voyage-header__stat px-3 py-1 rounded-sm text-[11px] font-handwritten tracking-wider">
                {profile.xp} XP
              </span>
              {/* Streak */}
              {profile.streak_count > 0 && (
                <span className="voyage-header__stat voyage-header__stat--streak px-3 py-1 rounded-sm text-[11px] font-handwritten tracking-wider">
                  {profile.streak_count} 🔥
                </span>
              )}
              {/* User menu */}
              <button
                onClick={() => navigate('/profile')}
                className="voyage-header__link hidden sm:block"
              >
                {profile.username}
              </button>
              <button
                onClick={handleSignOut}
                className="voyage-header__link"
              >
                Keluar
              </button>
            </>
          ) : (
            <Link to="/login" className="voyage-header__login text-[11px] px-4 py-1.5 rounded-sm">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
