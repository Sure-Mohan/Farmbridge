const getCropAdvice = (crop, weather) => {

    if (!weather || !weather.main) {

        return {
            crop,
            risk: "unknown",
            message: "Weather data not available",
            suggestions: []
        };

    }


    if (!crop) {

        return {
            risk: "unknown",
            message: "Crop name not provided",
            suggestions: []
        };

    }



    const temp = weather.main.temp;

    const humidity = weather.main.humidity;



    let advice = {

        crop,

        temperature: temp,

        humidity: humidity,

        risk: "low",

        message: "Conditions are normal for farming",

        suggestions: []

    };



    const cropName = crop.toLowerCase();




    // 🌾 RICE LOGIC

    if (cropName === "rice") {


        if (temp > 35) {

            advice.risk = "high";

            advice.message =
                "High temperature stress for rice crop";

            advice.suggestions.push(
                "Increase irrigation frequency"
            );

            advice.suggestions.push(
                "Provide water during evening hours"
            );

        }



        if (humidity < 50 && advice.risk !== "high") {

            advice.risk = "medium";

            advice.message =
                "Low humidity may affect rice growth";

            advice.suggestions.push(
                "Maintain proper water level in field"
            );

        }


    }





    // 🌽 MAIZE LOGIC

    if (cropName === "maize") {


        if (temp < 15 || temp > 32) {


            advice.risk = "high";


            advice.message =
                "Current temperature is not ideal for maize";


            advice.suggestions.push(
                "Monitor crop growth closely"
            );


            advice.suggestions.push(
                "Adjust irrigation based on soil moisture"
            );


        }


    }






    // 🌿 COTTON LOGIC

    if (cropName === "cotton") {


        if (humidity > 80) {


            advice.risk = "medium";


            advice.message =
                "High humidity may increase pest and fungal risk";


            advice.suggestions.push(
                "Monitor pest activity regularly"
            );


            advice.suggestions.push(
                "Use pest control measures if required"
            );


        }


    }




    return advice;

};



module.exports = {

    getCropAdvice

};