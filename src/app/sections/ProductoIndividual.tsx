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

export default function ProductoIndividual({ item }: { item: Producto }) {
    const { checkProducto } = DatosProducto()
    const { addToCart, removeFromCart } = useCart()
    const { disparar, lanzarFuegos } = useFuegosArtificiales()

    const isInCart = checkProducto(item)


    return (
        <div key={item.id} className="flex flex-col justify-around gap-10">
            <FuegosArtificiales disparar={disparar} />

            {/* Header con navegación y botones */}
            <header className="space-y-4">
                {/* Breadcrumb */}
                <ImprovedBreadcrumb item={item} />

            </header>

            {/* Contenido principal */}
            <main className="flex flex-col md:flex-row items-center gap-10 mt-6">
                {/* Imagen y descripción corta */}
                <div className="flex flex-col gap-6 items-center">
                    <img src={item.imagen} alt={item.tipo} className="w-72 h-72 object-cover border-4 border-primary-dark rounded" />
                    <p className="text-sm text-center text-gray-700">{item.maceta} y distintos colores</p>
                </div>

                {/* Detalles del producto */}
                <aside className="flex flex-col">
                    <section className="mt-4">
                        <h1 className="text-2xl font-bold">{item.tipo}</h1>
                        <p className="text-xl text-green-600 mt-1">
                            {item.precio_estimado} <small className="text-gray-500">{item.moneda}</small>
                        </p>

                        <h2 className="font-semibold text-gray-800">Información del producto</h2>
                        <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                            {item.descripción}
                        </p>
                        {item.opciones_maceta.map((items, index) => {
                            return (
                                <div key={index} className="flex flex-rows gap-2">
                                    <span className="badges py-1 px-4 rounded-lg" >{items}<input className="hidden" type="checkbox" value={items} /></span>
                                </div>
                            )
                        })}


                    </section>

                    {/* Botón de carrito */}
                    <div className=" flex md:flex-rows cursor-pointer items-center justify-center gap-5 py-5">
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
                            className="inline-flex items-center justify-center cursor-pointer gap-1 md:gap-2 text-white text-sm rounded-lg transition-colors p-2 hover:opacity-90"
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
        </div>

    )
}