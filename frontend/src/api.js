import axios from "axios";

const API = axios.create({
    baseURL: "https://bharatkrishi.vercel.app/",
    withCredentials: true,  
});

API.interceptors.request.use(config => {

    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
});

export default API;