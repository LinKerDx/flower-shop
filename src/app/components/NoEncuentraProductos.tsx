export default function NoEncuentraProductos() {
    return (
        <div className="flex flex-col items-center justify-center mt-20 gap-10 col-span-full h-120">
            <h2 className="text-2xl font-bold">No hay productos que coincidan con los filtros seleccionados.</h2>
            <p className="text-lg">Intenta ajustar los filtros o restablecerlos.</p>
        </div>

    )
}