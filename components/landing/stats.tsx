'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '2.4M+', label: 'Shipments Verified', sublabel: 'Across 60+ countries' },
  { value: '18.7K', label: 'ZK Proofs Generated', sublabel: 'On-chain verifiable' },
  { value: '$4.8B', label: 'Cargo Value Tracked', sublabel: 'Real-time monitoring' },
  { value: '99.98%', label: 'Proof Accuracy', sublabel: 'Cryptographically guaranteed' },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-slate-800/60 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-cyan-400">{stat.label}</div>
              <div className="mt-1 text-xs text-slate-500">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
