import React from "react";
import { MdShoppingBasket} from "react-icons/md";
import { motion } from "framer-motion";

import Logo from "../images/log.png";
import Avatar from "../images/avatar.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary h-18">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full item-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-20 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">Papas Matt</p>
        </Link>
        <div className="flex item-center">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
              Menú
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
              Quienes somos
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-out cursor-pointer">
              Servicio
            </li>
          </motion.ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
          </div>
          <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
          <div className="relative">
            <Link to="/login">
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={Avatar}
                className="w-12 min-w-[40px] h-12 min-h-[40px] drop-shadow-xl cursor-pointer rounded-r-full"
                alt="userprofile"
                onClick="#"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />

          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-16 object-cover" alt="logo" />
        </Link>
        <div className="relative">
          <Link to="/login">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={Avatar}
              className="w-12 min-w-[40px] h-12 min-h-[40px] drop-shadow-xl cursor-pointer rounded-r-full"
              alt="userprofile"
              onClick="#"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
