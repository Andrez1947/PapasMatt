import axios from "axios";

import {ADD_TO_CART} from '../constants/cartConstants';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await  axios.get(`/api/v1/product/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product_id,
      name: Date.product.nombre,
      price: data.product.precio,
      image: data.product.imagen[0].url,
      quantity
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}