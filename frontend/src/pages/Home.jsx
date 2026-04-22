import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard.jsx";

const Home = () => {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/login");
  }

  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts"); // 👈 make sure backend route exists
      setPosts(res.data.posts || res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="story-script-regular mx-8 ">
      {/* Hero section */}
      <div className="min-h-[700px] grid grid-cols-12 gap-4 mt-20 sticky -top-20 z-0" >
        <div className=" md:col-span-6 col-span-12 flex justify-center items-center">
            <div className="mx-4" >
              <h2 className="text-zinc-900 md:text-7xl text-4xl story-script-regular font-bold ">
                <span className="block " >Cultivating Connections,</span>
                <span className="block ">Harvesting Trust.</span>
              </h2>
              <p className="story-script-para text-justify mt-4 md:text-md text-sm ">
                BharatKrishi unites farmers and buyers in a seamless ecosystem. For farmers, it's fair prices and market access. For buyers, it's quality produce and complete transparency. Together, we're reshaping Indian agriculture.
              </p>
              <div className="mt-10 flex  gap-5">
                <button 
                  onClick={handleChange}
                  className="bg-green-600 drop-shadow-xl/50 hover:shadow-2xl transition-shadow duration-300 px-4 md:py-3 rounded-md cursor-pointer hover:bg-green-700 shadow-lg">
                  <span className="story-script-para text-sm text-white mr-2" >
                    Get Started 
                  </span>
                  <FaArrowRightLong className="inline text-white font-thin " />
                </button>
                <button className="bg-zinc-200 drop-shadow-xl/50 hover:shadow-2xl transition-shadow duration-300 outline -outline-offest-1 outline-zinc-300 px-4 py-3 rounded-md cursor-pointer hover:bg-gray-300">
                  <span className="story-script-para text-zinc-800" >Learn more</span>
                </button>
              </div>
            </div>
        </div>
        <div  className="md:col-span-6 col-span-12 flex justify-end items-center">
          <div className="rounded-2xl w-3/4 mr-10 overflow-hidden drop-shadow-xl/50">
            <img className="object-cover w-full h-full" src="/images/indian-farmer.jpg" alt="Indian farmer smiling" />
          </div>
        </div>
      </div>

      {/* Why Bharatkrishi */}
      <div className="min-w-full py-20 relative z-10 -mt-10 bg-gray-200 px-6 rounded-xl shadow-md">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="md:text-4xl text-2xl font-semibold text-zinc-900">
            Why BharatKrishi
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Because agriculture deserves better.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">

          {/* vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-zinc-300 -translate-x-1/2"></div>

          <div className="space-y-16">

            {/* 1 */}
            <div className="relative flex justify-start">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-xl font-semibold text-green-700">
                  No Middlemen
                </h3>
                <p className="text-sm text-zinc-600 mt-2">
                  Farmers sell directly without losing profit.
                </p>
              </div>

              {/* dot */}
              <div className="absolute left-1/2 w-4 h-4 bg-green-600 rounded-full -translate-x-1/2"></div>
            </div>

            {/* 2 */}
            <div className="relative flex justify-end">
              <div className="w-1/2 pl-8">
                <h3 className="text-xl font-semibold text-green-700">
                  Direct Connection
                </h3>
                <p className="text-sm text-zinc-600 mt-2">
                  Buyers connect directly with farmers.
                </p>
              </div>

              <div className="absolute left-1/2 w-4 h-4 bg-green-600 rounded-full -translate-x-1/2"></div>
            </div>

            {/* 3 */}
            <div className="relative flex justify-start">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-xl font-semibold text-green-700">
                  Better Pricing
                </h3>
                <p className="text-sm text-zinc-600 mt-2">
                  Fair prices for both farmers and buyers.
                </p>
              </div>

              <div className="absolute left-1/2 w-4 h-4 bg-green-600 rounded-full -translate-x-1/2"></div>
            </div>

            {/* 4 */}
            <div className="relative flex justify-end">
              <div className="w-1/2 pl-8">
                <h3 className="text-xl font-semibold text-green-700">
                  Built for India
                </h3>
                <p className="text-sm text-zinc-600 mt-2">
                  Simple, accessible and made for real users.
                </p>
              </div>

              <div className="absolute left-1/2 w-4 h-4 bg-green-600 rounded-full -translate-x-1/2"></div>
            </div>

          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="min-w-full py-16 bg-white relative z-10 px-6 py-16">

        <h2 className="text-4xl font-semibold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-2xl font-bold text-green-600">1</h3>
            <p className="mt-4 font-medium">Farmers List Their Produce</p>
            <p className="text-sm text-zinc-600 mt-2">
              Upload crops with price and details.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-600">2</h3>
            <p className="mt-4 font-medium">Buyers Explore & Connect</p>
            <p className="text-sm text-zinc-600 mt-2">
              Browse listings and contact farmers directly.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-600">3</h3>
            <p className="mt-4 font-medium">Deal Happens Directly</p>
            <p className="text-sm text-zinc-600 mt-2">
              No middleman. Just fair trade.
            </p>
          </div>

        </div>
      </div>

      {/* Posts list */}
      <div className="min-w-full py-16 bg-white relative z-10 px-6 py-16">

        <h2 className="text-4xl font-semibold text-center mb-12">
          Latest Listings
        </h2>

        {loading ? (
          <div className="text-center text-zinc-500">Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500">
            No posts available
          </div>
        )}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            View All Listings
          </button>
        </div>

      </div>
            
    </div>
  )
}

export default Home;