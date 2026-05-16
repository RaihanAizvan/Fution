<template>
  <div class="fixed inset-0 flex items-center justify-center bg-[var(--app-bg)] text-[var(--app-text)] font-sans">
    <div class="w-full max-w-md p-8 rounded-2xl bg-[var(--panel-bg)] border border-[var(--sidebar-border)] shadow-2xl animate-fade-in">
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold tracking-tight">Admin Portal</h1>
        <p class="text-[var(--app-muted)] text-sm tracking-widest uppercase">Restricted Content Studio</p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-1">
          <label for="password" class="text-xs font-semibold uppercase tracking-widest text-[var(--app-muted)]">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full bg-[var(--app-bg)] border border-[var(--sidebar-border)] rounded-lg px-4 py-3 outline-none focus:border-blue-500/50 transition"
            :disabled="isLoading"
          />
        </div>

        <p v-if="error" class="text-rose-400 text-sm text-center font-medium">{{ error }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98]"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Verifying...' : 'Login' }}
        </button>

        <div class="pt-4 border-t border-[var(--sidebar-border)] flex flex-col items-center gap-2">
          <p class="text-xs text-[var(--app-muted)]">Don't have access?</p>
          <button
            type="button"
            @click="handleRequestAccess"
            class="text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
            :disabled="isRequesting"
          >
            {{ isRequesting ? 'Notifying Admins...' : 'Request Access' }}
          </button>
          <p v-if="requestStatus" class="text-[0.65rem] text-emerald-400">{{ requestStatus }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '../../admin/api/authApi'
import { useAuth } from '../../admin/auth/authService'

const router = useRouter()
const { login: authLogin } = useAuth()
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const isRequesting = ref(false)
const requestStatus = ref('')

const handleLogin = async () => {
  if (!password.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    const { access_token } = await authApi.login(password.value)
    authLogin(access_token)
    router.push('/admin')
  } catch (err: any) {

    error.value = err.message || 'Invalid password or login failed'
    password.value = ''
  } finally {
    isLoading.value = false
  }
}

const handleRequestAccess = async () => {
  if (isRequesting.value) return
  
  isRequesting.value = true
  try {
    await authApi.requestAccess()
    requestStatus.value = 'Your IP has been logged. Admins notified.'
  } catch (err) {
    requestStatus.value = 'Failed to send request. Check your connection.'
  } finally {
    isRequesting.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
</style>
