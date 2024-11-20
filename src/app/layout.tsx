"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import "./globals.css";
import { BreakingContent } from "@/components/breakings/Breaking";
import { MainHeader } from "@/components/headers/MainHeader";
import MainFooter from "@/components/footers/MainFooter";
import { Provider } from "react-redux";
import store from "@/common-component/redux-config/store";
import { ToastProvider } from "@/common-component/custom-toast/ToastContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/private/rbac/admin-panel/");

  return (
    <html lang="en">
      <body
        className={`relative ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <Provider store={store}>
            {isAdminPath ? (
              // Render only children for admin paths
              children
            ) : (
              // Render the full layout for non-admin paths
              <>
                <BreakingContent />
                <MainHeader />
                {children}
                <MainFooter />
              </>
            )}
          </Provider>
        </ToastProvider>
      </body>
    </html>
  );
}
