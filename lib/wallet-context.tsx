'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string | null;
  chainId: number | null;
  connecting: boolean;
  error: string | null;
}

interface WalletContextValue extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: null,
    chainId: null,
    connecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, connecting: true, error: null }));

    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const { ethers } = await import('ethers');
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(accounts[0]);

        setState({
          address: accounts[0],
          isConnected: true,
          balance: ethers.formatEther(balance),
          chainId: Number(network.chainId),
          connecting: false,
          error: null,
        });
      } else {
        const demoAddress = '0x4F7a2E9b1C3d5A8f6E0b2D4c6A8f0E2d4B6c8A0f';
        setState({
          address: demoAddress,
          isConnected: true,
          balance: '12.4568',
          chainId: 1,
          connecting: false,
          error: null,
        });
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        connecting: false,
        error: err instanceof Error ? err.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnected: false,
      balance: null,
      chainId: null,
      connecting: false,
      error: null,
    });
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
