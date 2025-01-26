import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-[100%] px-4">
            <div className="flex flex-row justify-between items-center mt-4">
                {/* Left-aligned "Home" link */}
                <div>
                    <div>
                        <Link
                            to="/"
                            className="flex flex-row items-center gap-2"
                        >
                            <img
                                src="/vite.svg"
                                alt="Clickable Image"
                                className="w-8 h-8"
                            />
                            Linh Tran
                        </Link>
                    </div>
                </div>

                {/* Right-aligned links */}
                <div className="flex flex-row gap-5">
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
    );
};

export default Navbar;
