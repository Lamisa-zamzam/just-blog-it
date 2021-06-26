import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className="text-center mt-36 m-5">
                <h1
                    className="md:text-8xl text-5xl mb-16"
                    style={{ color: "rgb(66, 177, 247)" }}
                >
                    404 Error !!!
                </h1>
                <p className="font-mono md:text-2xl xl font-medium">
                    SORRY, THE PAGE YOU ARE LOOKING FOR ISN'T AVAILABLE RIGHT
                    NOW.
                </p>
                <br />
                <br />
                <Link to={"/home"} className="text-xl underline text-blue-500">
                    <p> Go to home page</p>
                </Link>
            </div>
        </>
    );
};

export default NotFound;
