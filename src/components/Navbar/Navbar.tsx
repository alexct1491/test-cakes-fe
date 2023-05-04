import React from "react";
import { useLocation, useNavigate } from "react-router";
import "./Navbar.scss";
export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="container-nav">
      <div className="content-nav">
        <h5 className="pointer" onClick={() => navigate("/")}>
          Cake kingdom
        </h5>
        <div className="list-nav">
          <span onClick={() => navigate("/admin")}>Login</span>
        </div>
      </div>
    </div>
  );
};
