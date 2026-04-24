# Ortiz Clinic Production Deployment Guide

## Platform Overview
- **Frontend**: Next.js 15 (App Router)
- **Hosting**: Firebase App Hosting (Cloud Run + Cloud Build)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **AI**: Google Genkit (Gemini 2.5 Flash)
- **Payments**: SpeedyPay / eMango Integration Layer

## GCP Infrastructure
### 1. Secret Manager
Store sensitive credentials here:
- `GEMINI_API_KEY`
- `SPEEDYPAY_MERCHANT_SECRET`
- `EMANGO_WEBHOOK_KEY`

### 2. Cloud Logging & Monitoring
All logs from `src/lib/monitoring/logger.ts` are automatically aggregated in GCP Cloud Logging. 
- Create **Log-based Metrics** for error spikes.
- Set up **Uptime Checks** for `https://ortizskin.com/api/health`.

### 3. Cloud Tasks (Future)
Use for:
- Automated appointment reminders (SMS/Email).
- Post-session follow-ups.

### 4. BigQuery (Future)
Stream `auditLogs` to BigQuery for national-level business intelligence and trend analysis.

## Deployment Checklists

### Launch Checklist
- [ ] Verify `NEXT_PUBLIC_BASE_URL` in `apphosting.yaml`.
- [ ] Connect production custom domain in Firebase Console.
- [ ] Verify SSL certificate propagation.
- [ ] Enable Firestore PITR (Point-in-Time Recovery).
- [ ] Set up Firebase Security Rules in production mode.

### Post-Launch Monitoring
- [ ] Check Vercel/Lighthouse scores (target 90+).
- [ ] Monitor SpeedyPay success rates in Finance Dashboard.
- [ ] Review AI inquiry summaries for accuracy.
- [ ] Audit staff login activity.

## Contact
HQ Operations Tech Team: `tech-ops@ortizskin.com`
