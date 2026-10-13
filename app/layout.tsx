import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'AegisLedger | ZKP Supply Chain Verification',
  description:
    'Zero-Knowledge Proof based supply chain and financial verification network. Secure, transparent, and privacy-preserving B2B logistics on the blockchain.',
  keywords: [
    'ZKP',
    'supply chain',
    'blockchain',
    'zero-knowledge proof',
    'verification',
    'Web3',
    'B2B SaaS',
    'AegisLedger',
  ],
  openGraph: {
    title: 'AegisLedger | ZKP Supply Chain Verification',
    description:
      'Zero-Knowledge Proof based supply chain and financial verification network for enterprise logistics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AegisLedger | ZKP Supply Chain Verification',
    description:
      'Zero-Knowledge Proof based supply chain and financial verification network for enterprise logistics.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
