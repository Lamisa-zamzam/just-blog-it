import React, { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import ResponsiveNav from "../responsiveNav/ResponsiveNav";
import Header from "../Header/Header";
import Blogs from "../Blogs/Blogs";
import Footer from "../Footer/Footer";

const Home = () => {
    // Initial value of if the dropdown is open
    const [isOpen, setIsOpen] = useState(false);
    // toggle the dropdown
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // If the device width is greater than 760, set the state to false
    useEffect(() => {
        const hideMenu = () => {
            if (window.innerWidth > 1024 && isOpen) {
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
            {/* Navbar */}
            <Navbar toggle={toggle} />
            {/* Responsive Navbar */}
            <ResponsiveNav toggle={toggle} isOpen={isOpen} />
            <main className="m-5">
                <Header />
                <Blogs />
            </main>
            <Footer />
        </>
    );
};

export default Home;
