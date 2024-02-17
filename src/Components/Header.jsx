import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const Header = () => {


  return (
    <div className="navbar navbar-expand-lg header-container">
      <div className="container py-2">
        <Link to="/">
          <div className="rounded-circle text-center bg-light">
            <h1 className="px-2 text-danger">e!</h1>
          </div>
        </Link>
        <Auth/>
      </div>
    </div>
  );
};

export default Header;
