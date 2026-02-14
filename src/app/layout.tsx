import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PayrollPro - Enterprise Attendance & Payroll Management",
    template: "%s | PayrollPro"
  },
  description: "Intelligent Multi-Branch Employee Attendance and Payroll Management System. Manage employees, track attendance, and process payroll across multiple branches in Algeria.",
  keywords: ["Payroll", "Attendance", "HR", "Employee Management", "Algeria", "Enterprise", "Dashboard", "Biometric"],
  authors: [{ name: "Ilyes Aia" }],
  creator: "Ilyes Aia",
  publisher: "PayrollPro",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
    shortcut: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
    apple: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://payrollpro.dz",
    siteName: "PayrollPro",
    title: "PayrollPro - Enterprise HR Suite",
    description: "Multi-Branch Employee Attendance and Payroll Management System for enterprises in Algeria",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PayrollPro Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PayrollPro - Enterprise HR Suite",
    description: "Multi-Branch Employee Attendance and Payroll Management System",
    images: ["/og-image.png"],
  },
  applicationName: "PayrollPro",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className="dark" 
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('payroll-theme') || 'dark';
                  var resolved = theme === 'system' 
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : theme;
                  document.documentElement.classList.add(resolved);
                  document.documentElement.style.colorScheme = resolved;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {/* Accessibility: Skip to main content link is handled in page.tsx */}
        
        {children}
        
        {/* Toast notifications */}
        <Toaster />
        
        {/* Portal for modals and dropdowns */}
        <div id="portal-root" />
      </body>
    </html>
  );
}
