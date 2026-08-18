import type { Metadata } from 'next';
import './globals.css';
import { HoekdexProvider } from '@/context/hoekdex-context';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'HOEKDEX - Private, Gamified Dating & Relationship Journal',
  description: 'Track connections, log milestone moments, level up relationship mastery, and celebrate trophies with end-to-end privacy.',
  openGraph: {
    title: 'HOEKDEX - Relationship Mastery Journal',
    description: 'Private, gamified relationship tracking with XP, tiers, and trophies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOEKDEX',
    description: 'Private, gamified dating and relationship journal.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF5EF] text-[#1C1917] antialiased selection:bg-rose-500 selection:text-white" suppressHydrationWarning>
        <HoekdexProvider>
          <AppShell>{children}</AppShell>
        </HoekdexProvider>
      </body>
    </html>
  );
}
