import React, {useState , useEffect, useRef} from "react";
import { useNavigate} from "react-router-dom";
import API from "../api.js";
import { formatDistanceToNowStrict } from "date-fns";
import { IoMdSend } from "react-icons/io";
import Replies from "./Replies";

const Comments = ({ postId, isLoggedIn }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [comments , setComments] = useState([]);
  const [text , setText] = useState("");
  const [replyingTo , setReplyingTo] = useState(null);
  const [showRepliesFor, setShowRepliesFor] = useState({});

  useEffect(() => {
    const fetchComments = async() => {
      try {
        const res = await API.get(`/posts/${postId}/comments`);
        setComments(res.data.comments);
      }
      catch(err){
        console.log(err);
      }
    }

    fetchComments();
  },[postId]);

  
  const handleClick = async() => {
    if(!text.trim()) return ;
    
    try{
        const response = await API.post(`/posts/${postId}/comments` , {
          text,
          parentCommentId : replyingTo?.commentId || null,
        });
        setComments((prev) => [...prev , response.data.comment]);
        setText("");
        setReplyingTo("");
    }
    catch(error){
      console.error("Something went wrong : " , error);
    }
    
  }
  
  const handleChange = (e) => {
    setText(e.target.value);
  }

  const toggleReplies = (commentId) => {
    setShowRepliesFor((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReply = async (comment) => {
    setReplyingTo({
      commentId : comment._id,
      username : comment.user.username
    });

    inputRef.current.focus();
  }

  return (
    <div className="relative w-full">
  
    <div className="w-full h-[87vh] rounded-xl shadow-xl bg-white flex flex-col">

      {/* Header */}
      <div className="flex justify-center font-bold text-xl text-zinc-700 p-4 border-b">
        Comments
      </div>

    {/* Main Comment Content Container */}
      <div className={`flex flex-col flex-1 relative ${!isLoggedIn ? "overflow-hidden" : ""}`}>
        
        {/* LOGIN OVERLAY: Only shows when not logged in */}
        {!isLoggedIn && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/30 backdrop-blur-[2px]">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all active:scale-95 cursor-pointer"
            >
              Login to join the conversation
            </button>
          </div>
        )}

        {/* Scrollable comments - Blurred if not logged in */}
        <div className={`flex-1 overflow-y-auto bg-white ${!isLoggedIn ? "blur-sm pointer-events-none select-none" : ""}`}>
          {comments.map((comment) => (
            <div key={comment._id} className="flex flex-col border-b border-zinc-50">
              <div className="group flex gap-3 p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex flex-col items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-200"
                    src={comment.user.avatar}
                    alt="user"
                  />
                  {showRepliesFor[comment._id] && <div className="w-px h-full bg-zinc-200 mt-2" />}
                </div>

                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-zinc-900 hover:underline cursor-pointer">
                      @{comment.user.username}
                    </h4>
                    <span className="text-xs text-zinc-500">
                      {formatDistanceToNowStrict(new Date(comment.createdAt))}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-800 leading-relaxed">{comment.text}</p>

                  <div className="flex items-center gap-4 mt-1">
                    <button
                      onClick={() => handleReply(comment)}
                      className="text-xs cursor-pointer font-semibold text-zinc-500 hover:text-blue-600"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => toggleReplies(comment._id)}
                      className="text-xs cursor-pointer font-semibold text-zinc-500 hover:text-zinc-800"
                    >
                      {showRepliesFor[comment._id] ? "Hide replies" : "View replies"}
                    </button>
                  </div>
                </div>
              </div>

              {showRepliesFor[comment._id] && (
                <div className="pb-4">
                  <Replies commentId={comment._id} handleReply={handleReply} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stable Bottom Input - Also blurred if not logged in */}
        <div className={`sticky bottom-0 border-t bg-white p-3 pb-6 ${!isLoggedIn ? "blur-sm pointer-events-none" : ""}`}>
          {replyingTo && (
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs text-zinc-500">
                Replying to <span className="font-semibold text-blue-600">@{replyingTo.username}</span>
              </span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-xs text-zinc-400 hover:text-zinc-600"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={text}
                onChange={handleChange}
                ref={inputRef}
                readOnly={!isLoggedIn}
                placeholder={isLoggedIn ? "Write a comment..." : "Login to comment"}
                className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <button
              onClick={handleClick}
              disabled={!text.trim() || !isLoggedIn}
              className="flex items-center justify-center p-2 cursor-pointer text-blue-600 disabled:text-zinc-300 active:scale-90 hover:scale-105 transition-transform"
            >
              <IoMdSend size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Comments;