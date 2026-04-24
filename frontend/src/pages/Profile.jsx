import React, { useState , useEffect } from 'react'
import {useAuth} from "../hooks/useAuth.js"
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import API from '../api.js';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  const [postLoading , setPostLoading] = useState(false);
  const [posts , setPosts] = useState([]);

  const fetchPosts = async () => {
      try{
        setPostLoading(true);

        if (!user) return;
        const userId = user._id;

        const response = await API.get(`/accounts/${userId}/posts` , {
          withCredentials: true
        });
        setPosts(response.data.posts);
      }
      catch(error){
        console.log("Error : " , error.message);
      }
      finally{
        setPostLoading(false);
      }
  }
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const createNewPost = () => {
    navigate("/posts");
  }


  return (
    <div className="w-full min-h-screen bg-white story-script-para">
      <div className="grid grid-cols-12 gap-4 p-4" >
        {/* Left Column - Profile Image and Basic Info */}
        <div className="md:col-span-4 col-span-12 bg-white/10 border border-zinc-200 shadow-2xl/40 hover:shadow-2xl/60 rounded-lg p-6 flex flex-col justify-center items-center" >
          <div className="w-42 h-42 rounded-full border border-zinc-400 shadow-2xl overflow-hidden">
            <img className="w-full h-full object-cover" src={user.avatar || "/default-avatar.png"} alt={user.fullname} />
          </div>
          <h2 className="story-script-regular text-2xl font-bold mt-4 text-center">{user.fullname}</h2>
          <p className="text-gray-600 mt-2">@{user.username}</p>
          <p className="text-sm bg-zinc-400 px-3 py-1 rounded-full mt-2">{user.type}</p>
          
          {/* Rating Section - Only show if ratings exist */}
          {(user.averagerating > 0 || user.ratingcount > 0) && (
            <div className="mt-4 text-center">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{user.averagerating}</span>
                <span className="text-gray-600">({user.ratingcount || 0} ratings)</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - All Details */}
        <div className="md:col-span-8 col-span-12 space-y-4" >
          
          {/* Row 1: Two Column Layout - Contact & Business */}
          <div className="grid grid-cols-12 gap-4 " >
            <div className="col-span-12 md:col-span-6 p-4 rounded-lg bg-white/10 border border-zinc-200 shadow-2xl/20 hover:shadow-2xl/60">
              <h3 className="font-bold text-lg mb-2 border-b pb-2">Contact Information</h3>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              {user.contact && <p><span className="font-semibold">Phone:</span> {user.contact}</p>}
            </div>
            <div className="col-span-12 md:col-span-6 p-4 rounded-lg bg-white/10 border border-zinc-200 shadow-2xl/20 hover:shadow-2xl/60">
              <h3 className="font-bold text-lg mb-2 border-b pb-2">Business Details</h3>
              <p><span className="font-semibold">Account Type:</span> {user.type}</p>
              {user.business && <p><span className="font-semibold">Business Name:</span> {user.business}</p>}
            </div>
          </div>
          
          {/* Row 2: About Section - Full Width (Only show if about exists) */}
          {user.about && (
            <div className=" p-4 rounded-lg bg-white/10 border border-zinc-200 shadow-2xl/20 hover:shadow-2xl/60">
              <h3 className="font-bold text-lg mb-2 border-b pb-2">About Me</h3>
              <p className="text-gray-700">{user.about}</p>
            </div>
          )}
          
          {/* Row 3: Location Details - Only show if any location field exists */}
          {(user.streetaddress || user.city || user.state || user.country || user.postalcode) && (
            <div className="grid grid-cols-12 gap-4" >
              <div className="col-span-12 md:col-span-6 p-4 rounded-lg bg-white/10 border border-zinc-200 shadow-2xl/20 hover:shadow-2xl/60">
                <h3 className="font-bold text-lg mb-2 border-b pb-2">Address</h3>
                {user.streetaddress && <p><span className="font-semibold">Street:</span> {user.streetaddress}</p>}
                {user.city && <p><span className="font-semibold">City:</span> {user.city}</p>}
                {user.state && <p><span className="font-semibold">State:</span> {user.state}</p>}
              </div>
              <div className="col-span-12 md:col-span-6 p-4 rounded-lg bg-white/10 border border-zinc-200 shadow-2xl/20 hover:shadow-2xl/60">
                <h3 className="font-bold text-lg mb-2 border-b pb-2">Location</h3>
                {user.country && <p><span className="font-semibold">Country:</span> {user.country}</p>}
                {user.postalcode && <p><span className="font-semibold">Postal Code:</span> {user.postalcode}</p>}
              </div>
            </div>
          )}
          
          {/* Row 4: Statistics - Full Width */}
          <div className="p-4 rounded-lg bg-white/10 border border-zinc-200 shadow-2xl/20 hover:shadow-2xl/60">
            <h3 className="font-bold text-lg mb-2 border-b pb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Total Posts:</p>
                <p className="text-2xl">{posts?.length || 0}</p>
              </div>
              <div>
                <p className="font-semibold">Member Since:</p>
                <p>{new Date(user.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="p-4 w-full min-h-screen " >
        <div className="w-full min-h-screen " >
          <div className="text-lg flex gap-8 md:justify-start justify-around " >
            <button type="button"
              className="px-5 py-2 bg-white/10 cursor-pointer shadow-xl/20 hover:shadow-xl/40 rounded-lg text-gray-800/80 " >
              Posts
            </button>
            <button
            onClick={createNewPost}
            className="px-5 py-2 bg-blue-500 cursor-pointer shadow-xl/40 hover:shadow-xl/60 rounded-lg text-white/90"
            >
              Create Post
            </button>
          </div>
          <div>
            <div className="w-full min-h-screen  rounded-lg" >
                {postLoading ? (
                <div className="text-center py-20 text-zinc-600 text-lg">
                    Loading Posts...
                </div>
                ) : posts.length > 0 ? (
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-8 pt-10"
                >
                    {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                    ))}
                </div>
                ) : (
                <div className="text-center items-center py-20">
                    <h2 className="text-xl font-semibold text-zinc-700">No Post Found </h2>
                    <button
                    onClick={createNewPost}
                    className="px-5 py-2 bg-blue-500 cursor-pointer shadow-xl/40 hover:shadow-xl/60 rounded-lg text-white/90"
                    >
                      Create First Post
                    </button>
                </div>
                )}          
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile