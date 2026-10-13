'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <Shield className="h-8 w-8 text-cyan-400" strokeWidth={1.8} />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ready to Build Trust
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Into Every Shipment?
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join the enterprises transforming supply chain verification with zero-knowledge proofs.
            Deploy your first proof in minutes.
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
            <Link href="/shipments">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 px-8"
              >
                View Live Shipments
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
