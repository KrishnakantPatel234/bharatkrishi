import React from 'react'
import {useAuth} from "../hooks/useAuth.js"


const Profile = () => {
  const {user} = useAuth();

  if(!user) return <div>No User Data</div>

  return (
    <div className="w-full h-screen bg-pink-200">
      <div className="grid grid-cols-12 h-2/3 " >
        <div className="md:col-span-4 col-span-12 bg-indigo-300 flex flex-col justify-center items-center " >
          <div className="w-42 h-42 rounded-full border border-white/5 shadow-2xl  overflow-hidden">
            <img className="w-full h-full object-cover" src={user.avatar} alt="An indian farmer Image" />
          </div>
          <h2 className="story-script-regular text-xl mt-4" >{user.fullname}</h2>
        </div>
        <div className="md:col-span-8 col-span-12 bg-red-300 flex items-center" >
          <h2>Hey , here are my other details</h2>
        </div>
      </div>
    </div>
  )
}

export default Profile