import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { amount: 'asc' } });
    return NextResponse.json(products.map((product) => ({
      id: product.id,
      name: product.name,
      amount: product.amount,
      daily: product.daily,
      total: product.total,
      image: product.imageUrl,
    })));
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
