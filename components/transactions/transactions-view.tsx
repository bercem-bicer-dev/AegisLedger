'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  FileCheck,
  ArrowRight,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Layers,
  Hash,
  FileText,
  Boxes,
  Shield,
  Banknote,
  UserCog,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transactions, shipments } from '@/lib/mock-data';
import { statusConfig, truncateHash, formatDateTime, timeAgo } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { TransactionType } from '@/types';

const txTypeConfig: Record<TransactionType, { label: string; icon: typeof FileText; color: string }> = {
  shipment_create: { label: 'Shipment Created', icon: Boxes, color: 'text-cyan-400' },
  shipment_update: { label: 'Shipment Updated', icon: FileText, color: 'text-blue-400' },
  proof_submit: { label: 'Proof Submitted', icon: Shield, color: 'text-yellow-400' },
  proof_verify: { label: 'Proof Verified', icon: Shield, color: 'text-emerald-400' },
  transfer_ownership: { label: 'Ownership Transfer', icon: UserCog, color: 'text-purple-400' },
  customs_declare: { label: 'Customs Declaration', icon: FileCheck, color: 'text-yellow-400' },
  payment_escrow: { label: 'Payment Escrow', icon: Banknote, color: 'text-emerald-400' },
  role_grant: { label: 'Role Grant', icon: UserCog, color: 'text-blue-400' },
};

export function TransactionsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.hash.toLowerCase().includes(search.toLowerCase()) ||
        tx.from.toLowerCase().includes(search.toLowerCase()) ||
        tx.to.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Blockchain Transactions</h1>
        <p className="text-sm text-slate-400 mt-1">
          {transactions.length} transactions - {transactions.filter((t) => t.status === 'confirmed').length} confirmed - {transactions.filter((t) => t.status === 'failed').length} failed
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by tx hash or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-slate-900/50 border-slate-700 text-slate-200">
            <Filter className="mr-2 h-4 w-4 text-slate-500" />
            <SelectValue placeholder="Transaction type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="shipment_create">Shipment Created</SelectItem>
            <SelectItem value="shipment_update">Shipment Updated</SelectItem>
            <SelectItem value="proof_submit">Proof Submitted</SelectItem>
            <SelectItem value="proof_verify">Proof Verified</SelectItem>
            <SelectItem value="customs_declare">Customs Declaration</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px] bg-slate-900/50 border-slate-700 text-slate-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transaction list */}
      <div className="space-y-3">
        {filtered.map((tx, i) => {
          const status = statusConfig[tx.status];
          const typeCfg = txTypeConfig[tx.type];
          const shipment = tx.shipmentId ? shipments.find((s) => s.id === tx.shipmentId) : null;
          const isExpanded = expandedTx === tx.hash;
          const TypeIcon = typeCfg.icon;

          return (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Card className={cn(
                'border-slate-800 bg-slate-900/50 overflow-hidden transition-colors',
                tx.status === 'failed' && 'border-red-500/20',
              )}>
                {/* Main row */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                  onClick={() => setExpandedTx(isExpanded ? null : tx.hash)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={cn(
                      'p-2 rounded-lg shrink-0',
                      tx.status === 'confirmed' ? 'bg-emerald-500/10' : tx.status === 'failed' ? 'bg-red-500/10' : 'bg-yellow-500/10'
                    )}>
                      <TypeIcon className={cn('h-4 w-4', typeCfg.color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{typeCfg.label}</span>
                        <Badge variant="outline" className={cn('text-[10px] border', status.bg, status.color)}>
                          {status.label}
                        </Badge>
                        {tx.confirmations > 0 && (
                          <span className="text-xs text-slate-500 hidden sm:inline">{tx.confirmations} confirmations</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Hash className="h-3 w-3" />
                        <span className="font-mono text-cyan-300/70">{truncateHash(tx.hash, 16)}</span>
                        <span className="text-slate-700">|</span>
                        <span>{timeAgo(tx.timestamp)}</span>
                        {shipment && (
                          <>
                            <span className="text-slate-700">|</span>
                            <Link
                              href={`/shipments/${shipment.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="font-mono text-cyan-400 hover:text-cyan-300"
                            >
                              {shipment.trackingId}
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4 shrink-0">
                    <div className="text-right hidden md:block">
                      {tx.blockNumber && (
                        <div className="text-xs text-slate-400">Block #{tx.blockNumber.toLocaleString()}</div>
                      )}
                      {tx.gasUsed && (
                        <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                          <Flame className="h-3 w-3" />{tx.gasUsed} gas
                        </div>
                      )}
                    </div>
                    <ArrowRight className={cn('h-4 w-4 text-slate-600 transition-transform', isExpanded && 'rotate-90')} />
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-slate-800 p-5 space-y-4 bg-slate-950/30">
                    {/* Error message */}
                    {tx.errorMessage && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-300">{tx.errorMessage}</p>
                      </div>
                    )}

                    {/* Transaction details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1.5">Transaction Hash</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-xs font-mono text-cyan-300/80 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 break-all">
                            {tx.hash}
                          </code>
                          <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-slate-600 hover:text-cyan-400" onClick={() => handleCopy('hash', tx.hash)}>
                            {copiedField === 'hash' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 mb-1.5">Contract Address</p>
                        <code className="text-xs font-mono text-emerald-300/80 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 block break-all">
                          {tx.contractAddress}
                        </code>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 mb-1.5">From</p>
                        <code className="text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 block break-all">
                          {tx.from}
                        </code>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 mb-1.5">To</p>
                        <code className="text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 block break-all">
                          {tx.to}
                        </code>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <Layers className="h-3 w-3" /> Block
                        </div>
                        <p className="text-sm font-mono text-slate-200">{tx.blockNumber?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <Flame className="h-3 w-3" /> Gas Used
                        </div>
                        <p className="text-sm font-mono text-slate-200">{tx.gasUsed || 'N/A'}</p>
                      </div>
                      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <Banknote className="h-3 w-3" /> Gas Price
                        </div>
                        <p className="text-sm font-mono text-slate-200">{(parseInt(tx.gasPrice) / 1e9).toFixed(1)} Gwei</p>
                      </div>
                      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <Hash className="h-3 w-3" /> Nonce
                        </div>
                        <p className="text-sm font-mono text-slate-200">{tx.nonce}</p>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {formatDateTime(tx.timestamp)}
                    </div>

                    {/* Event logs */}
                    {tx.logs.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 mb-2">Event Logs</p>
                        <div className="space-y-2">
                          {tx.logs.map((log, idx) => (
                            <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                <span className="text-xs font-mono text-emerald-400">{log.eventName}</span>
                              </div>
                              <div className="text-xs font-mono text-slate-500 mb-1">
                                <span className="text-slate-600">topics[0]: </span>{log.topics[0]}
                              </div>
                              {log.decoded && (
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                  {Object.entries(log.decoded).map(([key, val]) => (
                                    <div key={key} className="text-xs">
                                      <span className="text-slate-600">{key}: </span>
                                      <span className="font-mono text-cyan-300/70">{val}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <FileCheck className="h-12 w-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
