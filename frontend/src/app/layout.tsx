import type { Metadata } from "next";
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
  title: "PayrollPro - Enterprise Attendance & Payroll Management",
  description: "Intelligent Multi-Branch Employee Attendance and Payroll Management System. Manage employees, track attendance, and process payroll across multiple branches in Algeria.",
  keywords: ["Payroll", "Attendance", "HR", "Employee Management", "Algeria", "Enterprise"],
  authors: [{ name: "Ilyes Aia" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "PayrollPro - Enterprise HR Suite",
    description: "Multi-Branch Employee Attendance and Payroll Management System",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
