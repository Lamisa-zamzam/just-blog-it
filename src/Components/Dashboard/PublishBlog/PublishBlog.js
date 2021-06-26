import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import SideNav from "../SideNav/SideNav";

const PublishBlog = () => {
    // Initial state of if the user is admin
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the user is admin
    useEffect(() => {
        const ifAdmin = JSON.parse(sessionStorage.getItem("admin"));
        setIsAdmin(ifAdmin);
    }, []);

    // Initial state of the cover image URL
    const [imageURL, setImageURL] = useState(null);
    // Initial error state
    const [error, setError] = useState(null);
    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handle form submit
    const onSubmit = (data) => {
        fetch("https://frozen-coast-84516.herokuapp.com/addBlog", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...data, imageURL }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    alert(
                        "Your blog has been published successfully!! Give yourself a pat on the back!! 👊"
                    );
                    window.location.reload();
                }
            });
    };

    // handles imgbb image upload
    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set("key", "b238360b7dd6273493645ed46cb79ec6");
        if (event.target.files[0]) {
            imageData.append("image", event.target.files[0]);
            axios
                .post("https://api.imgbb.com/1/upload", imageData)
                .then((res) => {
                    setImageURL(res.data.data.display_url);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    };

    return (
        <div className="windowWithSidebar">
            <SideNav />
            {isAdmin ? (
                <div className="asideSideBar">
                    <h1 className="dashBoardHeading">Publish a blog</h1>
                    <form
                        className="dashBoardForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label className="dashFormLabel">Blog Title</label>
                        <input
                            className="dashFormInput"
                            type="text"
                            name="title"
                            placeholder="Your Blog Title"
                            autoFocus
                            {...register("title", { required: true })}
                        />
                        {errors.title && (
                            <div className="dashFormErr">
                                This field is required
                            </div>
                        )}

                        <label className="dashFormLabel block mt-4">
                            Content
                        </label>
                        <textarea
                            className="border-solid border-gray-300 border py-20 px-4 w-full rounded text-gray-700"
                            placeholder="Your content goes here..."
                            name="content"
                            rows={5}
                            cols={5}
                            {...register("content", { required: true })}
                        />
                        {errors.content && (
                            <div className="dashFormErr ">
                                This field is required
                            </div>
                        )}

                        {/* Cover Image Upload Area */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Cover photo
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br />
                        {imageURL ? (
                            <div className="dashFormSubmitDiv">
                                <button
                                    className="dashFormSubmitBtn w-full"
                                    type="submit"
                                >
                                    Publish
                                </button>
                            </div>
                        ) : (
                            <p>
                                You will be able to submit this form as soon as
                                your image is ready to be uploaded.
                            </p>
                        )}
                        <p className="text-red-500">{error}</p>
                    </form>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            ) : (
                <h3 className="noAccessText">
                    Sorry, you don't have admin access.
                </h3>
            )}
        </div>
    );
};

export default PublishBlog;
