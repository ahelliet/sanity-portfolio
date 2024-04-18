import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../styles/globals.css";

import { cn } from "@/lib/utils"
import { ThemeProvider } from 'next-themes'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ThemeProvider attribute='data-theme' enableColorScheme={true} >{children}</ThemeProvider>
      </body>
    </html >
  );
}
