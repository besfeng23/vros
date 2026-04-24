
import { PaymentAdapter, CheckoutSession, PaymentIntent, RefundRequest } from '../types';

/**
 * Placeholder Adapter for SpeedyPay / eMango Integration.
 * TODO: Replace with actual SDK calls and merchant credentials.
 */
export class SpeedyPayEMangoAdapter implements PaymentAdapter {
  async createCheckoutSession(params: {
    amount: number;
    currency: string;
    successUrl: string;
    cancelUrl: string;
    metadata: Record<string, any>;
  }): Promise<CheckoutSession> {
    // Simulated checkout session creation
    console.log('SpeedyPay: Creating checkout session', params);
    
    return {
      id: `cs_speedy_${Math.random().toString(36).substr(2, 9)}`,
      amount: params.amount,
      currency: params.currency,
      status: 'open',
      successUrl: params.successUrl,
      cancelUrl: params.cancelUrl,
      metadata: params.metadata,
    };
  }

  async retrievePaymentIntent(id: string): Promise<PaymentIntent> {
    // Simulated payment intent retrieval
    return {
      id,
      amount: 500000, // 5000.00
      currency: 'PHP',
      status: 'succeeded',
      metadata: {},
      providerId: 'speedypay'
    };
  }

  async createRefund(request: RefundRequest): Promise<{ status: string; refundId: string }> {
    // Simulated refund call
    console.log('eMango: Processing refund', request);
    return {
      status: 'succeeded',
      refundId: `ref_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    // TODO: Implement actual HMAC verification with webhook secret
    return true;
  }
}
