import React, { useEffect, useState } from "react";
import { notificationService } from "../../services/notificationService";

const Notification = () => {

    const [notifications, setNotifications] = useState([]);

    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const data =
                await notificationService.getNotifications();

            setNotifications(data.notifications);

            setCount(data.count);

        }

        catch (err) {

            console.log(err);

            setError("Unable to load notifications.");

        }

        finally {

            setLoading(false);

        }

    };

    const priorityColor = (priority) => {

        switch (priority) {

            case "High":
                return "danger";

            case "Medium":
                return "warning";

            default:
                return "success";

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <h2>

                        🔔 Notifications

                    </h2>

                    <p>

                        Total Notifications :

                        <strong>

                            {" "}{count}

                        </strong>

                    </p>

                </div>

            </div>

            {

                loading &&

                <div className="text-center mt-5">

                    <div className="spinner-border text-success"/>

                    <h5 className="mt-3">

                        Loading...

                    </h5>

                </div>

            }

            {

                error &&

                <div className="alert alert-danger mt-4">

                    {error}

                </div>

            }

            {

                !loading &&

                notifications.length === 0 &&

                <div className="alert alert-success mt-4">

                    🎉 Great!

                    No notifications.

                </div>

            }

            {

                notifications.map((item, index) => (

                    <div

                        className={`card border-${priorityColor(item.priority)} shadow mt-3`}

                        key={index}

                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <h4>

                                    {item.icon}

                                    {" "}

                                    {item.title}

                                </h4>

                                <span

                                    className={`badge bg-${priorityColor(item.priority)}`}

                                >

                                    {item.priority}

                                </span>

                            </div>

                            <hr />

                            <p>

                                {item.message}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default Notification;