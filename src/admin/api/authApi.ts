import { adminClient } from './adminClient'

export interface LoginResponse {
    access_token: string
}

export const authApi = {
    login: (password: string) =>
        adminClient.post<LoginResponse>('/admin/auth/login', { password }),

    requestAccess: () =>
        adminClient.post<void>('/admin/auth/request', {})
}
