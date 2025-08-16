"use client";

import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple validation
        if (!username || !email || !phone || !password) {
            toast.error("❌ Please fill in all fields!");
            setLoading(false);
            return;
        }

        try {
            // Simulate API/register call
            await new Promise((res) => setTimeout(res, 1000));

            toast.success("✅ Registration successful!");

            // Clear fields
            setUsername("");
            setEmail("");
            setPhone("");
            setPassword("");

            // Delay before redirecting
            await new Promise((res) => setTimeout(res, 1500)); // 1.5s delay
            router.push("/login");
        } catch (err) {
            toast.error("⚠️ Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-black via-red-900 to-black text-white">

            <div className="w-full max-w-md bg-black/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-red-700">

                {/* Welcome Text */}
                <h1 className="text-3xl font-bold text-center mb-2">Register</h1>
                <p className="text-center text-gray-300 mb-6">Create your account</p>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/ordersit.png" alt="App Logo" className="h-16 w-auto" />
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center bg-white/10 p-3 rounded-lg">
                        <User className="w-5 h-5 text-red-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex items-center bg-white/10 p-3 rounded-lg">
                        <Mail className="w-5 h-5 text-red-500 mr-3" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex items-center bg-white/10 p-3 rounded-lg">
                        <Phone className="w-5 h-5 text-red-500 mr-3" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Password with toggle */}
                    <div className="flex items-center bg-white/10 p-3 rounded-lg relative">
                        <Lock className="w-5 h-5 text-red-500 mr-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 rounded-lg 
              bg-gradient-to-r from-red-600 via-orange-600 to-red-700 
              hover:from-red-500 hover:to-orange-500 
              font-semibold shadow-lg"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
                    </button>
                    <p className="text-center text-gray-400 text-sm">
                        Already have account?{" "}
                        <a href="/login" className="text-red-400 hover:text-orange-400 transition">
                            Sign In
                        </a>
                    </p>
                </form>

                {/* Toasts */}
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </div>
    );
}
