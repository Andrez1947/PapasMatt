import React from "react";
import HCards from "./HCards";
import CartContainer from "../components/product/CartContainer";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "../components/product/productDetails";

const MenuContainer = () => {
  return (
    <div className="w-full my-6 relative" id="menu">
      <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-gr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
        Nuestro Menú
      </p>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="items-center gap-3 py-6 obje"></div>
        <div className="w-full lg:w-[950px] justify-center gap-8 py-0">
          <HCards />
        </div>
      </div>
      <CartContainer />
      <Routes>
        <Route path="/menu/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default MenuContainer;
