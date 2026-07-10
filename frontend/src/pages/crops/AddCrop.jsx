import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cropService } from "../../services/cropService";

const AddCrop = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        crop_name: "",

        area: "",

        planting_date: "",

        expected_harvest_date: "",

        status: "Growing",

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

        if (!formData.crop_name.trim()) {

            setError("Crop name is required.");

            return;

        }

        if (!formData.area || Number(formData.area) <= 0) {

            setError("Area must be greater than 0.");

            return;

        }

        if (!formData.planting_date) {

            setError("Planting date is required.");

            return;

        }

        try {

            setLoading(true);

            await cropService.create(formData);

            navigate("/crops");

        }

        catch (err) {

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Failed to add crop."

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

                    🌱 Add Crop

                </h2>

                <Link

                    to="/crops"

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

                                    Crop Name

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="crop_name"

                                    value={formData.crop_name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Area (Acres)

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="area"

                                    value={formData.area}

                                    onChange={handleChange}

                                    min="1"

                                    step="0.01"

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Planting Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="planting_date"

                                    value={formData.planting_date}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Expected Harvest Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="expected_harvest_date"

                                    value={formData.expected_harvest_date}

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

                                    <option value="Growing">

                                        Growing

                                    </option>

                                    <option value="Planted">

                                        Planted

                                    </option>

                                    <option value="Harvested">

                                        Harvested

                                    </option>

                                </select>

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Notes

                                </label>

                                <textarea

                                    className="form-control"

                                    rows="4"

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

                                    "Save Crop"

                                }

                            </button>

                            <Link

                                to="/crops"

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

export default AddCrop;