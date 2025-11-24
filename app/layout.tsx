import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: '回声思维 EchoMind',
  description: '在 AI 与声音的边界，捕捉思想的回声',
  openGraph: {
    title: '回声思维 EchoMind',
    description: '在 AI 与声音的边界，捕捉思想的回声',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
