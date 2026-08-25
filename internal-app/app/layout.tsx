import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="tr">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
