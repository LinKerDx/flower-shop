'use client'
import { useState } from "react";
import { ListOfProductos, Producto } from "../types/productos";
import ProductosIniciales from "@/app/mocks/productos.json";
import { useFilters } from "../hooks/useFilters";
import { useCart } from "../hooks/useCart";

export function DatosProducto() {
    const { cart } = useCart()
    const [producto] = useState<ListOfProductos>(ProductosIniciales)
    const { setFilters, productoFiltrado } = useFilters()
    const productosFiltrados = productoFiltrado(producto)


    const checkProducto = (item: Producto) => {
        return cart.some((i) => i.id === item.id)
    }

    const Productos = [{
        category: "Cactus",
        id: "0",
        img: "/assets/cactus.webp"
    },
    {
        category: "Variedad",
        id: "1",
        img: "/assets/variedad.webp"
    },
    {
        category: "Flores",
        id: "2",
        img: "/assets/Flor.webp"
    }
    ]


    return { producto, productosFiltrados, setFilters, checkProducto, Productos }
}