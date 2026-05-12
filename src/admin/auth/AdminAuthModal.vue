<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 shadow-2xl shadow-blue-500/10">
      <!-- Glow effect -->
      <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]"></div>

      <div class="relative">
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
            F
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-white">Admin Access</h2>
          <p class="mt-2 text-sm text-neutral-400">
            Please enter your password to enter the Content Studio.
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="password" class="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">Master Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-indigo-500/50"
              required
              autofocus
            />
          </div>

          <button
            type="submit"
            class="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.98]"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Verifying...' : 'Access Dashboard' }}
          </button>
        </form>

        <div class="mt-8 border-t border-white/5 pt-6 text-center">
          <p class="text-xs text-neutral-500">Don't have access?</p>
          <button
            type="button"
            class="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
            @click="handleRequestAdmin"
          >
            Request Admin Privileges
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from './authService'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = ref(props.modelValue)
const password = ref('')
const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const { login } = useAuth()

watch(() => props.modelValue, (val) => {
  isOpen.value = val
})

const close = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  // Clear query param if present
  if (route.query.auth === 'admin') {
    router.replace({ path: route.path, query: {} })
  }
}

const handleSubmit = async () => {
  if (!password.value) return

  isLoading.value = true
  
  // Simulate API call
  // NOTE: For real security, this must be verified on the backend.
  setTimeout(() => {
    if (password.value === 'admin123') { // Simple placeholder for now
      login('fake-jwt-token-' + Date.now())
      isLoading.value = false
      close()
      
      // If we were redirected here, try to go back to the intended admin page
      if (route.query.auth === 'admin') {
        router.push('/admin')
      }
    } else {
      isLoading.value = false
      alert('Invalid password. Access denied.')
    }
  }, 800)
}

const handleRequestAdmin = () => {
  alert('Request sent to the system administrator. You will be notified if approved.')
}
</script>
