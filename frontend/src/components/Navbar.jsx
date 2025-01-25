import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/register">Register Page</Link>
      </p>
      <p>
        <Link to="/login">Login Page</Link>
      </p>
      <p>
        <Link to="/stocks">Main stocks page</Link>
      </p>
      <p>
        <Link to="/portfolio">Portfolio page</Link>
      </p>
    </div>
  );
};

export default Navbar;
