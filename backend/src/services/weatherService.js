const axios = require("axios");


const API_KEY = process.env.WEATHER_API_KEY;


const BASE_URL =
    "https://api.openweathermap.org/data/2.5";



// Current Weather

const getCurrentWeather = async (lat, lon) => {


    try {


        const response = await axios.get(

            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

        );


        return response.data;


    }

    catch(error){


        console.error(
            "Weather Error:",
            error.response?.data || error.message
        );


        throw new Error(
            "Unable to fetch weather"
        );


    }


};






// Forecast

const getForecast = async (lat, lon) => {


    try {


        const response = await axios.get(

            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

        );


        return response.data;


    }

    catch(error){


        console.error(
            "Forecast Error:",
            error.response?.data || error.message
        );


        throw new Error(
            "Unable to fetch forecast"
        );


    }


};






module.exports = {

    getCurrentWeather,

    getForecast

};