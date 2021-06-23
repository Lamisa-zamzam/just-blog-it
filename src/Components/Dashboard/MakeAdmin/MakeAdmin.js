import React from "react";
import SideNav from "../SideNav/SideNav";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
        <div className="relative min-h-screen md:flex">
            <SideNav />
            <div className="flex-1 p-10">
                <h1 className="text-center text-4xl font-semibold mt-10">
                    Make an Admin
                </h1>
                <form
                    className="max-w-xl m-auto py-10 mt-10 px-12 border"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className="text-gray-600 font-medium">
                        Email address of the admin you want to make
                    </label>
                    <input
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        type="email"
                        name="adminEmail"
                        placeholder="your.admin@example.com"
                        autoFocus
                        {...register("adminEmail", { required: true })}
                    />
                    {errors.adminEmail && (
                        <div className="mb-3 text-normal text-red-500">
                            This field is required
                        </div>
                    )}
                    <br />
                    <br />
                    <label className="text-gray-600 font-medium">
                        Password
                    </label>
                    <input
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        type="password"
                        name="adminPassword"
                        placeholder="super secured password"
                        autoFocus
                        {...register("adminPassword", { required: true })}
                    />
                    {errors.adminPassword && (
                        <div className="mb-3 text-normal text-red-500">
                            This field is required
                        </div>
                    )}
                    <div className="px-4 py-3 text-right sm:px-6">
                        <button
                            className="mt-4 w-36 bg-blue-500 hover:bg-blue-700 text-white border py-3 px-6 font-semibold text-md rounded"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeAdmin;
