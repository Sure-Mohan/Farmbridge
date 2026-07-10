import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-top py-3 mt-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted small">
              &copy; 2024 FarmBridge. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-muted small">
              Smart Farm Management System
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer