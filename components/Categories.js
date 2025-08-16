export default function Categories({ selected, onSelectCategory }) {
    const categories = ["All", "Burgers", "Meat", "Stew", "Drinks", "Desserts"];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden sm:block w-48 p-2 bg-gradient-to-b from-zinc-900 via-zinc-800 to-red-900 rounded-xl">
                <h2 className="text-lg font-semibold mb-3 text-white">Categories</h2>
                <ul className="space-y-1">
                    {categories.map((cat, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectCategory(cat)}
                            className={`cursor-pointer transition px-2 py-1 rounded-lg ${selected === cat
                                ? "bg-red-600 text-white font-semibold"
                                : "text-gray-300 hover:bg-red-500/30 hover:text-white"
                                }`}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Mobile Horizontal Scroll */}
            <div className="flex sm:hidden overflow-x-auto gap-4 p-2 bg-gradient-to-r from-zinc-900 via-zinc-800 to-red-900 rounded-b-xl">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition ${selected === cat
                            ? "bg-red-600 text-white font-semibold"
                            : "bg-zinc-800 text-gray-300 hover:bg-red-500/30 hover:text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </>
    );
}
