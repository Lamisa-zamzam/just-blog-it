import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ player }) => {
    return (
        <div>
            <div
                className="md:mx-5 md:ml-20 grid md:grid-cols-2 justify-center items-center bg-white"
                key={player.id}
            >
                <img
                    src={player.img}
                    alt="player"
                    className="w-100 object-contain rounded mb-20 shadow-lg"
                />
                <div className="px-5">
                    <h2 className="text-2xl mb-2 font-black text-red-700">
                        {player.name}
                    </h2>
                    <p className="mb-2 font-semibold">
                        {player.country}, {player.club}, {player.position}, #
                        {player.jerseyNumber}
                    </p>
                    <br />
                    <Link
                        to="/"
                        className="shadow-lg mt-5 py-3 px-7 bg-blue-300 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out flex items-center w-max"
                    >
                        Continue Reading
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
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;
