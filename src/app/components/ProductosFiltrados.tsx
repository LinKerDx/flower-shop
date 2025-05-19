import { useFuegosArtificiales } from "../hooks/useFuegosArtificiales";
import { DatosProducto } from "../services/producto";
import FuegosArtificiales from "./FuegosArtificiales";
import NoEncuentraProductos from "./NoEncuentraProductos";
import ProductCard from "./ProductCard";



export function ProductosFiltrados() {
    const { productosFiltrados } = DatosProducto();
    const tieneProductosFiltrados = productosFiltrados.length > 0;
    const { lanzarFuegos, disparar } = useFuegosArtificiales()


    return (
        <>
            <FuegosArtificiales disparar={disparar} />

            {
                tieneProductosFiltrados
                    ? productosFiltrados.map(item => { return <ProductCard key={item.id} item={item} onClick={() => lanzarFuegos()} /> })
                    : <NoEncuentraProductos />
            }
        </>
    )
}