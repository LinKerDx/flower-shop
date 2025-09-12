/* eslint-disable @next/next/no-img-element */

import SectionContainer from "../components/SectionContainer"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);


export default function Hero() {


    const text = useRef<HTMLHeadingElement>(null)

    useGSAP(() => {
        // gsap code here...
        const splitText = SplitText.create(text.current!, {
            type: "chars"
        });
        gsap.from(splitText.chars, {
            y: 10,
            duration: 1,
            ease: 'power3.in',
            stagger: 0.4,
            autoAlpha: 0,
        }); // <-- automatically reverted
    });

    return (
        <SectionContainer>
            <div className="relative mt-20">
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
                        className="w-full h-full object-cover aspect-[9/16] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                    />
                    <video
                        src="/assets/Hero4.webm"
                        className="hidden md:block w-full h-full object-cover col-span-3 transition-all duration-300 hover:brightness-110 "
                        autoPlay
                        loop
                        muted
                    />
                    <img
                        src="/Hero3.webp"
                        alt="imagen de un arbol de cerezo"
                        className="hidden lg:block w-full h-full object-cover col-span-1 aspect-[9/16] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                    />
                </div>
            </div>
        </SectionContainer>
    )

}