import React from "react";


const RecommendationCard = ({ recommendation }) => {


    if (
        !recommendation ||
        recommendation.length === 0
    ) {

        return null;

    }



    return (

        <div className="card mt-4 shadow-sm border-success">


            <div className="card-header bg-success text-white">


                🌱 Farming Recommendation


            </div>



            <div className="card-body">


                <ul className="mb-0">


                    {
                        recommendation.map(
                            (item, index) => (

                                <li
                                    key={index}
                                    className="mb-2"
                                >

                                    {item}

                                </li>

                            )
                        )
                    }


                </ul>


            </div>


        </div>

    );

};


export default RecommendationCard;