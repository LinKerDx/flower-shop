import { ListOfProductos, Producto, ProductoPersonalizado } from "../types/productos";

export const getInitialCartState = (): ListOfProductos => {
    if (typeof window !== 'undefined') {
        const storedCart = window.localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // en el servidor, devolver vacío
};

export const CART_ACTIONS_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    REDUCE_CANTIDAD: 'REDUCE_CANTIDAD',
};

export const updateLocalStorage = (state: ListOfProductos) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(state));
    }
};

export const cartReducer = (state: ListOfProductos, action: { type: string, payload?: Producto | ProductoPersonalizado }) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case CART_ACTIONS_TYPES.ADD_TO_CART: {
            if (!actionPayload) return state;

            const { id } = actionPayload;
            const itemInCartIndex = state.findIndex((i) => i.id === id);

            const newState = itemInCartIndex >= 0
                ? [
                    ...state.slice(0, itemInCartIndex),
                    { ...state[itemInCartIndex], cantidad: (state[itemInCartIndex].cantidad ?? 0) + 1 },
                    ...state.slice(itemInCartIndex + 1),
                ]
                : [...state, { ...actionPayload, cantidad: 1 }];

            updateLocalStorage(newState);
            return newState;
        }
        case CART_ACTIONS_TYPES.REDUCE_CANTIDAD: {
            if (!actionPayload) return state;
            const itemInCartIndex = state.findIndex((i) => i.id === actionPayload.id);
            const newState = itemInCartIndex >= 0 && state[itemInCartIndex]
                ? [
                    ...state.slice(0, itemInCartIndex),
                    { ...state[itemInCartIndex], cantidad: (state[itemInCartIndex]?.cantidad ?? 0) - 1 },
                    ...state.slice(itemInCartIndex + 1),
                ]
                : state;
            updateLocalStorage(newState);
            return newState;
        }
        case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
            if (!actionPayload) return state;
            const newState = state.filter((i) => i.id !== actionPayload.id);
            updateLocalStorage(newState);
            return newState;
        }
        case CART_ACTIONS_TYPES.CLEAR_CART: {
            updateLocalStorage([]);
            return [];
        }
        default:
            return state;
    }
};
