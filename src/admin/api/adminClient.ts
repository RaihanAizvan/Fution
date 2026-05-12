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

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiError | null
    const error = new Error(payload?.message || payload?.error || 'REQUEST_FAILED')
    ;(error as Error & { details?: ApiError }).details = payload ?? undefined
    throw error
  }

  return (await response.json()) as T
}

export const adminClient = {
  get: async <T>(path: string, options?: { params?: Record<string, string> }) => {
    let url = `${API_BASE_URL}${path}`
    if (options?.params) {
      const searchParams = new URLSearchParams(options.params)
      url += `?${searchParams.toString()}`
    }
    const response = await fetch(url)
    return handleResponse<T>(response)
  },
  post: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return handleResponse<T>(response)
  },
  put: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return handleResponse<T>(response)
  },
  patch: async <T>(path: string, body: unknown) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return handleResponse<T>(response)
  },
  delete: async (path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE'
    })
    return handleResponse<void>(response)
  }
}
