"use client";

import TopNav from "@/components/TopNav";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { useState } from "react";
import QRCodeReact from "react-qr-code";

export default function VendorPage() {
    const [search, setSearch] = useState("");
    const [vendor, setVendor] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        store: "",
        event: "",
        foods: [
            { image: "", category: "", price: "" }
        ]
    });

    const [activities, setActivities] = useState([
        {
            id: 20230817001,
            status: "Pending",
            items: [
                { id: 1, name: "Burger", quantity: 2, price: 50 },
                { id: 2, name: "Fries", quantity: 1, price: 25 },
            ],
        },
        {
            id: 20230817002,
            status: "Completed",
            items: [
                { id: 3, name: "Pizza", quantity: 1, price: 120 },
                { id: 4, name: "Soda", quantity: 2, price: 20 },
            ],
        },
    ]);

    const filteredActivities = activities.filter((activity) =>
        activity.id.toString().includes(search)
    );

    // ✅ Add food item
    const addFoodItem = () => {
        setFormData({
            ...formData,
            foods: [...formData.foods, { image: "", category: "", price: "" }]
        });
    };

    // ✅ Handle food input change
    const handleFoodChange = (index, field, value) => {
        const updatedFoods = [...formData.foods];
        updatedFoods[index][field] = value;
        setFormData({ ...formData, foods: updatedFoods });
    };

    // ✅ Save vendor info
    const handleRegister = (e) => {
        e.preventDefault();
        setVendor(formData);
    };

    // ✅ Mark as Completed
    const markAsCompleted = (id) => {
        setActivities((prev) =>
            prev.map((activity) =>
                activity.id === id ? { ...activity, status: "Ready" } : activity
            )
        );
    };

    // ✅ PDF Download
    const downloadActivity = async (activity) => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("OrderSit", 105, 15, { align: "center" });

        doc.setFontSize(18);
        doc.setTextColor(255, 87, 87);
        doc.text(`Order #${activity.id}`, 14, 30);

        const qrDataUrl = await QRCode.toDataURL(activity.id.toString(), {
            color: { dark: "#f87171", light: "#ffffff00" },
            margin: 1,
            width: 100,
        });

        doc.addImage(qrDataUrl, "PNG", 153, 28, 40, 40);

        const tableData = activity.items.map((item) => [
            item.name,
            item.quantity.toString(),
            `E${item.price}`,
            `E${item.quantity * item.price}`,
        ]);

        autoTable(doc, {
            startY: 80,
            head: [["Item", "Qty", "Price", "Total"]],
            body: tableData,
            theme: "grid",
        });

        doc.save(`Order_${activity.id}.pdf`);
    };

    return (
        <div className="font-sans min-h-screen h-auto w-full bg-gradient-to-b from-black via-white to-yellow-400">
            <div className="flex flex-col min-h-screen">
                <TopNav />
                <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 sm:py-8">
                    <p className="text-2xl sm:text-3xl font-bold text-center mb-6 text-black">
                        Vendor Dashboard
                    </p>
                    {!vendor ? (
                        // ✅ Registration Form (mobile responsive)
                        <div className="bg-white/90 p-6 rounded-2xl shadow-lg border border-yellow-400">
                            <h2 className="text-2xl font-bold mb-4 text-center text-black">
                                Vendor Stall Registration
                            </h2>
                            <form
                                onSubmit={handleRegister}
                                className="flex flex-col gap-4 w-full"
                            >
                                <input
                                    type="text"
                                    placeholder="Vendor Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="px-4 py-2 rounded-lg border w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Vendor Phone Number"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="px-4 py-2 rounded-lg border w-full"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Vendor Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="px-4 py-2 rounded-lg border w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Vendor Store"
                                    value={formData.store}
                                    onChange={(e) =>
                                        setFormData({ ...formData, store: e.target.value })
                                    }
                                    className="px-4 py-2 rounded-lg border w-full"
                                    required
                                />
                                <select
                                    value={formData.event}
                                    onChange={(e) =>
                                        setFormData({ ...formData, event: e.target.value })
                                    }
                                    className="px-4 py-2 rounded-lg border w-full"
                                    required
                                >
                                    <option value="">Select Event</option>
                                    <option value="Food Festival">Food Festival</option>
                                    <option value="Music Concert">Music Concert</option>
                                    <option value="Cultural Day">Cultural Day</option>
                                </select>

                                {/* ✅ Food Items */}
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold text-black">Food Menu</h3>
                                    {formData.foods.map((food, index) => (
                                        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFoodChange(index, "image", e.target.files[0])}
                                                className="px-2 py-2 border rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Category"
                                                value={food.category}
                                                onChange={(e) => handleFoodChange(index, "category", e.target.value)}
                                                className="px-2 py-2 border rounded-lg"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={food.price}
                                                onChange={(e) => handleFoodChange(index, "price", e.target.value)}
                                                className="px-2 py-2 border rounded-lg"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addFoodItem}
                                        className="px-3 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400"
                                    >
                                        + Add Another Food
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-400 text-black rounded-xl hover:shadow-lg transition w-full"
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <p className="text-center text-gray-600 mb-8">
                                Event: {vendor.event} | Store: {vendor.store}
                            </p>

                            {/* Search input */}
                            <div className="mb-12 flex flex-col sm:flex-row gap-2 items-center">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by order number..."
                                    className="w-full sm:w-1/2 px-4 py-2 rounded-2xl bg-white/80 text-black border border-yellow-400"
                                />
                            </div>

                            {/* Activities */}
                            {filteredActivities.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white/80 rounded-xl shadow-md border border-yellow-400">
                                    <DocumentTextIcon className="w-16 h-16 text-yellow-400 mb-4" />
                                    <p className="text-black text-lg text-center">
                                        No orders found.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {filteredActivities.map((activity) => {
                                        const total = activity.items.reduce(
                                            (acc, item) => acc + item.price * item.quantity,
                                            0
                                        );

                                        return (
                                            <div
                                                key={activity.id}
                                                className="bg-white/80 rounded-2xl shadow-md p-4 border border-yellow-400"
                                            >
                                                <div className="flex justify-between items-center border-b border-yellow-400/20 pb-2 mb-3">
                                                    <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                                                        <DocumentTextIcon className="w-5 h-5 text-yellow-400" />
                                                        Order #{activity.id}
                                                    </h2>
                                                    <span
                                                        className={`px-3 py-1 text-sm rounded-full font-medium ${activity.status === "Completed"
                                                            ? "bg-green-900 text-green-400"
                                                            : "bg-yellow-900 text-yellow-400"
                                                            }`}
                                                    >
                                                        {activity.status}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-2 mb-4">
                                                    {activity.items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex justify-between bg-white/70 p-3 rounded-lg border border-yellow-400/30"
                                                        >
                                                            <p className="font-medium text-black">
                                                                {item.name} x {item.quantity}
                                                            </p>
                                                            <p className="font-semibold text-yellow-400">
                                                                E{item.price * item.quantity}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                                                    <QRCodeReact
                                                        value={activity.id.toString()}
                                                        size={60}
                                                        fgColor="#eab308"
                                                    />
                                                    <p className="text-lg font-bold text-yellow-400">
                                                        Total: E{total}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        {activity.status === "Pending" && (
                                                            <button
                                                                onClick={() => markAsCompleted(activity.id)}
                                                                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                                                            >
                                                                Mark Ready
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => downloadActivity(activity)}
                                                            className="px-4 py-2 bg-yellow-400 text-black rounded-xl"
                                                        >
                                                            Download PDF
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
