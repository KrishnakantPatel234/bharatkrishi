import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <header  className="w-full h-1/20 bg-white/5 backdrop-blur-sm z-50 sticky top-0">
        <nav className="w-full grid grid-cols-12 min-h-16 flex justify-between ml-8 mr-8 items-center ">
            <div className="w-32 col-span-2 h-1 -mt-20 ml-6" >
                <a href="/">
                    <img className="h-25" src="/images/logo.png" alt="" />
                </a>
            </div>
            <div className="flex gap-16 story items-center justify-center story-script-regular text-xl col-span-8 h-full" >
                <a href="/posts">
                    feed
                </a>
                <a href="/connect">
                    Connect
                </a>
                <a href="/profile">
                    Profile
                </a>
                <a href="/aboutus">
                   About us 
                </a>
            </div>
            <div className="col-span-2 h-full flex justify-center items-center" >
                <button 
                onClick={() => navigate("/login")}
                className="px-4 py-2 cursor-pointer shadow-xl bg-green-600 shadow-green-600/30 rounded-xl story-script-para text-white text-xl" >
                    Signin
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar