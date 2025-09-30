
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "./icons/Icons";
import { Producto } from "../types/productos";

export default function ImprovedBreadcrumb({ item }: { item: Producto }) {
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const breadcrumbItems = [
        { label: "Home", href: "/", isHome: true },
        { label: item.categoría, href: `/categoria/${item.categoría.toLowerCase()}` },
        { label: item.tipo, href: "#", current: true }
    ];

    return (
        <nav
            aria-label="Breadcrumb"
            className="py-2 px-3 md:py-4 md:px-5 xl:rounded-2xl shadow-md bg-secondary"
        >
            <ol className="flex flex-wrap items-center md:gap-2">
                {breadcrumbItems.map((breadcrumbItem, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    const isHovered = hoveredIndex === index;

                    return (
                        <li
                            key={index}
                            className="inline-flex items-center"
                            onMouseEnter={() => !isLast && setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(-1)}
                        >
                            {/* Separador */}
                            {index > 0 && (
                                <ChevronDown
                                    className="mx-2 text-gray-400 flex-shrink-0"
                                    size={16}
                                />
                            )}

                            {/* Elemento actual (último) */}
                            {isLast ? (
                                <span
                                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm bg-tertiary text-text"
                                    aria-current="page"
                                >
                                    <span className="truncate max-w-[150px] sm:max-w-none">
                                        {breadcrumbItem.label}
                                    </span>
                                </span>
                            ) : (
                                /* Enlaces navegables */
                                <Link
                                    href={breadcrumbItem.href}
                                    className={`inline-flex items-center gap-2 text-sm font-medium px-2 py-1 md:px-4 md:py-2 rounded-lg ${isHovered ? 'bg-primary text-accent' : 'transparent text-text'}`}
                                >
                                    <span
                                        className="truncate max-w-[150px] sm:max-w-none transition-transform duration-300"
                                        style={{
                                            transform: isHovered ? 'translateX(2px)' : 'translateX(0)'
                                        }}
                                    >
                                        {breadcrumbItem.label}
                                    </span>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}