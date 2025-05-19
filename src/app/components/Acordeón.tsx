import { useState } from 'react';
import { ChevronDown } from './icons/Icons';

export const AccordionDemo = () => {
    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {/* Elementos decorativos */}
            <div className="relative">
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#ffc0d0] opacity-50 z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-[#ffc0d0] opacity-50 z-0"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-[#e0718d] mb-2">Preguntas Frecuentes</h2>
                    <div className="w-20 h-1 bg-[#f291ab] rounded-full mb-6"></div>

                    <Accordion items={accordionData} />

                    <div className="w-full h-1 bg-gradient-to-r from-[#f291ab]/70 to-transparent rounded-full mt-6"></div>
                </div>
            </div>
        </div>
    );
};

export const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={activeIndex === index}
                    onClick={() => toggleAccordion(index)}
                />
            ))}
        </div>
    );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border border-[#f291ab]/20 rounded-lg overflow-hidden shadow-sm transition-all duration-300">
            <button
                className={`w-full p-4 text-left flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-[#f291ab]/10' : 'bg-white hover:bg-[#f291ab]/5'
                    }`}
                onClick={onClick}
            >
                <span className="font-medium text-lg text-[#e0718d]">{title}</span>
                <ChevronDown
                    className={`w-5 h-5 text-[#f291ab] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="p-4 bg-white border-l-4 border-[#f291ab]/30">
                    {content}
                </div>
            </div>
        </div>
    );
};

// Datos de ejemplo para el acordeón
const accordionData = [
    {
        title: "¿Cuánto tiempo duran los arreglos?",
        content: (
            <p className="text-gray-700">
                Nuestros arreglos florales están diseñados para durar entre 7 y 10 días, dependiendo del tipo de flores
                y los cuidados que reciban. Para una mayor duración, recomendamos mantenerlos en un lugar fresco,
                lejos de la luz solar directa y cambiar el agua cada 2 días.
            </p>
        )
    },
    {
        title: "¿Ofrecen servicio de entrega?",
        content: (
            <p className="text-gray-700">
                Sí, contamos con servicio de entrega en toda la ciudad. Las entregas se realizan de lunes a sábado
                en horario de 9:00 a.m. a 7:00 p.m. Para pedidos especiales o entregas urgentes, contáctanos
                directamente para verificar disponibilidad.
            </p>
        )
    },
    {
        title: "¿Qué métodos de pago aceptan?",
        content: (
            <div>
                <p className="text-gray-700">Aceptamos diversas formas de pago para tu comodidad:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                    <li>Tarjetas de crédito y débito</li>
                    <li>Transferencias bancarias</li>
                    <li>Pago en efectivo (solo en tienda)</li>
                    <li>Aplicaciones de pago móvil</li>
                </ul>
            </div>
        )
    },
    {
        title: "¿Puedo personalizar mi arreglo floral?",
        content: (
            <div>
                <p className="text-gray-700">
                    ¡Por supuesto! Nos encanta crear diseños personalizados que reflejen tus gustos y necesidades.
                    Puedes elegir el tipo de flores, colores, tamaño y estilo. También podemos incluir elementos
                    adicionales como peluches, chocolates o tarjetas personalizadas.
                </p>
                <p className="mt-2 text-gray-700">
                    Para solicitar un arreglo personalizado, contáctanos con al menos 48 horas de anticipación.
                </p>
            </div>
        )
    }
];
