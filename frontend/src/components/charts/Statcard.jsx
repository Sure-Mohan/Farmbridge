import React from "react";

const StatCard = ({ title, value, color }) => {

  return (

    <div className="col-lg-3 col-md-6 mb-4">

      <div
        className="card shadow border-0"
        style={{
          borderLeft: `5px solid ${color}`
        }}
      >

        <div className="card-body">

          <h6 className="text-muted">

            {title}

          </h6>

          <h2 className="fw-bold">

            {value}

          </h2>

        </div>

      </div>

    </div>

  );

};

export default StatCard;