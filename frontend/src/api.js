import axios from "axios";

const API = axios.create({
    baseURL: "https://bharatkrishi.vercel.app/",
    withCredentials: true,
});

// Add request interceptor to handle Content-Type dynamically
API.interceptors.request.use(config => {
    // ✅ LocalStorage se token uthao
    const token = localStorage.getItem('token');
    
    // ✅ Agar token hai to header mein add karo
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // If sending FormData, let browser set the Content-Type with boundary
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        // For JSON data, set application/json
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;