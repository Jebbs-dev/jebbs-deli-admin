import {
  Link,
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "./globals.css?url";

import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-client-provider";
import AuthLayout from "@/providers/auth-layout";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import TokenRefreshProvider from "@/providers/token-refresh-provider";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Jebbs Deli Admin" },
      {
        name: "description",
        content: "Admin Dashboard for Jebbs Deli",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-sm text-muted-foreground">404 · Not found</p>
      <h1 className="text-2xl font-semibold">This page isn&apos;t available.</h1>
      <Link to="/" className="text-primary underline">
        Back to dashboard
      </Link>
    </main>
  );
}

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased text-primary" suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthLayout>
              <Toaster />
              <ModalProvider />
              <TokenRefreshProvider>
                <Outlet />
              </TokenRefreshProvider>
            </AuthLayout>
          </ThemeProvider>
        </QueryProvider>
        <Scripts />
      </body>
    </html>
  );
}
