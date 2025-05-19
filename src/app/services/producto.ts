'use client'
import { useState } from "react";
import { ListOfArreglos, ListOfProductos, Producto } from "../types/productos";

import ProductosIniciales from "@/app/mocks/productos.json";
import FloresArreglos from "@/app/mocks/flores_para_arreglos.json";

import { useFilters } from "../hooks/useFilters";
import { useCart } from "../hooks/useCart";

export function DatosProducto() {
    const { cart } = useCart()
    const [arreglosFlorales] = useState<ListOfArreglos>(FloresArreglos)
    const [producto] = useState<ListOfProductos>(ProductosIniciales)
    const { setFilters, productoFiltrado } = useFilters()
    const productosFiltrados = productoFiltrado(producto)


    const checkProducto = (item: Producto) => {
        return cart.some((i) => i.id === item.id)
    }


    return { producto, arreglosFlorales, productosFiltrados, setFilters, checkProducto }
}