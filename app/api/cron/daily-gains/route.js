import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [users, deposits, withdrawals, products] = await Promise.all([
      prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.depositRequest.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.withdrawalRequest.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.product.findMany({ orderBy: { amount: 'asc' } }),
    ]);

    return NextResponse.json({
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        country: user.country,
        balance: user.balance,
        isAdmin: user.isAdmin,
      })),
      deposits: deposits.map((item) => ({
        id: item.id,
        name: item.userId,
        amount: item.amount,
        network: item.network,
        phone: item.phone,
        country: item.country,
        status: item.status,
      })),
      withdrawals: withdrawals.map((item) => ({
        id: item.id,
        name: item.userId,
        amount: item.amount,
        network: item.network,
        phone: item.phone,
        country: item.country,
        status: item.status,
      })),
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        amount: product.amount,
        daily: product.daily,
        total: product.total,
      })),
    });
  } catch (error) {
    return NextResponse.json({ users: [], deposits: [], withdrawals: [], products: [] });
  }
}

export async function POST(request) {
  const body = await request.json();

  if (body.action === 'approve-deposit') {
    const deposit = await prisma.depositRequest.findUnique({ where: { id: body.id } });
    if (!deposit) return NextResponse.json({ error: 'Demandes introuvable' }, { status: 404 });

    const user = await prisma.user.findUnique({ where: { id: deposit.userId } });
    if (!user) return NextResponse.json({ error: 'User introuvable' }, { status: 404 });

    await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance + deposit.amount },
    });

    await prisma.depositRequest.update({
      where: { id: deposit.id },
      data: { status: 'approved' },
    });

    return NextResponse.json({ success: true });
  }

  if (body.action === 'reject-deposit') {
    await prisma.depositRequest.update({
      where: { id: body.id },
      data: { status: 'rejected' },
    });
    return NextResponse.json({ success: true });
  }

  if (body.action === 'approve-withdrawal') {
    const withdrawal = await prisma.withdrawalRequest.findUnique({ where: { id: body.id } });
    if (!withdrawal) return NextResponse.json({ error: 'Demande introuvable' }, { status: 404 });

    const user = await prisma.user.findUnique({ where: { id: withdrawal.userId } });
    if (!user) return NextResponse.json({ error: 'User introuvable' }, { status: 404 });

    await prisma.user.update({
      where: { id: user.id },
      data: { balance: Math.max(0, user.balance - withdrawal.amount) },
    });

    await prisma.withdrawalRequest.update({
      where: { id: withdrawal.id },
      data: { status: 'approved' },
    });

    return NextResponse.json({ success: true });
  }

  if (body.action === 'reject-withdrawal') {
    await prisma.withdrawalRequest.update({
      where: { id: body.id },
      data: { status: 'rejected' },
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Action inconnue' }, { status: 400 });
}
