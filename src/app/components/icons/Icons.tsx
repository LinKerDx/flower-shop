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

export function arregloPersonalizadoIcon() {
    return (
        <div className="size-7">
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="size-7"
            >
                <defs>
                    <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b6b" stopOpacity="1" />
                        <stop offset="50%" stopColor="#ff8e8e" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ffa8a8" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#51cf66" stopOpacity="1" />
                        <stop offset="100%" stopColor="#69db7c" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="vasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#495057" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6c757d" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2"/>
                <path d="M35 75 L35 70 Q35 65 40 65 L60 65 Q65 65 65 70 L65 75 Q65 80 60 80 L40 80 Q35 80 35 75 Z" fill="url(#vasGradient)"/>
                <line x1="42" y1="65" x2="38" y2="35" stroke="#51cf66" stroke-width="2"/>
                <line x1="50" y1="65" x2="50" y2="25" stroke="#51cf66" stroke-width="2"/>
                <line x1="58" y1="65" x2="62" y2="40" stroke="#51cf66" stroke-width="2"/>
                <ellipse cx="40" cy="50" rx="6" ry="3" fill="url(#leafGradient)" transform="rotate(-20 40 50)"/>
                <ellipse cx="55" cy="45" rx="5" ry="2.5" fill="url(#leafGradient)" transform="rotate(15 55 45)"/>
                <g transform="translate(38,30)">
                    <circle cx="0" cy="0" r="3" fill="url(#flowerGradient)"/>
                    <circle cx="-2" cy="-2" r="2.5" fill="url(#flowerGradient)" opacity="0.8"/>
                    <circle cx="2" cy="-2" r="2.5" fill="url(#flowerGradient)" opacity="0.8"/>
                    <circle cx="-2" cy="2" r="2.5" fill="url(#flowerGradient)" opacity="0.8"/>
                    <circle cx="2" cy="2" r="2.5" fill="url(#flowerGradient)" opacity="0.8"/>
                    <circle cx="0" cy="0" r="1.5" fill="#fff9c4"/>
                </g>
                <g transform="translate(50,20)">
                    <circle cx="0" cy="0" r="4" fill="#ff8787"/>
                    <circle cx="-3" cy="-2" r="3" fill="#ff8787" opacity="0.9"/>
                    <circle cx="3" cy="-2" r="3" fill="#ff8787" opacity="0.9"/>
                    <circle cx="-2" cy="3" r="3" fill="#ff8787" opacity="0.9"/>
                    <circle cx="2" cy="3" r="3" fill="#ff8787" opacity="0.9"/>
                    <circle cx="0" cy="0" r="2" fill="#fff3bf"/>
                </g>
                <g transform="translate(62,35)">
                    <circle cx="0" cy="0" r="2.5" fill="#ffa8a8"/>
                    <circle cx="-2" cy="-1.5" r="2" fill="#ffa8a8" opacity="0.8"/>
                    <circle cx="2" cy="-1.5" r="2" fill="#ffa8a8" opacity="0.8"/>
                    <circle cx="-1.5" cy="2" r="2" fill="#ffa8a8" opacity="0.8"/>
                    <circle cx="1.5" cy="2" r="2" fill="#ffa8a8" opacity="0.8"/>
                    <circle cx="0" cy="0" r="1" fill="#fff9c4"/>
                </g>
                <circle cx="25" cy="25" r="1.5" fill="#ffd43b" opacity="0.6"/>
                <circle cx="75" cy="30" r="1" fill="#ffd43b" opacity="0.6"/>
                <circle cx="70" cy="70" r="1.5" fill="#69db7c" opacity="0.6"/>
                <rect x="20" y="85" width="60" height="8" rx="4" fill="#495057" opacity="0.1"/>
                <text x="50" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" fill="#495057" opacity="0.7">PERSONALIZADO</text>
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