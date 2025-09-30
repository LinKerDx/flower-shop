/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from "react"
import SectionContainer from "../components/SectionContainer"
import { DatosProducto } from "../services/producto"
import ProductosRecomendados from "../sections/ProductosRecomendados"
import { useCart } from "../hooks/useCart"
import { ListOfProductos, Producto } from "../types/productos"
import { Minus, Plus } from "../components/icons/Icons"
import { v4 as uuidv4 } from 'uuid';

export default function Personalizado() {
    // Estados para manejar las selecciones y opciones
    const [florSeleccionada, setFlorSeleccionada] = useState<ListOfProductos>([]);
    const [colorMaceta, setColorMaceta] = useState("");
    const [tamañoMaceta, setTamañoMaceta] = useState("");
    const [opcionesMaceta, setOpcionesMaceta] = useState<string[]>([]);
    const [tamañosMaceta, setTamañosMaceta] = useState<string[]>([]);

    const { addToCart } = useCart()
    const { productos } = DatosProducto();

    const precioBase = florSeleccionada.map((item) => {
        const precioUnitario = item.cantidad && item.cantidad >= 12 ? item.precio_promedio.docena / 12 : item.precio_promedio.unidad;
        return precioUnitario * (item.cantidad || 1);
    }).reduce((a, b) => a + b, 0);
    // Obtener datos del producto
    const arregloPersonalizado = productos.filter((i) => i.categoría === "Flores");


    // Extraer opciones únicas de macetas
    useEffect(() => {
        // Obtener colores únicos de macetas
        const opcionesSet = new Set();
        productos.forEach(p => {
            if (p.opciones_maceta && p.opciones_maceta.length) {
                p.opciones_maceta.forEach(o => opcionesSet.add(o));
            }
        });
        const opcionesUnicas = Array.from(opcionesSet) as string[];
        opcionesUnicas.sort();
        setOpcionesMaceta(opcionesUnicas);
        setColorMaceta(opcionesUnicas.length > 0 ? opcionesUnicas[0] : "");

        // Obtener tamaños únicos de macetas
        const tamañosSet = new Set();
        productos.forEach((i) => {
            if (i.tamaños_maceta && i.tamaños_maceta.length) {
                i.tamaños_maceta.forEach(o => tamañosSet.add(o));
            }
        });
        const tamañosUnicos = (Array.from(tamañosSet) as string[]).sort();
        setTamañosMaceta(tamañosUnicos);
        setTamañoMaceta(tamañosUnicos.length > 0 ? tamañosUnicos[0] : "");
    }, [productos]);


    const handleFlorClick = (item: Producto): void => {
        const florEnCarrito = florSeleccionada.some((i) => i.id === item.id);
        if (florEnCarrito) {
            setFlorSeleccionada(florSeleccionada.filter((i) => i.id !== item.id));
        } else {
            setFlorSeleccionada([...florSeleccionada, { ...item, cantidad: 1 }]);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setColorMaceta(e.target.value);
    };

    const handleTamañoClick = (tamaño: string) => {
        setTamañoMaceta(tamaño);
    };

    const handleUnidadesPlusClick = (id: number): void => {
        setFlorSeleccionada(florSeleccionada.map((item) =>
            item.id === id && item.cantidad !== undefined
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    const handleUnidadesMinusClick = (id: number): void => {
        setFlorSeleccionada(florSeleccionada.flatMap((item) => {
            if (item.id === id && item.cantidad !== undefined) {
                const nuevaCantidad = item.cantidad - 1;
                return nuevaCantidad > 0 ? [{ ...item, cantidad: nuevaCantidad }] : [];
            }
            return [item];
        }));
    };

    const crearArregloPersonalizado = (florSeleccionada: Producto[]) => {


        if (!florSeleccionada.length) {
            console.warn('No hay flores seleccionadas');
            return;
        }
        const arregloPersonalizado = {
            id: generateCryptoNumericId(),
            tipo: "Arreglo Personalizado",
            descripción: generateDescripcion(florSeleccionada), maceta: colorMaceta,
            moneda: florSeleccionada[0].moneda,
            imagen: "/personalizada.webp",
            categoría: "Arreglo Personalizado",
            precio_estimado: calcularPrecio(),
            cantidad: 1,
            createdAt: new Date().toISOString()

        };
        try {
            addToCart(arregloPersonalizado);
            console.log(`Arreglo agregado al carrito exitosamente`);
        } catch (error) {
            console.error(`Error al agregar arreglo:`, error);
        }
    };

    const generateCryptoNumericId = (): number => {
        const uuid = uuidv4();
        // Tomar primeros 12 caracteres hexadecimales (sin guiones)
        const hex = uuid.replace(/-/g, '').slice(0, 12);
        return parseInt(hex, 16);
    };
    const generateDescripcion = (flores: Producto[]): string => {
        return flores
            .map(flor => `${flor.nombre} x${flor.cantidad}`)
            .join(", ");
    };

    // Calcular el precio basado en las selecciones
    const calcularPrecio = (): number => {
        if (!florSeleccionada) return 0;

        const factoresTamaño = {
            "Pequeño": 1,
            "Mediano": 1.5,
            "Grande": 2
        };

        const precioFinal = Number((precioBase * (factoresTamaño[tamañoMaceta as "Pequeño" | "Mediano" | "Grande"] || 1)).toFixed(2));

        return precioFinal;
    };

    return (
        <SectionContainer>
            <div className="mt-15 w-full px-5">
                <h1 className="text-3xl text-center font-bold mb-6">Arreglo Personalizado</h1>
                <div className=" flex flex-col md:flex-row gap-8 w-full">
                    <main className="w-full md:w-1/2 flex flex-col gap-8 ">
                        <section className="bg-white rounded-lg shadow-md p-5 ">
                            <h2 className="text-xl font-semibold mb-4 ">Elige tus flores favoritas</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4  p-5">
                                {arregloPersonalizado.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`cursor-pointer relative transition-all duration-200 hover:scale-105`}
                                        onClick={() => handleFlorClick(item)}
                                    >
                                        <img
                                            src={item.imagen}
                                            alt={item.tipo}
                                            className={`w-full h-32 object-cover rounded-lg ${florSeleccionada.some(flor => flor.id === item.id) ? "ring-4 ring-blue-500" : "ring-1 ring-gray-200"}`}
                                        />
                                        <div className="mt-2 text-center text-sm font-medium">{item.tipo}</div>
                                        {florSeleccionada.some(flor => flor.id === item.id) && (
                                            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-lg shadow-md h-full">
                            <h2 className="text-xl font-semibold mb-4">Personaliza tu maceta</h2>

                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Color de maceta</h3>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                                    value={colorMaceta}
                                    onChange={handleColorChange}
                                >
                                    {opcionesMaceta.map((color, index) => (
                                        <option key={index} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Tamaño de maceta</h3>
                                <div className="flex flex-wrap gap-3">
                                    {tamañosMaceta.map((tamaño, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleTamañoClick(tamaño)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                                            ${tamañoMaceta === tamaño
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                        >
                                            {tamaño}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>

                    <aside className="w-full md:w-1/2 ">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-17 h-6/16">
                            <h2 className="text-xl font-semibold mb-4">Tu selección</h2>
                            <div className="h-1/2 scroll-y overflow-y-auto">


                                {
                                    florSeleccionada ? (
                                        florSeleccionada.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 mb-6">
                                                <img
                                                    src={item.imagen}
                                                    alt={item.tipo}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="font-medium">{item.nombre ? item.nombre : item.tipo}</h3>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        {
                                                            (item.cantidad && item.cantidad >= 12
                                                                ? (item.precio_promedio.docena / 12)
                                                                : item.precio_promedio.unidad).toFixed(2)
                                                        } {item.moneda} / unidad
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleUnidadesMinusClick(item.id)}
                                                        className="text-blue-text hover:text-primary-dark p-1 cursor-pointer"
                                                        aria-label="Reducir cantidad"
                                                    >
                                                        <Minus />
                                                    </button>
                                                    <span className="text-sm w-5 text-center">{item.cantidad}</span>
                                                    <button
                                                        onClick={() => handleUnidadesPlusClick(item.id)}
                                                        className="text-blue-text hover:text-primary-dark p-1 cursor-pointer"
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <Plus />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleFlorClick(item)}
                                                    className="text-red-500 hover:text-red-600 cursor-pointer"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))

                                    ) : (
                                        <p className="text-gray-500 mb-6">Selecciona una flor para comenzar</p>
                                    )}
                            </div>
                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <p className="text-sm text-gray-600">
                                    Maceta: {colorMaceta}, Tamaño: {tamañoMaceta}
                                </p>
                                <div className="flex justify-between mb-2">
                                    <span>Precio base:</span>
                                    <span>${precioBase.toFixed(2) || 0}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${calcularPrecio()}</span>
                                </div>
                            </div>

                            <button
                                className={`w-full py-3 rounded-lg font-medium text-white transition-all cursor-pointer
                                ${florSeleccionada
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-gray-300 cursor-not-allowed"}`}
                                disabled={!florSeleccionada}
                                onClick={() => {
                                    if (florSeleccionada) crearArregloPersonalizado(florSeleccionada);
                                }}
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    </aside>
                </div>

                <div className="mt-16">
                    <ProductosRecomendados categoria="Flores" cantidad={4} />
                </div>
            </div>
        </SectionContainer>

    );
}