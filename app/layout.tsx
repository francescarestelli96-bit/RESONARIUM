import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
