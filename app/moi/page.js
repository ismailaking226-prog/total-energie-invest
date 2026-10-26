'use client';

import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function MoiPage() {
  const { state } = useAppState();

  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Mon compte</h1>
          <p>Informations du profil et accès rapide au support.</p>
        </div>

        <div className="page-grid">
          <div className="panel">
            <h3>Profil utilisateur</h3>
            <div className="form-grid">
              <div className="field">
                <label>Nom</label>
                <input value={state.user.name} readOnly />
              </div>
              <div className="field">
                <label>Email</label>
                <input value={state.user.email} readOnly />
              </div>
              <div className="field">
                <label>Numéro</label>
                <input value={state.user.phone} readOnly />
              </div>
              <div className="field">
                <label>Pays</label>
                <input value={state.user.country} readOnly />
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Solde et accès</h3>
            <div className="kpi" style={{ marginBottom: 12 }}>
              <small>Solde actuel</small>
              <strong>{state.user.balance.toLocaleString()} FCFA</strong>
            </div>
            <div className="inline-actions">
              <a href={state.settings.telegramLink} target="_blank" rel="noreferrer" className="primary-btn">Telegram</a>
              <a href={state.settings.supportLink} target="_blank" rel="noreferrer" className="ghost-btn">Service client</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
