import type {Metadata, Viewport} from 'next';
import './globals.css';
import { CookieConsent } from '@/components/site/CookieConsent';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: {
    default: 'Harmony OS | Premium Operations Platform',
    template: '%s | Harmony OS'
  },
  description: 'Enterprise-grade operations platform for premium business management. Sleek, secure, and highly functional.',
  keywords: ['Harmony OS', 'operations platform', 'executive management', 'premium business tool'],
  authors: [{ name: 'Harmony OS' }],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://harmony-os.app',
    siteName: 'Harmony OS',
    images: [
      {
        url: 'https://picsum.photos/seed/harmonyog/1200/630',
        width: 1200,
        height: 630,
        alt: 'Harmony OS Premium Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmony OS | Premium Operations Platform',
    description: 'The executive choice for modern business management.',
    images: ['https://picsum.photos/seed/harmonyog/1200/630'],
  },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/20">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
