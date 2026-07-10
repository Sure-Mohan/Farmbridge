import React, { useState, useEffect } from 'react'
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa'
import { formatDateTime } from '../../utils/helpers'

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock alerts - will be replaced with API call
    setAlerts([
      {
        id: 1,
        type: 'warning',
        title: 'Low Water Levels',
        message: 'Water level in Tank 3 is below 20%. Please check immediately.',
        time: new Date(Date.now() - 3600000),
        read: false
      },
      {
        id: 2,
        type: 'info',
        title: 'Fertilizer Reminder',
        message: 'It\'s time to apply fertilizer to the wheat crops.',
        time: new Date(Date.now() - 7200000),
        read: false
      },
      {
        id: 3,
        type: 'danger',
        title: 'Equipment Maintenance Due',
        message: 'Tractor #123 maintenance is overdue by 5 days.',
        time: new Date(Date.now() - 86400000),
        read: true
      },
      {
        id: 4,
        type: 'success',
        title: 'Harvest Complete',
        message: 'Corn harvest has been completed successfully.',
        time: new Date(Date.now() - 172800000),
        read: true
      },
      {
        id: 5,
        type: 'warning',
        title: 'Weather Alert',
        message: 'Heavy rainfall expected in the next 24 hours.',
        time: new Date(Date.now() - 259200000),
        read: true
      }
    ])
  }, [])

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })))
  }

  const getAlertIcon = (type) => {
    switch(type) {
      case 'danger': return <FaExclamationTriangle className="text-danger" />
      case 'warning': return <FaExclamationTriangle className="text-warning" />
      case 'success': return <FaCheckCircle className="text-success" />
      default: return <FaInfoCircle className="text-info" />
    }
  }

  const getAlertClass = (type) => {
    switch(type) {
      case 'danger': return 'border-danger'
      case 'warning': return 'border-warning'
      case 'success': return 'border-success'
      default: return 'border-info'
    }
  }

  const unreadCount = alerts.filter(a => !a.read).length

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">
          <FaBell className="me-2 text-warning" />
          Alerts
          {unreadCount > 0 && (
            <span className="badge bg-danger ms-2">{unreadCount} unread</span>
          )}
        </h4>
        {unreadCount > 0 && (
          <button className="btn btn-outline-primary" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <FaBell className="text-muted mb-3" size={48} />
            <h5 className="text-muted">No alerts</h5>
            <p className="text-muted">You're all caught up!</p>
          </div>
        </div>
      ) : (
        alerts.map((alert) => (
          <div key={alert.id} className={`card mb-3 border-start border-4 ${getAlertClass(alert.type)} ${!alert.read ? 'bg-light' : ''}`}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-start">
                  <div className="me-3 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <h6 className="mb-1">{alert.title}</h6>
                    <p className="mb-1">{alert.message}</p>
                    <small className="text-muted">{formatDateTime(alert.time)}</small>
                    {!alert.read && (
                      <span className="badge bg-primary ms-2">New</span>
                    )}
                  </div>
                </div>
                <div>
                  {!alert.read && (
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Alerts