import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbars = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img
          src={assets.logo}
          alt="Studiora Logo"
          className="w-28 lg:w-16 cursor-pointer rounded-lg"
        />
      </Link>

      {/* Greeting & UserMenu */}
      <div className="flex items-center gap-4 text-gray-600">
        <p className="text-sm md:text-base">
          Hi,{" "}
          <span className="font-semibold">
            {user ? user.fullName : "Developer"}
          </span>
        </p>

        {user ? (
          <div className="rounded-full hover:bg-gray-100 p-1 transition">
            <UserButton />
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="rounded-full hover:bg-gray-100 p-1 transition"
          >
            <img
              src={assets.profile_img}
              alt="Profile"
              className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbars;
