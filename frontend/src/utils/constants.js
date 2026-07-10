export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const ROLES = {
  FARMER: 'Farmer',
  ADMIN: 'Admin',
  AGRIBUSINESS_MANAGER: 'Agribusiness Manager'
}

export const CROP_STATUSES = {
  PLANTED: 'Planted',
  GROWING: 'Growing',
  HARVESTED: 'Harvested',
  FAILED: 'Failed'
}

export const EQUIPMENT_STATUSES = {
  AVAILABLE: 'Available',
  IN_USE: 'In Use',
  UNDER_MAINTENANCE: 'Under Maintenance',
  BROKEN: 'Broken'
}

export const ANIMAL_HEALTH_STATUSES = {
  HEALTHY: 'Healthy',
  SICK: 'Sick',
  UNDER_TREATMENT: 'Under Treatment',
  QUARANTINED: 'Quarantined'
}

export const PAGINATION = {
  PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 25, 50]
}