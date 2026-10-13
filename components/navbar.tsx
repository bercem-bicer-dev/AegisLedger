'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
import { WalletButton } from '@/components/wallet-button';
import { cn } from '@/lib/utils';

const links = [
  { label: 'Platform', href: '/dashboard' },
  { label: 'Shipments', href: '/shipments' },
  { label: 'ZK Proofs', href: '/proofs' },
  { label: 'Transactions', href: '/transactions' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-cyan-500/40 group-hover:bg-cyan-400/60 transition-colors" />
              <Shield className="relative h-7 w-7 text-cyan-400" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-white tracking-tight">
                Aegis<span className="text-cyan-400">Ledger</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                ZKP Verification Network
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    active
                      ? 'text-cyan-300 bg-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">Mainnet</span>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
