'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WalletProvider } from '@/lib/wallet-context';

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </WalletProvider>
  );
}
