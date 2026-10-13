'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Shield,
  Search,
  Filter,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zkProofs, shipments } from '@/lib/mock-data';
import { statusConfig, truncateHash, formatDateTime } from '@/lib/constants';
import { cn } from '@/lib/utils';

const proofStatusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  verified: { label: 'Verified', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: Clock },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: XCircle },
  generating: { label: 'Generating', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', icon: AlertCircle },
};

export function ProofsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return zkProofs.filter((p) => {
      const matchesSearch =
        p.circuit.name.toLowerCase().includes(search.toLowerCase()) ||
        p.proofHash.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ZK Proof Verification</h1>
          <p className="text-sm text-slate-400 mt-1">
            {zkProofs.length} proofs - {zkProofs.filter((p) => p.status === 'verified').length} verified - {zkProofs.filter((p) => p.status === 'failed').length} failed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300">Groth16 ZK-SNARK</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by circuit name, proof hash, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-900/50 border-slate-700 text-slate-200">
            <Filter className="mr-2 h-4 w-4 text-slate-500" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="generating">Generating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Proofs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((proof, i) => {
          const statusCfg = proofStatusConfig[proof.status];
          const shipment = shipments.find((s) => s.id === proof.shipmentId);
          const StatusIcon = statusCfg.icon;
          return (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={`/proofs/${proof.id}`}>
                <Card className={cn(
                  'border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-300 group cursor-pointer overflow-hidden',
                  proof.status === 'failed' && 'border-red-500/20',
                  proof.status === 'verified' && 'border-emerald-500/10',
                )}>
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn('p-2 rounded-lg', statusCfg.bg, 'border')}>
                          <StatusIcon className={cn('h-5 w-5', statusCfg.color)} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{proof.circuit.name}</h3>
                          <p className="text-xs text-slate-500 font-mono">{truncateHash(proof.proofHash, 12)}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn('text-xs border', statusCfg.bg, statusCfg.color)}>
                        {statusCfg.label}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {proof.description}
                    </p>

                    {/* Circuit info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-xs">
                        <Cpu className="h-3 w-3 text-cyan-500" />
                        <span className="text-slate-500">Constraints:</span>
                        <span className="text-slate-300 font-mono">{proof.circuit.constraints.toLocaleString()}</span>
                      </div>
                      {proof.blockNumber && (
                        <div className="flex items-center gap-2 text-xs">
                          <Shield className="h-3 w-3 text-emerald-500" />
                          <span className="text-slate-500">Block:</span>
                          <span className="text-slate-300 font-mono">#{proof.blockNumber.toLocaleString()}</span>
                        </div>
                      )}
                      {proof.gasUsed && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">Gas:</span>
                          <span className="text-slate-300 font-mono">{proof.gasUsed}</span>
                        </div>
                      )}
                      {proof.verifiedAt && (
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-3 w-3 text-slate-600" />
                          <span className="text-slate-500">{formatDateTime(proof.verifiedAt)}</span>
                        </div>
                      )}
                    </div>

                    {/* I/O summary */}
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-800/60">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Eye className="h-3 w-3 text-emerald-400" />
                        {proof.circuit.publicInputs.length} public
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <EyeOff className="h-3 w-3 text-slate-500" />
                        {proof.circuit.privateInputs.length} private
                      </span>
                      {shipment && (
                        <span className="text-xs text-cyan-400 ml-auto group-hover:text-cyan-300">
                          {shipment.trackingId}
                          <ArrowRight className="inline ml-1 h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <ShieldCheck className="h-12 w-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">No ZK proofs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
