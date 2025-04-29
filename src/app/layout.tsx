import { Sriracha } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/contexts/CartContext";

const sriracha = Sriracha({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Vista Park | Pastéis",
  description: "Pastelaria no condomínio residencial Vista Park",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={`${sriracha.className} text-dark`}>
          <h1 className="sr-only">VistaPark Pasteis</h1>
          {children}
        </body>
      </CartProvider>
    </html>
  );
}
