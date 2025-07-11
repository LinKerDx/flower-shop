/* eslint-disable @next/next/no-img-element */
'use client'
import Link from "next/link";
import SectionContainer from "./SectionContainer";


export default function ClaseProductos() {

    const Productos = [{
        category: "Cactus",
        id: "0",
        vid: "/assets/cactus.webp"
    },
    {
        category: "Variedad",
        id: "1",
        vid: "/assets/variedad.webp"
    },
    {
        category: "Flores",
        id: "2",
        vid: "/assets/Flor.webp"
    }
    ]
    return (
        <SectionContainer>
            <div className="flex flex-col items-center justify-center bg-primary mask-y-from-90% mask-y-to-110%">
                <h1 className="text-4xl font-bold ">Categorías</h1>
                <p className="mt-4 text-lg ">Aquí puedes ver todos nuestros productos por categorías.</p>
                <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        Productos.map((producto, index) => (
                            <div key={index} className="flex flex-col  items-center justify-center mt-4">
                                <Link href={`/categoria/${producto.category}`
                                } className="flex flex-col items-center justify-center">
                                    <h2 className="mt-2 text-xl font-semibold ">{producto.category}</h2>
                                    <img src={producto.vid} className="object-cover h-[500px]" />
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>
        </SectionContainer>
    )
}