'use client';

import { Navbar } from '@/components/navbar';
import { WalletProvider } from '@/lib/wallet-context';
import { Toaster } from '@/components/ui/sonner';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 bg-grid">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
        <Toaster theme="dark" />
      </div>
    </WalletProvider>
  );
}
