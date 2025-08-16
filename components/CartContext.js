"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [activities, setActivities] = useState([]); // Store past orders

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems((prev) =>
            prev
                .map((i) =>
                    i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
                )
                .filter((i) => i.quantity > 0)
        );
    };

    const clearCart = () => setCartItems([]);

    // ✅ New: move cart items into activities after payment
    const addActivity = () => {
        if (cartItems.length > 0) {
            setActivities((prev) => [
                ...prev,
                { id: Date.now(), items: cartItems, status: "Completed" },
            ]);
            clearCart();
        }
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                addActivity,   // ✅ expose this
                cartCount,
                activities,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
