import React from 'react'

const ActivityCard = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p className="text-muted">No recent activities</p>
  }

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity.id} className="d-flex justify-content-between py-2 border-bottom">
          <span>{activity.action}</span>
          <small className="text-muted">{activity.time}</small>
        </div>
      ))}
    </div>
  )
}

export default ActivityCard