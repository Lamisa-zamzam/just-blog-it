import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
    // Initial state of if the sidebar is open
    const [isOpen, setIsOpen] = useState(true);
    // Initial state of if the user is admin
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the user is admin
    useEffect(() => {
        const ifAdmin = JSON.parse(sessionStorage.getItem("admin"));
        setIsAdmin(ifAdmin);
    }, []);

    return (
        <>
            {/* mobile menu */}
            <div className="bg-blue-400 text-gray-100 font-bold flex justify-between md:hidden">
                <Link to="/" className="block p-4">
                    {/* Logo */}
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrImfqN1gybiuS92IZ5iKRiPIYyj7cmJVrQ&usqp=CAU"
                        alt="Just Blog It"
                        className="w-10 inline mr-5 rounded-full"
                    />
                    Just Blog It
                </Link>
                <button
                    className="p-4 focus:outline-none focus:bg-blue-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* heroIcon - menu */}
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
            {/* Laptop, tablet and desktop sidebar */}
            <div
                className={`${
                    isOpen ? "-translate-x-full" : ""
                } bg-blue-300 text-white absolute transform w-64 py-7 inset-y-0 left-0 md:relative md:translate-x-0 transition duration-200 ease-in-out`}
            >
                <Link to="/" className="block p-4">
                    {/* Logo */}
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrImfqN1gybiuS92IZ5iKRiPIYyj7cmJVrQ&usqp=CAU"
                        alt="Just Blog It"
                        className="w-10 inline mr-2 mb-2 rounded-full"
                    />
                    <span className="text-3xl font-extrabold">
                        Just Blog It
                    </span>
                </Link>
                <nav className="mt-5">
                    <Link
                        to="/home"
                        className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                    >
                        Home
                    </Link>
                    {isAdmin && (
                        <>
                            {" "}
                            <Link
                                className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                                to="/publishBlog"
                            >
                                Write a Blog
                            </Link>
                            <Link
                                className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                                to="/manageBlogs"
                            >
                                Manage Blogs
                            </Link>
                            <Link
                                className="block py-3 px-4 font-bold text-1xl transition duration-200 hover:bg-blue-700 hover:text-blue-300"
                                to="/makeAdmin"
                            >
                                Make an admin
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};

export default SideNav;
