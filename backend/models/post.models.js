import mongoose from "mongoose"

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
        default : null,
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
        enum : ["kg", "quintal", "ton", "liters", "pieces" , "dozen"],
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
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
    }]
},{
    timestamps : true
})

postSchema.index({ createdby: 1, createdAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ price: 1 });

const Post = mongoose.model("Post" , postSchema);
export default Post;