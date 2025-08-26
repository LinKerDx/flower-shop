'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Check saved theme or system preference
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && systemPrefersDark)

        setIsDark(shouldBeDark)
        applyTheme(shouldBeDark)
    }, [])

    const applyTheme = (isDarkMode: boolean) => {
        const root = document.documentElement

        if (isDarkMode) {
            root.classList.add('dark')
            // Mantenemos los mismos colores principales
            root.style.setProperty('--background', '#1a1a1a')
            root.style.setProperty('--foreground', '#ffffff')
        } else {
            root.classList.remove('dark')
            // Mantenemos los colores originales
            root.style.setProperty('--background', '#ffffff')
            root.style.setProperty('--foreground', '#171717')
        }
    }

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        applyTheme(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <button className="p-2 rounded-lg transition-colors opacity-50"
                style={{ backgroundColor: 'rgb(244, 193, 207)' }}
                disabled>
                <svg className="w-5 h-5"
                    style={{ color: '#f291ab' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </button>
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-primary-dark/50 transition-all duration-300 hover:scale-110 relative group"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            <div className="relative overflow-hidden">
                {isDark ? (
                    // Sun icon - usando solo los dos colores especificados
                    <svg className="w-5 h-5 transition-all duration-500 animate-spin"
                        style={{ animationDuration: '2s', color: '#f291ab' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    // Moon icon - usando solo los dos colores especificados
                    <svg className="w-5 h-5 transition-all duration-500"
                        style={{ color: '#f291ab' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}

                {/* Background circle indicator - usando solo los dos colores */}
                <div className={`
                    absolute inset-0 rounded-full transition-all duration-300 -z-10
                    scale-0 group-hover:scale-150
                `}
                    style={{
                        backgroundColor: 'rgba(242, 145, 171, 0.2)' // #f291ab con transparencia
                    }} />
            </div>

            {/* Tooltip - usando solo los dos colores */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
                style={{
                    backgroundColor: '#f291ab',
                    color: '#ffffff'
                }}>
                {isDark ? 'Modo claro' : 'Modo oscuro'}
            </div>
        </button>
    )
}