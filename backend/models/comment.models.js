import mongoose, { MongooseError } from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    parentComment: {  // For replies
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, { timestamps: true });

commentSchema.index({post : 1 , createdAt : -1 });
commentSchema.index({parentComment : 1});

const Comment = mongoose.model("Comment" , commentSchema);
export default Comment;