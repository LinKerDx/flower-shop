'use client'
import { useMemo, useState } from "react";
import { ListOfProductos, Producto, ProductoCategoria } from "../types/productos";
import ProductosIniciales from "@/app/mocks/productos.json";
import { useFilters } from "../hooks/useFilters";
import { useCart } from "../hooks/useCart";

export function DatosProducto() {
    const { cart } = useCart()
    const [productos] = useState<ListOfProductos>(ProductosIniciales)
    const { setFilters, productoFiltrado } = useFilters()
    const productosFiltrados = productoFiltrado(productos)


    const checkProducto = (item: Producto) => {
        return cart.some((i) => i.id === item.id)
    }



    // Optimizar con useMemo para evitar recálculos innecesarios
    const categoriasUnicas = useMemo(() => {
        return Array.from(
            new Map(
                productos.map(p => [
                    p.categoría,
                    { category: p.categoría, img: p.imagen }
                ])
            ).values()
        );
    }, [productos]);

    return { productos, productosFiltrados, setFilters, checkProducto, categoriasUnicas }
}