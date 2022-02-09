import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  CART_ADD_ITEM_FAILED,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/products";
import axios from "axios";
import Cookie from "js-cookie";

const listProducts = () => (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  axios
    .get("/api/products")
    .then((res) => {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_LIST_FAILED, payload: err.message });
    });
};

const detailsProduct = (product_id) => (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: product_id });

  axios
    .get("/api/products/" + product_id)
    .then((res) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_DETAILS_FAILED, payload: err.message });
    });
};

const addToCart = (productId, qty) => (dispatch, getState) => {
  axios
    .get("/api/products/" + productId)
    .then((res) => {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          productId: productId,
          name: res.data.name,
          image: res.data.image,
          price: res.data.price,
          countInStock: res.data.countInStock,
          qty: qty,
        },
      });

      const cartDetails = getState();

      Cookie.set("cart", JSON.stringify(cartDetails.cartDetails.cartItems));
    })
    .catch((err) => {
      dispatch({ type: CART_ADD_ITEM_FAILED, payload: err.message });
    });
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const cartDetails = getState();

  Cookie.set("cart", JSON.stringify(cartDetails.cartDetails.cartItems));
};

export { listProducts, detailsProduct, addToCart, removeFromCart };
