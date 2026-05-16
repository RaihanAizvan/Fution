<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Backdrop (z-40 to stay below Navbar at z-50) -->
      <div v-if="shouldShow" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" @click="handleBackdropClick">
        <Transition
          enter-active-class="transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
          enter-from-class="opacity-0 translate-y-8 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-8 scale-95"
        >
          <div
            v-if="shouldShow"
            class="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
            @click.stop
          >
            <div class="overflow-hidden rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 shadow-2xl">
              <div class="relative">
                <div class="mb-8 text-center">
                  <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
                    F
                  </div>
                  <h2 class="text-2xl font-bold tracking-tight text-[var(--app-text)]">Admin Access</h2>
                  <p class="mt-2 text-sm text-[var(--app-muted)]">
                    This area is restricted. Please enter the master password.
                  </p>
                </div>

                <form class="space-y-4" @submit.prevent="handleSubmit">
                  <div class="space-y-1">
                    <label for="password" class="mb-2 block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--app-muted)]">Master Password</label>
                    <input
                      id="password"
                      v-model="password"
                      type="password"
                      placeholder="••••••••"
                      class="w-full rounded-xl border border-[var(--panel-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-text)] placeholder:text-[var(--app-muted)]/30 outline-none transition focus:border-indigo-500/50"
                      required
                      autofocus
                      :disabled="isLoading"
                    />
                  </div>

                  <p v-if="error" class="text-rose-400 text-xs text-center font-medium">{{ error }}</p>

                  <button
                    type="submit"
                    class="w-full rounded-xl bg-[var(--app-text)] py-3 text-sm font-semibold text-[var(--app-bg)] transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Verifying...' : 'Access Studio' }}
                  </button>
                </form>

                <div class="mt-8 border-t border-[var(--panel-border)] pt-6 text-center">
                  <p class="text-xs text-[var(--app-muted)]">Don't have access?</p>
                  <button
                    type="button"
                    class="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-[var(--app-bg)]/50 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--app-text)] transition hover:bg-[var(--sidebar-active)]"
                    @click="handleRequestAdmin"
                    :disabled="isRequesting"
                  >
                    <Users class="h-3 w-3" />
                    {{ isRequesting ? 'Notifying...' : 'Request Access' }}
                  </button>
                  <p v-if="requestStatus" class="mt-2 text-[0.65rem] text-emerald-400">{{ requestStatus }}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Users } from 'lucide-vue-next'
import { authApi } from '../api/authApi'
import { useAuth } from './authService'

interface Props {
  modelValue?: boolean
  isOpen?: boolean
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  isOpen: false,
  show: false
})

const emit = defineEmits(['update:modelValue', 'close'])

const shouldShow = computed(() => {
  return props.modelValue || props.isOpen || props.show
})

const password = ref('')
const isLoading = ref(false)
const isRequesting = ref(false)
const error = ref('')
const requestStatus = ref('')
const { login } = useAuth()

const handleSubmit = async () => {
  if (!password.value) return

  isLoading.value = true
  error.value = ''
  
  try {
    const { access_token } = await authApi.login(password.value)
    login(access_token)
    emit('update:modelValue', false)
  } catch (err: any) {
    error.value = err.message || 'Verification failed. Access denied.'
    password.value = ''
  } finally {
    isLoading.value = false
  }
}

const handleBackdropClick = () => {
  // If explicitly used as a modal (like in Home), we can emit close
  emit('close')
  emit('update:modelValue', false)
}

const handleRequestAdmin = async () => {
  if (isRequesting.value) return
  isRequesting.value = true
  try {
    await authApi.requestAccess()
    requestStatus.value = 'Request logged. Admins notified.'
  } catch (err) {
    requestStatus.value = 'Failed to send request.'
  } finally {
    isRequesting.value = false
  }
}
</script>
