import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { equipmentService } from "../../services/equipmentService";

const AddEquipment = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        equipment_name: "",

        category: "",

        purchase_date: "",

        last_service_date: "",

        next_service_date: "",

        status: "Active",

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

        if (!formData.equipment_name.trim()) {

            setError("Equipment name is required.");

            return;

        }

        try {

            setLoading(true);

            await equipmentService.create(formData);

            navigate("/equipment");

        }

        catch (err) {

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Failed to add equipment."

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

                    🚜 Add Equipment

                </h2>

                <Link

                    to="/equipment"

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

                                    Equipment Name

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="equipment_name"

                                    value={formData.equipment_name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="category"

                                    value={formData.category}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Purchase Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="purchase_date"

                                    value={formData.purchase_date}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Last Service

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="last_service_date"

                                    value={formData.last_service_date}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Next Service

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="next_service_date"

                                    value={formData.next_service_date}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Status

                                </label>

                                <select

                                    className="form-select"

                                    name="status"

                                    value={formData.status}

                                    onChange={handleChange}

                                >

                                    <option value="Active">

                                        Active

                                    </option>

                                    <option value="Inactive">

                                        Inactive

                                    </option>

                                    <option value="Under Maintenance">

                                        Under Maintenance

                                    </option>

                                </select>

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

                                type="submit"

                                className="btn btn-success"

                                disabled={loading}

                            >

                                {

                                    loading

                                    ?

                                    "Saving..."

                                    :

                                    "Save Equipment"

                                }

                            </button>

                            <Link

                                to="/equipment"

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

export default AddEquipment;