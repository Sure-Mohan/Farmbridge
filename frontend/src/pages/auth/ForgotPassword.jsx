import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {

            return setError("Passwords do not match.");

        }

        try {

            await authService.forgotPassword(
                formData.email,
                formData.password
            );

            alert("Password updated successfully.");

            navigate("/login");

        }
        catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to update password."
            );

        }

    };

    return (

        <div className="container mt-5" style={{ maxWidth: "450px" }}>

            <div className="card shadow">

                <div className="card-body">

                    <h3 className="text-center mb-4">
                        Forgot Password
                    </h3>

                    {error &&
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    }

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            className="btn btn-success w-100"
                            type="submit"
                        >
                            Update Password
                        </button>

                    </form>

                    <div className="text-center mt-3">

                        <Link to="/login">
                            Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ForgotPassword;