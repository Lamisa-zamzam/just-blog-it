import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="container-div">
            <h1>404 Error !!!</h1>
            <p>
                SORRY, THE PAGE YOU ARE LOOKING FOR ISN'T AVAILABLE RIGHT NOW.
            </p>
            <Link to={"/home"}>
                <p> Go to home page</p>
            </Link>
        </div>
    );
};

export default NotFound;
