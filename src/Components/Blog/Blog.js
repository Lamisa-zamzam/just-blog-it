import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
    return (
        <Link to={`/blog/${blog._id}`}>
            <div className="md:mx-10 md:my-20 mb-20 grid md:grid-cols-2 centerIt bg-white">
                <img
                    src={blog.imageURL}
                    alt="Blog Cover"
                    className="w-100 object-contain rounded mb-20 shadow-lg"
                />
                <div className="px-5">
                    <h2 className="text-2xl mb-2 blogTitle">{blog.title}</h2>
                    <p className="mb-2 font-semibold w-48 h-48 overflow-hidden">
                        {blog.content}
                    </p>
                    <br />
                    <button className="blogButton">
                        Continue Reading
                        {/* HeroIcon Arrow Right */}
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
                </div>
            </div>
        </Link>
    );
};

export default Blog;
