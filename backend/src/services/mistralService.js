const { Mistral } = require("@mistralai/mistralai");


console.log(
    "Mistral API Key exists:",
    !!process.env.MISTRAL_API_KEY
);



const client = new Mistral({

    apiKey: process.env.MISTRAL_API_KEY

});





const getCropRecommendation = async (weather) => {


    try {



        const prompt = `

You are an expert agricultural advisor.

Current Weather:

Temperature: ${weather.temperature}°C
Humidity: ${weather.humidity}%
Rainfall Chance: ${weather.rain}%
Wind Speed: ${weather.wind} km/h
Location: ${weather.location}


Recommend the best 5 crops suitable for planting.


For each crop provide:

Crop Name:
Confidence:
Reason:


Rules:
- Do not use markdown formatting.
- Do not use ** symbols.
- Do not use # symbols.
- Give plain text only.
- Keep the answer short.


`;





        const response = await client.chat.complete({


            model: "mistral-small-latest",


            messages: [

                {

                    role: "user",

                    content: prompt

                }

            ]

        });






        console.log(
            "Mistral Response:",
            response
        );





        let answer =
            response.choices[0].message.content;





        // Remove markdown formatting if AI still returns it

        answer = answer

            .replace(/\*\*/g, "")

            .replace(/#/g, "")

            .replace(/```/g, "")

            .trim();






        console.log(
            "Clean AI Response:",
            answer
        );





        return answer;




    }

    catch(error) {



        console.error(

            "Mistral Error:",

            error.message

        );



        throw new Error(
            "Unable to generate recommendation"
        );


    }


};





module.exports = {

    getCropRecommendation

};