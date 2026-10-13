'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Copy,
  Check,
  Boxes,
  FileText,
  Hash,
  Flame,
  Layers,
  KeyRound,
  Play,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { ZkProofData, Shipment } from '@/types';
import { truncateHash, formatDateTime } from '@/lib/constants';
import { cn } from '@/lib/utils';

const proofStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  verified: { label: 'Verified', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  generating: { label: 'Generating', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
};

export function ProofDetailView({ proof, shipment }: { proof: ZkProofData; shipment?: Shipment }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(proof.status === 'verified');

  const statusCfg = proofStatusConfig[proof.status];

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/proofs" className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          ZK Proofs
        </Link>
        <span className="text-slate-700">/</span>
        <span className="font-mono text-cyan-300">{truncateHash(proof.proofHash, 12)}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">{proof.circuit.name}</h1>
            <Badge variant="outline" className={cn('border', statusCfg.bg, statusCfg.color)}>
              {proof.status}
            </Badge>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl">{proof.description}</p>
        </div>
        <Button
          onClick={handleVerify}
          disabled={verifying || verified}
          className={cn(
            'font-semibold',
            verified
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
          )}
        >
          {verifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying on-chain...
            </>
          ) : verified ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Proof Verified
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Verify Proof
            </>
          )}
        </Button>
      </div>

      {shipment && (
        <Link href={`/shipments/${shipment.id}`}>
          <Card className="border-slate-800 bg-slate-900/50 p-4 flex items-center gap-3 hover:bg-slate-900/80 transition-colors group">
            <Boxes className="h-5 w-5 text-cyan-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300">
                Linked to shipment <span className="font-mono text-cyan-300">{shipment.trackingId}</span>
              </p>
              <p className="text-xs text-slate-500 truncate">{shipment.productName} - {shipment.origin} {'->'} {shipment.destination}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </Card>
        </Link>
      )}

      {/* Proof visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Private Inputs */}
        <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-slate-700/30">
                <EyeOff className="h-4 w-4 text-slate-400" />
              </div>
              <h2 className="text-sm font-semibold text-white">Private Inputs</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">Never revealed on-chain</p>
          </div>
          <div className="p-5 space-y-3">
            {proof.circuit.privateInputs.map((input) => (
              <div key={input}>
                <p className="text-xs text-slate-500 mb-1 font-mono">{input}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-slate-950/50 border border-slate-800 text-xs font-mono text-slate-600 truncate">
                    {proof.privateInputHashes[input] || '*** REDACTED ***'}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 shrink-0 text-slate-600 hover:text-cyan-400"
                    onClick={() => proof.privateInputHashes[input] && handleCopy(input, proof.privateInputHashes[input])}
                  >
                    {copiedField === input ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ZK Circuit */}
        <Card className="border-cyan-500/20 bg-slate-900/50 overflow-hidden relative">
          <div className="absolute inset-0 bg-cyan-500/[0.02]" />
          <div className="relative p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10">
                <Cpu className="h-4 w-4 text-cyan-400" />
              </div>
              <h2 className="text-sm font-semibold text-white">ZK Circuit</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">Groth16 zk-SNARK</p>
          </div>
          <div className="relative p-5 flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 blur-xl bg-cyan-500/20 animate-pulse-glow" />
              <div className={cn(
                'relative h-24 w-24 rounded-full border-2 flex items-center justify-center bg-slate-900',
                verified ? 'border-emerald-400/50' : 'border-cyan-400/50',
              )}>
                {verified ? (
                  <ShieldCheck className="h-10 w-10 text-emerald-400" />
                ) : verifying ? (
                  <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
                ) : (
                  <Shield className="h-10 w-10 text-cyan-400" />
                )}
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className={cn('text-sm font-mono', verified ? 'text-emerald-400' : 'text-cyan-400')}>
                {verified ? 'Proof Valid' : verifying ? 'Computing...' : 'Awaiting Verification'}
              </p>
              <p className="text-xs text-slate-500">{proof.circuit.constraints.toLocaleString()} constraints</p>
              <p className="text-xs text-slate-500">{proof.circuit.name}</p>
            </div>
          </div>
        </Card>

        {/* Public Inputs/Outputs */}
        <Card className="border-emerald-500/20 bg-slate-900/50 overflow-hidden">
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <Eye className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-sm font-semibold text-white">Public Outputs</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">Verifiable by anyone</p>
          </div>
          <div className="p-5 space-y-3">
            {Object.entries(proof.publicInputs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{key}</span>
                <span className={cn(
                  'text-sm font-mono font-medium',
                  value === 'true' || value === 'false'
                    ? value === 'true' ? 'text-emerald-400' : 'text-red-400'
                    : 'text-emerald-300'
                )}>
                  {value}
                </span>
              </div>
            ))}
            <Separator className="bg-slate-800" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">nullifier</span>
              <span className="text-xs font-mono text-slate-500">{truncateHash(proof.nullifier, 10)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Proof Data */}
      <Card className="border-slate-800 bg-slate-900/50">
        <div className="p-5 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-400" />
            Proof Data (Groth16 Encoding)
          </h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Proof A */}
          <div>
            <p className="text-xs font-mono text-cyan-400 mb-2">Proof A (G1)</p>
            <div className="space-y-1">
              {proof.proof.a.map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-4">{i}</span>
                  <code className="flex-1 text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded border border-slate-800 break-all">
                    {val}
                  </code>
                  <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0 text-slate-600 hover:text-cyan-400" onClick={() => handleCopy(`a-${i}`, val)}>
                    {copiedField === `a-${i}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Proof B */}
          <div>
            <p className="text-xs font-mono text-cyan-400 mb-2">Proof B (G2)</p>
            <div className="space-y-1">
              {proof.proof.b.map((pair, i) => (
                <div key={i} className="space-y-1">
                  {pair.map((val, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 w-8">{i}.{j}</span>
                      <code className="flex-1 text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded border border-slate-800 break-all">
                        {val}
                      </code>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Proof C */}
          <div>
            <p className="text-xs font-mono text-cyan-400 mb-2">Proof C (G1)</p>
            <div className="space-y-1">
              {proof.proof.c.map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-4">{i}</span>
                  <code className="flex-1 text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded border border-slate-800 break-all">
                    {val}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Verification details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verifier contract */}
        <Card className="border-slate-800 bg-slate-900/50">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-emerald-400" />
              Verifier Contract
            </h2>
          </div>
          <div className="p-5 space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs font-mono text-emerald-300/80 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 break-all">
                  {proof.verifierAddress}
                </code>
                <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-slate-600 hover:text-emerald-400" onClick={() => handleCopy('verifier', proof.verifierAddress)}>
                  {copiedField === 'verifier' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Verified By</p>
              <code className="text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 block break-all">
                {proof.verifiedBy}
              </code>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Proof Hash</p>
              <code className="text-xs font-mono text-cyan-300/70 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 block break-all">
                {proof.proofHash}
              </code>
            </div>
          </div>
        </Card>

        {/* On-chain data */}
        <Card className="border-slate-800 bg-slate-900/50">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              On-Chain Record
            </h2>
          </div>
          <div className="p-5 space-y-3">
            {proof.blockNumber && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Hash className="h-3 w-3" /> Block Number
                </span>
                <span className="text-sm font-mono text-slate-200">#{proof.blockNumber.toLocaleString()}</span>
              </div>
            )}
            {proof.gasUsed && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Flame className="h-3 w-3" /> Gas Used
                </span>
                <span className="text-sm font-mono text-slate-200">{proof.gasUsed}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Generated
              </span>
              <span className="text-sm text-slate-200">{formatDateTime(proof.generatedAt)}</span>
            </div>
            {proof.verifiedAt && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
                <span className="text-sm text-slate-200">{formatDateTime(proof.verifiedAt)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <XCircle className="h-3 w-3" /> Nullifier
              </span>
              <span className="text-xs font-mono text-slate-400">{truncateHash(proof.nullifier, 12)}</span>
            </div>
            {proof.status === 'verified' && (
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Proof verified successfully on-chain</span>
                </div>
              </div>
            )}
            {proof.status === 'failed' && (
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <XCircle className="h-4 w-4" />
                  <span>Proof verification failed - constraints not satisfied</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
