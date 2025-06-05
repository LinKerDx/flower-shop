/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { DatosProducto } from "../services/producto";
import { Producto } from "../types/productos";
import Link from "next/link";

export default function PlaceholderChanger() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredResults, setFilteredResults] = useState<Producto[]>([]);
  const [index, setIndex] = useState(0);
  const { producto } = DatosProducto()



  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    { text: "Cáctus", img: "/imgs/cactaceas/cactacea.svg" },
    { text: "Flores", img: "/imgs/flores/flores.svg" },
    { text: "Plantas", img: "/imgs/variedad/variedad.svg" },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 5000);

    return () => clearInterval(interval);
  },);

  const current = placeholders[index];

  // Filter results based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = producto.filter(item =>
        item.tipo.toLowerCase().includes(query.toLowerCase()) ||
        item.categoría.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(producto);
    }
    setSelectedIndex(-1);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(filteredResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (item: Producto) => {
    setQuery(item.tipo);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src={current.img} alt="icono" className="size-5" />

        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Buscar productos..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-1 md:pl-10 md:pr-12 xl:pl-13 xl:pr-18 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-200 ease-in-out
                     placeholder-gray-400 text-gray-700
                     hover:border-gray-400"
          aria-label="Campo de búsqueda"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-dropdown-listbox"
          role="combobox"
        />
        

        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-5 flex items-center
                       hover:text-gray-600 transition-colors duration-150 cursor-pointer"
            aria-label="Limpiar búsqueda"
          >
            X
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 
                        rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <ul role="listbox" className="py-1">
              {filteredResults.map((item, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-150
                             hover:bg-blue-50 border-b border-gray-100 last:border-b-0
                             ${selectedIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                <Link href={`/producto/${item.id}`}>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.tipo}</span>
                    <span className="text-sm text-gray-500">{item.categoría}</span>
                  </div>
                </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};



