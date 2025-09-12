'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import SistemaDePago from "../components/SistemaDePago";
import { AddToCartIcon, Minus, Plus, Trash2 } from './icons/Icons';


// Componente principal de la bolsa de compras
export default function ShoppingCart() {
    const { cart, clearCart, removeFromCart, addToCart, reduceCantidad } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [animateIcon, setAnimateIcon] = useState(false);

    // Efecto de animación cuando se añade un nuevo item
    useEffect(() => {

        setAnimateIcon(true);
        const timer = setTimeout(() => setAnimateIcon(false), 500);
        return () => clearTimeout(timer);

    }, [cart]);

    // Calcula el total
    const total = cart.reduce((sum, item) => sum + (item.precio_estimado * (item.cantidad || 1)), 0);

    return (
        <div className="fixed top-25 right-5 z-50  ">
            {/* Botón de la bolsa */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="badges p-2 text-text hover:text-red-600 focus:outline-none transition-colors bg-secondary rounded-lg cursor-pointer "
                aria-label="Ver carrito de compras"
            >
                <AddToCartIcon className={`${animateIcon ? 'animate-bounce' : ''} size-10`}
                />
                {cart.length > 0 && (
                    <span className="fixed animate-bounce  top-20 right-1 bg-primary text-red-600 text-md font-bold rounded-full size-7 flex items-center justify-center">
                        {cart.reduce((sum, item) => sum + (item.cantidad || 1), 0)}
                    </span>
                )}
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-60"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl max-h-96 flex flex-col">
                        {/* Encabezado */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="font-bold  text-text">Mi bolsa de compras</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-text hover:text-text cursor-pointer"
                                aria-label="Cerrar"
                            >
                                X
                            </button>
                        </div>

                        {/* Lista de productos */}
                        <div className="overflow-y-auto flex-grow">
                            {cart.length === 0 ? (
                                <p className="p-4  text-text text-center">Tu bolsa está vacía</p>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {cart.map(item => (
                                        <li key={item.id} className="p-4 flex gap-3">
                                            {/* Imagen */}
                                            <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.imagen}
                                                    alt={item.tipo}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            {/* Detalles */}
                                            <div className="flex-grow min-w-0">
                                                <h3 className="font-medium  text-text truncate">{item.tipo}</h3>
                                                <p className="text-xs  text-text truncate">{item.descripción}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="font-semibold text-sm">
                                                        {item.precio_estimado} {item.moneda}
                                                    </p>

                                                    {/* Control de cantidad */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => (item.cantidad ?? 1) > 1 ? reduceCantidad(item) : removeFromCart(item)}
                                                            className=" text-text hover:text-accent p-1 cursor-pointer"
                                                            aria-label="Reducir cantidad"
                                                        >
                                                            <Minus />
                                                        </button>
                                                        <span className="text-sm w-5 text-center">{item.cantidad || 1}</span>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className=" text-text hover:text-accent p-1 cursor-pointer"
                                                            aria-label="Aumentar cantidad"
                                                        >
                                                            <Plus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        {/* botón de limpiar bolsa */}
                        {cart.length === 0 ? <></> : (
                            <div className="flex justify-between items-center p-4 border-b">
                                <button
                                    onClick={() => clearCart()}
                                    className="text-text cursor-pointer"
                                    aria-label="Cerrar"
                                >
                                    <h2 className="font-bold  hover:text-red-600">Eliminar todo</h2>
                                </button>
                                <button
                                    onClick={() => clearCart()}
                                    className="text-text hover:text-red-600 cursor-pointer"
                                    aria-label="Cerrar"
                                >
                                    <Trash2 />
                                </button>
                            </div>)}


                        {/* Pie con total y botón */}
                        <div className="border-t p-4 bg-primary rounded-b-lg">
                            <div className="flex justify-between mb-3">
                                <span className="font-medium">Total:</span>
                                <span className="font-bold">{total.toFixed(2)} euros</span>
                            </div>
                            <SistemaDePago />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}