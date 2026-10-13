import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell';
import { ProofsView } from '@/components/proofs/proofs-view';

export const metadata: Metadata = {
  title: 'ZK Proofs | AegisLedger',
  description: 'Zero-knowledge proof verification for supply chain compliance.',
};

export default function ProofsPage() {
  return (
    <AppShell>
      <ProofsView />
    </AppShell>
  );
}
