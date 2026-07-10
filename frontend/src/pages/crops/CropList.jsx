import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cropService } from "../../services/cropService";

const CropList = () => {

    const [crops, setCrops] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const loadCrops = async () => {

        try {

            setLoading(true);

            const data = await cropService.getAll();

            setCrops(data);

            setFiltered(data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCrops();

    }, []);

    useEffect(() => {

        let result = [...crops];

        if (search) {

            result = result.filter(

                crop =>

                    crop.crop_name

                        .toLowerCase()

                        .includes(search.toLowerCase())

            );

        }

        if (status !== "All") {

            result = result.filter(

                crop => crop.status === status

            );

        }

        setFiltered(result);

    }, [search, status, crops]);

    const deleteCrop = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this crop?"

        );

        if (!confirmDelete) return;

        try {

            await cropService.delete(id);

            loadCrops();

        }

        catch (err) {

            console.log(err);

            alert("Delete failed");

        }

    };

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    🌾 Crop Management

                </h2>

                <Link

                    to="/crops/add"

                    className="btn btn-success"

                >

                    + Add Crop

                </Link>

            </div>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <input

                                className="form-control"

                                placeholder="Search Crop..."

                                value={search}

                                onChange={(e) =>

                                    setSearch(e.target.value)

                                }

                            />

                        </div>

                        <div className="col-md-3">

                            <select

                                className="form-select"

                                value={status}

                                onChange={(e) =>

                                    setStatus(e.target.value)

                                }

                            >

                                <option>All</option>

                                <option>Growing</option>

                                <option>Planted</option>

                                <option>Harvested</option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow">

                <div className="table-responsive">

                    <table className="table table-hover mb-0">

                        <thead className="table-success">

                            <tr>

                                <th>Name</th>

                                <th>Area</th>

                                <th>Status</th>

                                <th>Planting</th>

                                <th>Harvest</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filtered.length === 0 ?

                                    (

                                        <tr>

                                            <td

                                                colSpan="6"

                                                className="text-center"

                                            >

                                                No Crops Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    filtered.map(crop => (

                                        <tr key={crop.id}>

                                            <td>

                                                {crop.crop_name}

                                            </td>

                                            <td>

                                                {crop.area}

                                            </td>

                                            <td>

                                                <span className="badge bg-success">

                                                    {crop.status}

                                                </span>

                                            </td>

                                            <td>

                                                {crop.planting_date?.substring(0,10)}

                                            </td>

                                            <td>

                                                {

                                                    crop.expected_harvest_date

                                                        ?

                                                        crop.expected_harvest_date.substring(0,10)

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <Link

                                                    to={`/crops/edit/${crop.id}`}

                                                    className="btn btn-warning btn-sm me-2"

                                                >

                                                    Edit

                                                </Link>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() =>

                                                        deleteCrop(crop.id)

                                                    }

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default CropList;