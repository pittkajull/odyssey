import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/auth';

export function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn(email, password);
    if (result.error) { setError(result.error); setLoading(false); }
    else navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(160deg, #2b2015, #1a130c)' }}>
      <motion.div className="w-full max-w-[400px]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧭</div>
          <h1 className="font-display text-3xl font-extrabold mb-2" style={{ color: '#FFF6DD' }}>Selamat Datang</h1>
          <p className="text-sm" style={{ color: 'rgba(255,246,221,0.6)' }}>Masuk untuk melanjutkan perjalananmu</p>
        </div>

        <div style={{ background: 'var(--sand)', border: '2px solid var(--wood-dark)', borderRadius: 16, padding: 24 }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg text-sm font-bold" style={{ background: '#FBE2E0', color: 'var(--flag)', border: '1px solid var(--flag)' }}>
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--ink-soft)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ background: '#fff', border: '2px solid var(--sand-dark)', color: 'var(--ink)' }}
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--ink-soft)' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ background: '#fff', border: '2px solid var(--sand-dark)', color: 'var(--ink)' }}
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn btn--primary w-full disabled:opacity-50">
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'var(--sand-dark)' }} />
            <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--ink-soft)' }}>atau</span>
            <div className="flex-1 h-px" style={{ background: 'var(--sand-dark)' }} />
          </div>

          <button type="button" onClick={async () => { setError(''); const r = await signInWithGoogle(); if (r.error) setError(r.error); }}
            className="btn btn--ghost w-full flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Masuk dengan Google
          </button>

          <p className="text-center text-sm mt-5" style={{ color: 'var(--ink-soft)' }}>
            Belum punya akun?{' '}
            <Link to="/register" className="font-bold" style={{ color: 'var(--ocean)' }}>Daftar</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
