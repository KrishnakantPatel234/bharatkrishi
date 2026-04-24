// import React from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'

// const Navbar = () => {
//     const navigate = useNavigate();
    
//     const [open, setOpen] = useState(false);

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };
//   return (
//     <header  className="w-full h-1/20 bg-white/5 backdrop-blur-sm z-50 sticky top-0">
//         <nav className="w-full grid grid-cols-12 min-h-16 flex justify-between ml-8 mr-8 items-center ">
//             <div className="w-32 col-span-2 h-1 -mt-20 ml-6" >
//                 <a href="/">
//                     <img className="h-25" src="/images/logo.png" alt="" />
//                 </a>
//             </div>
//             <div className="flex gap-16 story items-center justify-center story-script-regular text-xl col-span-8 h-full" >
//                 <a href="/explore">
//                     explore
//                 </a>
//                 <a href="/connect">
//                     Connect
//                 </a>
//                 <a href="/profile">
//                     Profile
//                 </a>
//                 <a href="/aboutus">
//                    About us 
//                 </a>
//             </div>
//             <div className="col-span-2 h-full flex justify-center items-center" >
//                 <button 
//                 onClick={() => navigate("/login")}
//                 className="px-4 py-2 cursor-pointer shadow-xl bg-green-600 shadow-green-600/30 rounded-xl story-script-para text-white text-xl" >
//                     Signin
//                 </button>
//             </div>
//         </nav>
//     </header>
//   )
// }

// export default Navbar

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white/70 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      
      <nav className="w-full grid grid-cols-12 items-center px-4 md:px-8 py-3">

        {/* Logo */}
        <div className="col-span-6 md:col-span-2 w-32 col-span-2 h-1 -mt-24 ml-6" >
            <a href="/">
              <img className="h-25" src="/images/logo.png" alt="" />
            </a>
       </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex col-span-8 justify-center gap-10 text-base font-medium text-gray-700">
          <Link to="/explore" className="hover:text-black">Explore</Link>
          <Link to="/connect" className="hover:text-black">Connect</Link>
          <Link to="/profile" className="hover:text-black">Profile</Link>
          <Link to="/aboutus" className="hover:text-black">About</Link>
        </div>

        {/* Right Side */}
        <div className="col-span-6 md:col-span-2 flex justify-end items-center gap-3">

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-gray-200 px-4 overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 py-4" : "max-h-0"
        }`}
      >
        <div className="space-y-3 text-sm">
          <Link to="/explore" onClick={() => setOpen(false)} className="block">
            Explore
          </Link>
          <Link to="/connect" onClick={() => setOpen(false)} className="block">
            Connect
          </Link>
          <Link to="/profile" onClick={() => setOpen(false)} className="block">
            Profile
          </Link>
          <Link to="/aboutus" onClick={() => setOpen(false)} className="block">
            About
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="block w-full text-left text-red-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="block w-full text-left"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;