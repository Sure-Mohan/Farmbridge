import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cropService } from "../../services/cropService";

const EditCrop = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        crop_name: "",

        area: "",

        planting_date: "",

        expected_harvest_date: "",

        status: "Growing",

        notes: ""

    });

    useEffect(() => {

        fetchCrop();

    }, []);

    const fetchCrop = async () => {

        try {

            setLoading(true);

            const crop = await cropService.getById(id);

            setFormData({

                crop_name: crop.crop_name || "",

                area: crop.area || "",

                planting_date:

                    crop.planting_date

                        ?

                        crop.planting_date.substring(0,10)

                        :

                        "",

                expected_harvest_date:

                    crop.expected_harvest_date

                        ?

                        crop.expected_harvest_date.substring(0,10)

                        :

                        "",

                status:

                    crop.status || "Growing",

                notes:

                    crop.notes || ""

            });

        }

        catch(err){

            console.log(err);

            setError("Unable to load crop.");

        }

        finally{

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        setError("");

        try{

            await cropService.update(id, formData);

            navigate("/crops");

        }

        catch(err){

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Update failed."

            );

        }

        finally{

            setSaving(false);

        }

    };

    if(loading){

        return(

            <div className="text-center mt-5">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    return(

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    ✏ Edit Crop

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

                                    className="form-control"

                                    name="crop_name"

                                    value={formData.crop_name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Area

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="area"

                                    value={formData.area}

                                    onChange={handleChange}

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

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Expected Harvest

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

                        <button

                            className="btn btn-success"

                            disabled={saving}

                        >

                            {

                                saving

                                ?

                                "Updating..."

                                :

                                "Update Crop"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditCrop;