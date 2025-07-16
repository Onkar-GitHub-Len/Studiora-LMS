import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import Companies from "./Companies";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-[#DCFBFE] to-white">
      <h1 className="relative font-bold text-gray-800 max-w-3xl mx-auto text-3xl md:text-5xl leading-tight md:leading-snug">
        Discover learning that adapts to{" "}
        <span className="text-blue-600 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          your pace and passion.
        </span>
        <img
          src={assets.sketch}
          alt=""
          className="md:block hidden absolute -bottom-7 right-0 w-28 md:w-36"
        />
      </h1>

      <SearchBar />
    </div>
  );
};

export default Hero;
