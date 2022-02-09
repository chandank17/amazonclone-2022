import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./actions/productActions";
import { Link } from "react-router-dom";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cartInfo = useSelector((state) => state.cartDetails);
  const dispatch = useDispatch();
  const { cartItems } = cartInfo;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const removeFromCartHandler = (productId, qty) => {
    if (productId) {
      dispatch(removeFromCart(productId));
    }
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is Empty</div>
          ) : (
            cartItems.map((cartvalue, index) => {
              return (
                <div key={index} className="cart-item-details">
                  <div className="cart-item-img-div">
                    <div>
                      <img src={cartvalue.image} />
                    </div>

                    <div className="margin-10">
                      <Link to={"/product/" + cartvalue.productId}>
                        {cartvalue.name}
                      </Link>
                    </div>
                    <div className="margin-10">
                      <select value={cartvalue.qty}>
                        {[...Array(cartvalue.countInStock).keys()].map((x) => {
                          return (
                            <option key={x} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        className=""
                        onClick={removeFromCartHandler.bind(
                          this,
                          cartvalue.productId,
                          cartvalue.qty
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div>${cartvalue.price}</div>
                </div>
              );
            })
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({" "}
          {cartItems.reduce((total, value) => {
            return value.qty + total;
          }, 0)}{" "}
          items ) : $
          {cartItems.reduce((total, value) => {
            return value.price * value.qty + total;
          }, 0)}
        </h3>
        <button className="button primary" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
