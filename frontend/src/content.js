import React, { useState, useEffect } from "react";
import "./scss/home.scss";
import { BrowserRouter, Link, Switch, Router } from "react-router-dom";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "./actions/productActions";

const Content = () => {
  // const { products, setproducts } = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    // axios.get("/api/products").then((res) => {
    //   setproducts(res.data);
    // });

    return () => {};
  }, []);

  // const products = [];

  return loading ? (
    <div>Loading ... </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="main">
      <div className="content">
        <ul className="products">
          {products.map((product, index) => {
            return (
              <li key={index}>
                <Link to={"/product/" + product.id}>
                  <div className="product">
                    <img src={product.image} />
                    <div className="product-name">{product.name}</div>
                    <div className="product-brand"> {product.brand}</div>
                    <div className="product-price"> ${product.price}</div>
                    <div className="product-rating">
                      {product.rating} Stars ({product.numrating} Reviews)
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Content;
