/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

export default function PlaceholderChanger() {
    const placeholders = [
        { text: "Cáctus", img: "/imgs/cactaceas/cactacea.svg" },
        { text: "Flores", img: "/imgs/flores/flores.svg" },
        { text: "Plantas", img: "/imgs/variedad/variedad.svg" },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % placeholders.length);
        }, 5000);

        return () => clearInterval(interval);
    },);

    const current = placeholders[index];

    return (
        <>
            <img src={current.img} alt="icono" className="size-5" />
            <input
                type="text"
                placeholder={current.text}
                className="border p-2 rounded h-6 w-20 sm:w-30 md:w-50 lg:w-80 xl:w-120 "
            />
        </>
    );
};

