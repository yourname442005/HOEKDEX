import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-[#fe1e34] hover:bg-[#e0182d] text-white font-extrabold text-sm rounded-full py-2.5 transition-all shadow-md shadow-[#fe1e34]/20',
          card: 'bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] rounded-3xl shadow-xl',
          headerTitle: 'text-[#1C1917] dark:text-[#FCFCFC] font-black',
          headerSubtitle: 'text-stone-500 dark:text-[#B5B2B2]',
          socialButtonsBlockButton:
            'bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC] hover:bg-stone-200 dark:hover:bg-[#393939]',
          formFieldInput:
            'bg-[#F5EFE6] dark:bg-[#262525] border border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC] rounded-xl focus:border-[#fe1e34]',
          formFieldLabel: 'text-stone-700 dark:text-[#D4D2D2] font-bold text-xs uppercase',
          footerActionLink: 'text-[#fe1e34] font-bold hover:underline',
          userButtonPopoverCard: 'bg-[#FFFDF9] dark:bg-[#171617] border border-[#E7E0D8] dark:border-[#393939] text-[#1C1917] dark:text-[#FCFCFC]',
        },
      }}
    >
      <html lang="en">
        <body className="bg-[#FAF5EF] text-[#1C1917] antialiased selection:bg-rose-500 selection:text-white" suppressHydrationWarning>
          <HoekdexProvider>
            <AppShell>{children}</AppShell>
          </HoekdexProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
