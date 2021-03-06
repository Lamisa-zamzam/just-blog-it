import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SideNav from "../SideNav/SideNav";

const ManageBlogs = () => {
    // Initial state of blogs
    const [blogs, setBlogs] = useState([]);

    // Initial state of if the user is admin
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the user is admin
    useEffect(() => {
        const ifAdmin = JSON.parse(sessionStorage.getItem("admin"));
        setIsAdmin(ifAdmin);
    }, []);

    // Routing vars
    let history = useHistory();

    // Fetch all the blogs ever published
    useEffect(() => {
        fetch("https://frozen-coast-84516.herokuapp.com/blogs")
            .then((res) => res.json())
            .then((result) => {
                setBlogs(result);
            });
    }, []);

    // Handle a blog delete
    const handleBlogDelete = (_id) => {
        fetch(`https://frozen-coast-84516.herokuapp.com/deleteBlog/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((deleteCount) => {
                if (deleteCount) {
                    alert("Your service has been deleted.");
                    history.push("/dashboard");
                } else {
                    alert("Something unexpected happened. Please try again.");
                }
            });
    };

    return (
        <div className="windowWithSidebar">
            <SideNav />
            {isAdmin ? (
                <div className="asideSideBar">
                    <div className="overflow-x-auto w-full">
                        {/* Dashboard */}
                        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                            {/* Header */}
                            <thead className="bg-gray-900">
                                <tr className="text-white text-left">
                                    <th className="tableHeader">Cover</th>
                                    <th className="tableHeader">Title</th>
                                    <th className="tableHeader">Content</th>
                                    <th className="tableHeader text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200">
                                {blogs[0] ? (
                                    blogs.map((blog) => (
                                        // Table Row
                                        <tr key={blog._id}>
                                            <td className="px-6 py-4">
                                                <div className="centeredFlex space-x-3">
                                                    <div className="inline-flex w-10 h-10">
                                                        {" "}
                                                        <img
                                                            className="w-10 h-10 object-cover rounded-full"
                                                            alt="Blog cover"
                                                            src={blog.imageURL}
                                                        />{" "}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="blogTableData">
                                                <div className="blogTableDiv">
                                                    <p className="blogTableP">
                                                        {blog.title}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="blogTableData">
                                                <div className="blogTableDiv">
                                                    <p className="blogTableP">
                                                        {blog.content}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={() =>
                                                        handleBlogDelete(
                                                            blog._id
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="red"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-3xl text-center text-gray-500 text-sm font-semibold tracking-wide">
                                        <td>No Blogs posted Yet!!!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <h3 className="noAccessText">
                    Sorry, you don't have admin access.
                </h3>
            )}
        </div>
    );
};

export default ManageBlogs;
