import {useState , useEffect , createContext } from "react";
import API from "../api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

   
    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await API.get("/auth/profile");
                setUser(response.data.user);
            }
            catch(error){
                if (error.response?.status === 401) {
                    setUser(null);
                    return; 
                }
                console.error("Auth error:", error);
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const register = async (userData) => {
        const response = await API.post("/auth/register" , userData);
        
        setUser(response.data.user);
        return response.data;
    }

   const login = async (credentials) => {
        await API.post("/auth/login", credentials);

        // Re-fetch because cookies are not available quickly
        const response = await API.get("/auth/login", credentials);
        setUser(response.data.user);
        return response.data;
    }


    const logout = async () => {
        await API.get("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            logout,
            
        }}>
            {children}
        </AuthContext.Provider>
    )

}
