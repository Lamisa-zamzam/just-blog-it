import React, { useEffect, useState } from "react";
import LaptopNav from "./LaptopNav/LaptopNav";
import MobileNav from "./MobileNav/MobileNav";

const Navbar = () => {
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
            <LaptopNav toggle={toggle} />
            {/* Responsive Navbar */}
            <MobileNav toggle={toggle} isOpen={isOpen} />
        </>
    );
};

export default Navbar;
