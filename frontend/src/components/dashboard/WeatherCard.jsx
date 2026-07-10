import React from "react";


const WeatherCard = ({ weather, recommendation }) => {

    if (!weather) {
        return <p className="text-muted">Weather data unavailable</p>;
    }


    return (
        <div className="weather-card">

            <div className="d-flex align-items-center">

                <div className="display-4 fw-bold me-3">
                    {weather.temperature}°C
                </div>

                <div>

                    <p className="mb-0 fw-bold">
                        {weather.condition}
                    </p>

                    <p className="text-muted mb-0 small">
                        Humidity: {weather.humidity}% | 
                        Wind: {weather.windSpeed} km/h
                    </p>

                </div>

            </div>


            {recommendation && (

                <div className="mt-4">

                    <h5 className="fw-bold">
                        🌱 AI Crop Recommendation
                    </h5>


                    <div className="card p-3">

                        <pre
                            style={{
                                whiteSpace: "pre-wrap",
                                fontFamily: "inherit",
                                margin: 0
                            }}
                        >
                            {recommendation}
                        </pre>

                    </div>

                </div>

            )}

        </div>
    );
};


export default WeatherCard;