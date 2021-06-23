import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import AdminBookings from "./AdminBookings";
import UserBookings from "./UserBookings";

const Bookings = () => {
    const [orders, setOrders] = useState([]);
    const loggedInEmail = sessionStorage.getItem("email");
    const [isAdmin, setIsAdmin] = useState(false);
    const [noOrder, setNoOrder] = useState(false);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/checkIfAdmin?email=${loggedInEmail}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data[0]) {
    //                 setIsAdmin(true);
    //             }
    //         });
    // }, [loggedInEmail]);

    useEffect(() => {
        fetch(`http://localhost:5000/bookings/${loggedInEmail}`)
            .then((res) => res.json())
            .then((data) => {
                if (data[0]) {
                    setOrders(data);
                } else {
                    setNoOrder(true);
                }
            });
    }, [loggedInEmail]);

    const handleStatusChange = (e, id) => {
        const newStatus = { status: e.target.value };

        fetch(`https://morning-shelf-52119.herokuapp.com/updateOrder/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newStatus),
        })
            .then((res) => res.json())
            .then((result) => {});
    };

    return (
        <div className="relative min-h-screen md:flex">
            <SideNav />
            <div className="flex-1 p-10">
                {isAdmin && (
                    <div className="headerRow">
                        <div md={2}>Name</div>
                        <div md={3}>Email</div>
                        <div md={2}>Service</div>
                        <div md={3}>Payed With</div>
                        <div md={2}>Status</div>
                    </div>
                )}
                {isAdmin &&
                    orders.map((order) => (
                        <AdminBookings
                            key={order._id}
                            order={order}
                            handleStatusChange={handleStatusChange}
                        />
                    ))}
                {!isAdmin &&
                    !noOrder &&
                    orders.map((order) => (
                        <div key={order._id}>
                            <UserBookings order={order} key={order._id} />
                        </div>
                    ))}
                {noOrder && (
                    <h3
                        className="text-secondary text-center"
                        style={{ marginTop: "20%" }}
                    >
                        You have no orders yet!!! Go back and get one today!!
                    </h3>
                )}
            </div>
        </div>
    );
};

export default Bookings;
