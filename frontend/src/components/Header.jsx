import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import Logo from "../images/log.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../src/actions/userActions";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const {cartItems} = useSelector(state => state.cart);

  const [isMenu, SetIsMenu] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Cierre de sesión exitoso");
  };

  const handlePageClick = () => {
    if (isMenu) {
      SetIsMenu(false);
    }
  };

  return (
    <div onClick={handlePageClick}>
      {" "}
      {/* Agregamos el onClick en este div */}
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
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <div className="relative flex items-center justify-center">
                <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
              </div>
              <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>
            </Link>
            <div className="flex z-50 mt-0 ml-0 mr-0">
              {user ? (
                <div className="ml-4 relative">
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-0 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => SetIsMenu(!isMenu)}
                  >
                    {user && user.name}
                  </button>
                  {isMenu && (
                    <div className="absolute top-full right-0 mt-0 w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col px-0 py-2">
                      {user && user.rol === "admin" && (
                        <Link to="/product/new">
                          <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                            New Item <MdAdd />
                          </p>
                        </Link>
                      )}
                      <Link to="/me">
                        <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                          Mi Perfil
                        </p>
                      </Link>
                      <Link to="/orders/me">
                        <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                          Mis Pedidos
                        </p>
                      </Link>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base "
                      onClick={logoutHandler}>
                        Salir <MdLogout />                        
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                !loading && (
                  <Link to="/login">
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Ingresa
                    </button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden w-full h-full">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div className="relative flex items-center justify-center">
              <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <div className="mx-auto">
              <Link to={"/"} className="">
                <img src={Logo} className="w-16 object-cover" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="relative">
            {user ? (
              <div className="ml-0 dropdown d-inline">
                <Link to="#!" onClick={() => SetIsMenu(!isMenu)}>
                  <div className="space-y-2 mr-5">
                    <div className="w-8 h-0.5 bg-gray-600"></div>
                    <div className="w-8 h-0.5 bg-gray-600"></div>
                    <div className="w-8 h-0.5 bg-gray-600"></div>
                  </div>
                </Link>
                {isMenu && (
                  <div className="absolute top-full right-0 mt-0 w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col px-0 py-2">
                    {user && user.rol === "admin" && (
                      <Link to="/product/new">
                        <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                          New Item <MdAdd />
                        </p>
                      </Link>
                    )}
                    <ul                      
                      className="col-1 gap-8"
                    >
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Home
                      </li>
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Menú
                      </li>                      
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Servicio
                      </li>
                    </ul>

                    <Link to="/me">
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Mi Perfil
                      </p>
                    </Link>
                    <Link to="/orders/me">
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Mis Pedidos
                      </p>
                    </Link>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logoutHandler}>
                      Salir <MdLogout />
                    </p>
                  </div>
                )}
              </div>
            ) : (
              !loading && (
                <Link to="/login">
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Ingresa
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
