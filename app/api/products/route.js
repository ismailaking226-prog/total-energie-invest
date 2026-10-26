import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const setting = await prisma.setting.findFirst();
    if (!setting) {
      return NextResponse.json({
        paymentLink: process.env.PAYMENT_LINK || 'https://payliv.shop/pay/plv_rkermm7f-',
        telegramLink: process.env.TELEGRAM_LINK || 'https://t.me/+74TGsMBlIwwyYTI0',
        supportLink: process.env.SUPPORT_LINK || 'https://t.me/+avYieGqPfUtlNDI0',
        popupTitle: 'INFORMATION',
        referral: { lvl1: 25, lvl2: 3, lvl3: 2 },
        payoutFee: 15,
        minWithdrawal: 800,
        dailyDuration: 180,
        allowedCountries: ['Bénin', 'Cameroun', 'Côte d’Ivoire', 'Burkina Faso', 'Niger'],
      });
    }

    return NextResponse.json({
      paymentLink: setting.paymentLink,
      telegramLink: setting.telegramLink,
      supportLink: setting.supportLink,
      popupTitle: setting.popupTitle,
      referral: {
        lvl1: setting.referralLevel1,
        lvl2: setting.referralLevel2,
        lvl3: setting.referralLevel3,
      },
      payoutFee: setting.payoutFee,
      minWithdrawal: setting.minWithdrawal,
      dailyDuration: setting.dailyDuration,
      allowedCountries: setting.allowedCountries.split(',').map((country) => country.trim()),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}
