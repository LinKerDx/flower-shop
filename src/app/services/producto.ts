'use client'
import { useState } from "react";
import { ListOfProductos, Producto } from "../types/productos";
import ProductosIniciales from "@/app/mocks/productos.json";
import { useFilters } from "../hooks/useFilters";
import { useCart } from "../hooks/useCart";

export function DatosProducto() {
    const { cart } = useCart()
    const [productos] = useState<ListOfProductos>(ProductosIniciales)
    const { setFilters, productoFiltrado } = useFilters()
    const productosFiltrados = productoFiltrado(productos)
    interface ProductoCategoria {
        category: string;
        img: string;
        // Agregar otras propiedades según tu tipo de datos
    }

    const checkProducto = (item: Producto) => {
        return cart.some((i) => i.id === item.id)
    }

    // Obtener categorías únicas para evitar duplicados
    const categoriasUnicas = productos.reduce<ProductoCategoria[]>((acc, producto) => {
        console.log(producto.categoría);
        const existeCategoria = acc.find(item => item.category === producto.categoría);
        if (!existeCategoria) {
            acc.push({
                category: producto.categoría,
                img: producto.imagen
            });
        }
        return acc;
    }, []);


    return { productos, productosFiltrados, setFilters, checkProducto, categoriasUnicas }
}