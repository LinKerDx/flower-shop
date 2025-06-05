import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/sections/Footer";
import Header from "@/app/sections/Header";
import ShoppingCart from "./components/ShoppingCart";
import { CartProvider } from "./context/cart";
import { Toaster } from "sonner";
import { unstable_ViewTransition as ViewTransition } from 'react'
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pétalo y Verso",
  description: "una florería donde cada arreglo cuenta una historia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/PetaloyVerso.webp" />
        <meta
          name="twitter:site:domain"
          content="https://flower-shop-ivory-one.vercel.app/"
        />
        <meta
          property="twitter:title"
          content="Pétalo y Verso - Tienda Virtual"
        />
        <meta
          property="twitter:description"
          content="Omar es un Desarrollador autodidacta que desarrolla sitios desde cero."
        />
        <meta name="twitter:url" content="https://flower-shop-ivory-one.vercel.app/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics/>
        <Header />
        <ViewTransition>
          <CartProvider>
            <main className="flex flex-col gap-4">
              <ShoppingCart />
              {children}
            </main>
          </CartProvider>
        </ViewTransition>
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
