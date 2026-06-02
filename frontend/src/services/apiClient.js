import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach auth token on every request if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Normalise error responses so sagas always get { message }
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Request failed'
    return Promise.reject(new Error(message))
  },
)

export default apiClient
