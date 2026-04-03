import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    text : {
        type : String,
        required : true,
        trim : true,
    }
},{timestamps : true});

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    text : {
        type : String,
        required : true,
        trim : true,
    },
    replies : [replySchema],
}, {timestamps : true});

const postSchema = new mongoose.Schema({
    createdby : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    title : {
        type : String,
        required : [true, "title of the post is required to create post"],
        trim : true,
    },
    description : {
        type : String,
        required : [true , "description is required to create post"],
        trim : true,
    },
    picture : {
        type : String,
        default : "",
    },
    category : {
        type : String,
        enum : ["CROPS", "VEGETABLES", "FRUITS", "DAIRY", "EQUIPMENT", "OTHER"],
        default : "OTHER"
    },
    quantity : {
        type : Number,
        default : 0
    },
    quantityunit : {
        type : String,
        enum : ["kg", "quintal", "ton", "liters", "pieces"],
        default : "kg"
    },
    price : {
        type : Number,
        default : 0
    },
    views : {
        type : Number,
        default : 0,
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    comments : [commentSchema]
},{
    timestamps : true
})

const Post = mongoose.model("Post" , postSchema);
export default Post;