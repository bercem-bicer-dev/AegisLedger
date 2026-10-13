'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileCheck,
  Thermometer,
  Boxes,
  Network,
  QrCode,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'ZK Proof Verification',
    description:
      'Cryptographically prove compliance with temperature, handling, and origin requirements without revealing underlying sensor data or trade secrets.',
    color: 'cyan',
  },
  {
    icon: Lock,
    title: 'Privacy-Preserving Audits',
    description:
      'Customs authorities and auditors verify chain-of-custody integrity through zero-knowledge proofs. No proprietary data leaves your organization.',
    color: 'emerald',
  },
  {
    icon: FileCheck,
    title: 'On-Chain Compliance Records',
    description:
      'Every proof submission, verification, and status change is permanently recorded on Ethereum. Immutable, transparent, and independently auditable.',
    color: 'cyan',
  },
  {
    icon: Thermometer,
    title: 'Cold Chain Integrity',
    description:
      'Range proofs guarantee that temperature-sensitive cargo stayed within required bounds across the entire journey — without exposing individual readings.',
    color: 'emerald',
  },
  {
    icon: Boxes,
    title: 'Multi-Party Custody Tracking',
    description:
      'Manufacturers, carriers, customs, and distributors each submit proof commitments. The network aggregates them into a single verifiable chain.',
    color: 'cyan',
  },
  {
    icon: Network,
    title: 'Decentralized Oracle Network',
    description:
      'IoT sensor data is fed through a decentralized oracle layer, ensuring tamper-resistant inputs for ZK circuit execution and proof generation.',
    color: 'emerald',
  },
  {
    icon: QrCode,
    title: 'Instant Proof QR Verification',
    description:
      'Generate QR codes linked to on-chain proof verifications. End consumers and regulators can verify authenticity with a single scan.',
    color: 'cyan',
  },
  {
    icon: EyeOff,
    title: 'Selective Disclosure',
    description:
      'Choose exactly which attributes to reveal. Prove a product meets ISO standards without disclosing manufacturing details or supplier identities.',
    color: 'emerald',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6">
            <span className="text-xs font-mono text-emerald-300 tracking-wider uppercase">
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Cryptographic Trust for Every Link
            <br />
            <span className="text-cyan-400">in Your Supply Chain</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            From manufacturer to end consumer, AegisLedger provides the infrastructure to prove
            compliance at every stage — without compromising confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`inline-flex items-center justify-center h-12 w-12 rounded-lg mb-4 ${
                  feature.color === 'cyan'
                    ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20'
                } transition-colors`}
              >
                <feature.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
