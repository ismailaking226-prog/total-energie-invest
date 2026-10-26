import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const investments = await prisma.investment.findMany({
    where: { status: 'active' },
    include: { user: true },
  });

  let processed = 0;

  for (const item of investments) {
    const today = new Date();
    const lastPaid = item.lastPaidAt ? new Date(item.lastPaidAt) : null;
    const sameDay = lastPaid && lastPaid.toDateString() === today.toDateString();
    if (sameDay) continue;

    await prisma.user.update({
      where: { id: item.userId },
      data: {
        balance: item.user.balance + item.dailyReturn,
        totalEarned: item.user.totalEarned + item.dailyReturn,
      },
    });

    await prisma.investment.update({
      where: { id: item.id },
      data: { lastPaidAt: new Date() },
    });

    processed += 1;
  }

  return NextResponse.json({ ok: true, processed });
}
