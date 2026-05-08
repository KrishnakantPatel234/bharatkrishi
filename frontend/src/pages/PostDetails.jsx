import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Comments from "../components/Comments";
import {useAuth} from "../hooks/useAuth.js"

const PostDetails = () => {
  const { id } = useParams();
  const {user} = useAuth();
  
  const [post, setPost] = useState(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data.post);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen grid grid-cols-12" >
        <div className="col-span-12 lg:col-span-6 px-2 sm:px-16 lg:px-16 xl:px-30 py-8" >
            <PostCard post={post} />
        </div>
        <div className="col-span-12 lg:col-span-6 px-2 sm:px-16 lg:sticky lg:top-0 lg:px-16 xl:px-30 py-8">
          <Comments postId={post._id} isLoggedIn={isLoggedIn} />
        </div>
    </div>
  )
};

export default PostDetails;