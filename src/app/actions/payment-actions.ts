
'use server';

import { orchestrator } from '@/lib/payments/orchestrator';
import { redirect } from 'next/navigation';

export async function startAppointmentCheckout(formData: FormData) {
  const amount = Number(formData.get('amount'));
  const appointmentId = formData.get('appointmentId') as string;
  const branchId = formData.get('branchId') as string;
  const userId = formData.get('userId') as string;

  try {
    const session = await orchestrator.createAppointmentDeposit({
      userId,
      branchId,
      amount,
      appointmentId
    });

    // In a real implementation, you'd redirect to the provider's checkout page
    // For this prototype, we redirect to a simulated checkout UI
    redirect(`/checkout/${session.id}`);
  } catch (error) {
    console.error('Checkout failed', error);
    redirect('/checkout/failed');
  }
}

export async function startPackageCheckout(formData: FormData) {
  const amount = Number(formData.get('amount'));
  const promoId = formData.get('promoId') as string;
  const userId = formData.get('userId') as string;

  try {
    const session = await orchestrator.purchasePackage({
      userId,
      promoId,
      amount
    });
    redirect(`/checkout/${session.id}`);
  } catch (error) {
    console.error('Package purchase failed', error);
    redirect('/checkout/failed');
  }
}
