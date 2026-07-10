import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { FaChartPie, FaChartBar, FaChartLine } from 'react-icons/fa'
import { cropService } from '../../services/cropService'
import { livestockService } from '../../services/livestockService'
import { equipmentService } from '../../services/equipmentService'
import Loader from '../../components/common/Loader'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement)

const Analytics = () => {
  const [loading, setLoading] = useState(true)
  const [crops, setCrops] = useState([])
  const [livestock, setLivestock] = useState([])
  const [equipment, setEquipment] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [cropsData, livestockData, equipmentData] = await Promise.all([
        cropService.getAll(),
        livestockService.getAll(),
        equipmentService.getAll()
      ])
      setCrops(cropsData)
      setLivestock(livestockData)
      setEquipment(equipmentData)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  // Prepare data for charts
  const cropStatusData = {
    labels: ['Planted', 'Growing', 'Harvested', 'Failed'],
    datasets: [{
      data: [
        crops.filter(c => c.status === 'Planted').length,
        crops.filter(c => c.status === 'Growing').length,
        crops.filter(c => c.status === 'Harvested').length,
        crops.filter(c => c.status === 'Failed').length
      ],
      backgroundColor: ['#2196F3', '#FFC107', '#4CAF50', '#f44336']
    }]
  }

  const livestockHealthData = {
    labels: ['Healthy', 'Sick', 'Under Treatment', 'Quarantined'],
    datasets: [{
      data: [
        livestock.filter(l => l.health_status === 'Healthy').length,
        livestock.filter(l => l.health_status === 'Sick').length,
        livestock.filter(l => l.health_status === 'Under Treatment').length,
        livestock.filter(l => l.health_status === 'Quarantined').length
      ],
      backgroundColor: ['#4CAF50', '#f44336', '#FFC107', '#9E9E9E']
    }]
  }

  const equipmentStatusData = {
    labels: ['Available', 'In Use', 'Under Maintenance', 'Broken'],
    datasets: [{
      label: 'Equipment Status',
      data: [
        equipment.filter(e => e.status === 'Available').length,
        equipment.filter(e => e.status === 'In Use').length,
        equipment.filter(e => e.status === 'Under Maintenance').length,
        equipment.filter(e => e.status === 'Broken').length
      ],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#f44336']
    }]
  }

  // Monthly statistics (mock data)
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Crops Added',
        data: [12, 19, 3, 5, 2, 3, 7, 8, 5, 6, 4, 9],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Livestock Added',
        data: [5, 8, 12, 7, 4, 6, 9, 3, 11, 5, 8, 6],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">
        <FaChartLine className="me-2 text-primary-green" />
        Analytics Dashboard
      </h4>

      <div className="row">
        {/* Crop Status Pie Chart */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title">
                <FaChartPie className="me-2 text-primary" />
                Crop Status Distribution
              </h6>
              <Pie data={cropStatusData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>

        {/* Livestock Health Pie Chart */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title">
                <FaChartPie className="me-2 text-success" />
                Livestock Health Status
              </h6>
              <Pie data={livestockHealthData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>

        {/* Equipment Status Pie Chart */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title">
                <FaChartPie className="me-2 text-warning" />
                Equipment Status
              </h6>
              <Pie data={equipmentStatusData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">
                <FaChartBar className="me-2 text-primary" />
                Monthly Trends (2024)
              </h6>
              <Line 
                data={monthlyData} 
                options={{ 
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6>Total Crops</h6>
              <h2 className="fw-bold">{crops.length}</h2>
              <small>Active: {crops.filter(c => c.status !== 'Harvested' && c.status !== 'Failed').length}</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6>Total Livestock</h6>
              <h2 className="fw-bold">{livestock.length}</h2>
              <small>Healthy: {livestock.filter(l => l.health_status === 'Healthy').length}</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h6>Equipment</h6>
              <h2 className="fw-bold">{equipment.length}</h2>
              <small>Available: {equipment.filter(e => e.status === 'Available').length}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics