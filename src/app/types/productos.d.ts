export interface Producto {
    id: number;
    tipo: string;
    descripción: string;
    maceta: string;
    nivel_cuidado?: string;
    precio_fuera_temporada?: number;
    moneda: string;
    imagen: string;
    categoría: string;
    stock?: number;
    descuento?: number;
    rating?: number;
    precio_estimado: number;
    precio_promedio?: PrecioPromedio;
    tamaños_maceta?: string[];
    nombre?: string;
    nombre_cientifico?: string;
    significado?: string;
    aroma?: string;
    cantidad?: number;
    opciones_maceta?: string[];
    temporada_crecimiento?: string;
    createdAt?: string;

}

export interface ProductoCategoria {
    category: string;
    img: string;
    // Agregar otras propiedades según tu tipo de datos
}
export interface CategoryCardProps {
    categoria: string;
    imagen: string;
}



type Productos = {
    vid: string;
    title: string;
    link: string;
    data: ListOfProductos;
}

export interface FiltersState {
    nivel_cuidado: string;
    minimo: number;
}


export interface FiltroContextType {
    filters: FiltersState;
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}


export type ListOfProductos = Producto[];

export interface Props {
    producto: ListOfProductos;
    setProducto: Productos;
    handleClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}


export interface CartContextType {
    cart: ListOfProductos
    addToCart: (item: Producto) => void
    removeFromCart: (item: Producto) => void
    clearCart: () => void
    reduceCantidad: (item: Producto) => void
}