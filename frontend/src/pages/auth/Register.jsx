import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import '../../styles/auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'Farmer'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.full_name.trim()) {
      setError('Full name is required')
      return
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Prepare data for API (exclude confirmPassword)
      const { confirmPassword, ...registrationData } = formData
      
      console.log('📤 Sending registration data:', registrationData)
      
      const response = await register(registrationData)
      
      console.log('✅ Registration successful:', response)
      
      // Show success message and redirect to login
      navigate('/login', { 
        state: { message: 'Registration successful! Please login.' } 
      })
    } catch (error) {
      console.error('❌ Registration error:', error)
      
      // Log more details if available
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server response:', error.response.data)
        console.error('Status code:', error.response.status)
        console.error('Headers:', error.response.headers)
        setError(error.response.data?.message || `Server error: ${error.response.status}`)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from server:', error.request)
        setError('Cannot connect to server. Please check your network and make sure the backend is running.')
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message)
        setError('Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <div className="auth-header">
          <h2 className="text-primary-green">Create Account</h2>
          <p className="text-muted">Join FarmBridge to manage your farm effectively</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="full_name"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaPhone />
              </span>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Farmer">Farmer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="text-muted">
            Already have an account? <Link to="/login" className="text-primary-green">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register