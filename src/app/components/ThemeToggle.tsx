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
            // Aplicamos los nuevos colores del modo oscuro
            root.style.setProperty('--background', '#1E201E')
            root.style.setProperty('--foreground', '#ECDFCC')
        } else {
            root.classList.remove('dark')
            // Mantenemos los colores del modo claro
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
            <button className="p-2 rounded-lg transition-colors opacity-50 bg-secondary/50 dark:bg-secondary/50"
                disabled>
                <svg className="w-5 h-5 text-accent"
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
            className="p-2 rounded-lg hover:bg-secondary/70 dark:hover:bg-secondary/70 transition-all duration-300 hover:scale-110 relative group cursor-pointer"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            <div className="relative overflow-hidden">
                {isDark ? (
                    // Sun icon - usando la nueva paleta
                    <svg className="w-5 h-5 transition-all duration-500 animate-spin text-yellow-400"
                        style={{ animationDuration: '2s' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    // Moon icon - usando la nueva paleta
                    <svg className="w-5 h-5 transition-all duration-500 text-accent"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}

                {/* Background circle indicator - usando la nueva paleta */}
                <div className={`
                    absolute inset-0 rounded-full transition-all duration-300 -z-10
                    scale-0 group-hover:scale-150 bg-accent/20
                `} />
            </div>

            {/* Tooltip - usando la nueva paleta */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none bg-accent text-white px-2 py-1">
                {isDark ? 'Modo claro' : 'Modo oscuro'}
            </div>
        </button>
    )
}