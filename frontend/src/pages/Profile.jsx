import React, { useState, useEffect } from 'react'
import {useAuth} from "../hooks/useAuth.js"
import { useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import API from '../api.js';
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBriefcase, FaCalendarAlt, FaStar, FaPlus } from "react-icons/fa";

const Profile = () => {
  const [postLoading, setPostLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const {id} = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchProfile = async() => {
      try {
        let response;
        if(id) {
          response = await API.get(`/users/${id}`);
        } else {
          response = await API.get(`/users/profile`)
        }
        setProfile(response.data.user);
      } catch(error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, [id]);

  const fetchPosts = async () => {
      try {
        setPostLoading(true);

        const userId = id ?? user?._id;
        if (!userId) return;

        const response = await API.get(`/users/${userId}/posts`);
        setPosts(response.data.posts);
      } catch(error) {
        console.log("Error : ", error.message);
      } finally {
        setPostLoading(false);
      }
  }

  useEffect(() => {
      fetchPosts();
  }, [id, user]);

  const isOwnProfile = !id || user?._id === id;

  if (loading) return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
    </div>
  );

  const createNewPost = () => {
    navigate("/posts");
  }

  if (!profile) return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <p className="text-slate-500 font-medium">Loading profile...</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen relative overflow-hidden pb-20">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-primary-600/90 to-emerald-400/90 -z-10" />
      <div className="absolute top-40 right-10 w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Profile Image and Basic Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Main Profile Card */}
            <div className="glass rounded-3xl p-8 border border-white/60 shadow-xl relative mt-[-100px] bg-white/80">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden bg-white mb-6">
                <img className="w-full h-full object-cover" src={profile.avatar || "/images/default-user.png"} alt={profile.fullname} />
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-dark-900 leading-tight">{profile.fullname}</h2>
                <p className="text-primary-600 font-medium">@{profile.username}</p>
                
                <div className="mt-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold tracking-wide uppercase border border-emerald-200">
                  {profile.type}
                </div>

                {(profile.averagerating > 0 || profile.ratingcount > 0) && (
                  <div className="mt-6 flex items-center justify-center gap-2 bg-amber-50 py-2 rounded-xl border border-amber-100">
                    <FaStar className="text-amber-400 text-lg" />
                    <span className="font-bold text-dark-900">{profile.averagerating}</span>
                    <span className="text-slate-500 text-sm font-medium">({profile.ratingcount || 0} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-3xl p-6 border border-white/60 shadow-sm flex justify-between text-center">
               <div>
                 <p className="text-3xl font-extrabold text-primary-600">{posts?.length || 0}</p>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Total Posts</p>
               </div>
               <div className="w-px bg-slate-200"></div>
               <div>
                 <p className="text-3xl font-extrabold text-emerald-600">
                   {new Date(profile.createdAt).getFullYear()}
                 </p>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Joined</p>
               </div>
            </div>
          </motion.div>
          
          {/* Right Column - All Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* About Section */}
            {profile.about && (
              <div className="glass rounded-3xl p-8 border border-white/60 shadow-sm">
                <h3 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center"><FaBriefcase className="text-sm" /></div>
                   About Me
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">{profile.about}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="glass rounded-3xl p-8 border border-white/60 shadow-sm">
                    <h3 className="text-lg font-bold text-dark-900 mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><FaEnvelope className="text-sm" /></div>
                      Contact Info
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-slate-400 mt-1" />
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Email</p>
                                <p className="text-dark-900 font-medium">{profile.email}</p>
                            </div>
                        </div>
                        {profile.contact && (
                            <div className="flex items-start gap-4">
                                <FaPhone className="text-slate-400 mt-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                                    <p className="text-dark-900 font-medium">{profile.contact}</p>
                                </div>
                            </div>
                        )}
                        {profile.business && (
                            <div className="flex items-start gap-4">
                                <FaBriefcase className="text-slate-400 mt-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Business Name</p>
                                    <p className="text-dark-900 font-medium">{profile.business}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Location Information */}
                <div className="glass rounded-3xl p-8 border border-white/60 shadow-sm">
                    <h3 className="text-lg font-bold text-dark-900 mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><FaMapMarkerAlt className="text-sm" /></div>
                      Location
                    </h3>
                    <div className="space-y-4">
                        {(profile.streetaddress || profile.city) && (
                            <div className="flex items-start gap-4">
                                <FaMapMarkerAlt className="text-slate-400 mt-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Address</p>
                                    <p className="text-dark-900 font-medium">
                                      {profile.streetaddress} {profile.streetaddress && profile.city && ', '} {profile.city}
                                    </p>
                                </div>
                            </div>
                        )}
                        {(profile.state || profile.country || profile.postalcode) && (
                            <div className="flex items-start gap-4 ml-8">
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Region</p>
                                    <p className="text-dark-900 font-medium">
                                      {[profile.state, profile.country, profile.postalcode].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
          </motion.div>
        </div>

        {/* Posts Section */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
            <h2 className="text-3xl font-bold text-dark-900">Marketplace Listings</h2>
            
            {isOwnProfile && (
              <button
                onClick={createNewPost}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
              >
                <FaPlus /> Create New Listing
              </button>
            )}
          </div>

          {postLoading ? (
             <div className="flex flex-col items-center justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
               <p className="text-slate-500 font-medium">Loading listings...</p>
             </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl border border-dashed border-slate-300 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="text-3xl text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-dark-800 mb-2">No listings yet</h2>
                <p className="text-slate-500 mb-8">This user hasn't posted anything to the marketplace yet.</p>
                {isOwnProfile && (
                  <button
                    onClick={createNewPost}
                    className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
                  >
                    Create Your First Listing
                  </button>
                )}
            </div>
          )}          
        </div>
      </div>
    </div>
  )
}

export default Profile