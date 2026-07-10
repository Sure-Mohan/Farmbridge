import api from "./api";


export const weatherService = {


    // ============================
    // CURRENT WEATHER
    // ============================

    getCurrentWeather: async (lat, lon) => {

        const response = await api.get(
            `/weather?lat=${lat}&lon=${lon}`
        );


        return response.data.data;

    },




    // ============================
    // WEATHER FORECAST
    // ============================

    getForecast: async (lat, lon) => {

        const response = await api.get(
            `/weather/forecast?lat=${lat}&lon=${lon}`
        );


        return response.data.data;

    },





    // ============================
    // NORMAL FARMING RECOMMENDATION
    // ============================

    getRecommendation: async (lat, lon) => {

        const response = await api.get(
            `/weather/recommendation?lat=${lat}&lon=${lon}`
        );


        return response.data.recommendation;

    },





    // ============================
    // MISTRAL AI CROP RECOMMENDATION
    // ============================

    getCropRecommendation: async (weatherData) => {


        const response = await api.post(

            "/ai/crop-recommendation",

            weatherData

        );


        return response.data;


    }


};