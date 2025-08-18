export default function Categories({ selected, onSelectCategory }) {
    const categories = ["All", "Burgers", "Meat", "Stew", "Drinks", "Desserts"];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className="hidden sm:block w-48 p-2 rounded-xl shadow-lg"
                style={{
                    background:
                        "linear-gradient(to bottom, #111827, #ffffff, #fef9c3, #facc15)",
                    // blackish → white → light mustard → deep mustard
                }}
            >
                <h2 className="text-lg font-semibold mb-3 text-black">Categories</h2>
                <ul className="space-y-1">
                    {categories.map((cat, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectCategory(cat)}
                            className={`cursor-pointer transition px-2 py-1 rounded-lg ${selected === cat
                                    ? "bg-yellow-600 text-white font-semibold"
                                    : "text-gray-800 hover:bg-yellow-500/30 hover:text-black"
                                }`}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Mobile Horizontal Scroll */}
            <div
                className="flex sm:hidden overflow-x-auto gap-4 p-2 rounded-b-xl shadow-md"
                style={{
                    background:
                        "linear-gradient(to right, #111827, #ffffff, #fef9c3, #facc15)",
                    // blackish → white → light mustard → deep mustard
                }}
            >
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition ${selected === cat
                                ? "bg-yellow-600 text-white font-semibold"
                                : "bg-white/60 text-gray-900 hover:bg-yellow-500/30 hover:text-black"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </>
    );
}
