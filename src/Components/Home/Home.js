import React from "react";

import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Blogs from "../Blogs/Blogs";
import Footer from "../Footer/Footer";

const Home = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <main className="m-5">
                <Header />
                <Blogs />
            </main>
            <Footer />
        </>
    );
};

export default Home;
