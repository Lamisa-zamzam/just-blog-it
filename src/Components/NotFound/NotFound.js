import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center mt-52">
            <h1
                className="text-8xl mb-16"
                style={{ color: "rgb(66, 177, 247)" }}
            >
                404 Error !!!
            </h1>
            <p className="font-mono text-2xl font-medium">
                SORRY, THE PAGE YOU ARE LOOKING FOR ISN'T AVAILABLE RIGHT NOW.
            </p>
            <br />
            <br />
            <Link to={"/home"} className="font-mono text-xl font-medium underline">
                <p> Go to home page</p>
            </Link>
        </div>
    );
};

export default NotFound;
