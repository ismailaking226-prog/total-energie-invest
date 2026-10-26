'use client';

import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function DashboardPage() {
  const { state } = useAppState();

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
            <small>Investissements</small>
            <strong>{state.products.length}</strong>
          </div>
          <div className="kpi">
            <small>Pays</small>
            <strong>{state.settings.allowedCountries?.length || 5}</strong>
          </div>
          <div className="kpi">
            <small>Retraits min</small>
            <strong>{state.settings.minWithdrawal || 800} FCFA</strong>
          </div>
          <div className="kpi">
            <small>Durée</small>
            <strong>{state.settings.dailyDuration || 180} J</strong>
          </div>
        </div>
      </main>
    </>
  );
}
