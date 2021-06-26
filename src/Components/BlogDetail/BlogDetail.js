import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const BlogDetail = () => {
    // Get the blog id form the params
    const { id } = useParams();
    // Initial blog
    const [blog, setBlog] = useState({});

    // Fetch the specific blog
    useEffect(() => {
        fetch(`https://frozen-coast-84516.herokuapp.com/blog/${id}`)
            .then((res) => res.json())
            .then((data) => setBlog(data[0]));
    }, [id]);

    return (
        <>
            {/* navbar */}
            <Navbar />

            <div className="md:mx-10 my-20 centerIt bg-white">
                <img
                    src={blog.imageURL}
                    alt="player"
                    className="w-100 object-contain rounded m-auto shadow-lg"
                />
                <div className="px-5 mt-36">
                    <h2 className="text-4xl mb-14 blogTitle">{blog.title}</h2>
                    <p className="mb-2 font-serif text-xl">{blog.content}</p>
                    <br />
                    <Link to="/">
                        <button className="blogButton">
                            {/* HeroIcon Home */}
                            <svg
                                className="w6h6 mr-5"
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
                            {/* HeroIcon - Arrow Right */}
                            <svg
                                className="w6h6 ml-4"
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
