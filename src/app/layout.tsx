import { Agbalumo, Kodchasan, Sriracha, Unbounded } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/contexts/CartContext";

const agbalumo = Agbalumo({
  variable: "--font-agbalumo",
  subsets: ["latin"],
  weight: ["400"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const kodchasan = Kodchasan({
  variable: "--font-kodchasan",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const sriracha = Sriracha({
  variable: "--font-sriracha",
  subsets: ["latin"],
  weight: ["400"],
});

const fontStyles = `${sriracha.variable} ${kodchasan.variable} ${agbalumo.variable} ${unbounded.variable} ${kodchasan.className} text-dark`;

export const metadata: Metadata = {
  title: "Pastel - Vista Park",
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
        <body className={`${fontStyles}`}>
          <h1 className="sr-only">VistaPark Pasteis</h1>
          {children}
        </body>
      </CartProvider>
    </html>
  );
}
