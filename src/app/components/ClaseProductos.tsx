/* eslint-disable @next/next/no-img-element */
'use client'
import Link from "next/link";
import { DatosProducto } from "../services/producto";
import SectionContainer from "./SectionContainer";


export default function ClaseProductos() {
    const { Productos } = DatosProducto()

    return (
        <SectionContainer>
            <div className="flex flex-col items-center justify-center bg-secondary h-full w-full py-10 px-4 md:px-8 lg:px-16">
                <h1 className="text-4xl font-bold ">Categorías</h1>
                <p className="mt-4 text-lg ">Aquí puedes ver todos nuestros productos por categorías.</p>
                <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        Productos.map((producto, index) => (
                            <div key={index} className="flex flex-col items-center justify-center mt-4 ">
                                <Link href={`/categoria/${producto.category}`
                                } className="flex flex-col items-center justify-center">
                                    <h2 className="mt-2 text-xl font-semibold  ">{producto.category}</h2>
                                    <img src={producto.img} alt={`image of ${producto.category} category`} className="object-cover h-[500px] rounded-lg" />
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>
        </SectionContainer>
    )
}