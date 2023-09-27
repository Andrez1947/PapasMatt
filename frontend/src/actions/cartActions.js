import axios from "axios";
import {ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO, CLEAR_CART, CLEAR_SHIPPING_INFO} from '../constants/cartConstants';

//Add items to cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await  axios.get(`/api/v1/product/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: id,
      nombre: data.product.nombre,
      precio: data.product.precio,
      imagen: data.product.imagen[0].url,
      quantity
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//Remove items of cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {

  dispatch({
      type: REMOVE_ITEM_CART,
      payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

//Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

  dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data
  })

  localStorage.setItem('shippingInfo', JSON.stringify(data))

}

//Remove CartItmes after creating an order
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};

//Remove shipping information after creating an order
export const clearShippingInfo = () => (dispatch) => {
  dispatch({ type: CLEAR_SHIPPING_INFO });
};