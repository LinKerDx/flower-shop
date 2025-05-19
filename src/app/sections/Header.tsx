/* eslint-disable @next/next/no-img-element */
'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    ClerkProvider,
} from '@clerk/nextjs'
import PlaceholderChanger from "../components/PlaceholderChanger"



const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Servicios', path: '/services' },
    { name: 'Testimonios', path: '/testimonials' },
]


export default function Header() {

    const pathname = usePathname()
    return (
        <ClerkProvider>
            <header className="bg-primary px-1 md:px-4 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
                <nav className="flex justify-between items-center ">
                    <Link href="/" className="overflow-hidden ">
                        <img src="/logo.svg" alt="imagen del logo Pétalo y Verso" className="w-35 object-contain" />
                    </Link>
                    <div>
                        <form className="flex items-center gap-2 bg-white rounded-full px-4 py-1">
                            <PlaceholderChanger />
                            <button type="submit" className="cursor-pointer">
                                <img src="/lupa.svg" alt="lupa para buscar" className="size-4 md:size-6" />
                            </button>
                        </form>
                    </div>
                    <div className="flex gap-4">
                        <SignedOut>
                            <div className="hover:text-gray-400 cursor-pointer">
                                <SignInButton mode="modal">Ingresar</SignInButton>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>
                <div className="hidden">
                    <ul className="space-x-4 hidden md:flex">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.path} className={`hover:text-gray-400 ${pathname === link.name ? 'bg-[#59f999]' : ''} `}><p >{link.name}</p></Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </header>
        </ClerkProvider>
    )
}