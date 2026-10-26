:root {
  --primary: #ff7a00;
  --primary-dark: #d85b00;
  --secondary: #0a3d91;
  --secondary-soft: #1947b5;
  --green: #1bbf73;
  --green-dark: #159760;
  --bg: #f6f7fb;
  --card: #ffffff;
  --text: #122033;
  --muted: #637089;
  --line: #e7ebf3;
  --danger: #ff4d4f;
  --warning: #f4b740;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: linear-gradient(180deg, #fffaf3 0%, #f4f7ff 100%);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
button, input, select { font: inherit; }

.container {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  color: var(--text);
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), #ff9d47);
  display: grid;
  place-items: center;
  color: white;
  font-size: 22px;
  box-shadow: 0 10px 22px rgba(255,122,0,.25);
}

.brand-text {
  font-size: 1.04rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.nav a {
  color: var(--muted);
  font-weight: 600;
  transition: .2s ease;
}

.nav a:hover { color: var(--secondary); }

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pill-btn, .primary-btn, .ghost-btn, .danger-btn {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: .2s ease;
  font-weight: 700;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), #ff9d47);
  color: white;
  padding: 12px 18px;
  box-shadow: 0 12px 20px rgba(255,122,0,.22);
}

.primary-btn:hover { transform: translateY(-1px); }

.ghost-btn {
  background: #eef4ff;
  color: var(--secondary);
  padding: 12px 18px;
}

.danger-btn {
  background: #fff1f1;
  color: var(--danger);
  padding: 12px 18px;
}

.pill-btn {
  padding: 9px 12px;
  background: #eef5ff;
  color: var(--secondary);
  font-size: .86rem;
}

.hero {
  padding: 54px 0 28px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 22px;
  align-items: center;
}

.hero-copy h1 {
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.06;
  margin: 0 0 18px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--secondary), var(--primary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-copy p {
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.65;
  margin-bottom: 26px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  background: rgba(255,255,255,0.72);
  border: 1px solid var(--line);
  padding: 18px 16px;
  border-radius: 16px;
}

.stat-card strong {
  display: block;
  font-size: 1.5rem;
}

.stat-card span {
  color: var(--muted);
  font-size: .88rem;
}

.hero-visual {
  position: relative;
  background: linear-gradient(150deg, #0b2f74, #0d4fbb 50%, #ff7a00 140%);
  border-radius: 28px;
  padding: 24px;
  min-height: 470px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(11,47,116,.2);
}

.hero-visual::before {
  content: "";
  position: absolute;
  inset: 18px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 22px;
}

.visual-box {
  position: relative;
  z-index: 1;
  padding: 34px 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: white;
}

.visual-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visual-balance {
  font-size: .82rem;
  opacity: .8;
}

.visual-amount {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
}

.info-card {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 18px;
  padding: 16px;
}

.section {
  padding: 26px 0 18px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.section-header h2 {
  margin: 0;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-card, .product-card, .panel, .box-card {
  background: rgba(255,255,255,0.8);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 22px;
  box-shadow: 0 16px 35px rgba(13, 53, 108, 0.05);
}

.feature-card .icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #e9f0ff, #ffefe2);
  font-size: 1.4rem;
  margin-bottom: 14px;
}

.feature-card h3 { margin: 0 0 8px; }
.feature-card p { margin: 0; color: var(--muted); line-height: 1.6; }

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.product-card { overflow: hidden; padding: 0; }
.product-visual { height: 180px; }
.product-content { padding: 18px; }
.product-name { margin: 0 0 8px; font-size: 1.2rem; }
.product-meta { display: flex; justify-content: space-between; gap: 8px; color: var(--muted); font-size: .88rem; }
.product-price { display: flex; justify-content: space-between; align-items: center; margin: 14px 0; }
.product-price strong { font-size: 1.5rem; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.field label { font-weight: 700; color: var(--text); }
.field input, .field select, .field textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 13px 14px;
  background: white;
  color: var(--text);
}

.field textarea { min-height: 110px; resize: vertical; }

.page-header {
  padding: 30px 0 12px;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(1.9rem, 3vw, 2.6rem);
}

.page-header p {
  color: var(--muted);
  margin-top: 10px;
}

.page-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 22px;
  padding-bottom: 28px;
}

.table-wrap { overflow-x: auto; }
.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
}
.th, td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: .78rem;
  font-weight: 700;
}

.badge-success { background: rgba(27,191,115,.12); color: var(--green-dark); }
.badge-warning { background: rgba(244,183,64,.16); color: #9c6908; }
.badge-danger { background: rgba(255,77,79,.12); color: var(--danger); }
.badge-blue { background: rgba(12,76,199,.12); color: var(--secondary); }

.inline-actions { display: flex; gap: 8px; flex-wrap: wrap; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10,17,30,.5);
  display: grid;
  place-items: center;
  z-index: 50;
  padding: 16px;
}

.modal {
  width: min(540px, 100%);
  background: white;
  border-radius: 24px;
  border: 1px solid var(--line);
  padding: 24px;
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 14px;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 18px;
  margin: 18px 0 24px;
}

.kpi {
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.kpi small { color: var(--muted); display: block; margin-bottom: 8px; }
.kpi strong { font-size: 1.6rem; }

.brand-banner {
  width: 100%;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255,122,0,0.12), rgba(10,61,145,0.12));
  border: 1px solid var(--line);
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 18px;
}

@media (max-width: 980px) {
  .hero-grid, .page-grid, .grid-3, .product-grid, .kpis, .form-grid {
    grid-template-columns: 1fr;
  }
  .nav { display: none; }
  .header-actions .pill-btn { display: none; }
}
