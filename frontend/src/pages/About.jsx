import React from "react";

const About = () => {
  return (
    <div className="w-full bg-white">

      {/* HERO */}
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 bg-zinc-100">
        <h1 className="md:text-5xl text-3xl font-bold text-zinc-900">
          About BharatKrishi
        </h1>
        <p className="mt-4 text-zinc-600 max-w-2xl">
          Empowering farmers and buyers through trust, transparency, and technology.
        </p>
      </div>

      {/* MISSION */}
      <div className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-zinc-900 mb-6">
          Our Mission
        </h2>
        <p className="text-zinc-600 leading-relaxed">
          BharatKrishi aims to transform the agricultural ecosystem by removing
          middlemen and enabling direct connections between farmers and buyers.
          We believe that farmers deserve fair compensation for their hard work,
          and buyers deserve access to fresh, transparent, and high-quality produce.
        </p>
      </div>

      {/* VISION */}
      <div className="py-16 px-6 bg-zinc-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-zinc-900 mb-6">
            Our Vision
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            To build a future where agriculture is fair, efficient, and
            technology-driven. We envision a system where every farmer has
            direct access to markets and every buyer can trust the origin and
            quality of their products.
          </p>
        </div>
      </div>

      {/* WHY US */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose BharatKrishi
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 border rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-green-700">
              Direct Trade
            </h3>
            <p className="text-sm text-zinc-600 mt-2">
              No middlemen — farmers and buyers connect directly.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-green-700">
              Transparency
            </h3>
            <p className="text-sm text-zinc-600 mt-2">
              Know exactly what you're buying and who you're buying from.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-green-700">
              Fair Pricing
            </h3>
            <p className="text-sm text-zinc-600 mt-2">
              Ensuring fair value for both farmers and buyers.
            </p>
          </div>

        </div>
      </div>

      {/* STORY */}
      <div className="py-16 px-6 bg-zinc-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-zinc-900 mb-6">
            Our Story
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            BharatKrishi was built with a simple idea — to bridge the gap between
            farmers and buyers. Seeing the struggles farmers face due to middlemen
            and lack of market access, we created a platform where transactions
            are direct, transparent, and fair.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-6 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-semibold">
          Join the Movement
        </h2>
        <p className="mt-4 text-green-100">
          Be a part of transforming agriculture in India.
        </p>

        <button className="mt-6 px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100">
          Get Started
        </button>
      </div>

    </div>
  );
};

export default About;