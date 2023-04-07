import React from "react";
import HCards from './HCards';

const MenuContainer = () => {  

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Nuestro Menú
        </p>
        <div className="items-center gap-3 py-6 obje">                  
        </div>
        <div className="w-full lg:w-[950px] justify-center gap-8 py-0">           
        <HCards/>
        </div>                 
        </div>      
    </section>
  );
};

export default MenuContainer;