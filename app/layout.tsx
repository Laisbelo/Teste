import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

interface RootLayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: "Teste",
  description: "",
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
