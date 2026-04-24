
import { PaymentAdapter, RefundRequest, CheckoutSession } from './types';
import { SpeedyPayEMangoAdapter } from './adapters/speedypay-emango';

/**
 * Centralized Payment Orchestrator for Ortiz Clinic.
 * Decouples the UI from specific provider logic.
 */
class PaymentOrchestrator {
  private adapter: PaymentAdapter;

  constructor() {
    // Defaulting to SpeedyPay/eMango adapter model
    this.adapter = new SpeedyPayEMangoAdapter();
  }

  async createAppointmentDeposit(params: {
    userId: string;
    branchId: string;
    amount: number;
    appointmentId: string;
  }): Promise<CheckoutSession> {
    return this.adapter.createCheckoutSession({
      amount: params.amount,
      currency: 'PHP',
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/status?status=success&type=appointment`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/status?status=cancelled&type=appointment`,
      metadata: {
        type: 'appointment_deposit',
        userId: params.userId,
        branchId: params.branchId,
        appointmentId: params.appointmentId,
      }
    });
  }

  async purchasePackage(params: {
    userId: string;
    promoId: string;
    amount: number;
  }): Promise<CheckoutSession> {
    return this.adapter.createCheckoutSession({
      amount: params.amount,
      currency: 'PHP',
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/status?status=success&type=package`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/status?status=cancelled&type=package`,
      metadata: {
        type: 'package_purchase',
        userId: params.userId,
        promoId: params.promoId,
      }
    });
  }

  async requestRefund(request: RefundRequest) {
    // Audit log should be created before calling provider
    console.log('Audit: Initiating refund request', request);
    return this.adapter.createRefund(request);
  }
}

export const orchestrator = new PaymentOrchestrator();
