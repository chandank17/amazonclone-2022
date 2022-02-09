import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "./actions/productActions";

const ProductDetails = (props) => {
  const [qty, setQTY] = useState(1);

  const productinfo = useSelector((state) => state.productDetails);
  const { products, loading, error } = productinfo;
  const dispatch = useDispatch();

  console.log(productinfo);

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  const productdetails = products;

  return (
    <div>
      <div className="back-to-home">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading ... </div>
      ) : error ? (
        <div>{error}</div>
      ) : productdetails ? (
        <div className="details">
          <div className="details-image">
            <img src={productdetails.image} />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{productdetails.name}</h4>
              </li>

              <li>
                {productdetails.rating} Starts ({productdetails.numrating}{" "}
                Reviews)
              </li>

              <li>Price : {productdetails.price}</li>

              <li>Description : {productdetails.description}</li>
            </ul>
          </div>
          <div className="details-cart">
            <ul>
              <li>Price : {productdetails.price}</li>
              <li>
                status :{" "}
                {productdetails.countInStock > 0 ? "In Stock" : "Out Of Stock"}{" "}
              </li>
              <li>
                Qty :{" "}
                <select
                  onChange={(e) => {
                    setQTY(e.target.value);
                  }}
                >
                  {[...Array(productdetails.countInStock).keys()].map((x) => {
                    return (
                      <option key={x} value={x + 1}>
                        {x + 1}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                {productdetails.countInStock > 0 && (
                  <button onClick={handleAddToCart}>Add to cart</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetails;
