import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
};

const registerUser = async (req , res) => {
    try{
        const {email , password , fullname , username , contact , type , business , about , country , streetaddress , state ,city , postalcode} = req.body;

        let user = await User.findOne({
            $or : [{email} , {username}]
        })

        if(user){
            return res.status(400).json({
                message : "User already exists with this email or username"
            });
        }

        const formatPhone = (contact) => {
        let cleaned = contact.replace(/\D/g, "");

        if (cleaned.length === 10) {
            return "91" + cleaned;
        }

        return cleaned;
        };

        contact = formatPhone(contact);

        let avatarUrl = "";
        
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path , {
                folder : "profile_pictures",
            });

            avatarUrl = result.secure_url;
        }

        user = await User.create({
            fullname,
            username : username.toLowerCase(),
            email : email.toLowerCase(),
            avatar : avatarUrl,
            password,
            contact,
            type,
            business,
            about,
            country, 
            streetaddress , 
            state ,
            city , 
            postalcode
        });

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        
        const token = jwt.sign(
            {userId : user._id , type : user.type},
            process.env.JWT_SECRET,
            {expiresIn : "3d"}
        );

        res.cookie("token", token , {
            ...cookieOptions,
            maxAge: 3 * 24 * 60 * 60 * 1000  // 3 days
        });

        res.status(201).json({
            success : true,
            message : "User created successfully",
            user
        })
    }
    catch(error){
        console.error("Register error : ", error);
        res.status(500).json({
            message : error.message || "Something went wrong"
        })
    }
}

const loginUser = async (req ,res) => {
    try{
        const {email , username , password} = req.body;

        const user = await User.findOne({
            $or : [{email} , {username}]
        }).select("+password");

        if(!user){
            return res.status(400).json({
                message : "email , username or password is wrong, please retry"
            })
        }

        const isMatched = await user.comparePassword(password);

        if(!isMatched){
            return res.status(400).json({
                message : "email , username or password is wrong, please retry"
            })
        }

        const token = jwt.sign(
            {userId : user._id , type : user.type},
            process.env.JWT_SECRET,
            {expiresIn : "5d"}
        );

        res.cookie("token" , token , {
            ...cookieOptions,
            maxAge :  5 * 24 * 60 * 60 * 1000       // 5 days
        });

        user.password = undefined;

        res.status(200).json({
            success : true,
            message : "User logged in successfully",
            user,
            token
        })
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }

}

const logoutUser = async (req , res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        res.status(200).json({
            success : true,
            message : "User logged out successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}


export {
    registerUser,
    loginUser,
    logoutUser
}