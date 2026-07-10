import React from 'react'

const Loader = ({ size = '3rem', color = '#2E7D32' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border" style={{ width: size, height: size, color: color }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loader