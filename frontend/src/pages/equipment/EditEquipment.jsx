import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { equipmentService } from "../../services/equipmentService";

const EditEquipment = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

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

    useEffect(() => {

        loadEquipment();

    }, []);

    const loadEquipment = async () => {

        try {

            setLoading(true);

            const equipment = await equipmentService.getById(id);

            setFormData({

                equipment_name: equipment.equipment_name || "",

                category: equipment.category || "",

                purchase_date:

                    equipment.purchase_date

                        ?

                        equipment.purchase_date.substring(0,10)

                        :

                        "",

                last_service_date:

                    equipment.last_service_date

                        ?

                        equipment.last_service_date.substring(0,10)

                        :

                        "",

                next_service_date:

                    equipment.next_service_date

                        ?

                        equipment.next_service_date.substring(0,10)

                        :

                        "",

                status:

                    equipment.status || "Active",

                notes:

                    equipment.notes || ""

            });

        }

        catch(err){

            console.log(err);

            setError("Unable to load equipment.");

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

            await equipmentService.update(id, formData);

            navigate("/equipment");

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

                    ✏ Edit Equipment

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

                                    Last Service Date

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

                                    Next Service Date

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

                        <button

                            className="btn btn-success"

                            disabled={saving}

                        >

                            {

                                saving

                                ?

                                "Updating..."

                                :

                                "Update Equipment"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditEquipment;