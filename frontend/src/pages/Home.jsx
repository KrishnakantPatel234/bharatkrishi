import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/register");
  }

  return (
    <div className="">
      <div className="min-h-[700px] grid grid-cols-12 gap-4 mt-20 mx-8 " >
        <div className=" md:col-span-6 col-span-12 flex justify-center items-center">
            <div className="mx-4" >
              <h2 className="text-zinc-900 md:text-7xl text-4xl story-script-regular font-bold ">
                <span className="block " >Cultivating Connections,</span>
                <span className="block ">Harvesting Trust.</span>
              </h2>
              <p className="story-script-para text-justify mt-4 md:text-md text-sm ">
                BharatKrishi unites farmers and buyers in a seamless ecosystem. For farmers, it's fair prices and market access. For buyers, it's quality produce and complete transparency. Together, we're reshaping Indian agriculture.
              </p>
              <div className="mt-10 flex  gap-5">
                <button 
                  onClick={handleChange}
                  className="bg-green-600 shadow-xl hover:shadow-2xl transition-shadow duration-300 px-4 md:py-3 rounded-md cursor-pointer hover:bg-green-700 shadow-lg">
                  <span className="story-script-para text-sm text-white mr-2" >
                    Get Started 
                  </span>
                  <FaArrowRightLong className="inline text-white font-thin " />
                </button>
                <button className="bg-zinc-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 outline -outline-offest-1 outline-zinc-300 px-4 py-3 rounded-md cursor-pointer hover:bg-gray-300">
                  <span className="story-script-para text-zinc-800" >Learn more</span>
                </button>
              </div>
            </div>
        </div>
        <div  className="md:col-span-6 col-span-12 flex justify-end items-center">
          <div className="rounded-2xl w-3/4 mr-10 overflow-hidden shadow-2xl">
            <img className="object-cover" src="/images/indian-farmer.jpg" alt="Indian farmer smiling" />
          </div>
        </div>
        
      </div>
      <div  className="bg-green-400">

        </div>
    </div>
  )
}

export default Home