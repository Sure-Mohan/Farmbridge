const { getCurrentWeather, getForecast } = require("../services/weatherService");


// =======================
// CURRENT WEATHER
// =======================

const currentWeather = async (req, res) => {

    try {

        const { lat, lon } = req.query;


        const weather = await getCurrentWeather(
            lat,
            lon
        );


        const formattedWeather = {

            temperature: weather.main.temp,

            humidity: weather.main.humidity,

            windSpeed: weather.wind.speed,

            condition: weather.weather[0].description,


            // Location details
            location: weather.name,

            country: weather.sys.country,


            // Extra data for AI
            rain:
                weather.rain?.["1h"] || 0

        };


        res.status(200).json({

            success:true,

            data: formattedWeather

        });


    }

    catch(error){

        console.error(
            "Current Weather Error:",
            error.message
        );


        res.status(500).json({

            success:false,

            message:"Unable to get weather"

        });

    }

};





// =======================
// FORECAST
// =======================

const weatherForecast = async (req,res)=>{


    try{


        const {lat,lon}=req.query;


        const forecast =
            await getForecast(lat,lon);



        const formattedForecast =
        forecast.list.map(item=>({


            date:item.dt_txt,

            temperature:item.main.temp,

            humidity:item.main.humidity,

            condition:item.weather[0].description,

            icon:item.weather[0].icon


        }));



        res.status(200).json({

            success:true,

            data:formattedForecast

        });



    }

    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Forecast unavailable"

        });


    }


};



module.exports = {

    currentWeather,

    weatherForecast

};