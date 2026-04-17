import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard.jsx";
import API from "../api.js";

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
    <div className="min-h-screen bg-zinc-50 px-6 py-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Connect with Farmers & Buyers
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Find and connect directly with people
        </p>
      </div>

      {/* SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center"
      >
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, username, or city..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200"
        />

        {/* Filter */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-none"
        >
          <option value="">All Types</option>
          <option value="BUYER">Buyer</option>
          <option value="BULK BUYER">Bulk Buyer</option>
          <option value="FARMER">Farmer</option>
          <option value="WHOLESALE FARMER">Wholesale Farmer</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Search
        </button>
      </form>

      {/* USERS GRID */}
      <div className="max-w-6xl mx-auto mt-10">
        {loading ? (
          <div className="text-center py-20 text-zinc-500">
            Loading users...
          </div>
        ) : users.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default Connect;