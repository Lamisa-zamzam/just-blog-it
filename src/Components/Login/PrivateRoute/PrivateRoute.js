import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
    // For each login a token is stored in the session storage
    const token = sessionStorage.getItem("token");
    return (
        <Route
            {...rest}
            render={({ location }) =>
                // If the token exists let the user go to his/her requested
                // Route, else redirect him/her to login
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
