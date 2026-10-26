# Total Énergie

Application d’investissement mobile avec landing page, dépôt, produit, admin et logique métier.

## Stack
- Next.js 14
- Prisma
- PostgreSQL
- Vercel-ready

## Installation

1. Copier `.env.example` en `.env.local`
2. Configurer `DATABASE_URL`
3. Installer les dépendances : `npm install`
4. Lancer les migrations : `npx prisma db push`
5. Initialiser les données : `npm run db:seed`
6. Démarrer : `npm run dev`

## Déploiement Vercel
- ajouter la variable `DATABASE_URL`
- configurer `PAYMENT_LINK`, `TELEGRAM_LINK`, `SUPPORT_LINK`, `ADMIN_EMAIL`
- build production : `npm run build`

## Règles métier
- pays autorisés : Bénin, Cameroun, Côte d’Ivoire, Burkina Faso, Niger
- dépôt minimum : 2000 FCFA
- retrait minimum : 800 FCFA
- frais de retrait : 15%
- durée : 180 jours
- validation admin obligatoire avant crédit/débit
