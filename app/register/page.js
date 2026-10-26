'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppState } from '@/components/AppStateProvider';

const countries = ['Bénin', 'Cameroun', 'Côte d’Ivoire', 'Burkina Faso', 'Niger'];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAppState();
  const [form, setForm] = useState({
    name: '',
    country: 'Côte d’Ivoire',
    phone: '',
    password: '',
    sponsorCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Erreur lors de l’inscription');
      }

      setUser(json.user);
      router.push('/dashboard');
    } catch (e) {
      setError(e.message || 'Erreur d’inscription');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>Inscription</h1>
        <p>Créez votre compte Total Énergie.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Nom complet
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>

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

          <label>
            Code de parrainage
            <input type="text" value={form.sponsorCode} onChange={(e) => setForm({ ...form, sponsorCode: e.target.value })} placeholder="Optionnel" />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>

        <div className="auth-footer">
          <span>Déjà inscrit ?</span>
          <Link href="/login">Se connecter</Link>
        </div>
      </div>
    </main>
  );
}
