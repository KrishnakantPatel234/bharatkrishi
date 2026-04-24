    import dotenv from "dotenv";
    dotenv.config();
    import express from "express";
    import cookieParser from "cookie-parser";
    import { connectDB } from "./config/db.js";
    import cors from "cors"
    import path from "path";
    import { fileURLToPath } from "url";


    // IMPORT ROUTES
    import authRoutes from "./routes/auth.routes.js";
    import profileRoutes from "./routes/profile.routes.js";
    import userRoutes from "./routes/user.routes.js"
    import postRoutes from "./routes/post.routes.js";

    const PORT = process.env.PORT || 3000;
    const app = express();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // CORS CONFIGURATIONS
    app.use(cors({
        origin : 'https://bharatkrishimarket.vercel.app',
        credentials : true,                 
        methods : ["GET" , "POST" , "PUT" , "DELETE"],
        allowedHeaders : ["Content-Type" , "Authorization"]
    }));

    // MIDDLEWARES  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(cookieParser());

    app.use("/uploads" , express.static(path.join(__dirname , "uploads")));

    // DATABASE CONNECTION
    connectDB().catch(err => console.error('Database connection failed:', err));

    app.get("/" , (req , res) => {
        res.json({message : "App is running...."});
    })

    app.use("/api/auth" , authRoutes);
    app.use("/api/accounts" , profileRoutes);
    app.use("/api/users" , userRoutes);
    app.use("/api/posts" , postRoutes);

    export default app;

    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }