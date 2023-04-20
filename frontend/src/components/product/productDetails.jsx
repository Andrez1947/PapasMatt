import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const match = useMatch("/product/:id");
  const { id } = match.params;

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const increaseQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => Math.max(prevQty - 1, 1));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="fixed top-0 left-4 right-4 bottom-0 flex justify-center items-center">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center rounded-2xl shadow-md overflow-hidden bg-white w-full md:w-5/6 lg:w-4/5">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-800">
                Cerrar
              </button>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 xl:w-2/5">
                {product && product.imagen && product.imagen[0] && (
                  <img
                    src={product.imagen[0].url}
                    alt="Imagen del producto"
                    className="h-800px w-full"
                  />
                )}
              </div>
              <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/5 xl:w-3/5 p-6">
                <h2 className="mt-2 text-2xl font-semibold text-gray-800 mb-4">
                  {product.nombre}
                </h2>
                <p className="text-gray-400">{product.descripcion}</p>

                <div className="mt-4 flex justify-between flex-col">
                  <div className="mt-4 flex justify-between">
                    <div className="flex justify-start items-center gap-2 cursor-pointer">
                      <div className="flex items-center justify-end">
                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          className="items-start justify-start"
                        >
                          <BiMinus
                            className="text-textColor bg-amber-500 rounded-sm "
                            onClick={decreaseQty}
                          />
                        </motion.div>
                        <input
                          type="number"
                          className="w-6 h-8 rounded-sm text-textColor flex items-center justify-center count text-center placeholder-transparent appearance-none ml-4"
                          value={quantity}
                          onChange={(e) => e.preventDefault()}
                          onBlur={(e) => setQuantity(parseInt(e.target.value))}
                          min={1}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          readOnly
                        />
                        <motion.div whileTap={{ scale: 0.75 }} className="">
                          <BiPlus
                            className="text-textColor bg-amber-500 rounded-sm "
                            onClick={increaseQty}
                          />
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        to={`/product/${product._id}`}
                        className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                      >
                        <button
                          type="button"
                          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-normal"
                        >
                          {product.precio}
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="order-last"></div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
