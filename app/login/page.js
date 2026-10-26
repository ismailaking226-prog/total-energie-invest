'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppState } from '@/components/AppStateProvider';

const countries = ['Bénin', 'Cameroun', 'Côte d’Ivoire', 'Burkina Faso', 'Niger'];

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppState();
  const [form, setForm] = useState({
    country: 'Côte d’Ivoire',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Connexion impossible');
      }

      setUser(json.user);
      router.push('/dashboard');
    } catch (e) {
      setError(e.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>Connexion</h1>
        <p>Accédez à votre compte Total Énergie.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Pays
            <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </label>

          <label>
            Numéro de téléphone
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </label>

          <label>
            Mot de passe
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-footer">
          <span>Pas de compte ?</span>
          <Link href="/register">Créer un compte</Link>
        </div>
      </div>
    </main>
  );
}
