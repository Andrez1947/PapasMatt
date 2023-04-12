import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {  
  return (
    <div
      href={`/product/${product._id}`}
      className="overflow-hidden rounded-2xl bg-gray-50"
    >
      <div className="flex items-center h-[180px] overflow-hidden">
        <img src={product.imagen[0].url} alt="Hamburger" />
      </div>

      <div className="p-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="mt-2 text-lg font-semibold text-gray-800 mb-4">
              {product.nombre}
            </h2>
            <p className="text-gray-400">{product.descripcion}</p>
          </div>
        </div>

        <hr className="mt-4 mb-4" />

        <div className="flex flex-wrap justify-between ">
          <p className="inline-flex items-center text-gray-600 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              href={`/product/${product._id}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>

            <span className="ml-3"> 5.0 (2.5k) </span>
          </p>
          <Link
            to={`/product/${product._id}`}           
            className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
          >
            <button
              type="button"
              className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-normal"
            >
              {product.precio.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
