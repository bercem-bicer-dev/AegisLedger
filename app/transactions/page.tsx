import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell';
import { TransactionsView } from '@/components/transactions/transactions-view';

export const metadata: Metadata = {
  title: 'Transactions | AegisLedger',
  description: 'On-chain blockchain transaction history for supply chain operations.',
};

export default function TransactionsPage() {
  return (
    <AppShell>
      <TransactionsView />
    </AppShell>
  );
}
