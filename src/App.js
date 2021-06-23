import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import Blogs from "./Components/Blogs/Blogs";
import ManageBlogs from "./Components/Dashboard/ManageServices/ManageServices";
import PublishBlog from "./Components/Dashboard/PublishBlog/PublishBlog";
import MakeAdmin from "./Components/Dashboard/MakeAdmin/MakeAdmin";
import Footer from "./Components/Footer/Footer";
import ResponsiveNav from "./Components/responsiveNav/ResponsiveNav";
import SideNav from "./Components/Dashboard/SideNav/SideNav";
import Bookings from "./Components/Dashboard/Bookings/Bookings";

function App() {
    // Initial value of if the dropdown is open
    const [isOpen, setIsOpen] = useState(false);
    // toggle the dropdown
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // If the device width is greater than 760, set the state to false
    useEffect(() => {
        const hideMenu = () => {
            if (window.innerWidth > 760 && isOpen) {
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
        <Router>
            <Switch>
                <Route exact path="/">
                    {" "}
                    <Navbar toggle={toggle} />
                    <ResponsiveNav toggle={toggle} isOpen={isOpen} />
                    <Header />
                    <Blogs />
                    <Footer />
                </Route>
                <Route path="/publishBlog">
                    <PublishBlog />
                </Route>
                <Route path="/makeAdmin">
                    <MakeAdmin />
                </Route>
                <Route path="/bookings">
                    <Bookings />
                </Route>
                <Route path="/manageBlogs">
                    <ManageBlogs />
                </Route>
                <Route path="/side">
                    <SideNav />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
