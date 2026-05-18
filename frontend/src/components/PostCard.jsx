import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const PostCard = ({post}) => {
    const navigate = useNavigate();

    const viewPost = () => {
        const postId = post._id;
        navigate(`/posts/${postId}`) 
    }

    const viewProfile = (e) => {
        e.stopPropagation(); // prevent triggering post click if wrapped
        const id = post.createdby?._id;
        if(id) navigate(`/users/${id}`);
    }

    return(
        <div className="group glass w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-white/60 flex flex-col h-full hover:-translate-y-1">
            
            {/* Header / User Info */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-100/50 bg-white/40">
                <img
                    src={post.createdby?.avatar || "/images/default-user.png"}
                    alt={post.createdby?.username}
                    onClick={viewProfile}
                    className="w-11 h-11 rounded-full object-cover shadow-sm cursor-pointer border-2 border-white hover:border-primary-300 transition-colors"
                />
                <div onClick={viewProfile} className="cursor-pointer">
                    <h2 className="text-sm font-bold text-dark-800 hover:text-primary-600 transition-colors">
                        {post.createdby?.fullname || "Unknown User"}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">@{post.createdby?.username || "user"}</p>
                </div>
            </div>

            {/* Image Section */}
            <div 
                className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative cursor-pointer"
                onClick={viewPost}
            >
                <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={post.picture || "/images/logo.png"} 
                    alt={post.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating price tag */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-dark-900 px-3 py-1.5 rounded-xl font-extrabold text-sm shadow-lg border border-white/50">
                    ₹{post.price}
                    <span className="text-[10px] text-slate-500 font-medium ml-1">/{post.quantityunit}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-emerald-100/80 text-emerald-700 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        {post.category}
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-slate-200">
                        Stock: {post.quantity} {post.quantityunit}
                    </span>
                </div>

                <h1 className="font-bold text-xl text-dark-900 leading-tight mb-2 line-clamp-1 cursor-pointer hover:text-primary-600 transition-colors" onClick={viewPost}>
                    {post.title}
                </h1>
                
                <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow leading-relaxed">
                    {post.description}
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                    <button 
                        onClick={viewPost}
                        className="w-full flex items-center justify-center gap-2 bg-primary-50 hover:bg-primary-600 text-primary-600 hover:text-white cursor-pointer text-sm font-bold px-4 py-2.5 rounded-xl transition-all duration-300"
                    >
                        View Details <FaArrowRight className="text-xs" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostCard;