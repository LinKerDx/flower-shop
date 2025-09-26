'use client'
import Hero from "@/app/sections/Hero";
import CategoriaProductos from "./sections/CategoríaProductos";
import Carrucel from "./components/Carrucel";
import { FiltroProvider } from "./context/filtro";
import { ProductosListados } from "@/app/sections/ProductosListados";
import PreguntasFrecuentes from "./sections/PreguntasFrecuentes";
import { useRef } from "react";

export default function Home() {
  const productosRef = useRef<HTMLElement | null>(null);

  // const scrollToProductos = () => {
  //   if (productosRef.current) {
  //     productosRef.current.scrollIntoView({ behavior: 'smooth' });
  //   } else {
  //     console.warn('productosRef no está disponible');
  //   }
  // };

  return (
    <FiltroProvider>
      <Hero />
      <Carrucel />
      <CategoriaProductos />
      <ProductosListados ref={productosRef} />
      <PreguntasFrecuentes />
    </FiltroProvider>
  );
}




