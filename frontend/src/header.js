import React, { useState, useEffect } from "react";
import "./scss/home.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [sidebarclass, setsidebarClass] = useState("");

  const showSidebar = (classname) => {
    console.log("show side bar");
    setsidebarClass(classname);
  };

  return (
    <>
      <div className="header">
        <div className="brand-name">
          <button onClick={showSidebar.bind(this, " open")}>&#9776;</button>
          <Link to="/" className="brand-name-text">
            Amazona
          </Link>
        </div>
        <div className="header-right">
          <div>Cart</div>
          <div>Orders</div>
          <div>Chandan</div>
        </div>
      </div>
      <div className={"side-bar" + sidebarclass}>
        <div className="side-bar-header">
          <h3>Shop Categories</h3>
          <button
            className="side-bar-close-btn"
            onClick={showSidebar.bind(this, " ")}
          >
            x
          </button>
        </div>
        <ul>
          <li>Pants</li>
          <li>T-Shirts</li>
        </ul>
      </div>
    </>
  );
};

export default Header;
