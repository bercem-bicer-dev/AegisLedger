'use client';

import { useWallet } from '@/lib/wallet-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, Wallet, LogOut, Copy, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { truncateHash } from '@/lib/constants';

export function WalletButton() {
  const { address, isConnected, balance, connecting, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        disabled={connecting}
        className="bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-semibold border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        {connecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-300"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
          <span className="font-mono text-sm">{truncateHash(address!, 6)}</span>
          <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-slate-900 border-slate-700">
        <DropdownMenuLabel className="text-slate-400 text-xs font-normal">
          Connected Wallet
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <div className="px-2 py-2">
          <p className="text-xs text-slate-500 mb-1">Address</p>
          <p className="font-mono text-xs text-cyan-300 break-all">{address}</p>
        </div>
        {balance && (
          <div className="px-2 py-2 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 mb-1">Balance</p>
            <p className="text-sm text-emerald-300 font-semibold">{balance} ETH</p>
          </div>
        )}
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem
          onClick={handleCopy}
          className="cursor-pointer text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/5"
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy Address'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={disconnect}
          className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/5"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
