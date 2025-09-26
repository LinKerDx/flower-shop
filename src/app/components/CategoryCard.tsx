import Link from "next/link";
import { CategoryCardProps } from "../types/productos";


export function CategoryCard({ categoria, imagen }: CategoryCardProps) {
    return (
        <article className="group">
            <Link
                href={`/categoria/${encodeURIComponent(categoria.toLowerCase())}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                aria-label={`Ver productos de la categoría ${categoria}`}
            >
                <div className="relative overflow-hidden rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                    {/* Imagen */}
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                        <img
                            src={imagen}
                            alt={`Productos de la categoría ${categoria}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />
                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* Contenido */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                        <h2 className="text-xl font-semibold text-center capitalize drop-shadow-lg">
                            {categoria}
                        </h2>
                        <p className="text-sm text-center mt-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Explorar productos
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    );
}