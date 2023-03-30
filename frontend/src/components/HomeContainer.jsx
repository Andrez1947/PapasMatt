import React, { useState, useEffect } from "react";
import Delivery from "../images/delivery.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());

    // Agregar o remover la clase "grid-cols-2" dependiendo del ancho de pantalla
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsWideScreen(true);
      } else {
        setIsWideScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Mostrar solo 4 productos
  const displayedProducts = products?.slice(0, 4);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6 ">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 rounded-full py-1 drop-shadow-xl">
          <p className="text-base text-orange-500 font-semibold">
            {" "}
            Entrega a domicilio{" "}
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor text-center md:text-left">
          Cocinamos para aquellos que{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            aman comer
          </span>
        </p>
        <p className="text-base text-textColor text-justify md:text-left md:w-[80%]">
          A nuestra cocina la mueve el amor por entregar platos llenos de sabor
          y respeto para cada uno de ustedes. Nacimos de imaginar algo mejor.
          Nuestras recetas y salsas son la causa de nuestro éxito. Trabajamos,
          vivímos, soñamos y cocinamos con amor.
        </p>
        <Link to="/menu">
          <button
            type="button"
            className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Ordene Ahora
          </button>
        </Link>
      </div>

      {/* Usar grid-cols-2 si es pantalla grande o grid-cols-4 si no lo es */}
      <div
        className={`py-2 flex-1 flex items-center relative ${
          isWideScreen ? "grid-cols-2" : "grid-cols-4"
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full ">
          {displayedProducts &&
            displayedProducts.map((product) => (
              <div
                key={product._id}
                className=" overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all hover:scale-125"
              >
                <img
                  src={product.imagen[0].url}
                  className="object-cover w-full h-48"
                  alt="I1"
                />
                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-lg font-bold mb-2">{product.nombre}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
