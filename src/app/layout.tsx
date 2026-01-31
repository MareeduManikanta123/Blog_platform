import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'My Blog | High-Performance Next.js Blog',
  description: 'A high-performance, SEO-optimized blog platform built with Next.js and MDX',
  openGraph: {
    title: 'My Blog',
    description: 'A high-performance, SEO-optimized blog platform',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-800 mt-12 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 My Blog. Built with Next.js, MDX, and Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
