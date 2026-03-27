import React from 'react'
import {useAuth} from "../hooks/useAuth.js"

const Profile = () => {
  const {user} = useAuth();

  if(!user) return <div>No User Data</div>

  return (
    <div className=" w-full" >
      <div className="w-full mt-20 " >
        <div className="w-[200px] h-[200px] flex justify-center bg-red-400 rounded-full border shadow-xl/30">
          <img src={user.avatar} alt="" />
          <div className="mt-51 font-semibold text-[20px] " >
            <h2>{user.fullname}</h2>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Profile