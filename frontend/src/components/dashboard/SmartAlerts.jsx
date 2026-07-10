import React from "react";

import {
    FaExclamationTriangle,
    FaCheckCircle,
    FaInfoCircle
} from "react-icons/fa";

const SmartAlerts = ({ alerts = [] }) => {

    if (!alerts.length) {

        return (

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h5 className="mb-0">

                        Smart Alerts

                    </h5>

                </div>

                <div className="card-body text-center">

                    <FaCheckCircle
                        size={45}
                        className="text-success mb-3"
                    />

                    <h5>

                        No Alerts

                    </h5>

                    <p className="text-muted">

                        Everything on your farm looks good.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-success text-white">

                <h5 className="mb-0">

                    Smart Alerts ({alerts.length})

                </h5>

            </div>

            <div className="card-body">

                {

                    alerts.map((alert, index) => (

                        <div
                            key={index}
                            className={`alert mb-3 ${
                                alert.priority === "High"
                                    ? "alert-danger"
                                    : alert.priority === "Medium"
                                    ? "alert-warning"
                                    : "alert-info"
                            }`}
                        >

                            <div className="d-flex">

                                <div className="me-3">

                                    {

                                        alert.priority === "High"

                                            ? <FaExclamationTriangle />

                                            : alert.priority === "Medium"

                                            ? <FaInfoCircle />

                                            : <FaCheckCircle />

                                    }

                                </div>

                                <div>

                                    <strong>

                                        {alert.title}

                                    </strong>

                                    <br />

                                    {alert.message}

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default SmartAlerts;