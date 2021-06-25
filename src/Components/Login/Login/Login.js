import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faGoogle,
    faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { firebaseConfig } from "./Firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [user, setUser] = useContext(UserContext);

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) history.push(from);
    }, [from, history]);

    const checkAdmin = (email, password) => {
        fetch(`http://localhost:5000/checkAdmin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data[0]) {
                    sessionStorage.setItem("admin", true);
                    return;
                }

                sessionStorage.setItem("admin", false);
            });
    };

    // Google sign in
    const handleGoogleLogin = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const googleUser = result.user;
                const { displayName, email, photoURL } = googleUser;
                handleUser(displayName, email, photoURL, true);

                handleAuthToken();
            })
            .catch((error) => {
                handleErrorMessage(error);
            });
    };

    // handles setting auth token in the session storage
    const handleAuthToken = () => {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem("token", idToken);
                history.replace(from);
            })
            .catch(function (error) {});
    };

    // handles user info
    const handleUser = (name, email, photoURL, whetherLoggedIn) => {
        const newUser = { ...user };
        if (name !== undefined) {
            newUser.name = name;
            sessionStorage.setItem("name", name);
        }
        if (email !== undefined) {
            newUser.email = email;
            sessionStorage.setItem("email", email);
        }
        if (photoURL !== undefined) {
            newUser.photoURL = photoURL;
            sessionStorage.setItem("photo", photoURL);
        }
        if (whetherLoggedIn !== undefined) {
            newUser.isLoggedIn = true;
        }
        setUser(newUser);
        checkAdmin(email, password);
    };

    // handles error in case it occurs
    const handleErrorMessage = (error) => {
        const errorMessage = error.message;
        const newUser = { ...user };
        newUser.error = errorMessage;
        setUser(newUser);
    };

    // Register with email and password
    const handleSignUp = (name, userEmail, userPassword) => {
        const doesPasswordsMatch = checkPasswords();
        if (doesPasswordsMatch) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(userEmail, userPassword)
                .then((userCredential) => {
                    const { email } = userCredential.user;
                    handleUser(name, email, undefined, true);
                    handleAuthToken();
                })
                .catch((error) => {
                    handleErrorMessage(error);
                });
        } else {
            const newUser = { ...user };
            newUser.error = "Your Passwords don't match";
            setUser(newUser);
        }
    };

    // Sign in with email and password
    const handleLogIn = (userEmail, userPassword) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then((userCredential) => {
                const { email } = userCredential.user;
                handleUser(undefined, email, undefined, true);
                handleAuthToken();
            })
            .catch((error) => {
                handleErrorMessage(error);
            });
    };

    // React hook form
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        data.name
            ? handleSignUp(data.name, data.email, data.password)
            : handleLogIn(data.email, data.password);
    };

    // Toggling sign up and sign in
    const toggleForm = (e) => {
        e.preventDefault();
        const newUser = { ...user };
        newUser.isNewUser = !newUser.isNewUser;
        newUser.error = "";
        setUser(newUser);
    };

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // Checking passwords
    const handleBlur = (e) => {
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
        if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    };

    // checks if the two passwords match
    const checkPasswords = () => {
        return password === confirmPassword;
    };

    return (
        <div className="md:m-28">
            <form onSubmit={handleSubmit(onSubmit)} className="form-card">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrImfqN1gybiuS92IZ5iKRiPIYyj7cmJVrQ&usqp=CAU"
                    alt="Just Blog It"
                    className="m-auto w-16 inline"
                />
                <h3 className="inline ml-5 text-3xl font-black">
                    {user.isNewUser ? "Create an account" : "Log In"}
                </h3>
                <br />
                <br />
                {user.isNewUser && (
                    <input
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                        className="bg-blue-100 form-field"
                        placeholder="Your Name"
                    />
                )}
                <br />
                <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                    })}
                    className="bg-blue-100 form-field"
                    placeholder="Your Email"
                />
                <br />
                {errors && (
                    <span className="error">
                        {errors.email.type === "required"
                            ? "Email is required"
                            : "Your Email pattern is not correct"}
                    </span>
                )}
                <br />
                <input
                    type="password"
                    name="password"
                    {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern: /\d{1}/,
                    })}
                    placeholder="Your Password"
                    className="bg-blue-100 form-field"
                    id="password"
                    onBlur={handleBlur}
                />
                <br />
                {errors && (
                    <span className="error">
                        {errors.password.type === "required" &&
                            "Password is required"}
                        {errors.password.type === "pattern" &&
                            "Your password must contain one or more numbers"}
                        {errors.password.type === "minLength" &&
                            "Your Password must contain at least 8 characters"}
                    </span>
                )}
                <br />
                {user.isNewUser && (
                    <input
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                            required: true,
                            minLength: 8,
                            pattern: /\d{1}/,
                        })}
                        placeholder="Confirm Your Password"
                        className="bg-blue-100 form-field"
                        id="confirmPassword"
                        onBlur={handleBlur}
                    />
                )}
                <br />
                {errors && (
                    <span className="error">
                        {errors.confirmPassword.type === "required" &&
                            "Password is required"}
                        {errors.confirmPassword.type === "pattern" &&
                            "Your password must contain one or more numbers"}
                        {errors.confirmPassword.type === "minLength" &&
                            "Your Password must contain at least 8 characters"}
                    </span>
                )}
                <br />
                <br />
                {!user.isNewUser && (
                    <div className="savingPassword">
                        <input
                            type="checkbox"
                            name="save-password"
                            id="save-password"
                        />
                        <label
                            htmlFor="save-password"
                            style={{ marginRight: "50px" }}
                        >
                            &nbsp;Remember Me
                        </label>
                        <Link
                            to="/login"
                            style={{ textDecoration: "underline" }}
                        >
                            Forgot Password
                        </Link>
                    </div>
                )}
                <br />
                <p className="error">{user.error}</p>
                {user.isNewUser ? (
                    <input
                        type="submit"
                        value="Create"
                        className="bg-blue-500 text-xl focus:outline-none focus:bg-blue-700 submit-button"
                    />
                ) : (
                    <input
                        type="submit"
                        value="Log In"
                        className="submit-button"
                    />
                )}
                <br />
                <p>
                    {user.isNewUser ? "Already" : "Don't"} have an account?{" "}
                    <Link
                        href="/"
                        className="underline text-blue-500"
                        onClick={(e) => toggleForm(e)}
                    >
                        {user.isNewUser ? "Login" : "Create An Account"}
                    </Link>
                </p>
            </form>
            <div className="social-login text-xl">
            <br />
                <h4>or</h4>
                <h2>continue with</h2>
                <br />
                <button
                    onClick={handleGoogleLogin}
                    className="focus:outline-none focus:bg-blue-100 social-media-btn"
                >
                    {" "}
                    <FontAwesomeIcon
                        icon={faGoogle}
                        style={{ color: "blue", marginRight: "-3px" }}
                        size="2x"
                    />{" "}
                    oogle
                </button>
                <br />
                <br />
                <button className="focus:outline-none focus:bg-blue-100 social-media-btn">
                    <FontAwesomeIcon
                        icon={faFacebookSquare}
                        className="social-media-icon"
                        style={{ color: "royalBlue" }}
                        size="2x"
                    />{" "}
                    Facebook
                </button>
                <br />
                <br />
                <button className="focus:outline-none focus:bg-blue-100 social-media-btn">
                    <FontAwesomeIcon
                        icon={faTwitterSquare}
                        className="social-media-icon"
                        style={{ color: "deepSkyBlue" }}
                        size="2x"
                    />{" "}
                    Twitter
                </button>
            </div>
        </div>
    );
};

export default Login;
