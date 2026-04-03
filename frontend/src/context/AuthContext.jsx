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
        setUser(response.data.user);
        return response.data;
    }

    const login = async (credentials) => {
        const response = await API.post("/auth/login" , credentials);
        setUser(response.data.user);
        return response.user;
    }

    const logout = async () => {
        await API.get("/auth/logout");
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
