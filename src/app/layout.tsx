import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-client-provider";
import AuthLayout from "@/providers/auth-layout";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import TokenRefreshProvider from "@/providers/token-refresh-provider";

export const metadata: Metadata = {
  title: "Jebbs Deli Admin",
  description: "Admin Dashboard for Jebbs Deli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${GeistSans.className} antialiased text-primary`}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <AuthLayout>
              <Toaster />
              <ModalProvider />
              <TokenRefreshProvider>
                {children}
              </TokenRefreshProvider>
            </AuthLayout>
            {/* {children} */}
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
