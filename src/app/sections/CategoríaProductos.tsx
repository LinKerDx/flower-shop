/* eslint-disable @next/next/no-img-element */
'use client'

import { DatosProducto } from "../services/producto";
import SectionContainer from "../components/SectionContainer";
import { CategoryCard } from "../components/CategoryCard";



export default function CategoriaProductos() {

    const { categoriasUnicas } = DatosProducto()

    if (!categoriasUnicas || categoriasUnicas.length === 0) {
        return (
            <SectionContainer>
                <div className="flex flex-col items-center justify-center bg-secondary h-full w-full py-10 px-4">
                    <p className="text-lg text-muted-foreground">No hay categorías disponibles.</p>
                </div>
            </SectionContainer>
        );
    }

    return (
        <SectionContainer>
            <div className="flex flex-col items-center justify-center bg-secondary h-full w-full py-10 px-4 md:px-8 lg:px-16">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Categorías</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Explora nuestra amplia selección de productos organizados por categorías para encontrar exactamente lo que necesitas.
                    </p>
                </header>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-6 w-full max-w-6xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoriasUnicas.map((producto, index) => (
                        <CategoryCard
                            key={`${producto.category}-${index}`}
                            categoria={producto.category}
                            imagen={producto.img}
                        />
                    ))}
                </div>
            </div>
        </SectionContainer>)
}