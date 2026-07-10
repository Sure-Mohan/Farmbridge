import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { livestockService } from "../../services/livestockService";

const AddLivestock = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        animal_type: "",

        breed: "",

        quantity: "",

        age: "",

        health_status: "Healthy",

        vaccination_date: "",

        notes: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.animal_type.trim()) {

            setError("Animal type is required.");

            return;

        }

        if (!formData.quantity || Number(formData.quantity) <= 0) {

            setError("Quantity must be greater than zero.");

            return;

        }

        try {

            setLoading(true);

            await livestockService.create(formData);

            navigate("/livestock");

        }

        catch (err) {

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Failed to add livestock."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    🐄 Add Livestock

                </h2>

                <Link

                    to="/livestock"

                    className="btn btn-secondary"

                >

                    Back

                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    {

                        error &&

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    }

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Animal Type

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="animal_type"

                                    value={formData.animal_type}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Breed

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="breed"

                                    value={formData.breed}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Quantity

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="quantity"

                                    value={formData.quantity}

                                    onChange={handleChange}

                                    min="1"

                                    required

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Age

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="age"

                                    value={formData.age}

                                    onChange={handleChange}

                                    min="0"

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Health Status

                                </label>

                                <select

                                    className="form-select"

                                    name="health_status"

                                    value={formData.health_status}

                                    onChange={handleChange}

                                >

                                    <option value="Healthy">

                                        Healthy

                                    </option>

                                    <option value="Sick">

                                        Sick

                                    </option>

                                    <option value="Critical">

                                        Critical

                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Vaccination Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="vaccination_date"

                                    value={formData.vaccination_date}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Notes

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    name="notes"

                                    value={formData.notes}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className="d-flex gap-2">

                            <button

                                className="btn btn-success"

                                disabled={loading}

                            >

                                {

                                    loading

                                    ?

                                    "Saving..."

                                    :

                                    "Save Animal"

                                }

                            </button>

                            <Link

                                to="/livestock"

                                className="btn btn-secondary"

                            >

                                Cancel

                            </Link>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default AddLivestock;