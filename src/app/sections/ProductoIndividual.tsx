/* eslint-disable @next/next/no-img-element */

import { AddToCartIcon, RemoveFromCart } from "../components/icons/Icons"
import { useCart } from "../hooks/useCart"
import { DatosProducto } from "../services/producto"
import { Producto } from "../types/productos"
import ImprovedBreadcrumb from "../components/BreadCrumb";
import ProductosRecomendados from "./ProductosRecomendados";
import SistemaDePago from "../components/SistemaDePago";
import FuegosArtificiales from "../components/FuegosArtificiales";
import { useFuegosArtificiales } from "../hooks/useFuegosArtificiales";
import { useState } from "react";

export default function ProductoIndividual({ item }: { item: Producto }) {
  const { checkProducto } = DatosProducto()
  const { addToCart, removeFromCart } = useCart()
  const { disparar, lanzarFuegos } = useFuegosArtificiales()
  const [isSelected, setIsSelected] = useState("");

  const isInCart = checkProducto(item)

  const handleOptionSelect = (option: string) => {
    setIsSelected(option);
  }


  return (
    <div className="min-h-screen bg-Primary pt-10 ">
      <FuegosArtificiales disparar={disparar} />
      <ImprovedBreadcrumb item={item} />


      {/* Contenedor principal */}
      <div className="container mx-auto px-4 py-4 lg:py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Sección de imagen */}
            <div className="relative p-8 lg:p-12 flex flex-col items-center justify-center bg-primary">
              <div className="relative group">
                <img
                  src={item.imagen}
                  alt={item.tipo}
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl ring-4 ring-white transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-black">
                <p className="text-sm font-medium">{item.maceta} y distintos colores</p>
              </div>
            </div>

            {/* Sección de detalles */}
            <div className="p-8 lg:p-12 flex flex-col bg-secondary">

              {/* Encabezado */}
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-text">
                  {item.tipo}
                </h1>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-bold text-[#6de06d]">
                    {item.precio_estimado}
                  </span>
                  <span className="text-lg text-text">{item.moneda}</span>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-8">
                <p className="text-text leading-relaxed whitespace-pre-line">
                  {item.descripción}
                </p>
              </div>

              {/* Opciones de maceta */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-text" >Tamaño de maceta:</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {item.opciones_maceta?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`relative py-3 px-4 rounded-xl font-medium text-sm cursor-pointer ${isSelected === option
                        ? 'text-white bg-accent'
                        : 'text-text bg-primary'
                        }`}

                    >
                      {option}
                      {isSelected === option && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: '#FCD8CD' }}></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-auto space-y-4">
                <div className="flex flex-col md:flex-row gap-5  md:gap-20 justify-center">


                  <button
                    onClick={() => {
                      if (isInCart) {
                        removeFromCart(item);
                      } else {
                        addToCart(item);
                        lanzarFuegos();
                      }
                    }}
                    className={`p-2 rounded-xl md:max-w-44 font-semibold text-sm flex items-center justify-center gap-3 cursor-pointer  ${isInCart
                      ? 'text-white hover:opacity-90 bg-accent'
                      : 'text-white hover:opacity-90 bg-[#6de06d]'
                      }`}
                  >
                    {isInCart ? (
                      <>
                        <RemoveFromCart />
                        Quitar del carrito
                      </>
                    ) : (
                      <>
                        <AddToCartIcon />
                        Agregar al carrito
                      </>
                    )}
                  </button>
                  <SistemaDePago />

                </div>

              </div>
            </div>
          </div>
        </div>
        <ProductosRecomendados productoActualId={item.id} categoria={item.categoría} />

      </div>
    </div>

  )
}

