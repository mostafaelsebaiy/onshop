import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productReviewDeleteReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  orderItemsReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersListReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/orderReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userGetProfileReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
const reducer = combineReducers({
  productlist: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileDetails: userGetProfileReducer,
  updatedprofile: userUpdateProfileReducer,
  createOrder: orderItemsReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrdersList: myOrdersListReducer,
  users: userListReducer,
  deleteUser: userDeleteReducer,
  userUpdate: userUpdateReducer,
  deleteProduct: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewDelete: productReviewDeleteReducer,
  productTopRated: productTopRatedReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const shippingInfoFromStorage = localStorage.getItem('shippingInfo')
  ? JSON.parse(localStorage.getItem('shippingInfo'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingInfo: shippingInfoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
