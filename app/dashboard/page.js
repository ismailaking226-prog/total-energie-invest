'use client';

import Link from 'next/link';
import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function DashboardPage() {
  const { state } = useAppState();

  const totalInvested = state.investments.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalUsers = state.users.length;
  const pendingDeposits = state.depositRequests.filter((d) => d.status === 'en_attente').length;
  const pendingWithdrawals = state.withdrawalRequests.filter((w) => w.status === 'en_attente').length;

  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Tableau de bord</h1>
          <p>Vue d’ensemble des performances et des paiements.</p>
        </div>

        <div className="kpis">
          <div className="kpi">
            <small>Investissements actifs</small>
            <strong>{state.investments.length}</strong>
          </div>
          <div className="kpi">
            <small>Montant investi</small>
            <strong>{totalInvested.toLocaleString()} FCFA</strong>
          </div>
          <div className="kpi">
            <small>Utilisateurs</small>
            <strong>{totalUsers}</strong>
          </div>
          <div className="kpi">
            <small>Demandes en attente</small>
            <strong>{pendingDeposits + pendingWithdrawals}</strong>
          </div>
        </div>

        <div className="page-grid">
          <div className="panel">
            <h3>Stats par pays</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Pays</th>
                  <th>Utilisateurs</th>
                  <th>Investis</th>
                </tr>
              </thead>
              <tbody>
                {state.settings.allowedCountries.map((country) => {
                  const count = state.users.filter((user) => user.country === country).length;
                  const invest = state.investments.filter((inv) => inv.country === country || inv.name?.includes(country)).length;
                  return (
                    <tr key={country}>
                      <td>{country}</td>
                      <td>{count}</td>
                      <td>{invest}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h3>Actions rapides</h3>
            <div className="admin-sidebar">
              <Link className="admin-link" href="/admin">Demandes en attente</Link>
              <Link className="admin-link" href="/depot">Dépôt / Recharger</Link>
              <Link className="admin-link" href="/investissements">Historique des investissements</Link>
              <Link className="admin-link" href="/moi">Mon profil</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
