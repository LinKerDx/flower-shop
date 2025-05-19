'use client';
import { useId } from "react";
import { useFilters } from "../hooks/useFilters";
import { FiltersState } from "../types/productos";

export function Filtro() {
    const { filters, setFilters } = useFilters()
    const minPriceFilterId = useId();
    const careLevelFilterId = useId();

    const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prevState => ({
            ...prevState,
            minimo: Number(e.target.value),
        }));
    };

    const handleSelectCare = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters((prevState: FiltersState) => ({
            ...prevState,
            nivel_cuidado: e.target.value,
        }));
    };

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 md:gap-8">
                <div className="flex  flex-col md:flex-rows gap-2 items-center">
                    <label htmlFor={minPriceFilterId} className="text-lg font-semibold">Precio Mínimo</label>
                    <input onChange={handleChangeMinPrice} value={filters.minimo} type="range" id={minPriceFilterId} min={0} max={100} className="border rounded" />
                    <output>${filters.minimo}</output>
                </div>
                <div className="flex flex-col md:flex-rows gap-2 items-center">
                    <label htmlFor={careLevelFilterId} className="text-lg font-semibold">Tipo de Cuidado</label>
                    <select onChange={handleSelectCare} id={careLevelFilterId} className="p-2 border rounded">
                        <option value="todo">Todo</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto (flores cortadas)">Alto</option>
                    </select>
                </div>
            </div>
        </section>
    );
}