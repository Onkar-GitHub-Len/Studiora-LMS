import React from "react";
import { assets } from "../../assets/assets";

const Footers = () => {
  return (
    <footer className="w-full border-t bg-white px-6 py-5 flex flex-col md:flex-row items-center justify-between text-gray-600">
      {/* Left Section: Logo + Divider + Copyright */}
      <div className="flex items-center gap-4 text-sm">
        <img
          className="hidden md:block lg:w-16 cursor-pointer rounded-lg"
          src={assets.logo}
          alt="Studiora Logo"
        />

        <div className="hidden md:block h-6 w-px bg-gray-400/50" />

        <p className="text-center text-xs md:text-sm text-gray-500">
          © 2024 <span className="font-semibold">Studiora</span>. All Rights
          Reserved.
        </p>
      </div>

      {/* Right Section: Social Icons */}
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" className="transition hover:scale-110 duration-200">
          <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="#" className="transition hover:scale-110 duration-200">
          <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6" />
        </a>
        <a href="#" className="transition hover:scale-110 duration-200">
          <img
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-6 h-6"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footers;
