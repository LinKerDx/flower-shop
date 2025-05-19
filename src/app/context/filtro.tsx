'use client'
import { createContext, useState, ReactNode } from 'react'
import { FiltroContextType } from '../types/productos'


export const FiltroContext = createContext<FiltroContextType>({
    filters: { nivel_cuidado: 'todo', minimo: 0 },
    setFilters: () => { }
})

export function FiltroProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState({
        nivel_cuidado: 'todo',
        minimo: 0,
    })

    return (
        <FiltroContext.Provider
            value={{
                filters,
                setFilters
            }}
        >
            {children}
        </FiltroContext.Provider>
    )
}