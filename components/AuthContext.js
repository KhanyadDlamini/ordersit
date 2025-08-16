"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null means not logged in
    const router = useRouter();

    const login = (username) => {
        setUser({ username }); // simplistic login
        router.push("/"); // redirect to home after login
    };

    const logout = () => {
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
