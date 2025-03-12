import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // Load token from localStorage when initializing state
        return localStorage.getItem("token") || null;
    });

    // Sync token with localStorage when it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Login function (store token)
    const login = (authToken) => {
        setToken(authToken);
    };

    // Logout function (remove token)
    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};