/**
 * Production-grade logging abstraction for Ortiz Clinic.
 * Prepared for GCP Cloud Logging integration.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  userId?: string;
  requestId?: string;
  path?: string;
  [key: string]: any;
}

class ProductionLogger {
  private isProduction = process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, context?: LogContext) {
    const payload = {
      severity: level.toUpperCase(),
      message,
      timestamp: new Date().toISOString(),
      ...context,
      service: 'ortiz-clinic-web',
    };

    if (this.isProduction) {
      // In production, we log JSON strings which GCP Cloud Logging parses automatically
      console.log(JSON.stringify(payload));
    } else {
      // In development, we use standard console for readability
      const color = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[32m';
      console.log(`${color}[${level.toUpperCase()}]\x1b[0m ${message}`, context || '');
    }
  }

  info(message: string, context?: LogContext) { this.log('info', message, context); }
  warn(message: string, context?: LogContext) { this.log('warn', message, context); }
  error(message: string, context?: LogContext) { this.log('error', message, context); }
  debug(message: string, context?: LogContext) { 
    if (!this.isProduction) this.log('debug', message, context); 
  }
}

export const logger = new ProductionLogger();
