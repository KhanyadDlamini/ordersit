"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import Categories from "./Categories";

export default function TopNav({ selectedCategory, onSelectCategory }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const router = useRouter();

    const goToCheckout = () => router.push("/checkout");
    const handleLogin = () => router.push("/login");

    return (
        <nav className="fixed top-0 left-0 w-full z-50 shadow-lg"
            style={{ background: 'linear-gradient(to right, #1f1f1f, #b91c1c)' }}>
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/ordersit.png"
                        alt="OrderSit"
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                    <span className="text-lg font-semibold text-white">
                        OrderSit
                    </span>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Cart */}
                    <button
                        onClick={goToCheckout}
                        className="relative text-white hover:text-red-300 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m13-6l-1.2 6M7 13H5.4M16 21a1 1 0 11-2 0 1 1 0 012 0zm-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full px-1.5">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Login / Logout */}
                    {user ? (
                        <button
                            onClick={logout}
                            className="hidden sm:block px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="hidden sm:block px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
                        >
                            Login
                        </button>
                    )}

                    {/* Hamburger */}
                    <button
                        className="sm:hidden text-white hover:text-red-300 focus:outline-none transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={
                                    menuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="sm:hidden p-4"
                    style={{ background: 'linear-gradient(to right, #1f1f1f, #b91c1c)' }}>
                    <Categories
                        selected={selectedCategory}
                        onSelectCategory={(cat) => {
                            onSelectCategory(cat);
                            setMenuOpen(false);
                        }}
                    />

                    <div className="mt-4 flex flex-col gap-2">
                        {user ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
