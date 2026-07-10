import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { livestockService } from "../../services/livestockService";

const LivestockList = () => {

    const [animals, setAnimals] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [health, setHealth] = useState("All");

    const loadAnimals = async () => {

        try {

            setLoading(true);

            const data = await livestockService.getAll();

            setAnimals(data);

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

        loadAnimals();

    }, []);

    useEffect(() => {

        let result = [...animals];

        if (search) {

            result = result.filter(

                item =>

                    item.animal_type

                        .toLowerCase()

                        .includes(search.toLowerCase())

            );

        }

        if (health !== "All") {

            result = result.filter(

                item => item.health_status === health

            );

        }

        setFiltered(result);

    }, [search, health, animals]);

    const deleteAnimal = async (id) => {

        if (!window.confirm("Delete this animal?"))

            return;

        try {

            await livestockService.delete(id);

            loadAnimals();

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

                    🐄 Livestock

                </h2>

                <Link

                    to="/livestock/add"

                    className="btn btn-success"

                >

                    + Add Animal

                </Link>

            </div>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <input

                                className="form-control"

                                placeholder="Search Animal"

                                value={search}

                                onChange={(e)=>setSearch(e.target.value)}

                            />

                        </div>

                        <div className="col-md-3">

                            <select

                                className="form-select"

                                value={health}

                                onChange={(e)=>setHealth(e.target.value)}

                            >

                                <option>All</option>

                                <option>Healthy</option>

                                <option>Sick</option>

                                <option>Critical</option>

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

                                <th>Animal</th>

                                <th>Breed</th>

                                <th>Quantity</th>

                                <th>Age</th>

                                <th>Health</th>

                                <th>Vaccination</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filtered.length===0

                                ?

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="text-center"

                                    >

                                        No Animals Found

                                    </td>

                                </tr>

                                :

                                filtered.map(item=>(

                                    <tr key={item.id}>

                                        <td>{item.animal_type}</td>

                                        <td>{item.breed}</td>

                                        <td>{item.quantity}</td>

                                        <td>{item.age}</td>

                                        <td>

                                            <span className="badge bg-success">

                                                {item.health_status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                item.vaccination_date

                                                ?

                                                item.vaccination_date.substring(0,10)

                                                :

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            <Link

                                                to={`/livestock/edit/${item.id}`}

                                                className="btn btn-warning btn-sm me-2"

                                            >

                                                Edit

                                            </Link>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={()=>deleteAnimal(item.id)}

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

export default LivestockList;