
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "./icons/Icons";
import { Producto } from "../types/productos";

export default function ImprovedBreadcrumb({ item }: { item: Producto }) {
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const breadcrumbItems = [
        { label: "Home", icon: ChevronDown, href: "/" },
        { label: `${item.categoría}`, icon: ChevronDown, href: `/categoria/${item.categoría}` },
        { label: `${item.tipo}`, icon: ChevronDown, href: "#", current: true }
    ];

    return (
        <nav aria-label="Breadcrumb" className="py-3 md:px-4 bg-primary-dark rounded-lg shadow-sm">
            <ol className="inline-flex items-center md:gap-2">
                {breadcrumbItems.map((item, index) => {
                    const Icon = item.icon;
                    const isLast = index === breadcrumbItems.length - 1;
                    const isHovered = hoveredIndex === index;

                    return (
                        <li
                            key={index}
                            className="inline-flex items-center"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(-1)}
                        >
                            {index > 0 && (
                                <ChevronDown
                                    className="mx-1 md:mx-2 text-gray-400"
                                    size={16}
                                />
                            )}

                            {isLast ? (
                                <span
                                    className="inline-flex items-center text-sm font-medium text-gray-600 bg-gray-100 py-1 px-3 rounded-md"
                                    aria-current="page"
                                >
                                    <Icon
                                        size={16}
                                        className="mr-1.5 text-gray-500"
                                    />
                                    <span>{item.label}</span>
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`
                    inline-flex items-center text-sm font-medium py-1 px-3 
                    ${isHovered ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600"} 
                    rounded-md transition-all duration-200
                `}
                                >
                                    <Icon
                                        size={16}
                                        className={`mr-1.5 ${isHovered ? "text-blue-500 transform scale-110" : "text-gray-500"} transition-all duration-200`}
                                    />
                                    <span className={`${isHovered ? "translate-x-0.5" : ""} transition-transform duration-200`}>
                                        {item.label}
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