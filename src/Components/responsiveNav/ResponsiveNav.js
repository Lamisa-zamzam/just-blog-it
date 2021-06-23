import React from "react";
import { Link } from "react-router-dom";

const ResponsiveNav = ({ isOpen, toggle }) => {
    return (
        <div
            className={
                isOpen
                    ? "grid grid-rows-4 text-center items-center bg-blue-300"
                    : "hidden"
            }
            onClick={toggle}
        >
            <Link className="p-4" to="/">
                Home
            </Link>
            <Link className="p-4" to="/">
                Write a Blog
            </Link>
            <Link className="p-4" to="/">
                Dashboard
            </Link>
            <Link className="p-4" to="/">
                Read Blog
            </Link>
        </div>
    );
};

export default ResponsiveNav;
