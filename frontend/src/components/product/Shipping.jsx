import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutStepsComponent from "./CheckoutStepsComponent";

const Shipping = () => {
  const Navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [email, setEmail] = useState(shippingInfo.email);

  const [address, setAddress] = useState(shippingInfo.address);

  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const [billingType, setBillingType] = useState("personal");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        email,
        address,
        phoneNumber,
        billingType,
        paymentMethod: selectedPaymentMethod,
      })
    );

    setPaymentSubmitted(true);
    Navigate("/confirm");
  };
  return (
    <Fragment>
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-center mt-10">
          <CheckoutStepsComponent shipping />
          {/* Logo del restaurante */}
          <div className="mb-4 mt-10">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-10">
              Datos de entrega y facturación
            </p>
          </div>
          <div className="flex flex-col md:flex-row mt-0 pr-5 ml-5 md:mr-0 w-full">
            {/* Columna del 70% */}
            <div className="w-full md:w-6/10">
              {/* Formulario */}
              <form className="mb-4" onSubmit={submitHandler}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-bold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="telephone" className="block mb-2 font-bold">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block mb-2 font-bold">
                    Dirección de entrega
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                {/* Checkbox para aceptar condiciones */}
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 rounded-md border-gray-300"
                    // Aquí iría la lógica para manejar la aceptación de condiciones
                  />
                  <span>Aceptar condiciones</span>
                </div>
                {/* Datos de facturación */}
                <div className="mb-4">
                  <label htmlFor="billingType" className="block mb-2 font-bold">
                    Tipo de facturación
                  </label>
                  <select
                    id="billingType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={billingType}
                    onChange={(e) => setBillingType(e.target.value)}
                    required
                  >
                    <option value="personal">Personal</option>
                    <option value="empresa">Empresa</option>
                  </select>
                </div>
                {/* Selección de tipo de pago */}
                <div className="mb-4">
                  <label
                    htmlFor="paymentMethod"
                    className="block mb-2 font-bold"
                  >
                    Método de pago
                  </label>
                  <div className="flex space-x-4">
                    <button
                      className='w-full px-4 py-2 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-md' 
                      onClick={(e) => {
                        setSelectedPaymentMethod("tarjeta");
                        setPaymentSubmitted(false); // Restablecer el estado de paymentSubmitted a false
                        e.preventDefault(); // Evitar que el formulario se envíe automáticamente
                      }}
                    >
                      Tarjeta de crédito
                    </button>
                    <button
                      className='w-full px-4 py-2 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-md' 
                      onClick={(e) => {
                        setSelectedPaymentMethod("efectivo");
                        setPaymentSubmitted(false); // Restablecer el estado de paymentSubmitted a false
                        e.preventDefault(); // Evitar que el formulario se envíe automáticamente
                      }}
                    >
                      Efectivo
                    </button>
                  </div>
                </div>
                {/* Botón de ordenar */}
                {paymentSubmitted ? (
                  <p>¡Gracias por completar tus datos de pago!</p>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Ordenar
                  </button>
                )}
              </form>
            </div>

            {/* Columna del 30% */}
            <div className="w-full md:w-3/10 md:mt-20 md:pl-4 md:ml-10">
              {/* Cupón de descuento */}
              <div className="mb-4">
                <label htmlFor="coupon" className="block mb-2 font-bold">
                  Cupón de descuento
                </label>
                <input
                  type="text"
                  id="coupon"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {/* Subtotal y total a pagar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Subtotal:</span>
                  <span>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.precio,
                        0
                      )
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Total a pagar:</span>
                  <span>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.precio,
                        0
                      )
                      .toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Resumen de productos en el carrito */}
              <div className="rounded-lg border border-gray-300 p-5 pt-0">
                <h2 className="text-xl font-bold mt-4 mb-4">
                  Resumen del carrito
                </h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="flex items-center mb-2">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-10 h-10 mr-2 rounded-full"
                        />
                        <div>
                          <p className="block mb-2 font-bold">{item.nombre}</p>
                          <p>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            }).format(item.precio)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
