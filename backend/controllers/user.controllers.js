import User from "../models/user.models.js";
import mongoose from "mongoose";

const getUsers = async (req, res) => {
  try {
    const { type, search = "" , page = "1" , limit = "12"} = req.query;

    let query = {};

    if (type) {
      query.type = type;
    }

    if (search.trim()) {
      query.$or = [
        { fullname: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { business: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    // pagination (so that all the users should not load at once)
    const skip = (Number(page) - 1) * (Number(limit));

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(Number(limit))
      .sort({createdAt : -1});

    const totalUsers = await User.countDocuments(query);  

    res.status(200).json({
      success: true,
      users,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req , res) => {
    try{    
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success : false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id).select("-password");

        if(!user){
            return res.status(404).json({
                success : false,
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
            success: false,
            message: error.message
        });
    }
}

const getUserDetails = async (req, res) => {
    try {
        // Fresh data from database
        const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    getUsers,
    getUser,
    getUserDetails
}