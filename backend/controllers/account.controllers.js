import User from "../models/user.models.js";

const getAccountDetails = async (req, res) => {
    try {
        // Fresh data from database
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).json({
            success: true,
            user : {
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                phone: user.phone,
                type: user.type,
                business: user.business,
                ratingcount: user.ratingcount,
                averagerating: user.averagerating,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default getAccountDetails;