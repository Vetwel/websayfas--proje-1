import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { getClerkPublishableKey, isClerkConfigured } from "@/lib/internal-config";
import "./globals.css";

export const metadata: Metadata = {
  title: "VetWel Ekip Asistanı",
  description: "VetWel şirket içi ürün eğitimi ve satış destek platformu.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function Document({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!isClerkConfigured()) {
    return <Document>{children}</Document>;
  }

  return (
    <ClerkProvider publishableKey={getClerkPublishableKey()}>
      <Document>{children}</Document>
    </ClerkProvider>
  );
}
