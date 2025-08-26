/* eslint-disable @next/next/no-img-element */
'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useContext } from "react"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    ClerkProvider,
} from '@clerk/nextjs'
import PlaceholderChanger from "../components/PlaceholderChanger"
import SearchModal from "../components/SearchModal"
import ThemeToggle from "../components/ThemeToggle"
import { CartContext } from "../context/cart"

const navLinks = [
    { name: 'Inicio', path: '/', icon: '🏠' },
    { name: 'Flores', path: '/categoria/Flores', icon: '🌸' },
    { name: 'Cactáceas', path: '/categoria/Cactus', icon: '🌵' },
    { name: 'Variedad', path: '/categoria/Variedad', icon: '🌿' },
    { name: 'Personalizado', path: '/ArregloPersonalizado', icon: '✨' },
]

export default function Header() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { cart } = useContext(CartContext)

    // Calculate total items in cart
    const cartItemCount = cart.reduce((total, item) => total + (item.cantidad || 0), 0)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <ClerkProvider>
            <header className={`
                fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${isScrolled
                    ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary-dark/20'
                    : 'bg-primary/90 backdrop-blur-sm'
                }
            `}>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
                            <img
                                src="/logo.svg"
                                alt="Pétalo y Verso - Florería"
                                className="h-12 w-auto sm:h-14 lg:h-16 object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`
                                        px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                        hover:bg-primary-dark/50 hover:scale-105 hover:shadow-sm
                                        flex items-center gap-2
                                        ${pathname === link.path
                                            ? 'bg-primary-dark text-primary-font shadow-md'
                                            : 'text-primary-font/80 hover:text-primary-font'
                                        }
                                    `}
                                >
                                    <span className="text-base">{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-md mx-6">
                            <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                <PlaceholderChanger />
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-2">
                            {/* Search Button - Mobile */}
                            <button
                                className="md:hidden p-2 rounded-lg hover:bg-primary-dark/50 transition-colors"
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Buscar productos"
                            >
                                <img src="/lupa.svg" alt="Buscar" className="w-5 h-5" />
                            </button>

                            {/* User Authentication */}
                            <div className="flex items-center">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="
                                            px-4 py-2 text-sm font-medium rounded-lg
                                            bg-primary-dark hover:bg-primary-dark/80
                                            text-primary-font shadow-sm hover:shadow-md
                                            transition-all duration-200 hover:scale-105
                                        ">
                                            Ingresar
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <div className="ml-2 flex justify-items-center">
                                        <UserButton
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-8 h-8 hover:scale-110 transition-transform"
                                                }
                                            }}
                                        />
                                    </div>
                                </SignedIn>
                            </div>

                            {/* Theme Toggle */}
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>


                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 rounded-lg hover:bg-primary-dark/50 transition-colors"
                                onClick={toggleMenu}
                                aria-label="Menú de navegación"
                                aria-expanded={isMenuOpen}
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={`
                                        block w-5 h-0.5 bg-primary-font transition-all duration-300
                                        ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}
                                    `} />
                                    <span className={`
                                        block w-5 h-0.5 bg-primary-font mt-1 transition-all duration-300
                                        ${isMenuOpen ? 'opacity-0' : ''}
                                    `} />
                                    <span className={`
                                        block w-5 h-0.5 bg-primary-font mt-1 transition-all duration-300
                                        ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}
                                    `} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`
                        lg:hidden transition-all duration-300 ease-in-out overflow-hidden
                        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                        <div className="py-4 space-y-2 border-t border-primary-dark/20">
                            {/* Mobile Search */}
                            <div className="md:hidden mb-4">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-sm">
                                    <PlaceholderChanger />
                                </div>
                            </div>

                            {/* Mobile Navigation Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg
                                        text-base font-medium transition-all duration-200
                                        hover:bg-primary-dark/50 hover:translate-x-1
                                        ${pathname === link.path
                                            ? 'bg-primary-dark text-primary-font shadow-sm'
                                            : 'text-primary-font/80'
                                        }
                                    `}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>


            {/* Search Modal */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </ClerkProvider>
    )
}