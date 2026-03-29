import User from "../models/user.models.js";

const getBuyers = async (req , res) => {
    try{
        const {type , search ="" , page = 1 , limit = 12} = req.query;

        const query = {
            type : {$in : ["BUYER" , "BULK BUYER"]},
        };

        if(type && ["BUYER" , "BULK BUYER"].includes(type)){
            query.type = type;
        }

        if(search.trim()){
            query.$or = [
                {fullname : {$regex : search , $options : "i"}},
                {username : {$regex : search , $options : "i"}},
                {business : {$regex : search , $options : "i"}},
                {city : {$regex : search , $options : "i"}}
            ]
        }
        // Pagination
        const skip = (Number(page) - 1) * (Number(limit));

        const buyers = await User.find(query)
            .select("-password")
            .skip(skip)
            .limit(Number(limit))
            .sort({createdAt : -1});

        const total = await User.countDocuments(query); 

        res.status(200).json({
            success : true,
            total,
            currentPage : Number(page),
            totalPage : Math.ceil(total / Number(limit)),
            buyers
        });

    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
}

const getFarmers = async (req , res) => {
    try{
        const {type , search ="" , page = 1 , limit = 12 } = req.query;

        const query = {
            type : {$in : ["FARMER" , "WHOLESALE FARMER"]},
        };

        if(type && ["FARMER" , "WHOLESALE FARMER"].includes(type)){
            query.type = type;
        }

        if(search.trim()){
            query.$or = [
                {fullname : {$regex : search , $options : "i"}},
                {username : {$regex : search , $options : "i"}},
                {business : {$regex : search , $options : "i"}},
                {city : {$regex : search , $options : "i"}},
            ]
        };

        const skip = (Number(page) -1) * (Number(limit));

        const farmers = await User.find(query)
            .select("-password")
            .skip(skip)
            .limit(Number(limit))
            .sort({createdAt : -1});

        const total = await User.countDocuments(query);

        res.status(200).json({
            success : true,
            total,
            currentPage : Number(page),
            totalPage : Math.ceil(total / Number(limit)),
            farmers,
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
}

const getUser = async (req , res) => {
    try{    
        const {id} = req.params;

        const user = await User.findById(id).select("-password");

        if(!user){
            res.status(404).json({
                message : "User not found"
            })
        }

        res.status(200).json({
            success : true,
            user,
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
}

export {
    getBuyers,
    getFarmers,
    getUser
}