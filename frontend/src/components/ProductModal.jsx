import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, quantity));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-10">
        <h2 className="text-xl font-bold mb-4">{product.nombre}</h2>
        <p className="mb-4">{product.descripcion}</p>
        <p className="mb-4">{`Precio: ${product.precio.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        })}`}</p>
        <label htmlFor="quantity" className="mr-2">
          Cantidad:
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="border rounded-md p-1 mb-4"
        />
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductModal;



