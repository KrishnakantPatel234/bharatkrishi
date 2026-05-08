import React, { useState, useEffect } from "react";
import API from "../api.js";
import { formatDistanceToNowStrict } from "date-fns";

const Replies = ({ commentId, handleReply }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await API.get(`/comments/${commentId}/replies`);
        setReplies(res.data.replies);
      } catch (err) {
        console.error("Error fetching replies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
  }, [commentId]);

  if (loading) return <div className="text-xs text-zinc-400 ml-12 py-2">Loading replies...</div>;

  return (
    <div className="ml-10 border-l-2 border-zinc-100 pl-4">
      {replies.map((reply) => (
        <div key={reply._id} className="flex gap-3 py-3">
          <img
            className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-200"
            src={reply.user.avatar}
            alt="user"
          />
          <div className="flex flex-col flex-1 gap-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-zinc-900 underline cursor-pointer">
                @{reply.user.username}
              </h4>
              <span className="text-[10px] text-zinc-500">
                {formatDistanceToNowStrict(new Date(reply.createdAt))}
              </span>
            </div>
            <p className="text-sm text-zinc-800">{reply.text}</p>
            <button
              onClick={() => handleReply(reply)}
              className="text-[10px] font-bold text-zinc-500 hover:text-blue-600 w-fit"
            >
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;