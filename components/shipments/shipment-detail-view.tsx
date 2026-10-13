'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Thermometer,
  Package,
  Shield,
  ShieldCheck,
  Truck,
  Building2,
  Users,
  FileText,
  Box,
  Weight,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Circle,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Shipment } from '@/types';
import {
  statusConfig,
  priorityConfig,
  formatCurrency,
  formatDate,
  formatDateTime,
  truncateHash,
} from '@/lib/constants';
import { cn } from '@/lib/utils';

const eventIcon: Record<string, typeof Circle> = {
  created: FileText,
  departed: Truck,
  arrived: MapPin,
  customs_cleared: Shield,
  verified: ShieldCheck,
  flagged: XCircle,
  delivered: CheckCircle2,
};

const eventColor: Record<string, string> = {
  created: 'text-cyan-400 bg-cyan-500/10',
  departed: 'text-blue-400 bg-blue-500/10',
  arrived: 'text-blue-400 bg-blue-500/10',
  customs_cleared: 'text-yellow-400 bg-yellow-500/10',
  verified: 'text-emerald-400 bg-emerald-500/10',
  flagged: 'text-red-400 bg-red-500/10',
  delivered: 'text-emerald-400 bg-emerald-500/10',
};

export function ShipmentDetailView({ shipment }: { shipment: Shipment }) {
  const status = statusConfig[shipment.status];
  const priority = priorityConfig[shipment.priority];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/shipments" className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          Shipments
        </Link>
        <span className="text-slate-700">/</span>
        <span className="font-mono text-cyan-300">{shipment.trackingId}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">{shipment.productName}</h1>
            <Badge variant="outline" className={cn('border', status.bg, status.color)}>
              {status.label}
            </Badge>
            {shipment.status === 'flagged' && (
              <Badge variant="outline" className="border-red-500/20 bg-red-500/10 text-red-400 text-xs">
                Requires Attention
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-400">
            <span className="font-mono">{shipment.trackingId}</span> - {shipment.productCategory}
          </p>
        </div>
        {shipment.zkProofId && (
          <Link href={`/proofs/${shipment.zkProofId}`}>
            <Button className="bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-semibold">
              <ShieldCheck className="mr-2 h-4 w-4" />
              View ZK Proof
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Details + Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment Details Card */}
          <Card className="border-slate-800 bg-slate-900/50">
            <div className="p-5 border-b border-slate-800">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Box className="h-4 w-4 text-cyan-400" />
                Shipment Details
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-800/40">
              {[
                { label: 'Origin', value: shipment.origin, icon: MapPin },
                { label: 'Destination', value: shipment.destination, icon: MapPin },
                { label: 'Current Location', value: shipment.currentLocation, icon: Truck },
                { label: 'Quantity', value: `${shipment.quantity.toLocaleString()} units`, icon: Package },
                { label: 'Weight', value: `${shipment.weight.toLocaleString()} kg`, icon: Weight },
                { label: 'Cargo Value', value: formatCurrency(shipment.value, shipment.currency), icon: DollarSign },
                { label: 'Created', value: formatDate(shipment.createdAt), icon: Calendar },
                { label: 'Est. Delivery', value: formatDate(shipment.estimatedDelivery), icon: Clock },
                { label: 'Priority', value: priority.label, icon: Shield },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-slate-900/50">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </div>
                  <p className="text-sm text-slate-200 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 p-4 border-t border-slate-800">
              {shipment.temperatureSensitive && (
                <span className="flex items-center gap-1.5 text-xs text-cyan-400">
                  <Thermometer className="h-3 w-3" />
                  Temperature Sensitive
                </span>
              )}
              {shipment.fragile && (
                <span className="flex items-center gap-1.5 text-xs text-yellow-400">
                  <Package className="h-3 w-3" />
                  Fragile Handling
                </span>
              )}
              {shipment.blockchainHash && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 ml-auto">
                  <CheckCircle2 className="h-3 w-3" />
                  On-Chain Verified
                </span>
              )}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="border-slate-800 bg-slate-900/50">
            <div className="p-5 border-b border-slate-800">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                Chain of Custody
              </h2>
            </div>
            <div className="p-5">
              <div className="relative space-y-6">
                {shipment.events.length > 1 && (
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-800" />
                )}
                {shipment.events.map((event, i) => {
                  const Icon = eventIcon[event.eventType] || Circle;
                  const colorClass = eventColor[event.eventType] || 'text-slate-400 bg-slate-500/10';
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="relative flex gap-4"
                    >
                      <div className={cn('relative z-10 flex items-center justify-center h-8 w-8 rounded-full border border-slate-700 shrink-0', colorClass)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-white capitalize">
                            {event.eventType.replace(/_/g, ' ')}
                          </span>
                          <span className="text-xs text-slate-500">{formatDateTime(event.timestamp)}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-0.5">{event.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.actor}
                          </span>
                          {event.txHash && (
                            <span className="font-mono text-cyan-500/70">
                              tx: {truncateHash(event.txHash, 8)}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Parties + Blockchain */}
        <div className="space-y-6">
          {/* Parties */}
          <Card className="border-slate-800 bg-slate-900/50">
            <div className="p-5 border-b border-slate-800">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-400" />
                Involved Parties
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {shipment.parties.map((party) => (
                <div key={party.id} className="flex items-start gap-3">
                  <div className={cn(
                    'flex items-center justify-center h-9 w-9 rounded-lg shrink-0',
                    party.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/30 text-slate-500'
                  )}>
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white truncate">{party.name}</p>
                      {party.verified && <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 capitalize">{party.role}</p>
                    <p className="text-xs text-slate-500">{party.location}</p>
                    <p className="text-xs font-mono text-cyan-500/60 mt-1 truncate">{truncateHash(party.walletAddress, 10)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Blockchain Info */}
          {shipment.blockchainHash && (
            <Card className="border-slate-800 bg-slate-900/50">
              <div className="p-5 border-b border-slate-800">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  Blockchain Record
                </h2>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Shipment Hash</p>
                  <p className="text-xs font-mono text-cyan-300/80 break-all bg-slate-950/50 rounded p-2 border border-slate-800">
                    {shipment.blockchainHash}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Contract Address</p>
                  <p className="text-xs font-mono text-emerald-300/80 break-all bg-slate-950/50 rounded p-2 border border-slate-800">
                    {shipment.contractAddress}
                  </p>
                </div>
                {shipment.zkProofId && (
                  <div className="pt-2 border-t border-slate-800">
                    <Link href={`/proofs/${shipment.zkProofId}`}>
                      <Button variant="outline" size="sm" className="w-full border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10">
                        <ShieldCheck className="mr-2 h-3 w-3" />
                        View ZK Proof
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
