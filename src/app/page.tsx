'use client'
import Hero from "@/app/sections/Hero";
import Productos from "./sections/CategoríaProductos";
import Carrucel from "./components/Carrucel";
import { FiltroProvider } from "./context/filtro";
import { ProductosListados } from "@/app/sections/ProductosListados";
import PreguntasFrecuentes from "./sections/PreguntasFrecuentes";

export default function Home() {

  return (
    <FiltroProvider>
      <Hero />
      <Carrucel />
      <ProductosListados />
      <Productos />
      <PreguntasFrecuentes />
    </FiltroProvider>
  );
}




