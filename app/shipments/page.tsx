import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell';
import { ShipmentsView } from '@/components/shipments/shipments-view';

export const metadata: Metadata = {
  title: 'Shipments | AegisLedger',
  description: 'Track and manage all supply chain shipments with ZK proof verification.',
};

export default function ShipmentsPage() {
  return (
    <AppShell>
      <ShipmentsView />
    </AppShell>
  );
}
