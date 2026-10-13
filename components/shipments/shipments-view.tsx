'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Boxes,
  MapPin,
  Calendar,
  Thermometer,
  AlertTriangle,
  ArrowRight,
  Package,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { shipments } from '@/lib/mock-data';
import { statusConfig, priorityConfig, formatCurrency, formatDate, truncateHash } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ShipmentStatus } from '@/types';

export function ShipmentsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesSearch =
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.productName.toLowerCase().includes(search.toLowerCase()) ||
        s.origin.toLowerCase().includes(search.toLowerCase()) ||
        s.destination.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Shipments</h1>
          <p className="text-sm text-slate-400 mt-1">
            {shipments.length} total shipments - {shipments.filter((s) => s.status === 'in_transit').length} in transit
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by tracking ID, product, or location..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="customs">Customs</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Shipments grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s, i) => {
          const status = statusConfig[s.status];
          const priority = priorityConfig[s.priority];
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={`/shipments/${s.id}`}>
                <Card className={cn(
                  'border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-300 group cursor-pointer overflow-hidden',
                  s.status === 'flagged' && 'border-red-500/20',
                )}>
                  {/* Status bar */}
                  <div className={cn('h-1 w-full', status.color.replace('text-', 'bg-'))} />

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="font-mono text-sm text-cyan-300">{s.trackingId}</span>
                        <h3 className="text-sm font-semibold text-white mt-1 line-clamp-1">{s.productName}</h3>
                      </div>
                      <Badge variant="outline" className={cn('text-xs border shrink-0', status.bg, status.color)}>
                        {status.label}
                      </Badge>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <MapPin className="h-3 w-3 text-cyan-500" />
                      <span className="truncate">{s.origin}</span>
                      <ArrowRight className="h-3 w-3 text-slate-600" />
                      <span className="truncate">{s.destination}</span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500">Value</span>
                        <p className="text-slate-200 font-medium">{formatCurrency(s.value, s.currency)}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Quantity</span>
                        <p className="text-slate-200 font-medium">{s.quantity.toLocaleString()} units</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Current Location</span>
                        <p className="text-slate-200 font-medium truncate">{s.currentLocation}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Est. Delivery</span>
                        <p className="text-slate-200 font-medium">{formatDate(s.estimatedDelivery)}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/60">
                      <span className={cn('text-xs font-medium', priority.color)}>{priority.label} Priority</span>
                      {s.temperatureSensitive && (
                        <span className="flex items-center gap-1 text-xs text-cyan-400">
                          <Thermometer className="h-3 w-3" />
                          Cold Chain
                        </span>
                      )}
                      {s.fragile && (
                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                          <Package className="h-3 w-3" />
                          Fragile
                        </span>
                      )}
                      {s.zkProofId && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 ml-auto">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          ZK Proven
                        </span>
                      )}
                      {s.status === 'flagged' && (
                        <span className="flex items-center gap-1 text-xs text-red-400 ml-auto">
                          <AlertTriangle className="h-3 w-3" />
                          Flagged
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
          <Boxes className="h-12 w-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">No shipments found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
