import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard.jsx";
import { motion } from "framer-motion";

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
    <div className="font-sans mx-auto max-w-7xl px-4 sm:px-6 relative overflow-hidden">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      {/* Hero section */}
      <div className="min-h-[85vh] grid grid-cols-1 md:grid-cols-12 gap-12 mt-10 items-center z-10" >
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-6 col-span-1 flex flex-col justify-center text-center md:text-left items-center md:items-start"
        >
            <div className="space-y-6 flex flex-col items-center md:items-start" >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary-500/30 text-primary-700 text-sm font-medium shadow-sm mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-600"></span>
                </span>
                The Future of Agriculture
              </div>
              <h2 className="text-dark-900 md:text-6xl text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
                <span className="block" >Cultivating <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400">Connections,</span></span>
                <span className="block mt-2">Harvesting Trust.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                BharatKrishi unites farmers and buyers in a seamless ecosystem. For farmers, it's fair prices and market access. For buyers, it's quality produce and complete transparency.
              </p>
              <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={handleChange}
                  className="group relative overflow-hidden bg-primary-600 text-white font-medium px-8 py-4 rounded-xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-3">
                    Get Started 
                    <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-primary-700/50"></div>
                </button>
                <button className="px-8 py-4 rounded-xl font-medium text-dark-800 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
                  Learn more
                </button>
              </div>
            </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-6 col-span-1 relative mt-12 md:mt-0 flex justify-center md:block"
        >
          <div className="relative w-full max-w-[250px] sm:max-w-[320px] md:max-w-none mx-auto md:mx-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-[4/3] md:aspect-[4/3]">
              <img className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" src="/images/indian-farmer.jpg" alt="Indian farmer smiling" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:-left-6 md:translate-x-0 glass px-4 md:px-6 py-3 rounded-2xl shadow-xl flex items-center justify-center gap-3 w-[95%] md:w-auto md:min-w-max"
            >
              <div className="bg-primary-100 text-primary-600 p-2 md:p-3 rounded-full shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <div className="truncate">
                <p className="text-xs md:text-sm text-slate-500 font-medium">Direct Trade</p>
                <p className="text-sm md:text-base font-bold text-dark-900 truncate">0% Middlemen</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Why Bharatkrishi */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mt-32 py-20 relative glass rounded-3xl px-8 md:px-16"
      >
        <div className="text-center mb-20">
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Features</span>
          <h2 className="md:text-5xl text-3xl font-bold text-dark-900 mt-2">
            Why BharatKrishi
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
            We are building a transparent ecosystem where agriculture thrives and everyone gets their fair share.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "No Middlemen", desc: "Farmers sell directly without losing profit to intermediaries.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Direct Connection", desc: "Buyers connect directly with farmers for authentic produce.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
              { title: "Better Pricing", desc: "Fair prices that benefit both the producers and consumers.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { title: "Built for India", desc: "Simple, accessible, and made for real agricultural workflows.", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/60 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path></svg>
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* How it works */}
      <div className="py-32 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-dark-900">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 z-0"></div>
          
          {[
            { step: "1", title: "List Produce", desc: "Upload crops with price and details in minutes." },
            { step: "2", title: "Explore & Connect", desc: "Browse listings and contact farmers directly via chat." },
            { step: "3", title: "Direct Deal", desc: "Finalize trade safely with no hidden commission fees." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10"
            >
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)] mb-8 border-4 border-primary-50">
                <span className="text-3xl font-extrabold text-primary-600">{item.step}</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">{item.title}</h3>
              <p className="text-slate-600 px-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Posts list */}
      <div className="py-20 mb-20 glass rounded-3xl px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Marketplace</span>
            <h2 className="text-4xl font-bold text-dark-900 mt-2">
              Latest Listings
            </h2>
          </div>
          <button
            onClick={() => navigate("/explore")}
            className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All <FaArrowRightLong />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, idx) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">No listings available at the moment.</p>
          </div>
        )}
        
        <div className="mt-10 md:hidden flex justify-center">
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-white border border-slate-200 text-dark-800 rounded-xl hover:bg-slate-50 shadow-sm"
          >
            View All Listings
          </button>
        </div>
      </div>
            
    </div>
  )
}

export default Home;