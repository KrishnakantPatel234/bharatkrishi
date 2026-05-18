import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard.jsx";
import API from "../api.js";
import { motion } from "framer-motion";
import { FaSearch, FaUsers } from "react-icons/fa";

const Connect = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();
      if (search.trim()) query.append("search", search);
      if (type) query.append("type", type);

      const res = await API.get(`/users?${query.toString()}`);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [type]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="w-full min-h-screen px-6 py-12 max-w-7xl mx-auto relative">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute bottom-1/4 left-10 w-[20rem] h-[20rem] bg-primary-500/10 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary-100"
        >
          <FaUsers className="text-3xl" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-dark-900 tracking-tight"
        >
          Connect & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400">Grow Together</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto"
        >
          Build your network. Find verified farmers, wholesale buyers, and partners across the country to expand your agricultural business.
        </motion.p>
      </div>

      {/* SEARCH BAR */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto glass p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center mb-16"
      >
        {/* Search */}
        <div className="flex-grow relative w-full">
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

        {/* Filter */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full md:w-56 bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer font-medium"
        >
          <option value="">All Account Types</option>
          <option value="BUYER">Buyer</option>
          <option value="BULK BUYER">Bulk Buyer</option>
          <option value="FARMER">Farmer</option>
          <option value="WHOLESALE FARMER">Wholesale Farmer</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
        >
          Search
        </button>
      </motion.form>

      {/* USERS GRID */}
      <div className="max-w-6xl mx-auto min-h-[40vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
             <p className="text-slate-500 font-medium">Discovering network...</p>
          </div>
        ) : users.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <UserCard user={user} />
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
                  <FaUsers className="text-3xl text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-dark-800 mb-2">No users found</h2>
              <p className="text-slate-500">Try adjusting your search terms or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Connect;