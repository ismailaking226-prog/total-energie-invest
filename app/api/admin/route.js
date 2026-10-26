import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const withdrawals = await prisma.withdrawalRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });

    return NextResponse.json(withdrawals.map((item) => ({
      id: item.id,
      name: item.user.name,
      amount: item.amount,
      network: item.network,
      phone: item.phone,
      country: item.country,
      date: item.createdAt,
      status: item.status,
    })));
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  const body = await request.json();

  if (!body.amount || !body.network || !body.phone) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
  }

  const user = await prisma.user.findFirst();
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const requestRecord = await prisma.withdrawalRequest.create({
    data: {
      userId: user.id,
      amount: Number(body.amount),
      network: body.network,
      phone: body.phone,
      country: user.country,
      status: 'pending',
    },
  });

  return NextResponse.json({ id: requestRecord.id, status: 'pending' });
}
