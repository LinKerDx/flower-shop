'use client'
import Hero from "@/app/sections/Hero";
import Productos from "./sections/CategoríaProductos";
import Carrucel from "./components/Carrucel";
import { FiltroProvider } from "./context/filtro";
import { ProductosListados } from "@/app/sections/ProductosListados";
import PreguntasFrecuentes from "./sections/PreguntasFrecuentes";
import { useRef } from "react";

export default function Home() {
  const productosRef = useRef<HTMLElement | null>(null);

  const scrollToProductos = () => {
    if (productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('productosRef no está disponible');
    }
  };

  return (
    <FiltroProvider>
      <Hero onScrollToProductos={scrollToProductos} />
      <Productos />
      <Carrucel />
      <ProductosListados ref={productosRef} />
      <PreguntasFrecuentes />
    </FiltroProvider>
  );
}




