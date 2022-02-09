import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/products";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productDetailsReducer(state = { product: [] }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function cartDetailsReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const product = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.productId === product.productId ? product : item
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
      return { loading: false, cartItems: action.payload };
    case CART_REMOVE_ITEM:
      const updatedItems = state.cartItems.filter((x) => {
        return x.productId !== action.payload;
      });
      return { cartItems: updatedItems };

    default:
      return state;
  }
}

export { productListReducer, productDetailsReducer, cartDetailsReducer };
