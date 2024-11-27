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
import { apiService } from "@/services/axios.service";
import { getCookies } from "@/services/cookies.service";

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

  const isAuthPage = pathname.startsWith("/private/rbac/login") || pathname.startsWith("/private/rbac/register") || pathname.startsWith("/private/rbac/forgot-password") || pathname.startsWith("/private/rbac/reset-password");
  return (
    <html lang="en">
      <body
        className={`relative ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          { isAuthPage ? <Provider store={store}>{children}</Provider>  : <Provider store={store}>
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
          </Provider>}
        </ToastProvider>
      </body>
    </html>
  );
}

