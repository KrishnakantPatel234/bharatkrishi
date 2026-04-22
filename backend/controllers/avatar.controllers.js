import User from "../models/user.models.js";

export const updateAvatar = async (req , res) => {
    try{
        if(!req.user){
            return res.status(400).json({
                message : "No file uploaded"
            })
        }

        const avatarURL = `uploads/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {avatar : avatarURL},
            {new : true}
        );

        res.status(200).json({
            success : true,
            message : "Avatar updated successfully",
            user : {
                _id : user._id,
                fullname : user.fullname,
                avatar : user.avatar
            }
        })
    }
    catch(error){
        console.log("Avatar update Error : " , error);
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}