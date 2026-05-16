import { reactive } from 'vue'

const AUTH_KEY = 'fution_admin_token'

interface AuthState {
    token: string | null
    isAuthenticated: boolean
}

export const authState = reactive<AuthState>({
    token: localStorage.getItem(AUTH_KEY),
    isAuthenticated: !!localStorage.getItem(AUTH_KEY)
})

export const login = (token: string) => {
    localStorage.setItem(AUTH_KEY, token)
    authState.token = token
    authState.isAuthenticated = true
}

export const logout = () => {
    authState.token = null
    authState.isAuthenticated = false
    localStorage.removeItem(AUTH_KEY)
}

// Keep useAuth for backward compatibility and convenience in components
export const useAuth = () => {
    return {
        state: authState,
        login,
        logout
    }
}
