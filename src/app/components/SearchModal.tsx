'use client'
import { useEffect, useRef } from 'react'
import PlaceholderChanger from './PlaceholderChanger'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.addEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="flex items-start justify-center min-h-screen pt-16 px-4">
                <div
                    ref={modalRef}
                    className="w-full h-120 max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-slide-up"
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Buscar Productos
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                aria-label="Cerrar búsqueda"
                            >
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="relative">
                            <PlaceholderChanger />
                        </div>

                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            <p>Busca por tipo de producto, categoría o nombre específico</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
