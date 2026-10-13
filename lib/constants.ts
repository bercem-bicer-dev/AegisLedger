import {
  ShieldCheck,
  Lock,
  FileCheck,
  Truck,
  Boxes,
  Network,
  QrCode,
  Thermometer,
  Eye,
  EyeOff,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Network },
  { label: 'Shipments', href: '/shipments', icon: Boxes },
  { label: 'ZK Proofs', href: '/proofs', icon: ShieldCheck },
  { label: 'Transactions', href: '/transactions', icon: FileCheck },
];

export const featureIcons = {
  ShieldCheck,
  Lock,
  FileCheck,
  Truck,
  Boxes,
  Network,
  QrCode,
  Thermometer,
  Eye,
  EyeOff,
};

export const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  in_transit: { label: 'In Transit', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  customs: { label: 'Customs', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  delivered: { label: 'Delivered', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  verified: { label: 'Verified', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  flagged: { label: 'Flagged', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  confirmed: { label: 'Confirmed', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  generating: { label: 'Generating', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
};

export const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: 'Low', color: 'text-slate-400' },
  medium: { label: 'Medium', color: 'text-yellow-400' },
  high: { label: 'High', color: 'text-orange-400' },
  critical: { label: 'Critical', color: 'text-red-400' },
};

export function truncateHash(hash: string, chars: number = 8): string {
  if (!hash || hash.length <= chars * 2 + 2) return hash;
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins > 0) return `${diffMins}m ago`;
  return 'just now';
}
