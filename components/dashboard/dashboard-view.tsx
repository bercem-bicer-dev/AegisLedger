'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Boxes,
  ShieldCheck,
  DollarSign,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  FileCheck,
  Thermometer,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { dashboardStats, shipments, transactions, zkProofs, networkNodes } from '@/lib/mock-data';
import { statusConfig, priorityConfig, truncateHash, formatCurrency, timeAgo, formatDateTime } from '@/lib/constants';
import { cn } from '@/lib/utils';

const statCards = [
  { label: 'Total Shipments', value: '6', icon: Boxes, color: 'cyan', change: '+12%', trend: 'up' },
  { label: 'Active Shipments', value: '3', icon: Activity, color: 'cyan', change: '+8%', trend: 'up' },
  { label: 'Verified Proofs', value: '3', icon: ShieldCheck, color: 'emerald', change: '+24%', trend: 'up' },
  { label: 'Pending Proofs', value: '1', icon: Clock, color: 'yellow', change: '-5%', trend: 'down' },
  { label: 'Total Cargo Value', value: '$6.37M', icon: DollarSign, color: 'emerald', change: '+18%', trend: 'up' },
  { label: 'Flagged Shipments', value: '1', icon: AlertTriangle, color: 'red', change: '+1', trend: 'up' },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

export function DashboardView() {
  const recentShipments = shipments.slice(0, 5);
  const recentTransactions = transactions.slice(0, 5);
  const recentProofs = zkProofs.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Network Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time supply chain verification overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, i) => {
          const colors = colorMap[stat.color];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className={cn('relative border-slate-800 bg-slate-900/50 p-4 overflow-hidden', colors.border)}>
                <div className={cn('absolute top-0 right-0 h-16 w-16 rounded-full blur-2xl opacity-30', colors.bg)} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn('p-1.5 rounded-lg', colors.bg)}>
                      <stat.icon className={cn('h-4 w-4', colors.text)} />
                    </div>
                    <span className={cn('text-xs font-mono', stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400')}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white tabular-nums">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Shipments */}
        <Card className="lg:col-span-2 border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-cyan-400" />
              <h2 className="text-base font-semibold text-white">Recent Shipments</h2>
            </div>
            <Link href="/shipments">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                View All
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-slate-800/60">
            {recentShipments.map((s) => {
              const status = statusConfig[s.status];
              const priority = priorityConfig[s.priority];
              return (
                <Link
                  key={s.id}
                  href={`/shipments/${s.id}`}
                  className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm text-cyan-300">{s.trackingId}</span>
                      <span className={cn('text-xs', priority.color)}>{priority.label}</span>
                    </div>
                    <p className="text-sm text-slate-300 truncate">{s.productName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {s.origin} {'->'} {s.destination}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-medium text-white">{formatCurrency(s.value, s.currency)}</div>
                      <div className="text-xs text-slate-500">{s.currentLocation}</div>
                    </div>
                    <Badge variant="outline" className={cn('border', status.bg, status.color)}>
                      {status.label}
                    </Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ZK Proof Status */}
        <Card className="border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-white">ZK Proof Status</h2>
            </div>
            <Link href="/proofs">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="text-2xl font-bold text-emerald-400">{dashboardStats.verifiedProofs}</div>
                <div className="text-xs text-slate-500">Verified</div>
              </div>
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
                <div className="text-2xl font-bold text-yellow-400">{dashboardStats.pendingProofs}</div>
                <div className="text-xs text-slate-500">Pending</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Verification Rate</span>
                <span className="text-emerald-400 font-mono">75%</span>
              </div>
              <Progress value={75} className="h-1.5 bg-slate-800 [&>div]:bg-emerald-500" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Avg Verification Time</span>
                <span className="text-cyan-400 font-mono">{dashboardStats.averageVerificationTime}s</span>
              </div>
              <Progress value={82} className="h-1.5 bg-slate-800 [&>div]:bg-cyan-500" />
            </div>

            <div className="pt-2 border-t border-slate-800/60">
              <p className="text-xs text-slate-500 mb-2">Recent Proofs</p>
              {recentProofs.map((p) => (
                <Link
                  key={p.id}
                  href={`/proofs/${p.id}`}
                  className="flex items-center justify-between py-1.5 hover:bg-slate-800/30 rounded px-2 -mx-2 transition-colors"
                >
                  <span className="text-xs font-mono text-slate-400 truncate">{p.circuit.name}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[10px] border',
                      p.status === 'verified' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                      p.status === 'pending' && 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
                      p.status === 'failed' && 'bg-red-500/10 border-red-500/20 text-red-400',
                    )}
                  >
                    {p.status}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom grid: Transactions + Network Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-cyan-400" />
              <h2 className="text-base font-semibold text-white">Blockchain Transactions</h2>
            </div>
            <Link href="/transactions">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                View All
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-slate-800/60">
            {recentTransactions.map((tx) => {
              const status = statusConfig[tx.status];
              return (
                <div key={tx.hash} className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">{tx.type.replace(/_/g, ' ')}</span>
                      <Badge variant="outline" className={cn('text-[10px] border', status.bg, status.color)}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs font-mono text-cyan-300/70 truncate">{truncateHash(tx.hash, 12)}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Block #{tx.blockNumber?.toLocaleString()} - {timeAgo(tx.timestamp)}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-slate-400">{tx.gasUsed} gas</div>
                    <div className="text-xs text-slate-500">{tx.confirmations} confs</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Network Nodes */}
        <Card className="border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-white">Network Nodes</h2>
            </div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs">
              {networkNodes.filter((n) => n.status === 'online').length} Online
            </Badge>
          </div>
          <div className="p-5 space-y-3">
            {networkNodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-300">{node.role}</p>
                  <p className="text-xs font-mono text-slate-500 truncate">{truncateHash(node.address, 10)}</p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-xs text-slate-500 hidden sm:inline">{node.region}</span>
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      node.status === 'online' && 'bg-emerald-400 animate-pulse',
                      node.status === 'syncing' && 'bg-yellow-400 animate-pulse',
                      node.status === 'offline' && 'bg-red-400',
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
