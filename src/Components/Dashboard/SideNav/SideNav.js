import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            {/* mobile menu */}
            <div className="bg-blue-400 text-gray-100 font-bold flex justify-between md:hidden">
                <Link to="/" className="block p-4">
                    Just Blog It
                </Link>
                <button
                    className="p-4 focus:outline-none focus:bg-blue-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {" "}
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`${
                    isOpen ? "-translate-x-full" : ""
                } bg-blue-300 text-white absolute transform w-64 py-7 inset-y-0 left-0 md:relative md:translate-x-0 transition duration-200 ease-in-out`}
            >
                {/* sidebar */}
                {/* <a href="/home">logo</a> */}
                <span className="text-4xl font-extrabold">Just Blog It</span>

                <nav className="mt-5">
                    {" "}
                    <Link
                        className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                        to="/"
                    >
                        Write a Blog
                    </Link>
                    <Link
                        className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                        to="/"
                    >
                        Your Blogs
                    </Link>
                    <Link
                        className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                        to="/"
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                        to="/"
                    >
                        Make an admin
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default SideNav;