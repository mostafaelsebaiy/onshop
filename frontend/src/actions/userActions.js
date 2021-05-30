import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTE_REQUEST,
  USER_REGISTE_SUCCESS,
  USER_REGISTE_FAIL,
  USER_LOGOUT,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  // USER_UPDATE_RESET,
} from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import axios from 'axios';

export const loginUser = (password, email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ password, email });
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      body,
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => async (disptch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingInfo');
  localStorage.removeItem('paymentMethod');
  disptch({ type: USER_LOGOUT });
  disptch({ type: USER_DETAILS_RESET });
  disptch({ type: ORDER_LIST_MY_RESET });
  disptch({ type: USER_LIST_RESET });
  document.location.href = '/login';
};

export const RegisteUser =
  (name, password, email) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ password, email, name });
      dispatch({ type: USER_REGISTE_REQUEST });
      const { data } = await axios.post(
        `http://localhost:5000/api/users/registe`,
        body,
        config
      );
      dispatch({ type: USER_REGISTE_SUCCESS });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: USER_GET_PROFILE_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    );
    dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile =
  (name, password, email) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const body = JSON.stringify({ password, email, name });
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const { data } = await axios.put(
        `http://localhost:5000/api/users/profile`,
        body,
        config
      );
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getUsers = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/users`, config);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userDelete = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: USER_DELETE_REQUEST });
    await axios.delete(`http://localhost:5000/api/users/${id}`, config);
    dispatch({ type: USER_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/users/${user._id}`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
