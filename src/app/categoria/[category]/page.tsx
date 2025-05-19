
'use client';
import FuegosArtificiales from "@/app/components/FuegosArtificiales";
import ProductCard from "@/app/components/ProductCard";
import SectionContainer from "@/app/components/SectionContainer"
import { useFuegosArtificiales } from "@/app/hooks/useFuegosArtificiales";
import { DatosProducto } from "@/app/services/producto";
import { useParams } from "next/navigation";

export default function Page() {
    const { disparar, lanzarFuegos } = useFuegosArtificiales()
    const { producto } = DatosProducto()
    const params = useParams();

    const category = params.category;
    const categoría = producto.filter(producto => producto.categoría === category)



    return (
        <SectionContainer>
            <div className="flex flex-col items-center justify-center mt-20 gap-10 w-full">
                <FuegosArtificiales disparar={disparar} />

                <h1 className="text-3xl font-bold">Cactus</h1>
                <div className="responsivo-grid">
                    {categoría.map((item) => {
                        return (
                            <ProductCard
                                key={item.id}
                                item={item}
                                onClick={() => lanzarFuegos()}
                            />
                        )
                    })}
                </div>
            </div>
        </SectionContainer>
    )
}