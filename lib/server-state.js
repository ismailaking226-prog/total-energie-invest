import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerState() {
  const [products, settings, users, investments, pendingDeposits, pendingWithdrawals] = await Promise.all([
    prisma.product.findMany({ orderBy: { amount: 'asc' } }),
    prisma.setting.findFirst(),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.investment.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.depositRequest.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' } }),
    prisma.withdrawalRequest.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' } }),
  ]);

  return {
    settings: settings ? {
      paymentLink: settings.paymentLink,
      telegramLink: settings.telegramLink,
      supportLink: settings.supportLink,
      popupTitle: settings.popupTitle,
      referral: { lvl1: settings.referralLevel1, lvl2: settings.referralLevel2, lvl3: settings.referralLevel3 },
      payoutFee: settings.payoutFee,
      minWithdrawal: settings.minWithdrawal,
      dailyDuration: settings.dailyDuration,
      allowedCountries: settings.allowedCountries.split(',').map((country) => country.trim()),
    } : {
      paymentLink: process.env.PAYMENT_LINK || 'https://payliv.shop/pay/plv_rkermm7f-',
      telegramLink: process.env.TELEGRAM_LINK || 'https://t.me/+74TGsMBlIwwyYTI0',
      supportLink: process.env.SUPPORT_LINK || 'https://t.me/+avYieGqPfUtlNDI0',
      popupTitle: 'INFORMATION',
      referral: { lvl1: 25, lvl2: 3, lvl3: 2 },
      payoutFee: 15,
      minWithdrawal: 800,
      dailyDuration: 180,
      allowedCountries: ['Bénin', 'Cameroun', 'Côte d’Ivoire', 'Burkina Faso', 'Niger'],
    },
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      amount: product.amount,
      daily: product.daily,
      total: product.total,
      image: product.imageUrl,
    })),
    users,
    investments,
    depositRequests: pendingDeposits,
    withdrawalRequests: pendingWithdrawals,
  };
}
