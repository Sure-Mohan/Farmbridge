import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const StatCard = ({ title, count, icon, color, link }) => {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card stat-card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="text-muted text-uppercase small fw-bold">{title}</h6>
              <h3 className="fw-bold mb-0">{count}</h3>
            </div>
            <div className={`stat-icon bg-${color}`}>
              {icon}
            </div>
          </div>
          <Link to={link} className="stretched-link text-decoration-none">
            <small className="text-primary-green">View All <FaArrowRight className="ms-1" size={12} /></small>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StatCard