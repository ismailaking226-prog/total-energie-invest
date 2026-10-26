import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const country = String(body.country || '').trim();
    const phone = String(body.phone || '').trim();
    const password = String(body.password || '');

    if (!country || !phone || !password) {
      return NextResponse.json({ error: 'Pays, numéro et mot de passe requis.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        phone,
        country,
      },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email || '',
        phone: user.phone,
        country: user.country,
        balance: user.balance,
        totalInvested: user.totalInvested,
        totalEarned: user.totalEarned,
      },
    });
  } catch (error) {
    console.error('LOGIN_ERROR', error);
    return NextResponse.json({ error: 'Erreur lors de la connexion.' }, { status: 500 });
  }
}
