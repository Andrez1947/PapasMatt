import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL 
} from "../constants/productConstants";

export const addToCart = (categoria) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    let link = `api/v1/products`;

    if (categoria && categoria !== "") {
      link = `api/v1/products?categoria=${categoria}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};