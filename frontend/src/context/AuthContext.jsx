import {useState , useEffect , createContext } from "react";
import API from "../api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    // check whetether the user is logged in or not on every refresh
    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await API.get("/auth/profile");
                setUser(response.data.user);

                 // ✅ Token already saved hai? Check karo
                const token = localStorage.getItem('token');
                console.log("Token exists on refresh:", !!token);
            }
            catch(error){
                if (error.response?.status === 401) {
                console.log("No active session");  // silent fail
                } else {
                    console.log("Auth check error:", error);
                }
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
        
        // ✅ Save token
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log("Token saved after register");
        }
        
        setUser(response.data.user);
        return response.data;
    }

    const login = async (credentials) => {
        const response = await API.post("/auth/login" , credentials);
        
        // ✅ IMPORTANT: Save token
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log("Token saved after login");
        }
        
        setUser(response.data.user);
        return response.data;  // ✅ Fix: response.data return karo, response.user nahi
    }


    const logout = async () => {
        await API.get("/auth/logout");
        
        // ✅ Clear token on logout
        localStorage.removeItem('token');
        setUser(null);
    }

    const updateAvatar = async (file) => {
        const formData = new FormData();
        formData.append("avatar" , file);

        const response = await API.post("/auth/upload-profile" , formData , {
            headers : { "Content-Type" : "multipart/form-data" }
        });
        setUser(response.data.user);
        return response.data;
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            logout,
            updateAvatar,
            
        }}>
            {children}
        </AuthContext.Provider>
    )

}
