import React from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FaSquarePhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-green-700">
            BharatKrishi
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Connecting farmers directly with buyers. Fresh produce, fair prices,
            and a better future for agriculture.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/explore" className="hover:text-black">Explore</Link></li>
            <li><Link to="/connect" className="hover:text-black">Connect</Link></li>
            <li><Link to="/profile" className="hover:text-black">Profile</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/help" className="hover:text-black">Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-black">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <CiMail  size={14} /> support@bharatkrishi.com
            </p>
            <p className="flex items-center gap-2">
              <FaSquarePhone size={14} /> +91 9876543210
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3 mt-4 text-gray-500">
            <FaFacebookSquare size={18} className="hover:text-black cursor-pointer" />
            <FaSquareInstagram size={18} className="hover:text-black cursor-pointer" />
            <FaSquareXTwitter size={18} className="hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BharatKrishi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;