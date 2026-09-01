import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function Header() {
  const { user, profile, signOut } = useAuth();

  return (
    <header style={{
      background: 'linear-gradient(180deg, #1A0F08, #2C1810)',
      borderBottom: '2px solid rgba(180,140,100,0.3)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <Link to="/" style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 16,
        color: '#FFF6DD',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        🧭 <span>ODYSSEY</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {user && profile ? (
          <>
            <span style={{
              background: 'rgba(218,165,32,0.1)',
              border: '1px solid rgba(218,165,32,0.3)',
              borderRadius: 12,
              padding: '2px 10px',
              fontSize: 11,
              fontWeight: 700,
              color: '#E3B23C',
              fontFamily: 'var(--font-display)',
            }}>
              ⭐ {profile.xp} XP
            </span>
            <Link to="/profile" style={{
              color: 'rgba(255,246,221,0.64)',
              fontSize: 11,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}>
              {profile.username}
            </Link>
            <button onClick={signOut} style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,246,221,0.5)',
              fontSize: 11,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.5,
            }}>
              Keluar
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            background: '#E3B23C',
            color: '#3A2A18',
            border: 'none',
            borderRadius: 10,
            padding: '5px 14px',
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            textDecoration: 'none',
          }}>
            Masuk
          </Link>
        )}
      </div>
    </header>
  );
}
