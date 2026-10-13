'use client';

import { motion } from 'framer-motion';
import { FileCheck, Shield, Boxes, Network } from 'lucide-react';

const steps = [
  {
    icon: FileCheck,
    step: '01',
    title: 'Register Shipment',
    description:
      'Manufacturers create a shipment on-chain, committing to product attributes and compliance requirements via a ZK proof commitment hash.',
  },
  {
    icon: Boxes,
    step: '02',
    title: 'Transit with IoT Proofs',
    description:
      'Sensor data from IoT devices is fed through decentralized oracles. Range proofs are generated at each checkpoint to verify conditions are met.',
  },
  {
    icon: Shield,
    step: '03',
    title: 'Verify at Customs',
    description:
      'Customs authorities verify ZK proofs on-chain without accessing underlying data. Compliance is confirmed cryptographically in seconds.',
  },
  {
    icon: Network,
    step: '04',
    title: 'Deliver with Trust',
    description:
      'End distributors and retailers receive shipments with a complete, verifiable chain-of-custody. Consumers can scan QR to verify authenticity.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 border-y border-slate-800/60 bg-slate-900/30">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From Factory to Destination,
            <br />
            <span className="text-emerald-400">Every Step Cryptographically Proven</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-emerald-500/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-2xl border border-slate-700 bg-slate-900 mb-5">
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/5" />
                <step.icon className="relative h-7 w-7 text-cyan-400" strokeWidth={1.8} />
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{step.step}</span>
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
