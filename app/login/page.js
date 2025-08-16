"use client";

import { useAuth } from "@/components/AuthContext";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "12345";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (username === validUsername && password === validPassword) {
                await login();
                toast.success("✅ Login successful!");

                // Wait 4 seconds before redirecting
                await new Promise((res) => setTimeout(res, 4000));

                // Redirect after delay (adjust the path as needed)
                router.push("/dashboard");
            } else {
                toast.error("❌ Invalid username or password!");
            }
        } catch (err) {
            toast.error("⚠️ Login failed, please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-black via-red-900 to-black text-white">

            <div className="w-full max-w-md bg-black/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-red-700">

                {/* Welcome Text */}
                <h1 className="text-3xl font-bold text-center mb-2">Welcome</h1>
                <p className="text-center text-gray-300 mb-6">Sign in to continue</p>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/ordersit.png" alt="App Logo" className="h-16 w-auto" />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
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
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
                    </button>
                    <p className="text-center text-gray-400 text-sm">
                        Don’t have an account?{" "}
                        <a href="/create-account" className="text-red-400 hover:text-orange-400 transition">
                            Sign Up
                        </a>
                    </p>
                </form>

                {/* Toasts */}
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </div>
    );
}
