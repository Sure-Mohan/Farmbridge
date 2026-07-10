import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { equipmentService } from "../../services/equipmentService";

const EquipmentList = () => {

    const [equipment, setEquipment] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const loadEquipment = async () => {

        try {

            setLoading(true);

            const data = await equipmentService.getAll();

            setEquipment(data);

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

        loadEquipment();

    }, []);

    useEffect(() => {

        let result = [...equipment];

        if (search) {

            result = result.filter(item =>

                item.equipment_name

                    .toLowerCase()

                    .includes(search.toLowerCase())

            );

        }

        if (status !== "All") {

            result = result.filter(

                item => item.status === status

            );

        }

        setFiltered(result);

    }, [search, status, equipment]);

    const deleteEquipment = async (id) => {

        if (!window.confirm("Delete this equipment?"))

            return;

        try {

            await equipmentService.delete(id);

            loadEquipment();

        }

        catch (err) {

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

                    🚜 Equipment

                </h2>

                <Link

                    to="/equipment/add"

                    className="btn btn-success"

                >

                    + Add Equipment

                </Link>

            </div>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <input

                                className="form-control"

                                placeholder="Search Equipment"

                                value={search}

                                onChange={(e)=>setSearch(e.target.value)}

                            />

                        </div>

                        <div className="col-md-3">

                            <select

                                className="form-select"

                                value={status}

                                onChange={(e)=>setStatus(e.target.value)}

                            >

                                <option>All</option>

                                <option>Active</option>

                                <option>Inactive</option>

                                <option>Under Maintenance</option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow">

                <div className="table-responsive">

                    <table className="table table-hover">

                        <thead className="table-success">

                            <tr>

                                <th>Name</th>

                                <th>Category</th>

                                <th>Status</th>

                                <th>Purchase</th>

                                <th>Next Service</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filtered.length === 0 ?

                                <tr>

                                    <td

                                        colSpan="6"

                                        className="text-center"

                                    >

                                        No Equipment Found

                                    </td>

                                </tr>

                                :

                                filtered.map(item => (

                                    <tr key={item.id}>

                                        <td>

                                            {item.equipment_name}

                                        </td>

                                        <td>

                                            {item.category}

                                        </td>

                                        <td>

                                            <span className="badge bg-success">

                                                {item.status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                item.purchase_date ?

                                                item.purchase_date.substring(0,10)

                                                :

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                item.next_service_date ?

                                                item.next_service_date.substring(0,10)

                                                :

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            <Link

                                                to={`/equipment/edit/${item.id}`}

                                                className="btn btn-warning btn-sm me-2"

                                            >

                                                Edit

                                            </Link>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() => deleteEquipment(item.id)}

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

export default EquipmentList;