import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";  // context import

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};