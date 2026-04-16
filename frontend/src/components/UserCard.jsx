import React from "react";
import { MapPin, Phone, Globe } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div className="group relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      
      {/* subtle glow (less aggressive) */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition"></div>

      <div className="relative flex gap-4">
        
        {/* Avatar */}
        <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden ring-1 ring-gray-200 group-hover:ring-blue-400 transition">
          <img
            src={user.avatar || "/images/default-user.png"}
            alt={user.fullname}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2.5">

          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {user.fullname || "Unknown User"}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                @{user.username || "username"}
              </p>
            </div>

            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 shrink-0">
              {user.type || "User"}
            </span>
          </div>

          {/* Business */}
          {user.business && (
            <p className="text-sm text-gray-600 truncate">
              {user.business}
            </p>
          )}

          {/* Info */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <Info icon={<MapPin size={14} />} text={user.city} />
            <Info icon={<Globe size={14} />} text={user.country} />
            <Info icon={<Phone size={14} />} text={user.contact} />
          </div>

          {/* About */}
          <p className="text-sm text-gray-500 line-clamp-2 pt-2 border-t border-gray-100">
            {user.about || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, text }) => {
  if (!text) return null;
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50">
      <span className="text-gray-400">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
};

export default UserCard;