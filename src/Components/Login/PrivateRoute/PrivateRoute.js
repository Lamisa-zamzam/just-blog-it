import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
    const token = sessionStorage.getItem("token");
    const loggedInEmail = sessionStorage.getItem("email");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/checkIfAdmin?email=${loggedInEmail}`)
            .then((res) => res.json())
            .then((data) => {
                if (data[0]) {
                    setIsAdmin(true);
                }
            });
    }, [loggedInEmail]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
