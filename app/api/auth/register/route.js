import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const country = String(body.country || '').trim();
    const phone = String(body.phone || '').trim();
    const password = String(body.password || '');
    const sponsorCode = String(body.sponsorCode || '').trim();

    if (!name || !country || !phone || !password) {
      return NextResponse.json({ error: 'Nom, pays, téléphone et mot de passe requis.' }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        phone,
        country,
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Ce compte existe déjà pour ce pays et ce téléphone.' }, { status: 409 });
    }

    let sponsor = null;
    if (sponsorCode) {
      sponsor = await prisma.user.findFirst({
        where: {
          sponsorCode: {
            equals: sponsorCode,
            mode: 'insensitive',
          },
        },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        country,
        phone,
        passwordHash,
        sponsorCode: sponsorCode || null,
        sponsorId: sponsor?.id || null,
      },
    });

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
    console.error('REGISTER_ERROR', error);
    return NextResponse.json({ error: 'Erreur lors de l’inscription.' }, { status: 500 });
  }
}
