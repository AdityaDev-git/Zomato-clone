import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar navbar-expand-lg header-container">
      <div className="container py-2">
        <Link to="/">
          <div className="rounded-circle text-center bg-light">
            <h1 className="px-2 text-danger">e!</h1>
          </div>
        </Link>
        <div>
        <button className="login btn border-0">Login</button>
        <button className="createA btn rounded-1">Create an account</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
