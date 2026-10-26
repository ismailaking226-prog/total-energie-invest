'use client';

import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function InvestissementsPage() {
  const { state } = useAppState();

  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Historique des investissements</h1>
          <p>Suivi de chaque placement réalisé.</p>
        </div>

        <div className="panel">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Numéro</th>
                  <th>Montant</th>
                  <th>Rendement/J</th>
                  <th>Date</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {state.investments.map((investment) => (
                  <tr key={investment.id}>
                    <td>{investment.name}</td>
                    <td>{investment.phone}</td>
                    <td>{investment.amount.toLocaleString()} FCFA</td>
                    <td>{investment.daily.toLocaleString()} FCFA</td>
                    <td>{new Date(investment.date).toLocaleDateString('fr-FR')}</td>
                    <td><span className="badge badge-success">{investment.status}</span></td>
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
