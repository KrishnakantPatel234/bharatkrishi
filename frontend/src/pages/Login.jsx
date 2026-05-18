import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import { useAuth } from '../hooks/useAuth.js'
import LoadingState from "../components/LoadingState.jsx"
import { motion } from "framer-motion"

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [loading , setLoading] = useState(false);
  const [formData , setFormData] = useState({
    email : "",
    password : ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await login(formData);
      navigate("/profile");
    }catch(error){
      console.error("Something went wrong : ", error.response?.data || error.message);
    }
    finally{
      setLoading(false);
    }
  }

  if(loading){
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50" >
          <LoadingState />
        </div>
    )
  }

  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center relative overflow-hidden px-4">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-300/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md glass rounded-3xl shadow-2xl p-8 md:p-10 border border-white"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-dark-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Sign in to your BharatKrishi account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                id="email" 
                name="email" 
                type="email" 
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jhondoe@example.com"
                className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                id="password" 
                name="password" 
                type="password" 
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange} 
                placeholder="••••••••"
                className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-primary-600 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
            >
              Sign In
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate("/register")}
              className="text-primary-600 hover:text-primary-700 font-bold cursor-pointer transition-colors"
            >
              Create an account
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default Login