import { useState } from 'react';
import { ChevronDown } from './icons/Icons';

export const AccordionDemo = () => {
    return (
        <div className="w-full max-w-3xl my-20 p-6 bg-secondary dark:bg-gray-900 rounded-xl shadow-lg">
            {/* Elementos decorativos */}
            <div className="relative">
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-tertiary/50 dark:bg-gray-700/50 opacity-50 z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-tertiary/50 dark:bg-gray-700/50 opacity-50 z-0"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-accent dark:text-gray-200 mb-2">Preguntas Frecuentes</h2>
                    <div className="w-20 h-1 bg-accent rounded-full mb-6"></div>

                    <Accordion items={accordionData} />

                    <div className="w-full h-1 bg-gradient-to-r from-accent/70 to-transparent rounded-full mt-6"></div>
                </div>
            </div>
        </div>
    );
};

type AccordionItemType = {
    title: string;
    content: React.ReactNode;
};

interface AccordionProps {
    items: AccordionItemType[];
}

export const Accordion = ({ items }: AccordionProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
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

type AccordionItemProps = {
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
};

const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps) => {
    return (
        <div className="border border-accent/20 rounded-lg overflow-hidden shadow-sm transition-all duration-300">
            <button
                className={`w-full p-4 text-left flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-tertiary/30 dark:bg-gray-800' : 'bg-secondary dark:bg-gray-900 hover:bg-tertiary/20 dark:hover:bg-gray-800/50'
                    }`}
                onClick={onClick}
            >
                <span className="font-medium text-lg text-accent dark:text-gray-200">{title}</span>
                <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="p-4 bg-secondary dark:bg-gray-900 border-l-4 border-accent/30">
                    {content}
                </div>
            </div>
        </div>
    );
};

const accordionData = [
    {
        title: "¿Cuánto tiempo duran los arreglos?",
        content: (
            <p className="text-text">
                Nuestros arreglos florales están diseñados para durar entre 7 y 10 días, dependiendo del tipo de flores
                y los cuidados que reciban. Para una mayor duración, recomendamos mantenerlos en un lugar fresco,
                lejos de la luz solar directa y cambiar el agua cada 2 días.
            </p>
        )
    },
    {
        title: "¿Ofrecen servicio de entrega?",
        content: (
            <p className="text-text">
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
                <p className="text-text">Aceptamos diversas formas de pago para tu comodidad:</p>
                <ul className="list-disc pl-5 mt-2 text-text">
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
                <p className="text-text">
                    ¡Por supuesto! Nos encanta crear diseños personalizados que reflejen tus gustos y necesidades.
                    Puedes elegir el tipo de flores, colores, tamaño y estilo. También podemos incluir elementos
                    adicionales como peluches, chocolates o tarjetas personalizadas.
                </p>
                <p className="mt-2 text-text">
                    Para solicitar un arreglo personalizado, contáctanos con al menos 48 horas de anticipación.
                </p>
            </div>
        )
    }
];
