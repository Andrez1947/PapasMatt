import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutStepsComponent from "./CheckoutStepsComponent";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

const Shipping = () => {
  const Navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [email, setEmail] = useState(shippingInfo.email);

  const [address, setAddress] = useState(shippingInfo.address);

  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const [billingType, setBillingType] = useState("personal");

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        email,
        address,
        phoneNumber,
        billingType,
        paymentMethod,
      })
    );
    setIsModalOpen(true);
  };

  const renderModal = () => {
    return (
      <ReactModal isOpen={isModalOpen} ariaHideApp={false}>
        {/* Contenido de la modal */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 sm:flex">
                
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <h4 className="text-lg font-medium text-gray-800">
                    Confirmar Pedido
                  </h4>
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
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2">
                      Delete
                    </button>
                    <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
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
                  <select
                    id="paymentMethod"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Seleccionar método de pago"
                    required
                  >
                    <option value="tarjeta">Tarjeta de crédito</option>
                    <option value="efectivo">Efectivo</option>
                  </select>
                </div>
                {/* Botón de ordenar */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Ordenar
                </button>
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
      {renderModal()}
    </Fragment>
  );
};

export default Shipping;
