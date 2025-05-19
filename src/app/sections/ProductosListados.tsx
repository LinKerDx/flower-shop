'use client'
import { Filtro } from "@/app/components/Filtro";

import SectionContainer from "@/app/components/SectionContainer"
import { ProductosFiltrados } from "../components/ProductosFiltrados";


export function ProductosListados() {

    return (
        <SectionContainer>
            <div className="flex flex-col items-center justify-center mt-20 gap-10 w-full ">
                <h1 className="text-4xl font-bold ">Productos</h1>
                <Filtro />
                <div className="responsivo-grid">
                    <ProductosFiltrados />
                </div>
            </div>
        </SectionContainer>);
}