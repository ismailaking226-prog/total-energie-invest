'use client';

import BrandHeader from '@/components/BrandHeader';

export default function InvestissementsPage() {
  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Historique des investissements</h1>
          <p>Suivi de chaque placement réalisé.</p>
        </div>
      </main>
    </>
  );
}
