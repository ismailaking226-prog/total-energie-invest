'use client';

import { useMemo, useState } from 'react';
import BrandHeader from '@/components/BrandHeader';
import { useAppState } from '@/components/AppStateProvider';

export default function AdminPage() {
  const { state, approveDeposit, rejectDeposit, approveWithdrawal, rejectWithdrawal, updateSettings, updateProduct, addProduct, deleteProduct } = useAppState();
  const [countryFilter, setCountryFilter] = useState('Tous');
  const [productForm, setProductForm] = useState({ name: 'Station Total Énergie', amount: 5000, daily: 800, total: 144000, image: '/products/product-5000.svg' });

  const visibleUsers = useMemo(() => {
    if (countryFilter === 'Tous') return state.users;
    return state.users.filter((user) => user.country === countryFilter);
  }, [state.users, countryFilter]);

  const handleAddProduct = (event) => {
    event.preventDefault();
    addProduct({
      id: `p-${Date.now()}`,
      name: productForm.name,
      amount: Number(productForm.amount),
      daily: Number(productForm.daily),
      total: Number(productForm.total),
      image: productForm.image,
    });
  };

  return (
    <>
      <BrandHeader />
      <main className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="page-header">
          <h1>Backoffice Admin</h1>
          <p>Gestion centrale du système Total Énergie.</p>
        </div>

        <div className="kpis">
          <div className="kpi"><small>Déposits en attente</small><strong>{state.depositRequests.filter((d) => d.status === 'en_attente').length}</strong></div>
          <div className="kpi"><small>Retraits en attente</small><strong>{state.withdrawalRequests.filter((w) => w.status === 'en_attente').length}</strong></div>
          <div className="kpi"><small>Utilisateurs</small><strong>{state.users.length}</strong></div>
          <div className="kpi"><small>Produits</small><strong>{state.products.length}</strong></div>
        </div>

        <div className="page-grid">
          <div className="panel">
            <h3>DEMANDES EN ATTENTE</h3>

            <div style={{ marginBottom: 16 }}>
              <strong>Dépôts</strong>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Montant</th>
                  <th>Numéro</th>
                  <th>Pays</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.depositRequests.filter((d) => d.status === 'en_attente').map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.name}</td>
                    <td>{deposit.amount.toLocaleString()} FCFA</td>
                    <td>{deposit.phone}</td>
                    <td>{deposit.country}</td>
                    <td>
                      <div className="inline-actions">
                        <button className="primary-btn" onClick={() => approveDeposit(deposit.id)}>Approuver</button>
                        <button className="danger-btn" onClick={() => rejectDeposit(deposit.id)}>Rejeter</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ margin: '20px 0 12px' }}>
              <strong>Retraits</strong>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Montant</th>
                  <th>Réseau</th>
                  <th>Pays</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.withdrawalRequests.filter((w) => w.status === 'en_attente').map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td>{withdrawal.name}</td>
                    <td>{withdrawal.amount.toLocaleString()} FCFA</td>
                    <td>{withdrawal.network}</td>
                    <td>{withdrawal.country}</td>
                    <td>
                      <div className="inline-actions">
                        <button className="primary-btn" onClick={() => approveWithdrawal(withdrawal.id)}>Approuver</button>
                        <button className="danger-btn" onClick={() => rejectWithdrawal(withdrawal.id)}>Rejeter</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h3>Gestion utilisateurs</h3>
            <div className="field">
              <label>Filtrer par pays</label>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
                <option>Tous</option>
                {state.settings.allowedCountries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Pays</th>
                  <th>Solde</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.country}</td>
                    <td>{user.balance.toLocaleString()} FCFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="page-grid" style={{ marginTop: 6 }}>
          <div className="panel">
            <h3>Gestion Produits CRUD</h3>
            <form onSubmit={handleAddProduct}>
              <div className="form-grid">
                <div className="field">
                  <label>Nom</label>
                  <input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Montant</label>
                  <input type="number" value={productForm.amount} onChange={(e) => setProductForm({ ...productForm, amount: e.target.value })} />
                </div>
                <div className="field">
                  <label>Gain/Jour</label>
                  <input type="number" value={productForm.daily} onChange={(e) => setProductForm({ ...productForm, daily: e.target.value })} />
                </div>
                <div className="field">
                  <label>Total</label>
                  <input type="number" value={productForm.total} onChange={(e) => setProductForm({ ...productForm, total: e.target.value })} />
                </div>
              </div>
              <button className="primary-btn" type="submit">Ajouter produit</button>
            </form>

            <div style={{ marginTop: 18 }}>
              {state.products.map((product) => (
                <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
                  <span>{product.amount.toLocaleString()} FCFA</span>
                  <div className="inline-actions">
                    <button className="ghost-btn" onClick={() => updateProduct(product.id, { daily: product.daily + 100 })}>Modifier</button>
                    <button className="danger-btn" onClick={() => deleteProduct(product.id)}>Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3>Gestion Paiement et Telegram</h3>
            <div className="field">
              <label>Lien de paiement</label>
              <input value={state.settings.paymentLink} onChange={(e) => updateSettings({ paymentLink: e.target.value })} />
            </div>
            <div className="field">
              <label>Lien Telegram</label>
              <input value={state.settings.telegramLink} onChange={(e) => updateSettings({ telegramLink: e.target.value })} />
            </div>
            <div className="field">
              <label>Lien support</label>
              <input value={state.settings.supportLink} onChange={(e) => updateSettings({ supportLink: e.target.value })} />
            </div>
            <div className="field">
              <label>Parrainage</label>
              <input value={`${state.settings.referral.lvl1}% / ${state.settings.referral.lvl2}% / ${state.settings.referral.lvl3}%`} readOnly />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
