import { useEffect } from "react";

interface Options {
    enabled?: boolean; // para activar o desactivar
    onClose: () => void; // acción al cerrar
    ref: React.RefObject<HTMLElement | null>; // referencia al elemento
}

export function useClickOutsideAndEscape({ enabled = true, onClose, ref }: Options) {
    useEffect(() => {
        if (!enabled) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [enabled, onClose, ref]);
}