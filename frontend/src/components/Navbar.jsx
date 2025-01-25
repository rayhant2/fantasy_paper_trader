import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="w-screen px-4">
  <div className="flex flex-row justify-between items-center">
    {/* Left-aligned "Home" link */}
    <div>
      <div>
        <Link to="/destination">
          <img
            src="https://via.placeholder.com/150"
            alt="Clickable Image"
            className="w-32 h-32"
          />
        </Link>
      </div>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>

    {/* Right-aligned links */}
    <div className="flex flex-row gap-5 ml-auto mr-20">
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
  </div>
</div>

    </div>
  );
};

export default Navbar;
