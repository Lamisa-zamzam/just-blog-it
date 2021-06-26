import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SideNav from "../SideNav/SideNav";

const MakeAdmin = () => {
    // Initial state of if the user is admin
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if user is admin
    useEffect(() => {
        const ifAdmin = JSON.parse(sessionStorage.getItem("admin"));
        setIsAdmin(ifAdmin);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        fetch("https://frozen-coast-84516.herokuapp.com/makeAdmin", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    alert("Admin added successfully!!");
                    window.location.reload();
                }
            });
    };

    return (
        <div className="windowWithSidebar">
            <SideNav />
            {isAdmin ? (
                <div className="asideSideBar">
                    <h1 className="dashBoardHeading">Make an Admin</h1>
                    <form
                        className="dashBoardForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label className="dashFormLabel">
                            Email address of the admin you want to make
                        </label>
                        <input
                            className="dashFormInput"
                            type="email"
                            name="adminEmail"
                            placeholder="your.admin@example.com"
                            autoFocus
                            {...register("adminEmail", { required: true })}
                        />
                        {errors.adminEmail && (
                            <div className="dashFormErr">
                                This field is required
                            </div>
                        )}
                        <br />
                        <br />
                        <label className="dashFormLabel">Password</label>
                        <input
                            className="dashFormInput"
                            type="password"
                            name="adminPassword"
                            placeholder="super secured password"
                            autoFocus
                            {...register("adminPassword", { required: true })}
                        />
                        {errors.adminPassword && (
                            <div className="dashFormErr">
                                This field is required
                            </div>
                        )}
                        <div className="dashFormSubmitDiv">
                            <button
                                className="dashFormSubmitBtn w-36"
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <h3 className="noAccessText">
                    Sorry, you don't have admin access.
                </h3>
            )}
        </div>
    );
};

export default MakeAdmin;
