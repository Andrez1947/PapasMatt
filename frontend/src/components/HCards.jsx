import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useEffect } from "react";
import Product from "./product/Product";
import Loader from "./Loader";
import { useAlert } from "react-alert";

const HCards = () => {
  const [categoria, setCategoria] = useState("");
  const dispatch = useDispatch();

  //By use React-alert
  const alert = useAlert();

  const { loading, products,error } = useSelector((state) => state.products);

  useEffect(() => {
    //By use React-alert
    if(error){
      return alert.error(error)
    };

    dispatch(getProducts(categoria));    

  }, [dispatch,alert,error, categoria]);

  const categories = [
    "Papas a la Francesa",
    "Papas Criollas",
    "Otras Delicias",
    "Bebidas",
    "Adiciones",
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="overflow-x-scroll whitespace-nowrap">
            <ul className="cursor-pointer">
              {categories.map((categoria) => (
                <li
                  key={categoria}
                  className="inline-block px-4 py-2 text-gray-600 hover:text-black font-medium"
                  onClick={() => setCategoria(categoria)}
                >
                  {categoria}
                </li>
              ))}
            </ul>
          </div>
          <div className=" row p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HCards;