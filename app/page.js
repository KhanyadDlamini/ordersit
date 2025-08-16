"use client";

import { useCart } from "@/components/CartContext";
import Categories from "@/components/Categories";
import TopNav from "@/components/TopNav";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const foodItems = [
  { id: 1, name: "Chicken Burger", vendor: "Joe’s Grill", price: 45, image: "/5.jpeg", category: "Burgers" },
  { id: 2, name: "Full Chicken", vendor: "Mama’s Kitchen", price: 60, image: "/6.jpg", category: "Meat" },
  { id: 3, name: "Stew", vendor: "Ocean Delight", price: 120, image: "/4.jpg", category: "Stew" },
  { id: 4, name: "Grilled Meat", vendor: "Mama’s Kitchen", price: 60, image: "/14.jpg", category: "Meat" },
  { id: 5, name: "Coca-Cola", vendor: "Ocean Delight", price: 120, image: "/16.jpg", category: "Drinks" },
  { id: 6, name: "Grilled Meat", vendor: "Ocean Delight", price: 120, image: "/15.jpg", category: "Meat" },

];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 via-zinc-800 to-red-900">
      <TopNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="pt-20 flex flex-1 max-w-7xl mx-auto w-full px-6 py-8 gap-6">
        {/* Sidebar Categories (desktop only) */}
        <div className="hidden sm:block">
          <Categories
            selected={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Food Items */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-zinc-900 rounded-xl overflow-hidden shadow hover:shadow-2xl transition transform hover:-translate-y-1 border border-red-700/30"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-300">{item.vendor}</p>
                <p className="mt-2 text-lg font-bold text-red-500">E{item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Place Order
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
