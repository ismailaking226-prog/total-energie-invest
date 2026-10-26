export const allowedCountries = ['Bénin', 'Cameroun', 'Côte d’Ivoire', 'Burkina Faso', 'Niger'];

export const defaultState = {
  settings: {
    paymentLink: 'https://payliv.shop/pay/plv_rkermm7f-',
    telegramLink: 'https://t.me/+74TGsMBlIwwyYTI0',
    supportLink: 'https://t.me/+avYieGqPfUtlNDI0',
    popupTitle: 'INFORMATION',
    referral: { lvl1: 25, lvl2: 3, lvl3: 2 },
    payoutFee: 15,
    minWithdrawal: 800,
    dailyDuration: 180,
    allowedCountries,
  },
  user: {
    name: 'Client Demo',
    email: 'client@totalenergie.com',
    phone: '97000000',
    country: 'Côte d���Ivoire',
    balance: 0,
    totalInvested: 0,
    totalEarned: 0,
    sponsor: 'Total Énergie',
  },
  products: [
    { id: 'p1', name: 'Station Total Énergie', amount: 2000, daily: 300, total: 54000, image: '/products/product-2000.svg' },
    { id: 'p2', name: 'Station Total Énergie', amount: 5000, daily: 800, total: 144000, image: '/products/product-5000.svg' },
    { id: 'p3', name: 'Station Total Énergie', amount: 15000, daily: 2400, total: 432000, image: '/products/product-15000.svg' },
    { id: 'p4', name: 'Station Total Énergie', amount: 35000, daily: 5600, total: 1008000, image: '/products/product-35000.svg' },
    { id: 'p5', name: 'Station Total Énergie', amount: 50000, daily: 8500, total: 1530000, image: '/products/product-50000.svg' },
    { id: 'p6', name: 'Station Total Énergie', amount: 100000, daily: 17000, total: 3060000, image: '/products/product-100000.svg' },
    { id: 'p7', name: 'Station Total Énergie', amount: 250000, daily: 45000, total: 8100000, image: '/products/product-250000.svg' }
  ],
  investments: [
    { id: 'inv1', name: 'Client Demo', phone: '97000000', amount: 2000, daily: 300, total: 54000, date: '2025-01-02T09:00:00.000Z', status: 'actif' }
  ],
  depositRequests: [
    { id: 'dep1', name: 'Client Demo', amount: 2000, network: 'Orange Money', phone: '97000000', country: 'Côte d’Ivoire', date: '2025-01-02T09:00:00.000Z', proof: 'Pièce jointe', status: 'en_attente' }
  ],
  withdrawalRequests: [
    { id: 'wit1', name: 'Client Demo', amount: 800, network: 'Moov Money', phone: '97000000', country: 'Côte d’Ivoire', date: '2025-01-03T14:00:00.000Z', status: 'en_attente' }
  ],
  users: [
    { id: 'u1', name: 'Client Demo', phone: '97000000', country: 'Côte d’Ivoire', balance: 0 },
    { id: 'u2', name: 'Alice N', phone: '65000000', country: 'Burkina Faso', balance: 0 },
    { id: 'u3', name: 'Koffi Y', phone: '69000000', country: 'Bénin', balance: 0 }
  ],
};

export const storageKey = 'total-energie-app-v1';
