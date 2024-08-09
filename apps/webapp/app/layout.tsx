import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GeistSans } from "geist/font/sans";
import Providers from '@/components/Providers';

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Split sage",
  description: "Split expenses between groups easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
