import React, { useEffect, useState } from "react";

import CurrentWeatherCard from "../../components/weather/CurrentWeatherCard";
import ForecastCard from "../../components/weather/ForecastCard";
import RecommendationCard from "../../components/weather/RecommendationCard";
import AiCropRecommendation from "../../components/weather/AiCropRecommendation";
import { weatherService } from "../../services/weatherService";

const Weather = () => {

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [recommendation, setRecommendation] = useState([]);
    const [aiRecommendation, setAiRecommendation] = useState("");
    const [loading, setLoading] = useState(true);
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        getUserLocation();
    }, []);


    // GET USER LOCATION
    const getUserLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");
            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                loadWeather(
                    position.coords.latitude,
                    position.coords.longitude
                );

            },

            (error) => {

                console.error(error);

                alert("Please allow location access.");

                setLoading(false);

            }

        );

    };


    // LOAD WEATHER
    const loadWeather = async (lat, lon) => {

        try {

            setLoading(true);


            const currentWeather =
                await weatherService.getCurrentWeather(lat, lon);


            console.log("Current Weather:", currentWeather);


            setWeather(currentWeather);


            setLocationName(
                `${currentWeather.location || "Unknown"}, ${currentWeather.country || ""}`
            );


            const forecastData =
                await weatherService.getForecast(lat, lon);


            setForecast(forecastData);


            try {

                const advice =
                    await weatherService.getRecommendation(lat, lon);


                setRecommendation(
                    advice.recommendation || []
                );


            } catch (error) {

                console.log("Recommendation API unavailable");

            }



            // AI CROP RECOMMENDATION

            const weatherData = {

                temperature: currentWeather.temperature,

                humidity: currentWeather.humidity,

                rain: currentWeather.rain,

                wind: currentWeather.windSpeed,

                location: currentWeather.location

            };


            console.log(
                "Sending AI Data:",
                weatherData
            );


            const aiResponse =
                await weatherService.getCropRecommendation(
                    weatherData
                );


            console.log(
                "AI Response:",
                aiResponse
            );


            setAiRecommendation(
                aiResponse.recommendation || ""
            );


        } catch (error) {

            console.error(
                "Weather Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="text-center mt-5">

                <h3>🌦 Loading Weather...</h3>

            </div>

        );

    }


    return (

        <div className="container mt-4">


            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        🌦 Farm Weather
                    </h2>


                    <p className="text-muted">
                        📍 {locationName || "Fetching location..."}
                    </p>


                </div>


                <button
                    className="btn btn-success"
                    onClick={getUserLocation}
                >

                    🔄 Refresh

                </button>


            </div>



            <CurrentWeatherCard
                weather={weather}
            />


            <RecommendationCard
                recommendation={recommendation}
            />


            <AiCropRecommendation
                recommendation={aiRecommendation}
            />


            <ForecastCard
                forecast={forecast}
            />


        </div>

    );

};


export default Weather;