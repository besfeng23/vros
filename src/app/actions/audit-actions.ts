'use server';

import { logger } from '@/lib/monitoring/logger';
import { headers } from 'next/headers';

/**
 * Records an administrative action to the audit log.
 * This is a server-only action to prevent client-side tampering.
 */
export async function recordAuditAction(params: {
  action: string;
  entityType: string;
  entityId: string;
  staffId: string;
  details?: any;
}) {
  const headerList = await headers();
  const userAgent = headerList.get('user-agent');
  const ip = headerList.get('x-forwarded-for') || 'unknown';

  // Log to GCP Cloud Logging
  logger.info(`Audit Log: ${params.action}`, {
    ...params,
    metadata: {
      userAgent,
      ip,
      environment: process.env.NODE_ENV,
    }
  });

  // TODO: Persist to Firestore /auditLogs collection for internal dashboard visibility
  // This would use the firebase-admin SDK or a secured firestore write from a service account
}
