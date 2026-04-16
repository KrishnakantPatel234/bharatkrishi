import React, { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";

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
        <div className="w-full min-h-screen p-2 flex flex-col gap-4     ">
            <form onSubmit={handleSearch}>
                <div className="grid grid-cols-12 h-20 w-full">
                <div className="md:col-span-3 col-span-2 font-medium flex justify-center items-center" >
                    <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-xl w-24 md:w-48 text-center border border-zinc-400 cursor-pointer md:px-4 md:py-3 ml-8 px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                    >
                    
                    <option value="">All Categories</option>
                    <option value="CROPS">Crops</option>
                    <option value="VEGETABLES">Vegetables</option>
                    <option value="FRUITS">Fruits</option>
                    <option value="DAIRY">Dairy</option>
                    <option value="EQUIPMENT" >Equipments</option>
                    </select>
                </div>
                <div className="md:col-span-6 col-span-8 flex justify-center items-center" >
                    <div className=" w-2/3 outline-1 -outline-offset-1 outline-zinc-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500   rounded-lg px-4 py-1 story-script-para ">
                    <input 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search name , username or city"
                    className="outline-none bg-transparent w-full object-cover placeholder:text-gray-500" 
                    />
                    </div>
                </div>
                <div className="md:col-span-3 col-span-2 sm:pr-3 pr-6 flex justify-center items-center" >
                    <button
                    type="submit"
                    className="rounded-xl bg-blue-500 text-white md:px-8 mdz` :py-3 px-4 py-1.5 font-medium hover:bg-blue-600 transition duration-300 cursor-pointer"
                    >
                    Search
                    </button>
                </div>
                </div>
            </form>
            <div className="w-full h-screen  rounded-lg" >
                {loading ? (
                <div className="text-center py-20 text-zinc-600 text-lg">
                    Loading users...
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
                    <h2 className="text-xl font-semibold text-zinc-700">No users found</h2>
                </div>
                )}          
            </div>
        </div>
    )
}

export default Explore;