import React from "react";
import Blog from "../Blog/Blog";
import { PlayersData } from "./PlayersData";

const Players = () => {
    return (
        <>
            <h1 className="lg:text-6xl md-text-7xl sm:text-5xl text-3xl font-black md:mx-20 md:mb-16 uppercase">
                Hot Blogs
            </h1>
            <div className="grid md:grid-cols-2 justify-center items-center bg-white">
                {PlayersData.map((player) => (
                    <Blog player={player} />
                ))}
            </div>
        </>
    );
};

export default Players;
