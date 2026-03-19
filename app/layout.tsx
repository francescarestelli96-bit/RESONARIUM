import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'RESONARIUM',
  description:
    'RESONARIUM è un’associazione culturale con sede a Milano, dedicata a musica, formazione, ricerca e progettazione interdisciplinare.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={playfair.variable}>{children}</body>
    </html>
  );
}