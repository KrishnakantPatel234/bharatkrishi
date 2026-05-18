import React from 'react';
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { MdAddPhotoAlternate, MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import API from '../api.js';
import { useNavigate, Link } from "react-router-dom"; 
import LoadingState from '../components/LoadingState.jsx';
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    about: "",
    email: "",
    password: "",
    type: "",
    business: "",
    contact: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    streetaddress: ""
  });

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.fullname || !formData.username || !formData.email || !formData.password) {
      setLoading(false);
      return alert("Please fill all required fields");
    }

    if (avatar && avatar.size > 5 * 1024 * 1024) {
      setLoading(false)
      return alert("Image must be less than 5MB");
    }

    try {
      const sendData = new FormData();

      sendData.append("fullname", formData.fullname);
      sendData.append("username", formData.username);
      sendData.append("about", formData.about);
      sendData.append("email", formData.email);
      sendData.append("password", formData.password);
      sendData.append("type", formData.type);
      sendData.append("business", formData.business);
      sendData.append("contact", formData.contact);
      sendData.append("country", formData.country);
      sendData.append("state", formData.state);
      sendData.append("city", formData.city);
      sendData.append("postalcode", formData.postalcode);
      sendData.append("streetaddress", formData.streetaddress);

      if (avatar) {
        sendData.append("avatar", avatar);
      }

      await API.post("/auth/register", sendData);

      navigate("/profile");
    } catch (err) {
      console.log("Error response:", err.response);
      console.log("Error data:", err.response?.data);
    }
    finally {
      setLoading(false);
    }
  };

  if(loading){
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50" >
          <LoadingState />
        </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-100/40 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary-200/30 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-dark-900 tracking-tight">Create an Account</h2>
          <p className="text-slate-500 mt-2 font-medium text-lg">Join the BharatKrishi community today</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl shadow-xl overflow-hidden border border-white">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Profile Section */}
            <div className="border-b border-slate-200/60 pb-12">
              <h3 className="text-xl font-bold text-dark-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm">1</span>
                Public Profile
              </h3>
              <p className="mt-1 text-sm text-slate-500 ml-10">This information will be displayed publicly.</p>
              
              <div className="mt-8 ml-10 grid grid-cols-1 gap-y-8 sm:grid-cols-6 gap-x-6">
                
                {/* Profile Picture */}
                <div className="col-span-full">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Photo</label>
                  <div className="flex items-center gap-x-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center group hover:border-primary-500 transition-colors cursor-pointer">
                      {avatar ? (
                        <img src={URL.createObjectURL(avatar)} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <MdAddPhotoAlternate className="h-8 w-8 text-slate-400 group-hover:text-primary-500 transition-colors" />
                      )}
                      <input id="avatar" type="file" onChange={(e) => setAvatar(e.target.files[0])} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-500 font-medium">Click to upload or drag and drop</p>
                      <p className="text-slate-400 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="username" name="username" type="text" required
                    value={formData.username} onChange={handleChange}
                    placeholder="johndoe123"
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-400" 
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-semibold text-slate-700 mb-2">
                    About
                  </label>
                  <textarea 
                    name="about" id="about" rows={3}
                    value={formData.about} onChange={handleChange}
                    placeholder="Write a few sentences about yourself or your farm..."
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="border-b border-slate-200/60 pb-12">
              <h3 className="text-xl font-bold text-dark-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm">2</span>
                Account Security
              </h3>
              
              <div className="mt-8 ml-10 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-6">
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="email" name="email" type="email" required autoComplete="email"
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" 
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      id="password" name="password" required
                      type={showPassword ? "text" : "password"}
                      value={formData.password} onChange={handleChange}
                      className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" 
                    />
                    <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-primary-600 transition-colors">
                      {showPassword ? <MdOutlineRemoveRedEye className="h-5 w-5" /> : <LuEyeClosed className="h-5 w-5"/>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="pb-4">
              <h3 className="text-xl font-bold text-dark-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm">3</span>
                Personal Information
              </h3>
              
              <div className="mt-8 ml-10 grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-6">
                <div className="sm:col-span-3">
                  <label htmlFor="fullname" className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="fullname" name="fullname" type="text" required autoComplete="name"
                    value={formData.fullname} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" 
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">
                    Role / Business Type <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="type" id="type" required
                    value={formData.type} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
                  >
                    <option value="">Select a role</option>
                    <option value="FARMER">Farmer</option>
                    <option value="BUYER">Buyer</option>
                    <option value="WHOLESALE FARMER">Wholesale Farmer</option>
                    <option value="BULK BUYER">Bulk Buyer</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="business" className="block text-sm font-semibold text-slate-700 mb-2">Business Name (Optional)</label>
                  <input 
                    id="business" name="business" type="text"
                    value={formData.business} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" 
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="contact" className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
                  <input 
                    id="contact" name="contact" type="tel" autoComplete="tel"
                    value={formData.contact} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" 
                  />
                </div>

                <div className="col-span-full mt-4">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Address Details</h4>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="streetaddress" className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
                  <input
                    id="streetaddress" name="streetaddress" type="text" autoComplete="street-address"
                    value={formData.streetaddress} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <input
                    id="city" name="city" type="text" autoComplete="address-level2"
                    value={formData.city} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">State / Province</label>
                  <input
                    id="state" name="state" type="text" autoComplete="address-level1"
                    value={formData.state} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                  <select 
                    name="country" id="country"
                    value={formData.country} onChange={handleChange}
                    className="w-full bg-white/60 border border-slate-200 text-dark-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">  
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">Sign in</Link>
            </p>
            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                type="button" onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-primary-600 rounded-xl shadow-[0_4px_14px_0_rgb(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Register