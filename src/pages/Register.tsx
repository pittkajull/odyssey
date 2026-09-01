import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { CompassRose } from '../components/AdventureIcons';

export function Register() {
  useTranslation();
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Password tidak cocok'); return; }
    if (username.length < 3) { setError('Username minimal 3 karakter'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError('Username hanya boleh huruf, angka, dan underscore'); return; }
    setLoading(true);
    const result = await signUp(email, password, username);
    if (result.error) { setError(result.error); setLoading(false); }
    else navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-[400px]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="text-center mb-8">
          <CompassRose size={40} className="text-[var(--color-sepia)] mx-auto mb-3 opacity-40" />
          <h1 className="font-display text-3xl text-[var(--color-ink)] italic mb-2">Mulai Perjalanan</h1>
          <p className="text-sm text-[var(--color-ink-muted)]">Buat akun dan mulai belajar AI</p>
        </div>

        <div className="map-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded border border-[var(--color-stamp-red)]/30 bg-[var(--color-stamp-red)]/5 text-sm text-[var(--color-stamp-red)] font-body">{error}</div>
            )}
            <div>
              <label className="block font-handwritten text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] mb-1.5">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} className="input-field" placeholder="odyssey_explorer" />
              <p className="text-[10px] text-[var(--color-ink-faded)] mt-1">Huruf, angka, dan underscore saja</p>
            </div>
            <div>
              <label className="block font-handwritten text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block font-handwritten text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="input-field" placeholder="••••••••" />
            </div>
            <div>
              <label className="block font-handwritten text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] mb-1.5">Konfirmasi Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-adventure w-full disabled:opacity-50">
              {loading ? 'Membuat akun...' : 'Buat Akun'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[var(--color-ink-faded)]/30" />
            <span className="font-handwritten text-[10px] text-[var(--color-ink-faded)] uppercase">atau</span>
            <div className="flex-1 h-px bg-[var(--color-ink-faded)]/30" />
          </div>

          <button type="button" onClick={async () => { setError(''); const r = await signInWithGoogle(); if (r.error) setError(r.error); }} className="btn-parchment w-full">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Daftar dengan Google
          </button>

          <p className="text-center text-sm text-[var(--color-ink-muted)] mt-5">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold text-[var(--color-ocean)] hover:underline">Masuk</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
