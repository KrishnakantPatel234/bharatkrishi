import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import cors from "cors"

// IMPORT ROUTES
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

// CORS CONFIGURATIONS
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,                 //IMP - cookies allow karne ke liye
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    allowedHeaders : ["Content-Type" , "Authorization"]
}));

// MIDDLEWARES  
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// DATABASE CONNECTION
connectDB();

app.use("/api/auth" , authRoutes);

app.get("/" , (req , res) => {
    res.json({message : "App is running...."});
})

app.listen(PORT , (req , res) => {
    console.log(`Server is running on port ${PORT}`);
})