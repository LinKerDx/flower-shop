import { useRef, useState } from "react";
import { toast } from "sonner";
import { CreditCardIcon, LockIcon } from "./icons/Icons";
import { useClickOutsideAndEscape } from "../hooks/useModalClose";


export default function SistemaDePago() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: ""
    });

    const modalRef = useRef<HTMLDivElement | null>(null);


    useClickOutsideAndEscape({
        enabled: isModalOpen,
        onClose: () => onClose(),
        ref: modalRef
    });

    const openModal = () => {
        setIsModalOpen(true);
        setPaymentStatus("");
    };

    const onClose = () => {
        setIsModalOpen(false);
        setPaymentStatus("");
        setIsProcessing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "cardNumber") {
            formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
        }
        if (name === "expiryDate") {
            formattedValue = value.replace(/\D/g, "");

            // Validar que el mes no sea mayor a 12
            if (formattedValue.length >= 2) {
                const month = parseInt(formattedValue.slice(0, 2));
                if (month > 12) {
                    formattedValue = "12" + formattedValue.slice(2);
                } else if (month === 0) {
                    formattedValue = "01" + formattedValue.slice(2);
                }
            }

            if (formattedValue.length > 2) {
                formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
            }
            formattedValue = formattedValue.slice(0, 5);
        }
        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setCardInfo({ ...cardInfo, [name]: formattedValue });
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setPaymentStatus("processing");

        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStatus("success");

            setTimeout(() => {
                setCardInfo({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
                onClose();
            }, 2000);
        }, 2000);
    };

    const isFormValid =
        cardInfo.cardNumber.replace(/\s/g, "").length >= 16 &&
        cardInfo.cardHolder.length > 3 &&
        cardInfo.expiryDate.length === 5 &&
        cardInfo.cvv.length >= 3;

    return (
        <div className="flex flex-col items-center justify-center ">
            {/* Payment Button */}
            <button
                onClick={openModal}
                className="flex items-center justify-center bg-accent gap-3 py-2 px-5 md:max-w-44 text-sm font-semibold text-white rounded-xl shadow-lg transition-all duration-300 hover:opacity-90 cursor-pointer w-full"
            >
                <CreditCardIcon />
                Pagar ahora
            </button>

            {/* Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div
                        ref={modalRef}
                        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all"
                        style={{ animation: 'slideIn 0.3s ease-out' }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent" />
                                    <div>
                                        <h2 className="text-2xl font-bold text-text">Pago Seguro</h2>
                                        <p className="text-sm text-gray-600">Información encriptada</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50 text-text"
                                >
                                    X
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-5">
                            {/* Card Number */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-text" >
                                    Número de Tarjeta
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={cardInfo.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors pr-10 ${cardInfo.cardNumber.length > 0 ? 'bg-accent' : '#e5e7eb'}`}
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" >
                                        <CreditCardIcon
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Card Holder */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-text">
                                    Nombre del Titular
                                </label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    value={cardInfo.cardHolder}
                                    onChange={handleInputChange}
                                    placeholder="NOMBRE APELLIDO"
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors uppercase ${cardInfo.cardHolder.length > 0 ? 'bg-accent' : '#e5e7eb'}`}
                                />
                            </div>

                            {/* Expiry Date and CVV */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-text">
                                        Fecha de Expiración
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={cardInfo.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors
                                            ${cardInfo.expiryDate.length > 0 ? 'bg-accent' : '#e5e7eb'}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-text">
                                        CVV
                                    </label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        value={cardInfo.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength={3}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors 
                                            ${cardInfo.cvv.length > 0 ? 'bg-accent' : '#e5e7eb'}`}
                                    />
                                </div>
                            </div>

                            {/* Status Message */}
                            {paymentStatus === "success" && (
                                <span className="hidden">
                                    {paymentStatus && (
                                        toast.success(paymentStatus)
                                    )}
                                </span>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing || !isFormValid}
                                className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transition-all duration-300 flex  items-center justify-center gap-2  ${isProcessing || !isFormValid
                                    ? "opacity-50 cursor-not-allowed bg-accent"
                                    : "hover:opacity-90 hover:shadow-xl active:scale-98 #d1d5db"
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Procesando pago...
                                    </>
                                ) : (
                                    <>
                                        Confirmar Pago
                                    </>
                                )}
                            </button>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <LockIcon />
                                <p className="text-xs text-gray-500">Protegido con encriptación SSL de 256 bits</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}



