'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultState } from '@/lib/defaultData';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [settingsRes, productsRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/products'),
        ]);

        const settings = settingsRes.ok ? await settingsRes.json() : defaultState.settings;
        const products = productsRes.ok ? await productsRes.json() : defaultState.products;

        setState({
          ...defaultState,
          settings,
          products,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    }

    load();
  }, []);

  const actions = useMemo(() => ({
    setState,
    addInvestment: (product) => {
      setState((prev) => ({
        ...prev,
        products: prev.products.map((item) => item.id === product.id ? { ...item, amount: product.amount } : item),
      }));
    },
    addDepositRequest: async (payload) => {
      const res = await fetch('/api/deposits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    },
    addWithdrawalRequest: async (payload) => {
      const res = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    },
    updateSettings: (updated) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, ...updated } }));
    },
  }), []);

  return <AppStateContext.Provider value={{ state, ready, ...actions }}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
