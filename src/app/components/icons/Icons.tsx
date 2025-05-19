/* eslint-disable @next/next/no-img-element */
export function AddToCartIcon({ className }: { className?: string }) {
    return (
        <img src="/ShoppingCart.svg" alt="imagen de un bolsa de compras" className={`${className ? className : "size-7"}`} />
    );
}

export function RemoveFromCart() {
    return (
        <img src="/RemoveItem.svg" alt="imagen de un bote de basura" className="size-7" />
    );
}

export function Plus() {
    return (
        <div className="size-7">
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>

    )
}

export function Minus() {
    return (
        <div className="size-7">
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

export function Trash2() {
    return (
        <div className="size-7">
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

export function Oferta() {
    return (
        <div className="size-4 mr-2">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 7.5L15.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="7.5" cy="18.5" r="2" fill="currentColor" />
                <circle cx="16.5" cy="5.5" r="2" fill="currentColor" />
            </svg>
        </div>
    )
}

export const ChevronDown = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = ""
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
}