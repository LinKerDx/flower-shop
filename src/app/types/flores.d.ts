export interface PrecioPromedio {
    unidad: number;
    docena: number;
}

export type NivelCuidado =
    | "Bajo mantenimiento"
    | "Mantenimiento medio"
    | "Alto mantenimiento";

export type TemporadaCrecimiento =
    | "Primavera"
    | "Verano"
    | "Otoño"
    | "Invierno"
    | "Primavera-Verano"
    | "Verano-Otoño"
    | "Otoño-Invierno"
    | "Invierno-Primavera"
    | "Primavera-Verano-Otoño"
    | "Otoño-Invierno-Primavera"
    | "Todo el año";

export type Moneda = "euros" | "dolares" | "pesos";

export interface Flor {
    id: number;
    tipo: string;
    nombre: string;
    nombre_cientifico: string;
    significado: string;
    aroma: string;
    precio_promedio: PrecioPromedio;
    descripción: string;
    maceta: string;
    opciones_maceta: string[];
    nivel_cuidado: NivelCuidado;
    temporada_crecimiento: TemporadaCrecimiento;
    precio_estimado: number;
    precio_fuera_temporada: number;
    moneda: Moneda;
    imagen: string;
    categoría: string;
    stock: number;
    descuento: number;
    rating: number;
}

export type CatalogoFlores = Flor[];
