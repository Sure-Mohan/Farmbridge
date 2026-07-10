import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { livestockService } from "../../services/livestockService";

const EditLivestock = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

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

    useEffect(() => {

        loadAnimal();

    }, []);

    const loadAnimal = async () => {

        try {

            setLoading(true);

            const animal = await livestockService.getById(id);

            setFormData({

                animal_type: animal.animal_type || "",

                breed: animal.breed || "",

                quantity: animal.quantity || "",

                age: animal.age || "",

                health_status: animal.health_status || "Healthy",

                vaccination_date:

                    animal.vaccination_date

                        ?

                        animal.vaccination_date.substring(0,10)

                        :

                        "",

                notes: animal.notes || ""

            });

        }

        catch(err){

            console.log(err);

            setError("Unable to load livestock.");

        }

        finally{

            setLoading(false);

        }

    };

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        setSaving(true);

        setError("");

        try{

            await livestockService.update(id,formData);

            navigate("/livestock");

        }

        catch(err){

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Failed to update."

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

                    ✏ Edit Livestock

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

                        <button

                            className="btn btn-success"

                            disabled={saving}

                        >

                            {

                                saving

                                ?

                                "Updating..."

                                :

                                "Update Livestock"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditLivestock;