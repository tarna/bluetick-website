import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "../styles/globals.css";
import React from "react"; // Ensure React is imported for JSX to work
import { ThemeProvider } from "../context/ThemeProvider";
import { cn } from "../lib/utils";
import { Toaster } from "sonner";
import NextAuthProvider from "@/context/next-auth";
import { QueryProvider } from "@/context/query";
import BluetickHeader from "@/components/bluetick/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BluetickProvider } from "@/context/bluetick-context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bluetick",
  description: "All in one discord bot",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component that wraps the entire application.
 *
 * This component sets up the page's HTML structure and applies global styles,
 * including the font family defined through the `Inter` font.
 * @param {{ children: React.ReactNode }} props The properties passed to the component.
 * @param {React.ReactNode} props.children The child components to be rendered within this layout.
 * @returns The root layout structure as a JSX element.
 */
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <BluetickProvider>
              <QueryProvider>
                <Analytics />
                <SpeedInsights />
                <BluetickHeader />
                <main className="flex min-h-screen flex-col">{children}</main>
                <Toaster
                  toastOptions={{
                    duration: 3000,
                    classNames: {
                      title: "text-sm font-bold",
                      description: "text-xs",
                      toast: cn("border-0"),
                      success: cn("bg-success text-success-foreground"),
                      error: cn("bg-error text-error-foreground"),
                      warning: cn("bg-warning text-warning-foreground"),
                      info: cn("bg-info text-info-foreground"),
                    },
                  }}
                />
                <Footer />
              </QueryProvider>
            </BluetickProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
