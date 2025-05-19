'use client'

import { useContext } from "react";
import { FiltroContext } from "../context/filtro";
import { ListOfProductos } from "../types/productos";


export function useFilters() {
    const { filters, setFilters } = useContext(FiltroContext)


    const productoFiltrado = (producto: ListOfProductos) => {
        return producto.filter((producto) => {
            return (
                (filters.nivel_cuidado === "todo" || producto.nivel_cuidado === filters.nivel_cuidado) &&
                (producto.precio_estimado >= filters.minimo)
            )
        })

    }



    return { productoFiltrado, setFilters, filters }

}
