"use client";

import { useAuth } from "@/components/AuthContext";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Hardcoded credentials
    const validUsername = "user";
    const validPassword = "12345";
    const vendorUsername = "vendor";
    const vendorPassword = "12345";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Vendor login
            if (username === vendorUsername && password === vendorPassword) {
                await login();
                toast.success("✅ Vendor login successful!");

                // await new Promise((res) => setTimeout(res, 1000));
                router.push("/vendor");

                // Normal user login
            } else if (username === validUsername && password === validPassword) {
                await login();
                toast.success("✅ User login successful!");

                await new Promise((res) => setTimeout(res, 4000));

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
        //     <div className="min-h-screen flex items-center justify-center 
        //   bg-gradient-to-b from-black via-red-900 to-black text-white">

        //         <div className="w-full max-w-md bg-black/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-red-700">

        //             {/* Welcome Text */}
        //             <h1 className="text-3xl font-bold text-center mb-2">Welcome</h1>
        //             <p className="text-center text-gray-300 mb-6">Sign in to continue</p>

        //             {/* Logo */}
        //             <div className="flex justify-center mb-6">
        //                 <img src="/ordersit.png" alt="App Logo" className="h-16 w-auto" />
        //             </div>

        //             {/* Form */}
        //             <form onSubmit={handleLogin} className="space-y-4">
        //                 {/* Username */}
        //                 <div className="flex items-center bg-white/10 p-3 rounded-lg">
        //                     <User className="w-5 h-5 text-red-500 mr-3" />
        //                     <input
        //                         type="text"
        //                         placeholder="Username"
        //                         value={username}
        //                         onChange={(e) => setUsername(e.target.value)}
        //                         className="bg-transparent w-full outline-none text-white placeholder-gray-400"
        //                     />
        //                 </div>

        //                 {/* Password with toggle */}
        //                 <div className="flex items-center bg-white/10 p-3 rounded-lg relative">
        //                     <Lock className="w-5 h-5 text-red-500 mr-3" />
        //                     <input
        //                         type={showPassword ? "text" : "password"}
        //                         placeholder="Password"
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         className="bg-transparent w-full outline-none text-white placeholder-gray-400"
        //                     />
        //                     <button
        //                         type="button"
        //                         onClick={() => setShowPassword(!showPassword)}
        //                         className="absolute right-3 text-gray-400 hover:text-white"
        //                     >
        //                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        //                     </button>
        //                 </div>

        //                 {/* Submit Button */}
        //                 <button
        //                     type="submit"
        //                     disabled={loading}
        //                     className="w-full flex justify-center items-center py-3 px-4 rounded-lg 
        //           bg-gradient-to-r from-red-600 via-orange-600 to-red-700 
        //           hover:from-red-500 hover:to-orange-500 
        //           font-semibold shadow-lg"
        //                 >
        //                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
        //                 </button>
        //                 <p className="text-center text-gray-400 text-sm">
        //                     Don’t have an account?{" "}
        //                     <a href="/create-account" className="text-red-400 hover:text-orange-400 transition">
        //                         Sign Up
        //                     </a>
        //                 </p>
        //             </form>

        //             {/* Toasts */}
        //             <ToastContainer position="top-center" autoClose={2000} />
        //         </div>
        //     </div>
        <div
            className="min-h-screen flex items-center justify-center text-gray-900"
            style={{
                background:
                    "linear-gradient(to bottom, #111827, #ffffff, #fef9c3, #facc15)", // black → white → mustard gradient
            }}
        >
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-yellow-500/40">
                {/* Welcome Text */}
                <h1 className="text-3xl font-bold text-center mb-2 text-yellow-700">
                    Welcome
                </h1>
                <p className="text-center text-gray-600 mb-6">Sign in to continue</p>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/ordersit.png" alt="App Logo" className="h-16 w-auto" />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center bg-yellow-100/40 p-3 rounded-lg border border-black">
                        <User className="w-5 h-5 text-yellow-600 mr-3" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-transparent w-full outline-none text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {/* Password with toggle */}
                    <div className="flex items-center bg-yellow-100/40 p-3 rounded-lg relative border border-black">
                        <Lock className="w-5 h-5 text-yellow-600 mr-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent w-full outline-none text-gray-900 placeholder-gray-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-gray-500 hover:text-yellow-600"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 rounded-lg 
          bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 
          hover:from-yellow-400 hover:to-yellow-500 
          font-semibold text-white shadow-lg transition-all"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        Don’t have an account?{" "}
                        <a
                            href="/create-account"
                            className="text-yellow-700 hover:text-yellow-500 transition font-medium"
                        >
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
