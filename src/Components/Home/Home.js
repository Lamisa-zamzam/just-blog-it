import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Blogs from "../Blogs/Blogs";
import ResponsiveNav from "../responsiveNav/ResponsiveNav";

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
        console.log(window.innerWidth)

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
            <div className="m-5">
                <Header />
                <Blogs />
            </div>
            <Footer />
        </>
    );
};

export default Home;
