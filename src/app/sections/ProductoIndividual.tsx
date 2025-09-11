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
        <div key={item.id} className="flex flex-col justify-around gap-10 ">
            <FuegosArtificiales disparar={disparar} />

            {/* Header con navegación y botones */}
            <header className="space-y-4">
                {/* Breadcrumb */}
                <ImprovedBreadcrumb item={item} />

            </header>

            {/* Contenido principal */}
            <main className="flex flex-col md:grid md:grid-cols-3 gap-10 md:px-5 mt-6 bg-secondary py-10 xl:rounded-2xl">
                {/* Imagen y descripción corta */}
                <div className="flex flex-col gap-6 items-center">

                    <img src={item.imagen} alt={item.tipo} className="w-72 h-72 object-cover border-4 border-primary rounded" />
                    <p className="text-sm text-center text-gray-700">{item.maceta} y distintos colores</p>
                </div>

                {/* Detalles del producto */}
                <aside className="flex flex-col md:col-span-2">
                    <section className="flex flex-col gap-2 p-4 md:gap-4">
                        <h1 className="text-2xl md:text-4xl text-center font-bold">{item.tipo}</h1>
                        <p className="text-xl max-md:text-center text-green-600 ">
                            {item.precio_estimado} <small className="text-gray-500">{item.moneda}</small>
                        </p>

                        <p className="text-sm text-blue-text md:max-w-150 lg:max-w-200 whitespace-pre-line">
                            {item.descripción}
                        </p>
                        <h2>Opciones:</h2>
                        <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 gap-2 items-center-safe md:justify-items-center-safe">

                            {item.opciones_maceta?.map((option, index) => {
                                return (
                                    <button key={index} onClick={() => handleOptionSelect(option)}
                                        className={`flex items-center justify-center cursor-pointer w-1/2  md:w-full px-4 py-3 border rounded-lg text-sm bg-tertiary font-medium ${isSelected === option ? 'border-black border-4 text-black' : 'border-accent text-black  hover:bg-gray-50'}`} >{option}
                                        <input className="hidden" type="checkbox" value={option} />
                                    </button>
                                )
                            })}

                        </div>

                    </section>

                    {/* Botón de carrito */}
                    <div className=" flex md:flex-rows cursor-pointer items-center justify-center gap-5 py-5 mt-10">
                        <button
                            style={{ backgroundColor: isInCart ? 'black' : '#6de06d' }}
                            onClick={() => {
                                if (isInCart) {
                                    removeFromCart(item);
                                } else {
                                    addToCart(item);
                                    lanzarFuegos();
                                }
                            }}
                            className={`inline-flex items-center justify-center cursor-pointer ${isInCart ? "" : "badges"} gap-1 md:gap-2 text-white text-sm rounded-lg transition-colors p-2 hover:opacity-90`}
                        >
                            {isInCart ? <RemoveFromCart /> : <AddToCartIcon />}
                            {isInCart ? 'Quitar del carrito' : 'Agregar al carrito'}
                        </button>
                        <SistemaDePago />
                    </div>
                </aside>
            </main>
            <footer>
                <ProductosRecomendados productoActualId={item.id} categoria={item.categoría} />
            </footer>
        </div >

    )
}