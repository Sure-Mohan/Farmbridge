import React from "react";

const CurrentWeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">

        <div className="d-flex justify-content-between">

          <div>

            <h3>{weather.location}</h3>

            <h1>{Math.round(weather.temperature)}°C</h1>

            <h5 className="text-muted text-capitalize">
              {weather.description}
            </h5>

          </div>

          <img
            alt="weather"
            width="100"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          />

        </div>

        <hr />

        <div className="row">

          <div className="col-6">

            <p>💧 Humidity</p>

            <h5>{weather.humidity}%</h5>

          </div>

          <div className="col-6">

            <p>🌬 Wind</p>

            <h5>{weather.windSpeed} m/s</h5>

          </div>

          <div className="col-6">

            <p>🌡 Feels Like</p>

            <h5>{weather.feelsLike}°C</h5>

          </div>

          <div className="col-6">

            <p>👁 Visibility</p>

            <h5>{weather.visibility} km</h5>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CurrentWeatherCard;