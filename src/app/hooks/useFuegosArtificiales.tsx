'use client'
import { useState } from "react";


export const useFuegosArtificiales = () => {
    const [disparar, setDisparar] = useState(false);

    const lanzarFuegos = () => {
        setDisparar(false);
        setTimeout(() => setDisparar(true), 0); // reinicia el trigger

    };

    return { disparar, lanzarFuegos };
}
