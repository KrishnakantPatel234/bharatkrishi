import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({post}) => {
    const navigate = useNavigate();

    const viewPost = () => {
        const postId = post._id;
        navigate(`/posts/${postId}`) 
    }

    const viewProfile = () => {
        const id = post.createdby?._id;
        navigate(`/users/${id}`);
    }


    return(
        <div className="post w-full min-h-[600px] p-4 rounded-xl text-zinc-800 shadow-xl/60"  >
            <div className="flex items-center gap-3 p-4">
                <img
                    src={post.createdby?.avatar || "/images/default-user.png"}
                    alt={post.createdby?.username}
                    onClick={viewProfile}
                    className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                />
                <div>
                    <h2 onClick={viewProfile} className="text-sm cursor-pointer font-semibold text-zinc-800">
                    @{post.createdby?.username}
                    </h2>
                    <p className="text-xs text-zinc-500">{post.createdby?.fullname}</p>
                </div>
            </div>
            <div className="w-full aspect-[4/3] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden" >
                <img 
                onClick={viewPost}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105" 
                src={post.picture || "images/logo.png"} 
                alt={post.title} />
            </div>
            <div className=" mt-5 ml-3  story-script-para">
                <h1 className="font-bold mb-2 text-2xl" >{post.title}</h1>
                <p className="font-medium mb-5 text-md line-clamp-3" >{post.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 px-4 mt-3">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                </span>
                <span className="bg-zinc-100 text-zinc-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.quantity} {post.quantityunit}
                </span>
            </div>
            <div className="px-4 pt-4 pb-5 flex items-center justify-between">
                <p className="text-xl font-bold text-blue-600">
                    ₹{post.price}
                    <span className="text-sm text-zinc-500 font-medium">
                    / {post.quantityunit}
                    </span>
                </p>

                <button 
                onClick={viewPost}
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer text-sm font-semibold px-4 py-2 rounded-xl transition">
                    View
                </button>
            </div>
        </div>
    )
}

export default PostCard;