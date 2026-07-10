import React, { useState } from "react";
import { FaSearch, FaChartLine } from "react-icons/fa";
import { priceService } from "../../services/priceService";

const MarketPrice = () => {

    const [crop, setCrop] = useState("");

    const [price, setPrice] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const searchPrice = async () => {

        if (!crop.trim()) {

            setError("Please enter crop name");

            return;

        }

        try {

            setLoading(true);

            setError("");

            setPrice(null);

            const response =
                await priceService.getMarketPrice(crop);

            if (!response.success) {

                setError(response.message);

                return;

            }

            setPrice(response.data);

        }

        catch (err) {

            console.error(err);

            setError("Unable to fetch market price");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow-lg">

                <div className="card-body">

                    <h2 className="text-success mb-4">

                        <FaChartLine className="me-2" />

                        Smart Market Advisor

                    </h2>

                    <div className="input-group">

                        <input

                            className="form-control"

                            placeholder="Search Crop (Rice, Tomato, Onion...)"

                            value={crop}

                            onChange={(e) =>
                                setCrop(e.target.value)
                            }

                        />

                        <button

                            className="btn btn-success"

                            onClick={searchPrice}

                        >

                            <FaSearch />

                        </button>

                    </div>

                </div>

            </div>

            {loading && (

                <div className="text-center mt-4">

                    <div className="spinner-border text-success" />

                    <h5 className="mt-3">

                        Loading Market Data...

                    </h5>

                </div>

            )}

            {error && (

                <div className="alert alert-danger mt-4">

                    {error}

                </div>

            )}

            {price && (

                <div className="card shadow-lg mt-4">

                    <div className="card-body">

                        <h2 className="text-success">

                            🌾 {price.crop}

                        </h2>

                        <hr />

                        <div className="row">

                            <div className="col-md-4">

                                <div className="alert alert-secondary">

                                    <h6>Minimum Price</h6>

                                    <h3>₹ {price.minPrice}</h3>

                                </div>

                            </div>

                            <div className="col-md-4">

                                <div className="alert alert-success">

                                    <h6>Modal Price</h6>

                                    <h3>₹ {price.modalPrice}</h3>

                                </div>

                            </div>

                            <div className="col-md-4">

                                <div className="alert alert-primary">

                                    <h6>Maximum Price</h6>

                                    <h3>₹ {price.maxPrice}</h3>

                                </div>

                            </div>

                        </div>

                        <hr />

                        <h4>📍 Market</h4>

                        <p>

                            <strong>{price.market}</strong>

                            <br />

                            {price.district}, {price.state}

                        </p>

                        <hr />

                        <h4>📈 Market Trend</h4>

                        <h3 className="text-primary">

                            {price.trend}

                        </h3>

                        <hr />

                        <h4>💰 Recommendation</h4>

                        <div className="alert alert-warning">

                            <h3>{price.recommendationType}</h3>

                            <p>{price.recommendation}</p>

                        </div>

                        <hr />

                        <h4>🌾 Crop Advice</h4>

                        <div className="alert alert-info">

                            {price.cropAdvice}

                        </div>

                        <hr />

                        <h4>🚚 Transport Advice</h4>

                        <div className="alert alert-secondary">

                            {price.transportAdvice}

                        </div>

                        <hr />

                        <h4>📦 Storage Advice</h4>

                        <div className="alert alert-secondary">

                            {price.storageAdvice}

                        </div>

                        <hr />

                        <h4>💡 Farmer Tip</h4>

                        <div className="alert alert-success">

                            {price.farmerTip}

                        </div>

                        <hr />

                        <h4>📊 Profit Score</h4>

                        <div className="progress" style={{ height: "30px" }}>

                            <div

                                className="progress-bar bg-success"

                                style={{
                                    width: `${price.profitPercentage}%`
                                }

                                }

                            >

                                {price.profitPercentage}%

                            </div>

                        </div>

                        <hr />

                        <h4>⭐ Profit Rating</h4>

                        <h2>

                            {"⭐".repeat(price.stars)}

                        </h2>

                        <hr />

                        <h4>🚦 Risk Level</h4>

                        <h3>

                            {price.risk}

                        </h3>

                    </div>

                </div>

            )}

        </div>

    );

};

export default MarketPrice;