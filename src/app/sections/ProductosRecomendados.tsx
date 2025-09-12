/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from "react";
import { DatosProducto } from "../services/producto";
import { ListOfProductos } from "../types/productos";
import Link from "next/link";
import { Oferta } from "../components/icons/Icons";

interface Props {
    productoActualId?: number | string;
    categoria: string;
    lista?: ListOfProductos;
    cantidad?: number;
}

export default function ProductosRecomendados({ productoActualId, categoria }: Props) {

    const [productosAleatorios, setProductosAleatorios] = useState<ListOfProductos>([]);
    const { producto } = DatosProducto()

    const productosFiltrados = producto.filter(producto => producto.categoría === categoria);

    function obtenerProductosAleatorios({ lista, cantidad, productoActualId }: Props) {
        const copia = lista ? lista.filter(producto => producto.id !== productoActualId) : []; // excluye el actual
        const aleatorios = [];

        const cantidadDefinida = cantidad ?? 0;
        for (let i = 0; i < cantidadDefinida && copia.length > 0; i++) {
            const indice = Math.floor(Math.random() * copia.length);
            aleatorios.push(copia.splice(indice, 1)[0]);
        }

        return aleatorios;
    }


    useEffect(() => {
        const seleccion = obtenerProductosAleatorios({
            lista: productosFiltrados,
            cantidad: 4,
            productoActualId: productoActualId,
            categoria: categoria
        });
        setProductosAleatorios(seleccion);
    }, [productoActualId]);

    return (
        <div className="flex flex-col gap-5 my-4">
            <h2 className="text-2xl font-bold text-center">También te puede interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-4 rounded-lg justify-items-center-safe md:justify-center">
                {productosAleatorios.map((item) => {
                    return (
                        <article
                            key={item.id}
                            className="relative w-[220px] flex flex-col bg-white rounded-lg"
                        >
                            <Link href={`/producto/${item.id}`} >
                                {/* Badge de descuento */}
                                {(item.descuento ?? 0) > 0 && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 flex items-center">
                                        <Oferta />
                                        {item.descuento}% OFF
                                    </div>
                                )}

                                {/* Contenedor de imagen */}
                                <div className="relative w-full h-48 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer ">
                                    <img
                                        src={item.imagen}
                                        alt={item.tipo}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                </div>

                                {/* Contenido del producto */}
                                <div className="p-4 flex flex-col flex-grow">
                                    {/* Información de stock */}
                                    <div className="mb-1">
                                        {(item.stock ?? 0) > 0 ? (
                                            <span className="text-xs text-green-600 font-medium">
                                                {(item.stock ?? 0) > 10 ? "En stock" : `Solo ${item.stock ?? 0} disponibles`}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-red-500 font-medium">Agotado</span>
                                        )}
                                    </div>

                                    {/* Nombre del producto */}
                                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors h-12">
                                        {item.tipo}
                                    </h3>

                                    {/* Calificación */}
                                    <div className="flex items-center mb-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-3.5 h-3.5 ${i < Math.floor(item.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-1">({item.rating})</span>
                                    </div>

                                    {/* Precios */}
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center">
                                            {(item.descuento ?? 0) > 0 ? (
                                                <>
                                                    <span className="text-lg font-bold text-gray-900">
                                                        ${(item.precio_estimado * (1 - (item.descuento ?? 0) / 100)).toFixed(2)}
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                                        ${item.precio_estimado.toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${item.precio_estimado.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </article>
                    )
                })}
            </div>
        </div >
    );
}