'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultState, storageKey } from '@/lib/mockData';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          ...defaultState,
          ...parsed,
          settings: { ...defaultState.settings, ...(parsed.settings || {}) },
          user: { ...defaultState.user, ...(parsed.user || {}) },
        });
      }
    } catch (error) {
      console.error('Storage load error', error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, ready]);

  const actions = useMemo(() => ({
    setState,
    addInvestment: (product) => {
      setState((prev) => {
        const investment = {
          id: `inv-${Date.now()}`,
          name: prev.user.name,
          phone: prev.user.phone,
          amount: product.amount,
          daily: product.daily,
          total: product.total,
          date: new Date().toISOString(),
          status: 'actif',
        };
        return {
          ...prev,
          investments: [investment, ...prev.investments],
          user: {
            ...prev.user,
            totalInvested: prev.user.totalInvested + product.amount,
            balance: prev.user.balance + 0,
          },
        };
      });
    },
    addDepositRequest: (payload) => {
      setState((prev) => ({
        ...prev,
        depositRequests: [{
          id: `dep-${Date.now()}`,
          name: prev.user.name,
          amount: Number(payload.amount),
          network: payload.network,
          phone: payload.phone,
          country: prev.user.country,
          date: new Date().toISOString(),
          proof: 'Paiement effectué',
          status: 'en_attente',
        }, ...prev.depositRequests],
      }));
    },
    addWithdrawalRequest: (payload) => {
      setState((prev) => ({
        ...prev,
        withdrawalRequests: [{
          id: `wit-${Date.now()}`,
          name: prev.user.name,
          amount: Number(payload.amount),
          network: payload.network,
          phone: payload.phone,
          country: prev.user.country,
          date: new Date().toISOString(),
          status: 'en_attente',
        }, ...prev.withdrawalRequests],
      }));
    },
    approveDeposit: (requestId) => {
      setState((prev) => {
        const deposit = prev.depositRequests.find((item) => item.id === requestId);
        const amount = deposit ? Number(deposit.amount) : 0;
        return {
          ...prev,
          depositRequests: prev.depositRequests.map((item) => item.id === requestId ? { ...item, status: 'approuve' } : item),
          user: {
            ...prev.user,
            balance: prev.user.balance + amount,
          },
        };
      });
    },
    rejectDeposit: (requestId) => {
      setState((prev) => ({
        ...prev,
        depositRequests: prev.depositRequests.map((item) => item.id === requestId ? { ...item, status: 'rejete' } : item),
      }));
    },
    approveWithdrawal: (requestId) => {
      setState((prev) => {
        const withdrawal = prev.withdrawalRequests.find((item) => item.id === requestId);
        const amount = withdrawal ? Number(withdrawal.amount) : 0;
        return {
          ...prev,
          withdrawalRequests: prev.withdrawalRequests.map((item) => item.id === requestId ? { ...item, status: 'approuve' } : item),
          user: {
            ...prev.user,
            balance: Math.max(0, prev.user.balance - amount),
          },
        };
      });
    },
    rejectWithdrawal: (requestId) => {
      setState((prev) => ({
        ...prev,
        withdrawalRequests: prev.withdrawalRequests.map((item) => item.id === requestId ? { ...item, status: 'rejete' } : item),
      }));
    },
    updateSettings: (updated) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, ...updated } }));
    },
    updateProduct: (productId, data) => {
      setState((prev) => ({
        ...prev,
        products: prev.products.map((product) => product.id === productId ? { ...product, ...data } : product),
      }));
    },
    addProduct: (product) => {
      setState((prev) => ({ ...prev, products: [product, ...prev.products] }));
    },
    deleteProduct: (productId) => {
      setState((prev) => ({ ...prev, products: prev.products.filter((product) => product.id !== productId) }));
    },
  }), []);

  return <AppStateContext.Provider value={{ state, ready, ...actions }}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
