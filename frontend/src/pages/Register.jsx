import React from 'react'
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { MdAddPhotoAlternate ,MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import API from '../api.js';


const Register = () => {

  const [showPassword , setShowPassword] = useState(false);

  const [formData , setFormData] = useState({
    fullname : "",
    username : "",
    about : "",
    email : "",
    password : "",
    type : "",
    business : "",
    contact : "",
    country : "",
    state : "",
    city : "",
    postalcode : "",
    streetaddress : ""

  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (let key in formData) {
        data.append(key, formData[key]);
      }

      const response = await API.post("/auth/register", data);

      console.log(response.data);
    } catch (err) {
             
        console.log("Error response:", err.response);
        console.log("Error data:", err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="space-y-12 m-20" >
        <div className="border-b text-white/10 pb-12" >
          <h2 className="text-base/7 text-semibold text-white" >Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-400" >This information will be displayed publically so be careful what you share</p>
          
          {/* username */}
          <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-white" >
                Username
              </label>
              <div className="mt-2" >
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500" >
                  <input 
                  id="username" 
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                  placeholder="shivshankar" />
                </div>
              </div>
            </div>
          </div>

          {/* password */}
          <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white" >
                Password
              </label>
              <div className="mt-2" >
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500" >
                  <input 
                  id="password" 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm/6" 
                 />
                 <button 
                  type="button"
                  onClick={()=> setShowPassword(!showPassword)}
                  className="mr-2 text-gray-400" >
                    {showPassword ? <MdOutlineRemoveRedEye className="size-5 cursor-pointer" /> : <LuEyeClosed className="size-8 cursor-pointer"/> }
                 </button>
                </div>
              </div>
            </div>
          </div>

          {/* about */}
          <div className="col-span-full mt-5">
            <label htmlFor="about" className="block text-sm/6 font-medium text-white">
              About
            </label>
            <div className="mt-2" >
              <textarea 
                name="about" 
                id="about"
                rows={3}
                value={formData.about}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 "
              />
            </div>
            <p className="mt-1 text-sm/6 text-gray-400" >Write a few sentences about yourself.</p>
          </div>

          {/* photo */}
          <div className="col-span-full mt-5">
            <label htmlFor="photo" className="block text-sm/6 font-medium text-white">
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-5" >
              <FaUserCircle aria-hidden="true" className="size-12 text-gray-500" />
              <button type="button" className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20" >
                Change
              </button>
            </div>
          </div>

          {/* profile picture */}
          <div className="col-span-full mt-5">
            <label htmlFor="profile-picture" className="block text-sm/6 font-medium text-white">
              Profile photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10" >
              <div className="text-center" >
                <MdAddPhotoAlternate aria-hidden="true" className="mx-auto size-12 text-gray-600" />
                <div className="mt-4 flex text-sm/6 text-gray-400">
                  <label 
                    htmlFor="avatar"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300">
                     <span>Upload a file</span>
                     <input id="avatar" type="file" className="sr-only"/>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b text-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-400" >Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" >
            {/* fullname */}
            <div className="sm:col-span-3">
              <label htmlFor="fullname" className="block text-sm/6 font-medium text-white" >
                Full name
              </label>
              <div className="mt-2">
                <input 
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  autoComplete="name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 " 
                />
              </div>
            </div>
            {/* Business type */}
            <div className="sm:col-span-3">
              <label htmlFor="type" className="block text-sm/6 font-medium text-white" >
                Business type
              </label>
              <div className="mt-2">
                <select 
                  name="type" 
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 "
                >
                  <option value="" className="text-black" >
                    Select business type
                  </option>
                  <option value="BUYER" className="text-black" >
                    Buyer
                  </option>
                  <option value="FARMER" className="text-black">
                    Farmer
                  </option>
                  <option value="WHOLESALE FARMER" className="text-black" >
                    Wholesale Farmer
                  </option>
                  <option value="BULK BUYER" className="text-black" >
                    Bulk Buyer
                  </option>
                </select>
              </div>
            </div>
            {/* Business name */}
            <div className="sm:col-span-3">
              <label htmlFor="business" className="block text-sm/6 font-medium text-white" >
                Business name
              </label>
              <div className="mt-2">
                <input 
                  id="business"
                  name="business"
                  type="text"
                  value={formData.business}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 " 
                />
              </div>
            </div>
            {/* Contact number */}
            <div className="sm:col-span-3">
              <label htmlFor="contact" className="block text-sm/6 font-medium text-white" >
                Contact no.
              </label>
              <div className="mt-2">
                <input 
                  id="contact"
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 " 
                />
              </div>
            </div>

            {/* Email address */}
            <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium text-white" >
                  Email address
                </label>
                <div className="mt-2">
                  <input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete='email'
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 " 
                  />
                </div>
            </div>
            {/* country */}
            <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm/6 font-medium text-white" >
                  Country
                </label>
                <div className="mt-2">
                  <select 
                    name="country" 
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 "
                  >
                    <option value="" className="text-black" >
                      Country
                    </option>
                    <option value="India" className="text-black" >
                      India
                    </option>
                    <option value="USA" className="text-black">
                      USA
                    </option>
                    <option value="United Kingdom" className="text-black" >
                      United Kingdom
                    </option>
                    <option value="canada" className="text-black" >
                      Canada
                    </option>
                  </select>
                </div>
            </div> 
            {/* street address */}
            <div className="col-span-full">
              <label htmlFor="streetaddress" className="block text-sm/6 font-medium text-white">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="streetaddress"
                  name="streetaddress"
                  type="text"
                  value={formData.streetaddress}
                  onChange={handleChange}
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div> 
            {/* City */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-white">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            {/* State */}
            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm/6 font-medium text-white">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  autoComplete="state"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            {/* Postal code */}
            <div className="sm:col-span-2">
              <label htmlFor="postalcode" className="block text-sm/6 font-medium text-white">
                Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postalcode"
                  name="postalcode"
                  type="text"
                  value={formData.postalcode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-6 pr-20 pb-20 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default Register