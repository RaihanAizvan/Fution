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
      <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/60" @click="close" role="presentation">
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 translate-y-4 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:scale-95"
        >
          <div
            v-if="isOpen"
            class="fixed inset-x-3 bottom-3 flex h-[min(680px,calc(100vh-1.5rem))] flex-col overflow-hidden rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-2xl sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(760px,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2"
            @click.stop
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <div class="flex shrink-0 items-center justify-between border-b border-[var(--panel-border)] px-5 py-4 sm:px-6">
              <div>
                <h2 id="settings-title" class="text-lg font-semibold text-[var(--app-text)]">Settings</h2>
                <p class="mt-0.5 text-sm text-[var(--app-muted)]">Tune the interface to your preference.</p>
              </div>
              <button
                type="button"
                @click="close"
                class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-[var(--sidebar-active)] hover:text-[var(--app-text)]"
                aria-label="Close settings"
              >
                <X class="h-5 w-5" />
              </button>
            </div>

            <div class="grid min-h-0 flex-1 overflow-hidden sm:grid-cols-[180px_minmax(0,1fr)]">
              <aside class="border-b border-[var(--panel-border)] p-3 sm:border-b-0 sm:border-r">
                <nav class="flex gap-1 overflow-x-auto text-sm sm:grid sm:overflow-visible">
                  <button
                    type="button"
                    class="inline-flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-left transition"
                    :class="activeTab === 'appearance'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'appearance'"
                  >
                    <Palette class="h-4 w-4" />
                    Appearance
                  </button>
                  <button
                    type="button"
                    class="inline-flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-left transition"
                    :class="activeTab === 'reading'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'reading'"
                  >
                    <BookOpenText class="h-4 w-4" />
                    Reading
                  </button>
                  <button
                    type="button"
                    class="inline-flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-left transition"
                    :class="activeTab === 'about'
                      ? 'bg-[var(--sidebar-active)] text-[var(--app-text)]'
                      : 'text-[var(--app-muted)] hover:bg-[var(--sidebar-active)]'"
                    @click="activeTab = 'about'"
                  >
                    <Info class="h-4 w-4" />
                    About
                  </button>
                </nav>
              </aside>

              <main class="min-h-0 overflow-y-auto p-5 sm:p-6">
                <template v-if="activeTab === 'appearance'">
                  <header class="mb-5">
                    <h3 class="text-xl font-semibold text-[var(--app-text)]">Theme</h3>
                    <p class="mt-1 text-sm text-[var(--app-muted)]">Theme changes apply instantly across the user app.</p>
                  </header>

                  <div class="grid gap-3 sm:grid-cols-2">
                    <button
                      v-for="themeOption in themes"
                      :key="themeOption"
                      type="button"
                      class="rounded-lg border p-3 text-left transition"
                      :class="themeOption === theme
                        ? 'border-blue-400 bg-[var(--sidebar-active)]'
                        : 'border-[var(--panel-border)] bg-[var(--app-bg)]/45 hover:border-blue-400/60'"
                      @click="setTheme(themeOption)"
                    >
                      <div class="mb-3 h-20 rounded-md border border-[var(--panel-border)] bg-[var(--panel-bg)] p-3">
                        <div class="flex items-center gap-2">
                          <div class="h-3 w-3 rounded-full bg-blue-400" />
                          <div class="h-2 w-20 rounded-full bg-[var(--app-muted)]/35" />
                        </div>
                        <div class="mt-3 space-y-2">
                          <div class="h-2 w-full rounded-full bg-[var(--app-muted)]/30" />
                          <div class="h-2 w-4/5 rounded-full bg-[var(--app-muted)]/30" />
                        </div>
                      </div>
                      <div class="flex items-center justify-between gap-3">
                        <span class="text-sm font-medium capitalize text-[var(--app-text)]">{{ themeOption }}</span>
                        <Check v-if="themeOption === theme" class="h-4 w-4 text-blue-400" />
                      </div>
                    </button>
                  </div>
                  <div class="mt-5 rounded-lg border border-[var(--panel-border)] bg-[var(--app-bg)]/45 p-4 text-sm leading-relaxed text-[var(--app-muted)]">
                    More appearance controls can live here without changing the modal size. This panel scrolls when content grows.
                  </div>
                </template>

                <template v-else-if="activeTab === 'reading'">
                  <header class="mb-5">
                    <h3 class="text-xl font-semibold text-[var(--app-text)]">Reading</h3>
                    <p class="mt-1 text-sm text-[var(--app-muted)]">Current article pages use a fixed comfortable reading width.</p>
                  </header>
                  <div class="rounded-lg border border-[var(--panel-border)] bg-[var(--app-bg)]/45 p-4">
                    <div class="flex items-start gap-3">
                      <PanelRightOpen class="mt-0.5 h-5 w-5 text-blue-400" />
                      <div>
                        <p class="font-medium text-[var(--app-text)]">Desktop table of contents</p>
                        <p class="mt-1 text-sm leading-relaxed text-[var(--app-muted)]">
                          The page outline is pinned on large screens and hidden on smaller screens to keep the article readable.
                        </p>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <header class="mb-5">
                    <h3 class="text-xl font-semibold text-[var(--app-text)]">About</h3>
                    <p class="mt-1 text-sm text-[var(--app-muted)]">Fution keeps learning content clean, readable, and theme-aware.</p>
                  </header>
                  <div class="grid gap-3 text-sm text-[var(--app-muted)]">
                    <p class="rounded-lg border border-[var(--panel-border)] bg-[var(--app-bg)]/45 p-4">
                      Settings are saved locally in this browser.
                    </p>
                  </div>
                </template>
              </main>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { BookOpenText, Check, Info, Palette, PanelRightOpen, X } from 'lucide-vue-next'
import { useTheme } from '../app/theme'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const activeTab = ref<'appearance' | 'reading' | 'about'>('appearance')
const { theme, themes, setTheme } = useTheme()

const close = () => {
  emit('close')
}

// Handle Escape key to close modal
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
