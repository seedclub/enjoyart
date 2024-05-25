import type { Metadata } from 'next';
import './globals.css';
import Privy from '@/components/privy';
import { Toaster } from 'react-hot-toast';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Enjoy',
  description: 'The community coin of Zora',
};

const arial = localFont({
  src: [
    {
      path: '../public/fonts/arialnarrow.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-arial',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={arial.variable}>
        <div className="relative h-screen w-screen overflow-x-hidden overflow-y-scroll flex-col flex font-arial">
          <Toaster />
          <Privy>{children}</Privy>
        </div>
      </body>
    </html>
  );
}
