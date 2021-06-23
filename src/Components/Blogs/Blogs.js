import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Blog from "../Blog/Blog";

const Players = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/blogs")
            .then((res) => res.json())
            .then((data) => (data.status = "200" && setBlogs(data)))
            .catch((err) => alert(err));
    }, []);
    return (
        <>
            <h1 className="lg:text-6xl md-text-7xl sm:text-5xl text-3xl font-black md:mx-20 md:mb-16 uppercase">
                Hot Blogs
            </h1>
            <div className="grid md:grid-cols-2 justify-center items-center bg-white">
                {blogs.map((blog) => (
                    <Blog key={blog._id} blog={blog} />
                ))}
            </div>
        </>
    );
};

export default Players;
