export interface Producto {
    id: number;
    tipo: string;
    descripción: string;
    maceta: string;
    opciones_maceta: string[];
    nivel_cuidado: string;
    precio_estimado: number;
    imagen: string;
    moneda: string,
    categoría: string;
    cantidad?: number;
    stock: number;
    rating: number;
    descuento: number;
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