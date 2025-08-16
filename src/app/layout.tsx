import type { Metadata } from 'next';
import './globals.css';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'oto.do AI Automation Platform',
  description: 'Put automations & agents to work for important stuff in your life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background">
        <AuthProvider>
          <Toaster />
          {children}
          <ShadcnToaster />
        </AuthProvider>
      </body>
    </html>
  );
}
