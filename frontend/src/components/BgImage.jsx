import React from "react";
import map from "../images/map.png";

const bgImage = () => {
  return (
    <section
      className="p-4 sm:h-min flex items-center justify-center bg-transparent "
      id="bg"
    >
      <div className="w-full h-64 rounded-lg shadow-2xl overflow-hidden relative">
        <img
          src={map}
          className="absolute inset-0 h-full w-full object-cover"
          alt="hero-bg"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
        <div className="flex h-full items-center justify-center relative">
          <button className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font[Poppins] rounded-md text-white w-auto">
            ENCUÉNTRANOS
          </button>
        </div>
      </div>
    </section>
  );
};

export default bgImage;
