import React, { Fragment, useEffect } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProductDetails, clearErrors } from "../../actions/productActions";

const ProductDetails = () => {
  const match = useMatch("/product/:id");
  const { id } = match.params;

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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex justify-center mt-8">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center rounded-2xl shadow-md overflow-hidden">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 xl:w-2/5">
                {product && product.imagen && product.imagen[0] && (
                  <img
                    src={product.imagen[0].url}
                    alt="sdf"
                    height="500"
                    width="500"
                  />
                )}
              </div>
              <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/5 xl:w-3/5 p-6">
                <h2 className="mt-2 text-2xl font-semibold text-gray-800 mb-4">
                  {product.nombre}
                </h2>
                <p className="text-gray-400">{product.descripcion}</p>
                <div className="mt-4 flex items-center justify-between">                  
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
