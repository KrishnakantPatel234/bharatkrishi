import React from "react";
import { MapPin, Globe } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const UserCard = ({ user }) => {

  const handleWhatsApp = () => {
    const phone = user.contact;
    const message = `Hello ${user.fullname}, I found you on BharatKrishi.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="group glass p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-white/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Top */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={user.avatar || "/images/default-user.png"}
            className="w-16 h-16 rounded-2xl object-cover shadow-sm"
            alt={user.fullname}
          />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full border border-white">
              {user.type === "WHOLESALE FARMER" ? "WHOLESALE" : user.type}
            </span>
          </div>
        </div>

        <div className="flex-1 pt-1">
          <h2 className="text-lg font-bold text-dark-900 leading-tight">
            {user.fullname}
          </h2>
          <p className="text-sm text-primary-600 font-medium">@{user.username}</p>
        </div>
      </div>

      {/* Business */}
      <div className="mt-5">
        {user.business ? (
          <p className="text-sm font-bold text-dark-800 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
            {user.business}
          </p>
        ) : (
          <p className="text-sm font-bold text-transparent select-none">-</p>
        )}
      </div>

      {/* Info */}
      <div className="flex gap-4 text-xs font-medium text-slate-500 mt-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
        {user.city && (
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary-500" />
            {user.city}
          </div>
        )}
        {user.country && (
          <div className="flex items-center gap-1.5">
            <Globe size={14} className="text-emerald-500" />
            {user.country}
          </div>
        )}
      </div>

      {/* About */}
      <div className="mt-4 h-12">
        {user.about ? (
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {user.about}
          </p>
        ) : (
          <p className="text-sm text-slate-400 italic">No description provided.</p>
        )}
      </div>

      {/* Action */}
      <button
        onClick={handleWhatsApp}
        className="w-full mt-6 py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-xl hover:bg-[#25D366] hover:text-white transition-all duration-300"
      >
        <FaWhatsapp className="text-lg" />
        Connect on WhatsApp
      </button>
    </div>
  );
};

export default UserCard;