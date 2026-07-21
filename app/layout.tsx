import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';
import dynamic from 'next/dynamic';

const DynamicThreadLoader = dynamic(
  () => import('@/components/three/ThreadLoader').then((mod) => mod.ThreadLoader),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'WeaveHeritage Lux — Handwoven Indian Heritage Atelier',
  description:
    'Ultra-luxury digital atelier connecting master Indian weavers directly with global connoisseurs through GI-tagged authenticity passports and transparent direct-to-artisan pricing.',
  openGraph: {
    title: 'WeaveHeritage Lux — Handwoven Heritage Atelier',
    description:
      'Curated handloom silk brocades, Muga weaves, and Kanjeevaram sarees direct from master Indian looms.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-ivory)] text-[var(--color-charcoal)] font-sans antialiased min-h-screen flex flex-col selection:bg-[var(--color-gold)] selection:text-[var(--color-wine)]">
        <DynamicThreadLoader />
        <Navbar />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
