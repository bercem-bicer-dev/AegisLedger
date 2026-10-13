export type ShipmentStatus =
  | 'pending'
  | 'in_transit'
  | 'customs'
  | 'delivered'
  | 'verified'
  | 'flagged';

export type ProofStatus = 'generating' | 'verified' | 'failed' | 'pending';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Party {
  id: string;
  name: string;
  role: 'manufacturer' | 'supplier' | 'carrier' | 'customs' | 'distributor' | 'retailer';
  walletAddress: string;
  location: string;
  verified: boolean;
}

export interface ShipmentEvent {
  id: string;
  timestamp: string;
  eventType: 'created' | 'departed' | 'arrived' | 'customs_cleared' | 'verified' | 'flagged' | 'delivered';
  location: string;
  actor: string;
  txHash?: string;
  description: string;
}

export interface Shipment {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  priority: Priority;
  productName: string;
  productCategory: string;
  quantity: number;
  weight: number;
  value: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  parties: Party[];
  events: ShipmentEvent[];
  currentLocation: string;
  zkProofId?: string;
  temperatureSensitive: boolean;
  fragile: boolean;
  blockchainHash?: string;
  contractAddress?: string;
}

export interface ZkProofCircuit {
  name: string;
  constraints: number;
  publicInputs: string[];
  privateInputs: string[];
}

export interface ZkProofData {
  id: string;
  proofHash: string;
  shipmentId: string;
  circuit: ZkProofCircuit;
  status: ProofStatus;
  publicInputs: Record<string, string>;
  privateInputHashes: Record<string, string>;
  proof: {
    a: [string, string];
    b: [[string, string], [string, string]];
    c: [string, string];
  };
  verifierAddress: string;
  generatedAt: string;
  verifiedAt?: string;
  verifiedBy: string;
  blockNumber?: number;
  gasUsed?: string;
  nullifier: string;
  description: string;
}

export type TransactionStatus =
  | 'pending'
  | 'confirmed'
  | 'failed'
  | 'reverted';

export type TransactionType =
  | 'shipment_create'
  | 'shipment_update'
  | 'proof_submit'
  | 'proof_verify'
  | 'transfer_ownership'
  | 'customs_declare'
  | 'payment_escrow'
  | 'role_grant';

export interface TransactionLog {
  address: string;
  topics: string[];
  data: string;
  eventName: string;
  decoded?: Record<string, string>;
}

export interface TransactionState {
  hash: string;
  type: TransactionType;
  status: TransactionStatus;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed?: string;
  blockNumber?: number;
  confirmations: number;
  nonce: number;
  timestamp: string;
  shipmentId?: string;
  contractAddress: string;
  logs: TransactionLog[];
  errorMessage?: string;
}

export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  verifiedProofs: number;
  pendingProofs: number;
  totalValue: number;
  flaggedCount: number;
  averageVerificationTime: number;
  blockchainTransactions: number;
}

export interface NetworkNode {
  id: string;
  address: string;
  role: string;
  status: 'online' | 'offline' | 'syncing';
  lastSeen: string;
  region: string;
}
