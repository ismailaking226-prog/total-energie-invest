'use client';

import Link from 'next/link';
import { useAppState } from '@/components/AppStateProvider';

export default function BrandHeader() {
  const { state } = useAppState();

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" aria-label="Accueil Total Énergie">
          <span className="brand-mark">T</span>
          <span className="brand-text">Total Énergie</span>
        </Link>

        <nav className="nav">
          <Link href="/">Accueil</Link>
          <Link href="/dashboard">Tableau de bord</Link>
          <Link href="/investissements">Investissements</Link>
          <Link href="/depot">Dépôt / Recharger</Link>
          <Link href="/moi">Moi</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        <div className="header-actions">
          <a href={state.settings.supportLink} target="_blank" rel="noreferrer" className="pill-btn">Support</a>
          <a href={state.settings.telegramLink} target="_blank" rel="noreferrer" className="primary-btn">Telegram</a>
        </div>
      </div>
    </header>
  );
}
