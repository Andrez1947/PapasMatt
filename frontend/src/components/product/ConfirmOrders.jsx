import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CheckoutStepsComponent from "./CheckoutStepsComponent";
import axios from "axios";

const ConfirmOrders = () => {
  const Navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //calculemos los valores
  const precioItems = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );
  const precioEnvio = precioItems > 125000 ? 0 : 3500;

  const precioTotal = (precioItems + precioEnvio).toFixed(0);

  const [paymentUrl, setPaymentUrl] = useState("");

  const processToPayment = async () => {
    const data = {
      amount: precioTotal,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    try {
      const response = await axios.post("/api/v1/payment/process", {
        amount: data.amount, // Enviar el monto al servidor
      });
      const { payment_url } = response.data;
      setPaymentUrl(payment_url);

      // Redireccionar al punto de inicio de Mercado Pago
      if (payment_url) {
        window.open(payment_url, "_blank");
      }
    } catch (error) {
      // Manejo de errores
    }
  };
  return (
    <Fragment>
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-center mt-10">
          <CheckoutStepsComponent shipping confirmOrder />

          <div className="mb-4 mt-10">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10">
              Información de Envío
            </p>
          </div>
          <div className="flex flex-col md:flex-row mt-0 pr-5 ml-5 md:mr-0 w-full">
            {/* Columna principal */}
            <div className="w-full md:w-8/12">
              <p className="mb-2">
                <b>Nombre:</b> {user && user.name}
              </p>
              <p className="mb-2">
                <b>Teléfono:</b> {shippingInfo.phoneNumber}
              </p>
              <p className="mb-4">
                <b>Dirección:</b> {`${shippingInfo.address}`}
              </p>

              <h4 className="text-lg font-semibold capitalize text-headingColor relative mr-auto mt-10 mb-3">
                Productos en tu Carrito:
              </h4>

              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr className="my-2" />
                  <div className="flex items-center my-1">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-12 h-12 mr-2 rounded-lg"
                    />
                    <div className="flex-grow">
                      <Link
                        to={`/producto/${item.product}`}
                        className="text-blue-500 font-semibold"
                      >
                        {item.nombre}
                      </Link>
                      <p className="text-gray-500">
                        {item.quantity} x ${item.precio} ={" "}
                        <b>${(item.quantity * item.precio).toFixed(0)}</b>
                      </p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* Columna de resumen */}
            <div className="w-full md:w-4/12 mt-4 md:mt-0">
              <div id="order_summary md:ml-5">
                <h4 className="text-lg font-semibold capitalize text-headingColor relative mr-auto mt-10 mb-3 md:mt-0 ">
                  Resumen de la compra
                </h4>
                <hr className="mb-2" />
                <p className="mb-2">
                  Subtotal: <span className="font-bold">${precioItems}</span>
                </p>
                <p className="mb-2">
                  Costo de Envío:{" "}
                  <span className="font-bold">${precioEnvio}</span>
                </p>

                <p className="mb-2">
                  Total: <span className="font-bold">${precioTotal}</span>
                </p>
                <h4 className="text-lg font-semibold capitalize text-headingColor relative mr-auto mt-10 mb-3 md:mt-0 ">
                  Método de pago
                </h4>
                <hr className="mb-2" />
                <p className="mb-2">
                  Método elegido:{" "}
                  <span className="font-bold">
                    {shippingInfo.paymentMethod}
                  </span>
                </p>
                <hr className="my-2" />
                <button
                  type="button"
                  className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                  onClick={processToPayment}
                >
                  Procesar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrders;
