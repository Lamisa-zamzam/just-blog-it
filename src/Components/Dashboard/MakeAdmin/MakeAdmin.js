import { useContext } from "react";
import { useForm } from "react-hook-form";
import SideNav from "../SideNav/SideNav";

// Context
import { UserContext } from "../../../App";

const MakeAdmin = () => {
    // Get the user form the context
    const [user] = useContext(UserContext);

    // React Hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Make an admin
    const onSubmit = (data) => {
        fetch("http://localhost:5000/makeAdmin", {
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
            {user.admin ? (
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
