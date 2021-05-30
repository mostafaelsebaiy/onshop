import {
  CARD_ADD_ITEM,
  CARD_REMOVE_ITEM,
  CARD_SAVE_SHIPPING,
  CARD_SAVE_PAYMENTMETHOD,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case CARD_ADD_ITEM:
      let item = action.payload;
      let existItem = state.cartItems.find(
        (cartitem) => cartitem.productId === item.productId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === item.productId ? item : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CARD_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
    case CARD_SAVE_SHIPPING:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case CARD_SAVE_PAYMENTMETHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
