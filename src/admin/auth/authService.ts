import { reactive } from 'vue'

const AUTH_KEY = 'fution_admin_token'

interface AuthState {
    token: string | null
    isAuthenticated: boolean
}

const state = reactive<AuthState>({
    token: localStorage.getItem(AUTH_KEY),
    isAuthenticated: !!localStorage.getItem(AUTH_KEY)
})

export const useAuth = () => {
    const login = (token: string) => {
        state.token = token
        state.isAuthenticated = true
        localStorage.setItem(AUTH_KEY, token)
    }

    const logout = () => {
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem(AUTH_KEY)
    }

    return {
        state,
        login,
        logout
    }
}
