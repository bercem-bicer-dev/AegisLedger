import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell';
import { ProofDetailView } from '@/components/proofs/proof-detail-view';
import { zkProofs, shipments } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const proof = zkProofs.find((p) => p.id === params.id);
  if (!proof) return { title: 'Proof Not Found | AegisLedger' };
  return {
    title: `${proof.circuit.name} | AegisLedger`,
    description: `ZK proof verification details for ${proof.circuit.name}.`,
  };
}

export default function ProofDetailPage({ params }: { params: { id: string } }) {
  const proof = zkProofs.find((p) => p.id === params.id);
  if (!proof) notFound();
  const shipment = shipments.find((s) => s.id === proof.shipmentId);

  return (
    <AppShell>
      <ProofDetailView proof={proof} shipment={shipment} />
    </AppShell>
  );
}
