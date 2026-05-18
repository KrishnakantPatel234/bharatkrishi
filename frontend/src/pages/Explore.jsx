import React, { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import LoadingPosts from "../components/LoadingPosts";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Explore = () => {

    const [posts , setPosts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [search , setSearch] = useState("");
    const [category , setCategory] = useState("");

    const fetchPosts = async() => {
        try{
            setLoading(true);

            const query = new URLSearchParams();
            
            if(search.trim()){
                query.append("search" , search);
            }
            if(category){
                query.append("category" , category);
            }

            const response = await API.get(`/posts${query.toString()}`);
            setPosts(response.data.posts);
        }
        catch(err){
            console.log("Error : " , err.response?.data || err.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect( () => {
        fetchPosts();
    }, [category]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts();
    };  

    return (
        <div className="w-full min-h-screen px-6 py-12 max-w-7xl mx-auto relative">
            {/* Background elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10" />

            <div className="mb-12 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-dark-900 mb-4"
                >
                    Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400">Marketplace</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 text-lg"
                >
                    Find the freshest produce, equipment, and dairy products directly from farmers.
                </motion.p>
            </div>

            <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSearch} 
                className="glass rounded-2xl p-4 md:p-6 mb-12 shadow-sm border border-slate-200/60 max-w-4xl mx-auto"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full md:w-48 bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer font-medium"
                        >
                            <option value="">All Categories</option>
                            <option value="CROPS">Crops</option>
                            <option value="VEGETABLES">Vegetables</option>
                            <option value="FRUITS">Fruits</option>
                            <option value="DAIRY">Dairy</option>
                            <option value="EQUIPMENT">Equipments</option>
                        </select>
                    </div>
                    
                    <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <FaSearch />
                        </div>
                        <input 
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, username or city..."
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-400" 
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all w-full md:w-auto"
                    >
                        Search
                    </button>
                </div>
            </motion.form>

            <div className="w-full min-h-[50vh]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center pt-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                        <p className="text-slate-500 font-medium">Loading marketplace...</p>
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
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 glass rounded-3xl border border-dashed border-slate-300 max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaSearch className="text-3xl text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark-800 mb-2">No results found</h2>
                        <p className="text-slate-500">Try adjusting your search criteria or category filter.</p>
                    </motion.div>
                )}          
            </div>
        </div>
    )
}

export default Explore;