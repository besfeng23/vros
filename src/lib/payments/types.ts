
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded' | 'partially_refunded';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  metadata: Record<string, any>;
  providerId: string;
  clientSecret?: string;
}

export interface CheckoutSession {
  id: string;
  amount: number;
  currency: string;
  status: 'open' | 'expired' | 'complete';
  paymentIntentId?: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata: Record<string, any>;
}

export interface RefundRequest {
  paymentId: string;
  amount: number;
  reason: string;
  metadata?: Record<string, any>;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  provider: 'speedypay' | 'emango';
  createdAt: string;
}

export interface BranchSettlement {
  id: string;
  branchId: string;
  periodStart: string;
  periodEnd: string;
  totalGross: number;
  totalNet: number;
  fees: number;
  status: 'pending' | 'processed' | 'transferred';
}

export interface PaymentAdapter {
  createCheckoutSession(params: {
    amount: number;
    currency: string;
    successUrl: string;
    cancelUrl: string;
    metadata: Record<string, any>;
  }): Promise<CheckoutSession>;
  
  retrievePaymentIntent(id: string): Promise<PaymentIntent>;
  
  createRefund(request: RefundRequest): Promise<{ status: string; refundId: string }>;
  
  verifyWebhookSignature(payload: string, signature: string): boolean;
}
