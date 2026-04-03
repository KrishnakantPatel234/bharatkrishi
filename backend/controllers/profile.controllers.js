import User from "../models/user.models.js";

const getProfileDetails = async (req, res) => {
    try {
        // Fresh data from database
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Remove password before sending
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        
        res.status(200).json({
            success: true,
            user: userWithoutPassword  // ✅ All fields included
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default getProfileDetails;