import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/app/trpc/client";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetBrainsMono",
});

export const metadata: Metadata = {
  title: "Perfect Interview",
  description: "Perfect Interview is a platform for perfect interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${jetBrainsMono.className} antialiased`}>
          {children}
        </body>
      </html>
    </TRPCReactProvider>
  );
}
