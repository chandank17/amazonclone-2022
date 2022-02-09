import React from "react";
import "./App.css";
import "./scss/home.scss";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import ProductDetails from "./productdetails";
import CartScreen from "./cart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="grid-container">
      <Router>
        <Header></Header>

        <Switch>
          <Route path="/" strict exact component={Content}></Route>
          <Route
            exact
            strict
            path="/product/:id"
            component={ProductDetails}
          ></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
        </Switch>

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
