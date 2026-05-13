const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export type ValidationError = {
  field: string
  message: string
}

export type ApiError = {
  message?: string
  error?: string
  errors?: ValidationError[]
}

import { logout } from '../auth/authService'

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 401) {
    logout()
    // No redirect needed since AdminLayout shows the modal when isAuthenticated is false
    throw new Error('UNAUTHORIZED')
  }

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiError | null
    const error = new Error(payload?.message || payload?.error || 'REQUEST_FAILED')
    const apiError = error as Error & { details?: ApiError; status?: number }
    apiError.details = payload ?? undefined
    apiError.status = response.status
    throw error
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  return text ? (JSON.parse(text) as T) : (undefined as T)
}


const getHeaders = (headers: Record<string, string> = {}) => {
  const token = localStorage.getItem('fution_admin_token')
  const authHeaders: Record<string, string> = { ...headers }
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`
  }
  return authHeaders
}

export const adminClient = {
  get: async <T>(path: string, options?: { params?: Record<string, string> }) => {
    let url = `${API_BASE_URL}${path}`
    if (options?.params) {
      const searchParams = new URLSearchParams(options.params)
      url += `?${searchParams.toString()}`
    }
    const response = await fetch(url, {
      headers: getHeaders()
    })
    return handleResponse<T>(response)
  },
  post: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body)
    })
    return handleResponse<T>(response)
  },
  put: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body)
    })
    return handleResponse<T>(response)
  },
  patch: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body)
    })
    return handleResponse<T>(response)
  },
  delete: async <T = void>(path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return handleResponse<T>(response)
  }
}
