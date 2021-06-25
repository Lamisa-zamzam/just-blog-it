import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ResponsiveNav from "../responsiveNav/ResponsiveNav";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`)
            .then((res) => res.json())
            .then((data) => setBlog(data[0]));
    }, [id]);

    // Initial value of if the dropdown is open
    const [isOpen, setIsOpen] = useState(false);
    // toggle the dropdown
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // If the device width is greater than 760, set the state to false
    useEffect(() => {
        const hideMenu = () => {
            if (window.innerWidth > 760 && isOpen) {
                setIsOpen(false);
            }
        };

        // on resize, hide the menu
        window.addEventListener("resize", hideMenu);

        return () => {
            window.removeEventListener("resize", hideMenu);
        };
    }, [isOpen]);

    return (
        <>
            <Navbar toggle={toggle} />
            <ResponsiveNav toggle={toggle} isOpen={isOpen} />
            <div className="md:mx-10 my-20 justify-center items-center bg-white">
                <img
                    src={blog.imageURL}
                    alt="player"
                    className="w-100 object-contain rounded m-auto shadow-lg"
                />
                <div className="px-5 mt-36">
                    <h2 className="text-4xl mb-14 font-black text-red-700">
                        {blog.title}
                    </h2>
                    <p className="mb-2 font-serif text-xl">{blog.content}</p>
                    <br />
                    <Link to="/">
                        <button className="shadow-lg mt-5 py-3 px-7 bg-blue-300 rounded-full focus:bg-blue-500 transition duration-300 ease-in-out flex items-center w-max focus:outline-none">
                            <svg
                                className="w-6 h-6 mr-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Back to Home
                            <svg
                                className="w-6 h-6 ml-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogDetail;
