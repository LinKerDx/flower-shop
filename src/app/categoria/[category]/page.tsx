
'use client';
import ProductCard from "@/app/components/ProductCard";
import SectionContainer from "@/app/components/SectionContainer"
import { DatosProducto } from "@/app/services/producto";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const category = params.category;
    const { producto } = DatosProducto()
    const categoría = producto.filter(producto => producto.categoría === category)


    return (
        <SectionContainer>
            <div className="flex flex-col items-center justify-center mt-20 gap-10 w-full">
                <h1 className="text-3xl font-bold">Cactus</h1>
                <div className="responsivo-grid">
                    {categoría.map((item) => {
                        return (
                            <ProductCard key={item.id} item={item} />
                        )
                    })}
                </div>
            </div>
        </SectionContainer>
    )
}