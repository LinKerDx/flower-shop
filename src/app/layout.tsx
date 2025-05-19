import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/sections/Footer";
import Header from "@/app/sections/Header";
import ShoppingCart from "./components/ShoppingCart";
import { CartProvider } from "./context/cart";
import { Toaster } from "sonner";


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

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Header />
        <CartProvider>
          <main className="flex flex-col gap-4">
            <ShoppingCart />
            {children}
          </main>
        </CartProvider>

        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
