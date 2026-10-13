import Link from 'next/link';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-cyan-400" strokeWidth={2.5} />
              <span className="text-lg font-bold text-white">
                Aegis<span className="text-cyan-400">Ledger</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Zero-Knowledge Proof based supply chain and financial verification network.
              Secure, transparent, and privacy-preserving enterprise logistics on the blockchain.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/shipments" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Shipments</Link></li>
              <li><Link href="/proofs" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">ZK Proofs</Link></li>
              <li><Link href="/transactions" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Transactions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Smart Contracts</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Circuit Library</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Security Audits</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            (c) 2024 AegisLedger. Built with zero-knowledge cryptography.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
