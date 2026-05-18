import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHandshake, FaBalanceScale } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-300/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary-400/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

      {/* HERO */}
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 mb-8 bg-white glass rounded-3xl shadow-xl flex items-center justify-center border border-primary-100"
        >
          <img src="/images/logo.png" alt="BharatKrishi Logo" className="w-16 h-16 object-contain" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:text-6xl text-4xl font-extrabold text-dark-900 tracking-tight"
        >
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400">BharatKrishi</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-xl text-slate-500 max-w-2xl font-medium"
        >
          Empowering farmers and buyers through trust, transparency, and technology.
        </motion.p>
      </div>

      {/* MISSION & VISION */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-10 rounded-3xl border border-white hover:shadow-2xl hover:shadow-primary-500/10 transition-shadow duration-500"
            >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                    <FaLeaf className="text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-dark-900 mb-6">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                BharatKrishi aims to transform the agricultural ecosystem by removing
                middlemen and enabling direct connections between farmers and buyers.
                We believe that farmers deserve fair compensation for their hard work,
                and buyers deserve access to fresh, transparent, and high-quality produce.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass p-10 rounded-3xl border border-white hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-500"
            >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <FaHandshake className="text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-dark-900 mb-6">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                To build a future where agriculture is fair, efficient, and
                technology-driven. We envision a system where every farmer has
                direct access to markets and every buyer can trust the origin and
                quality of their products.
                </p>
            </motion.div>
        </div>
      </div>

      {/* WHY US */}
      <div className="py-24 px-6 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-emerald-900/40 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Value Proposition</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
                Why Choose BharatKrishi
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: "Direct Trade", desc: "No middlemen — farmers and buyers connect directly.", icon: <FaHandshake /> },
                { title: "Transparency", desc: "Know exactly what you're buying and who you're buying from.", icon: <FaLeaf /> },
                { title: "Fair Pricing", desc: "Ensuring fair value for both farmers and buyers.", icon: <FaBalanceScale /> }
            ].map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all duration-300"
                >
                    <div className="text-emerald-400 text-4xl mb-6">
                        {item.icon}
                    </div>
                    <h3 className="font-bold text-2xl text-white mb-3">
                        {item.title}
                    </h3>
                    <p className="text-slate-300 text-lg">
                        {item.desc}
                    </p>
                </motion.div>
            ))}
            </div>
        </div>
      </div>

      {/* STORY */}
      <div className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl font-bold text-dark-900 mb-8">
            Our Story
            </h2>
            <p className="text-slate-600 leading-relaxed text-xl mb-12">
            BharatKrishi was built with a simple idea — to bridge the gap between
            farmers and buyers. Seeing the struggles farmers face due to middlemen
            and lack of market access, we created a platform where transactions
            are direct, transparent, and fair.
            </p>
            <div>
                <button className="px-8 py-4 bg-white border-2 border-primary-500 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-xl shadow-primary-500/20 transition-all duration-300">
                    Join the Movement
                </button>
            </div>
        </motion.div>
      </div>

    </div>
  );
};

export default About;