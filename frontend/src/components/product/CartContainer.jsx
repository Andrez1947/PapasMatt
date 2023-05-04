import React, { Fragment } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

const CartContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const checkOutHandler = () => {
    if (user) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Tu carrito está vacio</h2>
      ) : (
        <Fragment>
          <div className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
              <motion.div whileTap={{ scale: 0.75 }}>
                {" "}
                <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
              </motion.div>
              <p className="text-textColor text-lg font-semibold">Tu Carrito</p>
              <motion.p
                whileTap={{ scale: 0.75 }}
                className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover: shadow-md cursor-pointer text-textColor text-base "
              >
                Limpiar <RiRefreshFill />
              </motion.p>
            </div>
            {/*Bottom section*/}
            <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
              <div className="w-full h-600 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-scroll scroll-none">
                {/*Cart Item section*/}
                {cartItems.map((item) => (
                  <Fragment>
                    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
                      <img
                        src={item.imagen}
                        alt="Product"
                        className="w-25 h-25 max-w-[60px] rounded-full object-contain"
                      />
                      {/*name section*/}
                      <div className="flex flex-col gap-2">
                        <p className="text-base text-gray-50">{item.nombre} </p>
                        <p className="text-sm block text-gray-300 font-semibold">
                          {item.precio}
                        </p>
                      </div>
                      {/*button section*/}
                      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                        <motion.div whileTap={{ scale: 0.75 }} className="">
                          <BiMinus className="text-gray-50 " />
                        </motion.div>
                        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                          {item.quantity}
                        </p>
                        <motion.div whileTap={{ scale: 0.75 }} className="">
                          <BiPlus className="text-gray-50 " />
                        </motion.div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              {/*Cart total section*/}
              <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-400 text-lg">Sub Total</p>
                  <p className="text-gray-400 text-lg">$ 25000</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-400 text-lg">Domicilio</p>
                  <p className="text-gray-400 text-lg">$ 2.5</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                >
                  Check Out
                </motion.button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartContainer;
