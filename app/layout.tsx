import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth/context';

export const metadata: Metadata = {
  title: 'APEX Concierge - Ultra-Luxury Mobility & Concierge',
  description: 'Discreet, premium mobility and white-glove concierge services for discerning clientele.',
  keywords: ['luxury transportation', 'concierge services', 'private chauffeur', 'VIP service'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
