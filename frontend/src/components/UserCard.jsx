import React from "react";
import { MapPin, Phone, Globe, FileText } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div 
    className="group bg-white/90 backdrop-blur-sm rounded-2xl drop-shadow-2xl hover:shadow-2xl  transition-all duration-300 p-5">
      <div className="flex gap-5">
        
        {/* Left: Avatar */}
        <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-xl ring-2 ring-white">
          <img
            src={user.avatar || "/images/default-user.png"}
            alt={user.fullname}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="flex-1 min-w-0">
          
          {/* Name + Username + Type */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-zinc-900 tracking-tight truncate">
                {user.fullname || "Unknown User"}
              </h2>
              <p className="text-sm text-zinc-500 mt-0.5 truncate">
                @{user.username || "username"}
              </p>
            </div>

            <span className="shrink-0 inline-flex items-center rounded-full bg-zinc-900 text-white text-[11px] font-medium px-3 py-1">
              {user.type || "User"}
            </span>
          </div>

          {/* Business */}
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">
              {user.business || "No Business"}
            </span>
          </div>

          {/* Info Section */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>{user.city || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>{user.country || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <Phone className="w-4 h-4 text-zinc-400" />
              <span>{user.contact || "N/A"}</span>
            </div>
          </div>

          {/* About */}
          <div className="mt-4 border-t border-zinc-100 pt-4">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                {user.about || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;