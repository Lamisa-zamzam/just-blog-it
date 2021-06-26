import { useState, useEffect } from "react";
import Blog from "../Blog/Blog";

const Players = () => {
    // Initial blogs
    const [blogs, setBlogs] = useState([]);

    // Fetch All the blogs
    useEffect(() => {
        fetch("https://frozen-coast-84516.herokuapp.com/blogs")
            .then((res) => res.json())
            .then((data) => (data.status = "200" && setBlogs(data)))
            .catch((err) => alert(err));
    }, []);

    return (
        <>
            <h1 className="lg:text-6xl md-text-7xl sm:text-5xl text-3xl font-black md:mx-20 mb-16 uppercase">
                Hot Blogs
            </h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 centerIt bg-white">
                {blogs.map((blog) => (
                    <Blog key={blog._id} blog={blog} />
                ))}
            </div>
        </>
    );
};

export default Players;
