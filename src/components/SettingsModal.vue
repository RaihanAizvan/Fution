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
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click="close"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative mx-4 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-[var(--panel-bg)] shadow-2xl"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-[var(--panel-border)] px-6 py-4">
              <h2 class="text-xl font-semibold text-[var(--app-text)]">Settings</h2>
              <button
                type="button"
                @click="close"
                class="rounded-lg p-2 text-[var(--app-muted)] hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)] transition"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="flex max-h-[calc(90vh-80px)]">
              <!-- Sidebar -->
              <aside class="w-full max-w-xs border-r border-[var(--panel-border)] p-4">
                <nav class="grid gap-2 text-sm">
                  <button
                    type="button"
                    class="rounded-xl px-3 py-2 text-left transition"
                    :class="activeTab === 'appearance'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'appearance'"
                  >
                    Appearance
                  </button>
                  <button
                    type="button"
                    class="rounded-xl px-3 py-2 text-left transition"
                    :class="activeTab === 'language'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'language'"
                  >
                    Language
                  </button>
                  <button
                    type="button"
                    class="rounded-xl px-3 py-2 text-left transition"
                    :class="activeTab === 'notifications'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'notifications'"
                  >
                    Notifications
                  </button>
                  <button
                    type="button"
                    class="rounded-xl px-3 py-2 text-left transition"
                    :class="activeTab === 'shortcuts'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'shortcuts'"
                  >
                    Shortcuts
                  </button>
                </nav>
              </aside>

              <!-- Main Content -->
              <main class="flex-1 overflow-y-auto p-6">
                <template v-if="activeTab === 'appearance'">
                  <header class="mb-6">
                    <p class="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Appearance</p>
                    <h3 class="mt-2 text-2xl font-semibold">Choose a theme</h3>
                    <p class="mt-2 text-sm text-[var(--app-muted)]">
                      Match the mood of your learning space. Preview and apply instantly.
                    </p>
                  </header>

                  <div class="grid gap-4 sm:grid-cols-3">
                    <button
                      v-for="themeOption in themes"
                      :key="themeOption"
                      type="button"
                      class="rounded-2xl border border-transparent p-4 text-left transition"
                      :class="themeOption === theme
                        ? 'border-[var(--accent)] bg-[var(--sidebar-active)]'
                        : 'bg-[var(--app-bg)]/50 hover:border-[var(--accent)]'"
                      @click="setTheme(themeOption)"
                    >
                      <div class="mb-4 h-24 w-full rounded-xl bg-[var(--panel-bg)] p-3">
                        <div class="h-3 w-1/2 rounded-full bg-[var(--sidebar-active)]" />
                        <div class="mt-3 space-y-2">
                          <div class="h-2 w-full rounded-full bg-[var(--app-muted)]/30" />
                          <div class="h-2 w-4/5 rounded-full bg-[var(--app-muted)]/30" />
                          <div class="h-2 w-2/3 rounded-full bg-[var(--app-muted)]/30" />
                        </div>
                      </div>
                      <p class="text-sm font-medium capitalize">{{ themeOption }}</p>
                      <p class="text-xs text-[var(--app-muted)]">Preview</p>
                    </button>
                  </div>
                </template>

                <div v-else class="text-sm text-[var(--app-muted)]">
                  Placeholder settings content coming soon.
                </div>
              </main>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../app/theme'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const activeTab = ref<'appearance' | 'language' | 'notifications' | 'shortcuts'>('appearance')
const { theme, themes, setTheme } = useTheme()

const close = () => {
  emit('close')
}
</script>