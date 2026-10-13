import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell';
import { ShipmentDetailView } from '@/components/shipments/shipment-detail-view';
import { shipments } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const shipment = shipments.find((s) => s.id === params.id);
  if (!shipment) return { title: 'Shipment Not Found | AegisLedger' };
  return {
    title: `${shipment.trackingId} | AegisLedger`,
    description: `Shipment details for ${shipment.productName} from ${shipment.origin} to ${shipment.destination}.`,
  };
}

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const shipment = shipments.find((s) => s.id === params.id);
  if (!shipment) notFound();

  return (
    <AppShell>
      <ShipmentDetailView shipment={shipment} />
    </AppShell>
  );
}
