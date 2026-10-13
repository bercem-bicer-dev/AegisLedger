'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              Zero-Knowledge Proof Infrastructure
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Verifiable Supply Chains.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent text-glow-cyan">
              Zero Knowledge Exposed.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            AegisLedger powers enterprise logistics with zero-knowledge proofs that verify
            compliance, authenticity, and chain-of-custody — without exposing proprietary data.
            Built on Ethereum. Trusted by global supply chain operators.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)] px-8"
              >
                Launch Platform
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/proofs">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 px-8"
              >
                <Shield className="mr-2 h-4 w-4 text-cyan-400" />
                Explore ZK Proofs
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-500" />
              <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-emerald-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-cyan-500" />
              <span>On-Chain Verifiable</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Audited Smart Contracts</span>
            </div>
          </div>
        </motion.div>

        {/* Animated proof visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden glow-border">
            {/* Scan line effect */}
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan" />

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {/* Private Inputs */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <EyeOff className="h-4 w-4 text-slate-500" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Private Inputs</span>
                </div>
                <div className="space-y-2">
                  {['Sensor Readings', 'Calibration Keys', 'Quality Reports', 'Supplier Contracts'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      <span className="font-mono">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-slate-600 italic">Never revealed</div>
              </div>

              {/* ZK Circuit */}
              <div className="p-6 relative">
                <div className="absolute inset-0 bg-cyan-500/5" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">ZK Circuit</span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative">
                      <div className="absolute inset-0 blur-xl bg-cyan-500/30 animate-pulse-glow" />
                      <div className="relative h-20 w-20 rounded-full border-2 border-cyan-400/50 flex items-center justify-center bg-slate-900">
                        <Shield className="h-8 w-8 text-cyan-400" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-cyan-300 font-mono">Proof Generated</p>
                    <p className="text-xs text-slate-500 mt-1">24,576 constraints</p>
                  </div>
                </div>
              </div>

              {/* Public Outputs */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Public Outputs</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-mono">temperatureRange</span>
                    <span className="text-emerald-400 font-mono">2-8 C</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-mono">compliant</span>
                    <span className="text-emerald-400 font-mono">true</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-mono">chainComplete</span>
                    <span className="text-emerald-400 font-mono">true</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-mono">proofHash</span>
                    <span className="text-emerald-400 font-mono">0xa1b2...c3d4</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-emerald-500/70 italic">Verifiable by anyone</div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-500">Verified on-chain at block #18,745,234</span>
              </div>
              <span className="text-xs font-mono text-slate-600">284,567 gas</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
