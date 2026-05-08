import Comment from "../models/comment.models.js";
import Post from "../models/post.models.js";

const getComments = async (req , res) => {
    try{
        const {postId} = req.params;

        const comments = await Comment.find({
            post : postId,
            parentComment : null
        })
        .populate("user", "username avatar")
        .populate({
            path : 'parentComment',
            populate : {path : 'user' , select : 'username avatar'}
        })
        .sort({createdby : -1});

        const commentWithReplies = await Promise.all(
            comments.map( async (comment) => {
                const repliesCount = await Comment.countDocuments({
                    parentComment : comment._id
                });
                return {
                    ...comment.toObject(),
                    repliesCount
                }
            })
        );

        res.status(200).json({
            success : true,
            count : commentWithReplies.length,
            comments : commentWithReplies
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }

}

const createComment = async (req , res) => {
    try{
        const {postId} = req.params;
        const {text , parentCommentId} = req.body;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message : "post not found"});
        }

        if(parentCommentId){
            const parent = await Comment.findById(parentCommentId);
            if(!parent){
                return res.status(404).json({message : "parent comment not found"});
            }
        }

        const comment = new Comment({
            user : userId,
            text : text,
            post : postId,
            parentComment : parentCommentId
        });

        await comment.save();

        await comment.populate('user' , 'username avatar');

        res.status(201).json({
            success : true,
            message : parentCommentId ? "reply added successfully" : "comment added successfully",
            comment
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const getReplies = async (req , res) => {
    try{
        const {commentId} = req.params;

        const replies = await Comment.find({parentComment : commentId})
            .populate("user" , "username avatar")
            .sort({createdAt : 1});

        res.status(200).json({
            success : true,
            count : replies.length,
            replies
        });
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

const updateComment = async(req , res) => {
    try{
        const {commentId} = req.params;
        const {text} = req.body;
        const userId = req.user._id;

        const comment  = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({message : "comment not found"});
        }

        if(comment.user.toString() !== userId.toString()){
            console.log(`comment id : ${comment.user.toString()} and user id : ${userId}`)
            return res.status(403).json({message : "you can Only edit your own comment"});
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({
            success : true,
            message : "Comment updated successfully",
            comment
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
}

const deleteComment = async(req , res) => {
    try{
        const {commentId} = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({message : "Comment not found"});
        }

        if(comment.user.toString() !== userId.toString()){
            return res.status(403).json({message: "You can only delete your Own Comment"});
        }

        await Comment.deleteMany({parentComment : commentId});
        await comment.deleteOne();

        res.status(200).json({
            success : true,
            message : "comment deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

const getCommentById = async (req , res) => {
    try{
        const {commentId} = req.params;

        const comment = await Comment.findById(commentId)
            .populate("user" , "username avatar")
            .populate("parentComment")
            .populate("post" , "title");

        if(!comment){
            return res.status(404).json({message : "Comment not found"});
        }

        res.status(200).json({
            success : true,
            comment
        });
    }
    catch(error){
        res.status(500).json({messsage : error.message});
    }
}

export {
    getComments,
    getCommentById,
    getReplies,
    createComment,
    updateComment,
    deleteComment
}