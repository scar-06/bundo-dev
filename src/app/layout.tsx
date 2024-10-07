import type { Metadata, Viewport } from "next";
import { QueryClientProviderWrapper } from "@/providers/ReactQueryProvider";
import ThemeProvider from "@/providers/theme-provider";

import "./globals.css";

import useScrollToTop from "@/hooks/useScrollToTop";
import CartSyncer from "@/components/ui/cartItems/cartSyncer";
import tv2SansDisplay, { lato } from "@/styles/fonts";

import NotificationContainer from "./(root)/_components/notifications/notificationContainer";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bundo.app/"),
  title: { default: "Bundo App", template: `%s | Bundo App` },
  description:
    "Bundo is a retail & ecommerce technology company simplifying retail by bridging the  gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources.",
  keywords:
    "digital marketplace, buy, sell, discover vendors, simplified retail, Bundo, vendor",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollToTop;

  return (
    <html lang="en">
      <body className={`  ${tv2SansDisplay.variable} ${lato.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryClientProviderWrapper>
            <CartSyncer />
            <div id="bundo-app-portal" />
            {children}

            <NotificationContainer />
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
