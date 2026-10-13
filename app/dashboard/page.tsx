import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell';
import { DashboardView } from '@/components/dashboard/dashboard-view';

export const metadata: Metadata = {
  title: 'Dashboard | AegisLedger',
  description: 'Real-time overview of shipments, ZK proofs, and blockchain transactions.',
};

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardView />
    </AppShell>
  );
}
