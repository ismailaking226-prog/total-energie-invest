'use client';

import { useEffect, useState } from 'react';
import BrandHeader from '@/components/BrandHeader';

export default function AdminPage() {
  const [data, setData] = useState({ users: [], deposits: [], withdrawals: [], products: [] });

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin');
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  async function action(kind, id) {
    await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: kind, id }),
    });
    window.location.reload();
  }

  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Backoffice Admin</h1>
          <p>Gestion centrale du système Total Énergie.</p>
        </div>

        <div className="page-grid">
          <div className="panel">
            <h3>Demandes de dépôt</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Montant</th>
                  <th>Réseau</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.deposits.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.amount.toLocaleString()} FCFA</td>
                    <td>{deposit.network}</td>
                    <td>{deposit.status}</td>
                    <td>
                      <div className="inline-actions">
                        <button className="primary-btn" onClick={() => action('approve-deposit', deposit.id)}>Approuver</button>
                        <button className="danger-btn" onClick={() => action('reject-deposit', deposit.id)}>Rejeter</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h3>Demandes de retrait</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Montant</th>
                  <th>Réseau</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td>{withdrawal.amount.toLocaleString()} FCFA</td>
                    <td>{withdrawal.network}</td>
                    <td>{withdrawal.status}</td>
                    <td>
                      <div className="inline-actions">
                        <button className="primary-btn" onClick={() => action('approve-withdrawal', withdrawal.id)}>Approuver</button>
                        <button className="danger-btn" onClick={() => action('reject-withdrawal', withdrawal.id)}>Rejeter</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
