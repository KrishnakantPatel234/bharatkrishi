import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // SEPARATE STATES
  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef();

  // OUTSIDE CLICK
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // NAVIGATION
  const handleNavigate = (path) => {

    setMobileOpen(false);

    navigate(path);

  };

  // LOGOUT
  const handleLogout = () => {

    setProfileOpen(false);

    setMobileOpen(false);

    logout();

    navigate("/");

  };

  // PROFILE
  const handleProfile = () => {

    setProfileOpen(false);

    navigate("/profile");

  };

  return (

    <header className="w-full bg-white/70 backdrop-blur border-b border-gray-200 sticky top-0 z-50">

      <nav className="w-full grid grid-cols-12 items-center px-4 md:px-8 py-3">

        {/* LOGO */}
        <div className="col-span-6 md:col-span-2 w-32 h-1 -mt-24 ml-6">

          <a href="/">
            <img
              className="h-25"
              src="/images/logo.png"
              alt="logo"
            />
          </a>

        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex col-span-8 justify-center lg:gap-24 md:gap-16 gap-8 text-base font-medium text-gray-700">

          <Link
            to="/explore"
            className="hover:text-black"
          >
            Explore
          </Link>

          <Link
            to="/connect"
            className="hover:text-black"
          >
            Connect
          </Link>

          <Link
            to="/mitra"
            className="hover:text-black"
          >
            Mitra
          </Link>

          <Link
            to="/aboutus"
            className="hover:text-black"
          >
            About
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-6 md:col-span-2 flex justify-end items-center mr-16">

          {/* DESKTOP AUTH */}
          <div
            ref={dropdownRef}
            className="relative hidden md:flex items-center gap-3"
          >

            {user ? (

              <>
                <img
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  src={
                    user.avatar ||
                    "/default-avatar.png"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border cursor-pointer"
                />

                {profileOpen && (

                  <div className="absolute right-0 mt-48 w-48 bg-white rounded-xl shadow-lg overflow-hidden">

                    <button
                      type="button"
                      onClick={handleProfile}
                      className="w-full text-left px-4 py-3 hover:bg-zinc-100"
                    >
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </>

            ) : (

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
              >
                Sign In
              </button>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="md:hidden p-1"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >

            {mobileOpen
              ? <X size={22} />
              : <Menu size={22} />}

          </button>

        </div>

      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden border-t border-gray-200 px-4 overflow-hidden transition-all duration-300 ${
          mobileOpen
            ? "max-h-72 py-4"
            : "max-h-0"
        }`}
      >

        <div className="space-y-3 text-sm">

          <button
            type="button"
            onClick={() =>
              handleNavigate("/explore")
            }
            className="block w-full text-left"
          >
            Explore
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigate("/connect")
            }
            className="block w-full text-left"
          >
            Connect
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigate("/mitra")
            }
            className="block w-full text-left"
          >
            Mitra
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigate("/aboutus")
            }
            className="block w-full text-left"
          >
            About
          </button>

          {user ? (

            <button
              type="button"
              onClick={handleLogout}
              className="block w-full text-left text-red-500"
            >
              Logout
            </button>

          ) : (

            <button
              type="button"
              onClick={() => {

                setMobileOpen(false);

                navigate("/login");

              }}
              className="block w-full text-left"
            >
              Sign In
            </button>

          )}

        </div>

      </div>

    </header>

  );

};

export default Navbar;