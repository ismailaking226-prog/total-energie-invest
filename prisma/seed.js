const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@totalenergie.com';

  await prisma.setting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      paymentLink: process.env.PAYMENT_LINK || 'https://payliv.shop/pay/plv_rkermm7f-',
      telegramLink: process.env.TELEGRAM_LINK || 'https://t.me/+74TGsMBlIwwyYTI0',
      supportLink: process.env.SUPPORT_LINK || 'https://t.me/+avYieGqPfUtlNDI0',
      popupTitle: 'INFORMATION',
      referralLevel1: 25,
      referralLevel2: 3,
      referralLevel3: 2,
      minWithdrawal: 800,
      payoutFee: 15,
      dailyDuration: 180,
      allowedCountries: 'Bénin,Cameroun,Côte d’Ivoire,Burkina Faso,Niger',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { isAdmin: true },
    create: {
      name: 'Admin Total Énergie',
      email: adminEmail,
      phone: '00000000',
      country: 'Côte d’Ivoire',
      balance: 0,
      totalInvested: 0,
      totalEarned: 0,
      isAdmin: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'client@totalenergie.com' },
    update: {},
    create: {
      name: 'Client Demo',
      email: 'client@totalenergie.com',
      phone: '97000000',
      country: 'Côte d’Ivoire',
      balance: 0,
      totalInvested: 0,
      totalEarned: 0,
      sponsorId: admin.id,
    },
  });

  const products = [
    { name: 'Station Total Énergie', amount: 2000, daily: 300, total: 54000, imageUrl: '/products/product-2000.svg' },
    { name: 'Station Total Énergie', amount: 5000, daily: 800, total: 144000, imageUrl: '/products/product-5000.svg' },
    { name: 'Station Total Énergie', amount: 15000, daily: 2400, total: 432000, imageUrl: '/products/product-15000.svg' },
    { name: 'Station Total Énergie', amount: 35000, daily: 5600, total: 1008000, imageUrl: '/products/product-35000.svg' },
    { name: 'Station Total Énergie', amount: 50000, daily: 8500, total: 1530000, imageUrl: '/products/product-50000.svg' },
    { name: 'Station Total Énergie', amount: 100000, daily: 17000, total: 3060000, imageUrl: '/products/product-100000.svg' },
    { name: 'Station Total Énergie', amount: 250000, daily: 45000, total: 8100000, imageUrl: '/products/product-250000.svg' },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: `seed-${product.amount}` },
      update: {},
      create: {
        id: `seed-${product.amount}`,
        ...product,
      },
    });
  }

  console.log('Seed complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
