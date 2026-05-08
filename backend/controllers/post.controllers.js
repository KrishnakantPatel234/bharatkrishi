import Post from "../models/post.models.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

const createNewPost = async (req , res) => {
    try{
        const {title, description, likes, views, price, category, quantity, quantityunit} = req.body;

        if(!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description, and category are required"
            });
        }

        let pictureUrl = "";

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path , {
                folder : "bharatkrishi_posts",
            });

            pictureUrl = result.secure_url;
        }

        const post = await Post.create({
            createdby : req.user._id,
            title, 
            description, 
            picture : pictureUrl,
            likes, 
            views, 
            price, 
            category, 
            quantity, 
            quantityunit
        })
        console.log(post);
        res.status(201).json({
            success : true,
            message : "Post created successfully",
            post,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
}

const getAllPosts = async (req , res) => {
    try{
        const { category , search = "" , page = "1" , limit = "16"} = req.query;

        let query = {};

        if(category){
            query.category = category;
        }

        if(search.trim()){
            query.$or = [
                {title : {$regex : search , $options : "i"}},
                {description : {$regex : search , $options : "i"}},
                {category : {$regex : search , $options : "i"}},
            ]
        }
        // Pagination(so that all the posts should not load at once)
        const skip = (Number(page) - 1) * (Number(limit));

        const posts = await Post.find(query)
            .skip(skip)
            .limit(Number(limit))
            .populate("createdby" , "fullname username avatar contact business")
            .sort({createdAt : -1});
           
        if(posts.length == 0){
            return res.status(404).json({
                message : "No result found"
            });
        }

        const totalPosts = await Post.countDocuments(query); 
        

        return res.status(200).json({
            success : true,
            posts,
            totalPosts
        });

    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const getPost = async (req , res) => {
    try{
        const {postId} = req.params;
        
        let post = await Post.findById(postId).populate("createdby" , "username avatar fullname");

        if(!post){
            return res.status(404).json({
                success : false,
                message : "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post
        })


    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const getUserPosts = async(req , res) => {
    try{
        const id = req.params.id || req.user?._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const posts = await Post.find({ createdby: id })
            .populate("createdby", "fullname avatar username")    
            .sort({ createdAt: -1 });

        if(posts.length === 0){
            return res.status(200).json({
                success: true,
                posts
            });
        }

        res.status(200).json({
            success : true,
            posts
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export {
    getAllPosts,
    createNewPost,
    getPost,
    getUserPosts
}