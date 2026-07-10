import React from "react";

const AICropRecommendation = ({ recommendation }) => {

    if (!recommendation) return null;

    return (

        <div className="card shadow mt-4 border-success">

            <div className="card-header bg-success text-white">

                <h5 className="mb-0">
                    🤖 AI Smart Crop Recommendation
                </h5>

            </div>

            <div className="card-body">

                <pre
                    style={{
                        whiteSpace: "pre-wrap",
                        fontFamily: "inherit",
                        marginBottom: 0,
                        fontSize: "16px",
                        lineHeight: "1.8"
                    }}
                >
                    {recommendation}
                </pre>

            </div>

        </div>

    );

};

export default AICropRecommendation;