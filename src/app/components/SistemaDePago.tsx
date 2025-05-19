import { useState } from "react";
import { toast } from "sonner";


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

    const openModal = () => {
        setIsModalOpen(true);
        setPaymentStatus("");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPaymentStatus("");
        setIsProcessing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;
        // Format card number with spaces every 4 digits
        if (name === "cardNumber") {
            formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
        }
        // Format expiry date as MM/YY
        if (name === "expiryDate") {
            formattedValue = value.replace(/\D/g, "");
            if (formattedValue.length > 2) {
                formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
            }
            formattedValue = formattedValue.slice(0, 5);
        }
        // Limit CVV to 3 or 4 digits
        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setCardInfo({ ...cardInfo, [name]: formattedValue });
    };

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);
        setPaymentStatus("Procesando pago...");

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStatus("¡Pago completado con éxito!");

            // Reset form and close modal after success
            setTimeout(() => {
                setCardInfo({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
                closeModal();
            }, 1500);
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
                className="badges flex items-center justify-center p-2 text-sm  text-white bg-blue-600 rounded-md shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95 hover:shadow-lg"
            >
                <svg
                    className="size-7 mr-2"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="20" height="16" rx="2" fill="white" />
                    <rect y="3" width="20" height="3" fill="#000" />
                    <rect y="11" width="12" height="2" rx="1" fill="#888" />
                </svg>
                Pagar ahora
            </button>

            {/* Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Información de Pago</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handlePayment}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Número de Tarjeta
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={cardInfo.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre del Titular
                                </label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    value={cardInfo.cardHolder}
                                    onChange={handleInputChange}
                                    placeholder="NOMBRE APELLIDO"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex space-x-4 mb-6">
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de Expiración
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={cardInfo.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={cardInfo.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {paymentStatus && (
                                <span className="hidden">
                                    {paymentStatus && (
                                        toast.success(paymentStatus)
                                    )}
                                </span>

                            )}

                            <button
                                type="submit"
                                disabled={isProcessing || !isFormValid}
                                className={`w-full py-3 font-bold text-white  rounded-md shadow-md transition-all duration-300 ${isProcessing || !isFormValid
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 active:scale-99"
                                    }`}
                            >
                                {isProcessing ? "Procesando..." : "Confirmar Pago"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}