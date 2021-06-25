import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ManageBlogs from "./Components/Dashboard/ManageServices/ManageServices";
import PublishBlog from "./Components/Dashboard/PublishBlog/PublishBlog";
import MakeAdmin from "./Components/Dashboard/MakeAdmin/MakeAdmin";
import PrivateRoute from "./Components/Login/PrivateRoute/PrivateRoute";
import Login from "./Components/Login/Login/Login";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import { createContext } from "react";
import BlogDetail from "./Components/BlogDetail/BlogDetail";

export const UserContext = createContext();
function App() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        photoURL: "",
        isNewUser: true,
        isLoggedIn: false,
        error: "",
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <PrivateRoute path="/publishBlog">
                        <PublishBlog />
                    </PrivateRoute>
                    <PrivateRoute path="/makeAdmin">
                        <MakeAdmin />
                    </PrivateRoute>
                    <PrivateRoute path="/manageBlogs">
                        <ManageBlogs />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="/blog/:id">
                        <BlogDetail />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
