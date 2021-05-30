import {
  CARD_ADD_ITEM,
  CARD_REMOVE_ITEM,
  CARD_SAVE_SHIPPING,
  CARD_SAVE_PAYMENTMETHOD,
} from '../constants/cartConstants';
import axios from 'axios';

export const addProductToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  dispatch({
    type: CARD_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      price: data.price,
      qty,
      image: data.image,
      countInStock: data.countInStock,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const RemoveFormCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CARD_REMOVE_ITEM, payload: id });
};
export const saveShippingToCart = (data) => async (dispatch) => {
  dispatch({ type: CARD_SAVE_SHIPPING, payload: data });
  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: CARD_SAVE_PAYMENTMETHOD, payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
