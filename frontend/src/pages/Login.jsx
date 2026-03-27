import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const Login = () => {
  const navigate = useNavigate();

  const [formData , setFormData] = useState({
    email : "",
    password : ""
  });

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const data = new FormData();

      for(let key in formData){
        data.append(key , formData[key]);
      }

      const response = await API.post("/auth/login" , data);
      navigate("/profile");
      console.log(response)
    }catch(error){
      console.error("Something went wrong : ", error.message);
    }
  }


  return (
    <div className="w-full min-h-[795px] flex justify-center items-center">
      <div className="min-w-4/5 md:min-w-1/3 min-h-[500px] bg-white/5 rounded-xl shadow-2xl ">
        {/* email field */}
        <div className="m-10 mt-20" >
          <label 
            htmlFor="email"
            className="story-script-para"
          >
            Email
          </label>
          <div className="mt-2" >
            <div className="flex items-center rounded-md pl-3 py-1 outline-1 -outline-offset-1 outline-zinc-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500" >
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="jhondoe@xample.com"
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 outline-nono focus:outline-none placeholder:text-gray-400 w-full"
              />
            </div>
          </div>
        </div>
        {/* password field */}
        <div className="m-10" >
          <label 
            htmlFor="password"
            className="story-script-para"
          >
            Password
          </label>
          <div className="mt-2" >
            <div className="flex items-center rounded-md pl-3 py-1 outline-1 -outline-offset-1 outline-zinc-400 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500" >
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange} 
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 outline-nono focus:outline-none placeholder:text-gray-400 w-full"
              />
            </div>
          </div>
        </div>

        <div className="m-10">
          <p className="story-script-para" >
            if you do not have an account
            <span 
              onClick={() => navigate("/register")}
              className="text-indigo-500 ml-1 hover:text-indigo-600 cursor-pointer">
                create an account
            </span>
          </p>
        </div>

        <div className="mt-15 flex justify-center">
          <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
            Signin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login