/* eslint-disable @next/next/no-img-element */

import SectionContainer from "../components/SectionContainer"
import gsap from 'gsap';
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';

export default function Hero() {


    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [currentWord, setCurrentWord] = useState(0);
    const words = ['Amor', 'Alegría', 'Gratitud', 'Amistad'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

        gsap.fromTo(
            [titleRef.current, subtitleRef.current, ctaRef.current],
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                clearProps: 'all'
            }
        );
    }, []);
    return (
        <SectionContainer>
            <div className="relative mt-16 hero-section flex items-center">
                {/* Overlay de fondo semitransparente */}


                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 lg:px-0">
                    <h1 ref={titleRef} className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold mb-6 md:mb-0 lg:mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        Flores que Expresan
                        <span className="block mt-2 md:mt-1 lg:mt-2 text-accent/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] rounded-lg py-2 bg-black/20 backdrop-blur-sm">
                            {words[currentWord]}
                        </span>
                    </h1>

                    <p ref={subtitleRef} className="text-sm md:text-sm 2xl:text-2xl max-w-md md:max-w-lg 2xl:max-w-2xl mx-auto mb-8 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm rounded-lg p-4">
                        Creamos arreglos únicos que cuentan historias y despiertan emociones.
                        Cada flor es elegida con amor para crear momentos inolvidables.
                    </p>

                    <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center">
                        <Link href="/personalizar" className="px-8 py-2 bg-accent text-white rounded-full transform hover:scale-105 transition-all duration-300  lg:text-md xl:text-lg font-semibold">
                            Personaliza tu Arreglo
                        </Link>
                    </div>
                </div>

                <div className="relative flex flex-col md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-2 overflow-hidden ">
                    {/* Gradiente overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none z-10"></div>

                    {/* Máscara ondulada en la parte inferior */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
                        <svg
                            className="relative block w-full text-secondary"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            style={{ height: '50px' }}
                        >
                            <path
                                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>

                    <img
                        src="/Hero1.webp"
                        alt="Eliza-chan acomodando flores"
                        className="w-full h-full object-cover aspect-[9/16]  hover:brightness-110 hover:scale-[1.02]"
                        fetchPriority="high"

                    />
                    <video
                        src="/assets/Hero4.webm"
                        className="hidden md:block w-full h-full object-cover col-span-3 hover:brightness-110 "
                        autoPlay
                        loop
                        muted
                    />
                    <img
                        src="/Hero3.webp"
                        alt="imagen de un arbol de cerezo"
                        className="hidden lg:block w-full h-full object-cover col-span-1 aspect-[9/16] "
                        fetchPriority="high"
                    />
                </div>
            </div>
        </SectionContainer>
    )

}