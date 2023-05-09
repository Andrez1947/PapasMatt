import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";
import { motion } from "framer-motion";

const Shipping = () => {

  const {shippingInfo} = useSelector(state => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);

  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const [billingType, setBillingType] = useState("personal");
  
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBillingTypeChange = (e) => {
    setBillingType(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    // Lógica para realizar el pedido
  };
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row mt-10">
        {/* Columna del 70% */}
        <div className="w-full md:w-7/10">
          {/* Logo del restaurante */}
          <div className="mb-4">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-20">
              Datos de entrega y facturación
            </p>
          </div>

          {/* Formulario */}
          <form className="mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-bold">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 font-bold">
                Dirección de entrega
              </label>
              <div className="relative">
                <select
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccionar dirección</option>
                  <option value="add-address">Agregar dirección</option>
                </select>
                {/* Modal para agregar dirección */}
                {address === "add-address" && (
                  <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-300 rounded-md">
                    <input
                      type="text"
                      placeholder="Ingrese la dirección"
                      value={address}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {/* Botón para guardar dirección */}
                    <button
                      type="button"
                      onClick={() => {
                        // Lógica para guardar la dirección
                      }}
                      className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md"
                    >
                      Guardar dirección
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Resumen de productos en el carrito */}
            <div>
              <h2 className="text-xl font-bold mt-10">Resumen del carrito</h2>
              {/* Aquí iría la lógica para mostrar los productos */}
            </div>
          </form>
        </div>

        {/* Columna del 30% */}
        <div className="w-full md:w-3/10 md:mt-10 md:pl-4 md:ml-10">
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
              <span>$100.00</span> {/* Aquí iría el subtotal real */}
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total a pagar:</span>
              <span>$90.00</span> {/* Aquí iría el total real */}
            </div>
          </div>

          {/* Checkbox para aceptar condiciones */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                // Aquí iría la lógica para manejar la aceptación de condiciones
              />
              <span>Aceptar condiciones</span>
            </label>
          </div>

          {/* Datos de facturación */}
          <div className="mb-4">
            <label htmlFor="billingType" className="block mb-2 font-bold">
              Tipo de facturación
            </label>
            <select
              id="billingType"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleBillingTypeChange}
              value={billingType}
            >
              <option value="personal">Personal</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>

          {/* Selección de tipo de pago */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block mb-2 font-bold">
              Método de pago
            </label>
            <select
              id="paymentMethod"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
            >
              <option value="">Seleccionar método de pago</option>
              <option value="tarjeta">Tarjeta de crédito</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>

          {/* Botón de ordenar */}
          <button
            type="button"
            onClick={handleOrder}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Ordenar
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
