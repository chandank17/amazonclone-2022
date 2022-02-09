import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  cartDetailsReducer,
} from "./reducer/productReducer";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cart") || [];

console.log("cart", cartItems);

const initialState = { cartDetails: { cartItems } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartDetails: cartDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
