'use client';

import Image from 'next/image';
import { useAppState } from '@/components/AppStateProvider';

export default function ProductCard({ product }) {
  const { addInvestment } = useAppState();

  return (
    <div className="product-card">
      <div className="product-visual">
        <Image src={product.image} alt={product.name} width={480} height={180} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span>Investissement</span>
          <span>{product.amount.toLocaleString()} FCFA</span>
        </div>
        <div className="product-price">
          <div>
            <small className="muted">Gain/Jour</small>
            <strong>{product.daily.toLocaleString()} FCFA</strong>
          </div>
          <div>
            <small className="muted">Total</small>
            <strong>{product.total.toLocaleString()} FCFA</strong>
          </div>
        </div>
        <button className="primary-btn" style={{ width: '100%' }} onClick={() => addInvestment(product)}>Investir</button>
      </div>
    </div>
  );
}
