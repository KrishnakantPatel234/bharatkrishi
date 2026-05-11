import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import {useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import API from '../api';
import ReactMarkdown from "react-markdown";

const MitraAI = () => {
    const navigate = useNavigate();
    const [input , setInput] = useState("");
    const [messages , setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleBack = () => {
        navigate("/");
    }

   const handleSend = async (e) => {

        e.preventDefault();

        if (input.trim() === "") return;

        const userMessage = input;

        setInput("");

        // USER MESSAGE
        setMessages((prev) => [
            ...prev,
            { text: userMessage, sender: "user" }
        ]);

        setLoading(true);

        try {

            const response = await API.post("/mitra", {
                message: userMessage
            });

            // AI MESSAGE
            setMessages((prev) => [
                ...prev,
                {
                    text: response.data.reply,
                    sender: "ai"
                }
            ]);

        } catch (err) {
            console.log(err.message);
        }
        finally{
            setLoading(false);
        }
    };


  return (
    <div className="h-screen flex flex-col bg-[#f6fff8]">

        {/* HEADER */}
        <div className="bg-white border-b border-green-100 px-5 py-4 flex items-center gap-4 shadow-sm">

            <div
                onClick={handleBack}
                className="p-2 hover:bg-green-50 rounded-full cursor-pointer transition"
            >
                <IoIosArrowBack
                    size={24}
                    className="text-green-700"
                />
            </div>

            <div>
                <h1 className="text-lg font-bold text-green-800">
                    Mitra AI
                </h1>

                <p className="text-xs text-green-600">
                    Your farming assistant
                </p>
            </div>

        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">

            {messages.map((msg, index) => (

                <div
                    key={index}
                    className={`flex ${
                        msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >

                    <div
                        className={`max-w-[75%] prose px-5 py-3 rounded-3xl text-sm leading-7 shadow-sm break-words ${
                            msg.sender === "user"
                                ? "prose-invert bg-green-600 text-white rounded-br-md"
                                : "bg-white text-zinc-700 rounded-bl-md border border-green-100"
                        }`} 
                    >
                        <ReactMarkdown>
                            {msg.text}
                        </ReactMarkdown>
                    </div>

                </div>

            ))}

            {/* TYPING DOTS */}
            {loading && (

                <div className="flex justify-start">

                    <div className="bg-white border border-green-100 px-4 py-3 rounded-3xl rounded-bl-md flex gap-1 shadow-sm">

                        <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>

                        <span
                            className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                        ></span>

                        <span
                            className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                        ></span>

                    </div>

                </div>

            )}

        </div>

        {/* INPUT AREA */}
        <div className="bg-white border-t border-green-100 p-4">

            <div className="flex items-center gap-3 bg-green-50 rounded-2xl px-4 py-3 border border-green-100">

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSend(e)
                    }
                    type="text"
                    placeholder="Ask Mitra anything..."
                    className="flex-1 bg-transparent outline-none text-zinc-700 placeholder:text-zinc-400"
                />

                <button
                    onClick={handleSend}
                    className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-xl text-white font-medium cursor-pointer"
                >
                    Send
                </button>

            </div>

        </div>

    </div>
);
}

export default MitraAI;