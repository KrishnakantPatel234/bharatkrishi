import User from "../models/user.models.js";

const getUsers = async (req, res) => {
  try {
    const { type, search = "" , page = "1" , limit = "12"} = req.query;

    const query = {};

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
    // getBuyers,
    // getFarmers,
    getUsers,
    getUser
}