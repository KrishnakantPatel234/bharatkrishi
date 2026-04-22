import React from "react";
import { MapPin, Globe } from "lucide-react";

const UserCard = ({ user }) => {

  const handleWhatsApp = () => {
    const phone = user.contact;
    const message = `Hello ${user.fullname}, I found you on BharatKrishi.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">

      {/* Top */}
      <div className="flex items-center gap-3">
        <img
          src={user.avatar || "/images/default-user.png"}
          className="w-14 h-14 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-900">
            {user.fullname}
          </h2>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>

        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md">
          {user.type}
        </span>
      </div>

      {/* Business */}
      {user.business && (
        <p className="text-sm text-gray-600 mt-3">
          {user.business}
        </p>
      )}

      {/* Info */}
      <div className="flex gap-4 text-xs text-gray-500 mt-2">
        {user.city && (
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            {user.city}
          </div>
        )}
        {user.country && (
          <div className="flex items-center gap-1">
            <Globe size={12} />
            {user.country}
          </div>
        )}
      </div>

      {/* About */}
      {user.about && (
        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
          {user.about}
        </p>
      )}

      {/* Action */}
      <button
        onClick={handleWhatsApp}
        className="w-full mt-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Chat on WhatsApp
      </button>

    </div>
  );
};

export default UserCard;  