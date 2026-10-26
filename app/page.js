import BrandHeader from '@/components/BrandHeader';
import ProductCard from '@/components/ProductCard';
import WelcomePopup from '@/components/WelcomePopup';
import { useAppState } from '@/components/AppStateProvider';

export default function HomePage() {
  const { state } = useAppState();

  return (
    <>
      <BrandHeader />
      <WelcomePopup />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="pill-btn" style={{ display: 'inline-flex', marginBottom: 16 }}>Investissement 180 jours</div>
              <h1>
                <span className="gradient-text">Total Énergie</span><br />
                Investissez intelligemment.
              </h1>
              <p>
                Une plateforme d’investissement sécurisée pensée pour les marchés du Bénin, Cameroun, Côte d’Ivoire,
                Burkina Faso et Niger, avec rendements quotidiens, suivi administratif et gestion de dépôt/retrait fiable.
              </p>
              <div className="hero-actions">
                <a href="#produits" className="primary-btn">Voir les offres</a>
                <a href={state.settings.telegramLink} target="_blank" rel="noreferrer" className="ghost-btn">Rejoignez Telegram</a>
              </div>

              <div className="quick-stats">
                <div className="stat-card">
                  <strong>180J</strong>
                  <span>durée d’investissement</span>
                </div>
                <div className="stat-card">
                  <strong>5 pays</strong>
                  <span>pays autorisés</span>
                </div>
                <div className="stat-card">
                  <strong>24h/7</strong>
                  <span>traitement des demandes</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-box">
                <div className="visual-header">
                  <span className="visual-balance">Solde disponible</span>
                  <span className="badge badge-blue">Actif</span>
                </div>
                <div className="visual-amount">{state.user.balance.toLocaleString()} FCFA</div>

                <div className="info-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Investissement</span>
                    <strong>{state.user.totalInvested.toLocaleString()} FCFA</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Rendements</span>
                    <strong>{state.user.totalEarned.toLocaleString()} FCFA</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pays</span>
                    <strong>{state.user.country}</strong>
                  </div>
                </div>

                <div className="info-card">
                  <strong>Rejoignez notre Canal Telegram</strong>
                  <p style={{ marginBottom: 0, marginTop: 8, color: 'rgba(255,255,255,0.8)' }}>
                    Suivez les offres et la communication de la marque Total Énergie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Pourquoi choisir Total Énergie</h2>
            </div>
            <div className="grid-3">
              <div className="feature-card">
                <div className="icon">⚡</div>
                <h3>Rendements automatiques</h3>
                <p>Les gains quotidiens sont calculés proprement pendant 180 jours et versés selon l’horaire d’investissement.</p>
              </div>
              <div className="feature-card">
                <div className="icon">💳</div>
                <h3>Paiement mobile</h3>
                <p>Orange Money, Moov Money, MTN Money et Wave sont pris en charge via un lien de paiement sécurisé.</p>
              </div>
              <div className="feature-card">
                <div className="icon">🛡️</div>
                <h3>Validation admin</h3>
                <p>Toute demande de dépôt ou retrait est contrôlée manuellement par l’admin avant validation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="produits">
          <div className="container">
            <div className="section-header">
              <h2>Offres d’investissement</h2>
            </div>
            <div className="product-grid">
              {state.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
