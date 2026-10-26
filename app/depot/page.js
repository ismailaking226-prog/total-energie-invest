'use client';

import { useState } from 'react';
import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function DepotPage() {
  const { state, addDepositRequest } = useAppState();
  const [form, setForm] = useState({ amount: '', network: 'Orange Money', phone: '' });
  const [done, setDone] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handlePay = () => {
    if (!state.settings.paymentLink) return;
    window.open(state.settings.paymentLink, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.amount || !form.network || !form.phone) return;

    addDepositRequest({
      amount: form.amount,
      network: form.network,
      phone: form.phone,
    });

    setDone(true);
    setShowForm(false);
    setForm({ amount: '', network: 'Orange Money', phone: '' });
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

            <div className="field">
              <label>Numéro mobile money</label>
              <input value={state.user.phone || 'Ex : Numéro de téléphone sans indicatif'} readOnly />
            </div>

            <button className="primary-btn" onClick={handlePay}>Payer</button>

            <div className="brand-banner" style={{ marginTop: 20 }}>
              <div>
                <strong>1. Effectuez le paiement</strong>
                <p style={{ margin: '8px 0 0' }}>2. Cliquez sur le bouton ci-dessous</p>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button className="primary-btn" onClick={() => setShowForm((prev) => !prev)}>Confirmation de dépôt</button>
            </div>
          </div>

          <div className="panel">
            <h3>Historique de dépôts</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Montant</th>
                  <th>Réseau</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {state.depositRequests.map((item) => (
                  <tr key={item.id}>
                    <td>{item.amount.toLocaleString()} FCFA</td>
                    <td>{item.network}</td>
                    <td>
                      <span className={`badge ${item.status === 'approuve' ? 'badge-success' : item.status === 'rejete' ? 'badge-danger' : 'badge-warning'}`}>
                        {item.status === 'approuve' ? 'Validé' : item.status === 'rejete' ? 'Rejeté' : 'En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="panel" style={{ marginTop: 18 }}>
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
              <button className="primary-btn" type="submit">Envoyer la demande</button>
            </form>
          </div>
        )}

        {done && (
          <div className="panel" style={{ marginTop: 18 }}>
            <p style={{ margin: 0, color: '#159760', fontWeight: 700 }}>
              Demande de dépôt envoyée. En attente de validation Admin
            </p>
          </div>
        )}
      </main>
    </>
  );
}
