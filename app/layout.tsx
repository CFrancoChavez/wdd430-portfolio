import type { Metadata } from 'next';
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: {
    default: 'Cesar Franco Chavez | Project Portfolio',
    template: '%s | Cesar Franco Chavez',
  },
  description:
    'A full-stack web development portfolio built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.',
  metadataBase: new URL('https://wdd430-portfolio-eta-sand.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <SessionProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}