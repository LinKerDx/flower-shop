/* eslint-disable @next/next/no-img-element */
'use client'
import { DatosProducto } from "../services/producto"
import { Producto } from "../types/productos";

export default function Carrucel() {

    const { productos } = DatosProducto()

    const ProductosCactus = productos.filter(producto => producto.categoría === "Cactus");
    const ProductosFlores = productos.filter(producto => producto.categoría === "Flores");
    const ProductosVariedad = productos.filter(producto => producto.categoría === "Variedad");

    const firstlineCactus = ProductosCactus.slice(0, 4)
    const firstlineFlowers = ProductosFlores.slice(0, 4)
    const firstlineVariety = ProductosVariedad.slice(0, 3)

    const secondlineCactus = ProductosCactus.slice(4, 8)
    const secondlineFlowers = ProductosFlores.slice(4, 8)
    const secondlineVariety = ProductosVariedad.slice(3, 7)

    // Componente para las imágenes del carrusel
    const CarouselImage = ({ producto, index, direction }: { producto: Producto, index: number, direction: 'normal' | 'reverse' }) => (
        <div className="relative group">
            <img
                key={`${direction}-${index}`}
                className="size-12 sm:size-16 md:size-20 lg:size-24 rounded-xl border-2 shadow-lg       
                            border-accent/30 dark:border-accent/50        
                            transition-all duration-500
                            md:hover:scale-110 md:hover:rotate-3
                            group-hover:border-accent/60 dark:group-hover:border-accent/70
                            touch-manipulation
                            will-change-transform content-fit animate-swing"
                src={producto.imagen}
                alt={`imagen de ${producto.tipo}`}
                width={96}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
            />
        </div>
    )



    return (
        <section className="flex flex-col items-center justify-center w-full h-full ">
            <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-secondary via-primary to-tertiary dark:from-primary dark:via-secondary dark:to-tertiary w-full py-16 overflow-hidden">

                {/* Elementos decorativos de fondo */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-accent/10 dark:bg-accent/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 dark:bg-tertiary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-lg animate-pulse delay-500"></div>

                {/* Título del carrusel */}
                <div className="text-center mb-12 z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-accent dark:text-accent mb-2">
                        🌸 Nuestra Colección 🌸
                    </h2>
                    <p className="text-accent/80 dark:text-accent/90 text-lg">
                        Descubre la belleza de nuestras flores y plantas
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Primera cinta del carrusel */}
                <div className="relative overflow-hidden w-[120%] -rotate-1 mask-y-from-90% mask-y-to-110% mb-8">
                    <div className="bg-gradient-to-r from-tertiary/80 via-accent/60 to-tertiary/80 dark:from-tertiary/70 dark:via-accent/50 dark:to-tertiary/70 py-6 backdrop-blur-sm border-y-2 border-accent/20 dark:border-accent/30">
                        <article className="flex animate-movimientocinta-mobile md:animate-movimientocinta lg:animate-movimientocinta-compu gap-1 md:gap-4 lg:gap-12">
                            {firstlineCactus.map((producto, index) => (
                                <CarouselImage key={`cactus-${index}`} producto={producto} index={index} direction="normal" />
                            ))}
                            {firstlineFlowers.map((producto, index) => (
                                <CarouselImage key={`flowers-${index}`} producto={producto} index={index} direction="normal" />
                            ))}
                            {firstlineVariety.map((producto, index) => (
                                <CarouselImage key={`variety-${index}`} producto={producto} index={index} direction="normal" />
                            ))}
                        </article>
                    </div>
                </div>

                {/* Segunda cinta del carrusel */}
                <div className="relative overflow-hidden w-[120%] rotate-1 mask-y-from-90% mask-y-to-110%">
                    <div className="bg-gradient-to-r from-accent/60 via-tertiary/80 to-accent/60 dark:from-accent/50 dark:via-tertiary/70 dark:to-accent/50 py-6 backdrop-blur-sm border-y-2 border-accent/20 dark:border-accent/30">
                        <article className="flex animate-movimientocintareversa-mobile md:animate-movimientocintareversa lg:animate-movimientocintareversa-compu gap-1 md:gap-4 lg:gap-12">
                            {secondlineCactus.map((producto, index) => (
                                <CarouselImage key={`cactus-reverse-${index}`} producto={producto} index={index} direction="reverse" />
                            ))}
                            {secondlineFlowers.map((producto, index) => (
                                <CarouselImage key={`flowers-reverse-${index}`} producto={producto} index={index} direction="reverse" />
                            ))}
                            {secondlineVariety.map((producto, index) => (
                                <CarouselImage key={`variety-reverse-${index}`} producto={producto} index={index} direction="reverse" />
                            ))}
                        </article>
                    </div>
                </div>

                {/* Indicadores decorativos */}
                <div className="flex justify-center mt-12 gap-3 z-10">
                    <div className="w-3 h-3 bg-accent/60 dark:bg-accent/80 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-accent/60 dark:bg-accent/80 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-accent/60 dark:bg-accent/80 rounded-full animate-bounce delay-400"></div>
                </div>
            </div>
        </section>
    )
}