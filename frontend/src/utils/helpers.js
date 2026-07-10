export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getStatusBadgeClass = (status) => {
  const statusMap = {
    'Planted': 'bg-info',
    'Growing': 'bg-warning',
    'Harvested': 'bg-success',
    'Failed': 'bg-danger',
    'Available': 'bg-success',
    'In Use': 'bg-primary',
    'Under Maintenance': 'bg-warning',
    'Broken': 'bg-danger',
    'Healthy': 'bg-success',
    'Sick': 'bg-danger',
    'Under Treatment': 'bg-warning',
    'Quarantined': 'bg-secondary'
  }
  return statusMap[status] || 'bg-secondary'
}

export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const calculateAge = (birthDate) => {
  if (!birthDate) return 'N/A'
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}