import React from "react";
import { Link } from "react-router-dom";

const CheckoutStepsComponent = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="checkout-progress flex justify-center mt-5">
      <Link
        to="/shipping"
        className={`${
          shipping ? "bg-black" : "bg-gray-300"
        } w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2`}
      >
        1
      </Link>
      <div
        className={`${
          shipping && confirmOrder ? "bg-black" : "bg-gray-300"
        } w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-2`}
      >
        2
      </div>
      <div
        className={`${
          confirmOrder && payment ? "bg-black" : "bg-gray-300"
        } w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ml-2`}
      >
        3
      </div>
    </div>
  );
};

export default CheckoutStepsComponent;

