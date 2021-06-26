// React
import { useState, createContext } from "react";
// Style
import "./App.css";
// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Public Components
import Home from "./Components/Home/Home";
import BlogDetail from "./Components/BlogDetail/BlogDetail";
// Login Components
import Login from "./Components/Login/Login/Login";
import PrivateRoute from "./Components/Login/PrivateRoute/PrivateRoute";
// Private Components
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import ManageBlogs from "./Components/Dashboard/ManageServices/ManageServices";
import PublishBlog from "./Components/Dashboard/PublishBlog/PublishBlog";
import MakeAdmin from "./Components/Dashboard/MakeAdmin/MakeAdmin";
import NotFound from "./Components/NotFound/NotFound";

// Context
export const UserContext = createContext();

function App() {
    // Initial value of the context
    const [user, setUser] = useState({
        name: "",
        email: "",
        photoURL: "",
        isNewUser: true,
        isLoggedIn: false,
        error: "",
        admin: false,
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Router>
                <Switch>
                    {/* Public */}
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/blog/:id">
                        <BlogDetail />
                    </Route>

                    {/* Login */}
                    <Route path="/login">
                        <Login />
                    </Route>

                    {/* Private */}
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

                    {/* In case no rote is found */}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
