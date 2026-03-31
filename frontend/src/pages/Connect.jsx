import React , {useEffect , useState} from 'react';
import UserCard from '../components/UserCard.jsx';
import API from '../api.js';

const Connect = () => {

  const [users , setUsers] = useState([]);
  const [loading , setLoading] = useState(true);
  const [search , setSearch] = useState("");
  const [type , setType] = useState("");

  const fetchUsers = async() => {
    try{
      setLoading(true);

      const query = new URLSearchParams();

      if(search.trim()){
        query.append(`search` , search);
      }
      if(type){
        query.append(`type` , type);
      }

      const response = await API.get(`/users?${query.toString()}`);
      setUsers(response.data.users)
    }
    catch(error){
      console.log("Error : ", error.response?.data || error.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect( () => {
    fetchUsers();
  }, [type]); 

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className='min-h-screen bg-white/80 w-full' >
      {/* Search and filters */}
      <form onSubmit={handleSearch} action="">
        <div className="grid grid-cols-12 h-20 w-full">
          <div className="col-span-3 flex justify-center items-center" >
             <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border border-zinc-400 cursor-pointer px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            >
              <option value="">All Types</option>
              <option value="BUYER">Buyer</option>
              <option value="BULK BUYER">Bulk Buyer</option>
              <option value="FARMER">Farmer</option>
              <option value="WHOLESALE FARMER">Wholesale Farmer</option>
            </select>
          </div>
          <div className="col-span-6 flex justify-center items-center" >
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
          <div className="col-span-3 flex justify-center items-center" >
            <button
              type="submit"
              className="rounded-xl bg-blue-500 text-white px-8 py-3 font-medium hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div className=" w-full h-full" >
            {loading ? (
              <div className="text-center py-20 text-zinc-600 text-lg">
                Loading users...
              </div>
            ) : users.length > 0 ? (
              <div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-16 pt-10"
              >
                {users.map((user) => (
                  <UserCard key={user._id} user={user} />
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

export default Connect