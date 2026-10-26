'use client';

import { useState } from 'react';
import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function DepotPage() {
  const { state, addDepositRequest } = useAppState();
  const [form, setForm] = useState({ amount: '', network: 'Orange Money', phone: '' });
  const [done, setDone] = useState(false);

  const handlePay = () => {
    if (state.settings.paymentLink) {
      window.open(state.settings.paymentLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await addDepositRequest(form);
    if (ok) {
      setDone(true);
      setForm({ amount: '', network: 'Orange Money', phone: '' });
    }
  };

  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Dépôt / Recharger</h1>
          <p>Effectuez votre paiement mobile money puis confirmez votre dépôt.</p>
        </div>

        <div className="page-grid">
          <div className="panel">
            <h3>Étape 1 — Paiement</h3>
            <div className="field">
              <label>MÉTHODE DE PAIEMENT</label>
              <input value="Mobile Money" readOnly />
            </div>
            <div className="field">
              <label>RÉSEAU UTILISÉ</label>
              <input value="Orange Money, Moov Money, MTN Money, Wave" readOnly />
            </div>
            <div className="field">
              <label>Montant minimum</label>
              <input value="2 000 FCFA" readOnly />
            </div>
            <button className="primary-btn" onClick={handlePay}>Payer</button>

            <div className="brand-banner" style={{ marginTop: 20 }}>
              <div>
                <strong>1. Effectuez le paiement</strong>
                <p style={{ margin: '8px 0 0' }}>2. Cliquez sur le bouton ci-dessous</p>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Confirmation de dépôt</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>Montant déposé</label>
                  <input type="number" min="2000" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <div className="field">
                  <label>Réseau</label>
                  <select value={form.network} onChange={(e) => setForm({ ...form, network: e.target.value })}>
                    <option>Orange Money</option>
                    <option>Moov Money</option>
                    <option>MTN Money</option>
                    <option>Wave</option>
                  </select>
                </div>
                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label>Numéro utilisé</label>
                  <input type="text" required placeholder="Ex : Numéro de téléphone sans indicatif" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <button className="primary-btn" type="submit">Confirmation de dépôt</button>
            </form>

            {done && (
              <div className="panel" style={{ marginTop: 18 }}>
                <p style={{ margin: 0, color: '#159760', fontWeight: 700 }}>
                  Demande de dépôt envoyée. En attente de validation Admin
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
