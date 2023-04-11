import React from "react";
import ItemsContainer from "../utils/ItemsContainer";
import { SocialIcons } from "../utils/SocialIcons";
import { Icons } from "../utils/FMenu";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-white">
      <div className="md:flex md: justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1 className="lg>text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold w-2/5">
          <span className="text-teal-400">Cuéntanos </span>Sobre tu experiencia
        </h1>
        <div className="relative items-center justify-center mr-4">
          
          <input
            type="text"
            placeholder="Enter your ph.no"
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font[Poppins] rounded-md text-white md:w-auto w-full">
            Enviar
          </button>
        </div>
      </div>
      <ItemsContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-2">
        <span className="pt-8"> Contáctanos</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <h2>Todos los derechos reservados </h2>                 
        </span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
