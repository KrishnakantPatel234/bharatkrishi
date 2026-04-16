        import React, { useState } from 'react'
        import API from '../api.js';
        import { useNavigate } from 'react-router-dom';

        const CreatePost = () => {

            const navigate = useNavigate();

            const [picture , setPicture] = useState(null);
            const [isLoading , setIsLoading] = useState(false);

            const initialState = {
                title : "",
                description : "",
                picture :"",
                category :"",
                quantity :"",
                quantityunit : "",
                price : "",
            }

            const [formData , setFormData] = useState(initialState);

            const resetForm = () => {
                setFormData(initialState);
                setPicture(null);
            }

            const handleChange = (e) => {
                setFormData({
                    ...formData ,
                    [e.target.name] : e.target.value
                });
            }
            const handleSubmit = async (e) => {
                e.preventDefault();
                setIsLoading(true);

                if(!formData.title || !formData.description || !formData.quantityunit || !formData.price || !formData.quantity){
                    return alert("please fill all the required feilds");
                }

                if(picture && picture.size > 5 * 1024 * 1024){
                    return alert("Image size must be smaller than 5MB");
                }

                try{
                    const sendData = new FormData();

                    sendData.append("title" , formData.title);
                    sendData.append("description" , formData.description);
                    sendData.append("category" , formData.category);
                    sendData.append("quantity" , formData.quantity);
                    sendData.append("quantityunit" , formData.quantityunit);
                    sendData.append("price" , formData.price);

                    if(picture){
                        sendData.append("picture" , picture);
                    }

                    const response = await API.post("/posts" , sendData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log(response.data);
                    navigate("/profile");
                }
                catch(error){       
                    console.log("Something went wrong : " , error.message);
                    console.log("Error data:", error.response?.data);
                }
                finally{
                    setIsLoading(false);
                }
            }

        return (
            <div className="w-full h-screen  flex justify-center items-center" >
                <form onSubmit={handleSubmit} >
                    <div className="w-120 h-180 bg-white/90 shadow-xl/20 rounded-lg px-10 py-2 story-script-regular">
                        <div className="flex justify-center text-2xl text-zinc-800 mb-8 pb-3 border-b border-gray-300 " >
                            Create a Post
                        </div>
                        <div className="mt-5" >
                            <label htmlFor="image" className="after:ml-0.5 after:text-red-500 after:content-['*']" >
                                Select an image
                            </label>
                            <div className="mt-2" >
                                <div className="relative rounded-md mt-2 py-5 pl-2 border border-dashed border-gray-500 flex justify-center items-center" >
                                    <label
                                    htmlFor="image"
                                    className="absolute inset-0 cursor-pointer rounded-lg"
                                    aria-label="Upload a file"
                                    />
                                    <span>
                                        Upload an image
                                        <span>
                                            <input  
                                            id="image"
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => setPicture(e.target.files[0])}
                                            className="sr-only rounded-md outline-none w-full text-zinc-800 bg-transparent focus:outline-none"
                                            />
                                        </span>
                                        <p>or drag and drop</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-5" >
                            <label htmlFor="title" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                Title
                            </label>
                            <div className="mt-2" >
                                <div className=" rounded-md mt-2 py-1 pl-2 outline-1 -offset-outline-1 outline-gray-500 focus-within:outline-2 focus-within:-offset-outline-2 focus-within:outline-indigo-500" >
                                    <input  
                                    id="title"
                                    name="title"
                                    type="text" 
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="rounded-md outline-none w-full text-zinc-800 bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5" >
                            <label htmlFor="description" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                Description
                            </label>
                            <div className="mt-2" >
                                <div className=" rounded-md mt-2 py-1 pl-2 outline-1 -offset-outline-1 outline-gray-500 focus-within:outline-2 focus-within:-offset-outline-2 focus-within:outline-indigo-500" >
                                    <textarea
                                    id="description"
                                    name="description"
                                    type="text" 
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="resize-none rounded-md outline-none w-full text-zinc-800 bg-transparent focus:outline-none "
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-between" >
                            <div>
                                <label htmlFor="category" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                    Category
                                </label>
                                <div className="mt-2" >
                                    <div className=" rounded-md mt-2 py-1 pl-2 outline-1 -offset-outline-1 outline-gray-500 focus-within:outline-2 focus-within:-offset-outline-2 focus-within:outline-indigo-500" >
                                        <select 
                                        value={formData.category}
                                        onChange={handleChange}
                                        name="category" 
                                        id="category" 
                                        className="outline-none" >
                                            <option value="">Select a Category</option>
                                            <option value="VEGTABLES">Vegetable</option>
                                            <option value="CROPS">Crops</option>
                                            <option value="FRUITS">Fruits</option>
                                            <option value="DAIRY">Dairy</option>
                                            <option value="EQUIPMENTS">Equipments</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="quantityunit" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                    Unit
                                </label>
                                <div className="mt-2" >
                                    <div className=" rounded-md mt-2 py-1 pl-2 outline-1 -offset-outline-1 outline-gray-500 focus-within:outline-2 focus-within:-offset-outline-2 focus-within:outline-indigo-500" >
                                        <select 
                                        value={formData.quantityunit}
                                        onChange={handleChange}
                                        name="quantityunit" 
                                        id="quantityunit" 
                                        className="outline-none" >
                                            <option value="">Select a Unit</option>
                                            <option value="kg">Kg</option>
                                            <option value="quintol">Quintol</option>
                                            <option value="ton">Ton</option>
                                            <option value="liters">Liters</option>
                                            <option value="dozen">Dozen</option>
                                            <option value="pieces">Pieces</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5" >
                            <label htmlFor="quantity" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                Quantity
                            </label>
                            <div className="mt-2" >
                                <div className=" rounded-md mt-2 py-1 pl-2 outline-1 -offset-outline-1 outline-gray-500 focus-within:outline-2 focus-within:-offset-outline-2 focus-within:outline-indigo-500" >
                                    <input  
                                    id="quantity"
                                    name="quantity"
                                    type="number" 
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="rounded-md outline-none w-full text-zinc-800 bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5" >
                            <label htmlFor="price" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                Price
                            </label>
                            <div className="mt-2" >
                                <div className=" rounded-md mt-2 py-1 pl-2 outline-1 -offset-outline-1 outline-gray-500 focus-within:outline-2 focus-within:-offset-outline-2 focus-within:outline-indigo-500" >
                                    <input  
                                    id="price"
                                    name="price"
                                    type="number" 
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="rounded-md outline-none w-full text-zinc-800 bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-5" >
                            <button 
                            onClick={resetForm}
                            className="bg-zinc-500 py-1 px-3 mt-5 rounded-lg cursor-pointer hover:bg-zinc-600 transition-all duration-500 hover:scale-105 text-white/90" >
                                Clear
                            </button>
                            <button 
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 py-1 px-3 mt-5 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-500 hover:scale-105 text-white/90 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                            {isLoading ? (
                                <>
                                <svg 
                                    className="animate-spin h-4 w-4 inline-block mr-2" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                processing...
                                </>
                            ) : (
                                'Create Post'
                            )}
                            </button>
                        </div>
                        
                    </div>
                </form>    
            </div>
        )
        }

        export default CreatePost