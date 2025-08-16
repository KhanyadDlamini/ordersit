"use client";

import { useAuth } from "@/components/AuthContext";
import { useCart } from "@/components/CartContext";
import TopNav from "@/components/TopNav";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
    const { cartItems, removeFromCart, updateQuantity, addActivity, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handlePayment = () => {
        if (!user) {
            router.push("/login");
        } else {
            toast.success("Payment successful!", {
                onClose: () => {
                    addActivity(); // saves order history
                    router.push("/my-activities");
                },
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 via-zinc-800 to-red-900">
            <TopNav />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
                <h1 className="text-2xl font-bold mb-6 text-white">Checkout</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-300 text-center py-10">
                        Your cart is empty.
                    </p>
                ) : (
                    <div className="flex flex-col gap-6 pb-28 sm:pb-12">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center bg-zinc-900 p-4 rounded-xl shadow hover:shadow-2xl transition-all border border-red-700/30"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-red-700/30"
                                />

                                <div className="flex-1 w-full ml-0 sm:ml-6 mt-4 sm:mt-0 flex flex-col gap-2 text-center sm:text-left">
                                    <h2 className="text-lg font-semibold text-white">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-300 text-sm">Price: E{item.price}</p>

                                    <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            -
                                        </button>
                                        <span className="font-medium text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-0 flex flex-col items-center sm:items-end gap-2">
                                    <p className="font-bold text-red-500">
                                        E{item.price * item.quantity}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-100 transition"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sticky Footer for Total + Payment Button */}
                {cartItems.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-red-700/30 shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-lg font-bold text-white">
                            Total: E{totalPrice}
                        </p>
                        <button
                            onClick={handlePayment}
                            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <ShoppingCartIcon className="w-5 h-5" />
                            Proceed to Payment
                        </button>
                    </div>
                )}

                <ToastContainer position="top-right" autoClose={2000} />
            </main>
        </div>
    );
}
