import React from "react";


const ForecastCard = ({forecast}) => {


    if(!forecast || forecast.length === 0){

        return (

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h5>
                        Forecast unavailable
                    </h5>

                </div>

            </div>

        );

    }



    return (

        <div className="card shadow mt-4">


            <div className="card-body">


                <h4 className="mb-3">

                    🌦 5 Day Forecast

                </h4>




                <div className="row">


                {forecast.map((item,index)=>(


                    <div 
                    className="col-md-4 mb-3"
                    key={index}
                    >


                        <div className="card h-100">


                            <div className="card-body text-center">


                                <h6>

                                    {
                                    new Date(item.date)
                                    .toLocaleDateString()
                                    }

                                </h6>



                                <img

                                src={
                                `https://openweathermap.org/img/wn/${item.icon}@2x.png`
                                }

                                alt="weather"

                                />



                                <h4>

                                {item.temperature}°C

                                </h4>



                                <p>

                                {item.condition}

                                </p>



                                <small>

                                Humidity:
                                {item.humidity}%

                                </small>



                            </div>


                        </div>


                    </div>


                ))}


                </div>


            </div>


        </div>


    );


};


export default ForecastCard;