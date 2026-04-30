<template>
  <section
    class="subject-layout"
    :class="{
      'subject-layout--sidebar-collapsed': !isSidebarOpen,
      'subject-layout--toc-collapsed': !isTocOpen,
      'subject-layout--mobile-sidebar-open': isSidebarOpen,
    }"
  >
    <button
      type="button"
      class="subject-layout__backdrop"
      aria-label="Close topics sidebar"
      @click="closeMobileSidebar"
    />

    <div class="subject-layout__sidebar-control" aria-label="Sidebar controls">
      <button
        type="button"
        class="subject-layout__control"
        :aria-label="isSidebarOpen ? 'Collapse topics sidebar' : 'Open topics sidebar'"
        :aria-pressed="isSidebarOpen"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        <PanelLeftClose v-if="isSidebarOpen" class="h-5 w-5" />
        <PanelLeftOpen v-else class="h-5 w-5" />
      </button>
    </div>

    <div class="subject-layout__toc-control" aria-label="Table of contents controls">
      <button
        type="button"
        class="subject-layout__control"
        :aria-label="isTocOpen ? 'Collapse table of contents' : 'Open table of contents'"
        :aria-pressed="isTocOpen"
        @click="isTocOpen = !isTocOpen"
      >
        <PanelRightClose v-if="isTocOpen" class="h-5 w-5" />
        <PanelRightOpen v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Sidebar -->
    <aside class="subject-layout__sidebar">
      <div class="subject-layout__sidebar-inner">
        <slot name="sidebar" />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="subject-layout__main">
      <slot />
    </main>

    <!-- Table of Contents (Right Sidebar) -->
    <aside class="subject-layout__toc">
      <div class="subject-layout__toc-inner">
        <slot name="toc" />
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-vue-next'

const isSidebarOpen = ref(true)
const isTocOpen = ref(true)
let mediaQuery: MediaQueryList | null = null

const syncPanelDefaults = () => {
  if (!mediaQuery) return

  if (mediaQuery.matches) {
    isSidebarOpen.value = true
    isTocOpen.value = true
  } else {
    isSidebarOpen.value = false
    isTocOpen.value = false
  }
}

const closeMobileSidebar = () => {
  if (!mediaQuery?.matches) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 900px)')
  syncPanelDefaults()
  mediaQuery.addEventListener('change', syncPanelDefaults)
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', syncPanelDefaults)
})
</script>

<style scoped>
.subject-layout {
  --sidebar-track: 0px;
  --toc-track: 0px;
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "main";
  grid-template-columns: minmax(0, 1fr);
  background: var(--app-bg);
  transition: grid-template-columns 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.subject-layout__sidebar-control,
.subject-layout__toc-control {
  position: fixed;
  top: 0.875rem;
  z-index: 60;
  display: flex;
  border: 1px solid var(--panel-border);
  border-radius: 0.5rem;
  background: var(--panel-bg);
  padding: 0.25rem;
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.2);
  transition:
    transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 180ms ease;
}

.subject-layout__sidebar-control {
  left: 0.875rem;
}

.subject-layout__toc-control {
  right: 0.875rem;
  display: none;
}

.subject-layout__control {
  display: inline-flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: var(--app-muted);
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.subject-layout__control:hover {
  background: var(--sidebar-active);
  color: var(--app-text);
  transform: translateY(-1px);
}

.subject-layout__backdrop {
  pointer-events: none;
  position: fixed;
  inset: 4rem 0 0;
  z-index: 45;
  display: block;
  background: rgb(0 0 0 / 0.42);
  opacity: 0;
  transition: opacity 240ms ease;
}

.subject-layout__sidebar {
  grid-area: sidebar;
  min-width: 0;
  overflow: hidden;
  background: var(--sidebar-bg);
  transition:
    border-color 220ms ease,
    opacity 240ms ease,
    transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.subject-layout__main {
  grid-area: main;
  min-width: 0;
  padding: 2.5rem 1rem 3rem;
}

.subject-layout__toc {
  grid-area: toc;
  min-width: 0;
  overflow: hidden;
  border-left: 1px solid var(--sidebar-border);
  background: var(--sidebar-bg);
  padding: 1.5rem 1.25rem;
  opacity: 0;
  transform: translateX(12px);
  transition:
    border-color 220ms ease,
    opacity 240ms ease,
    padding 240ms ease,
    transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.subject-layout__sidebar-inner,
.subject-layout__toc-inner {
  overflow-y: auto;
  transition:
    opacity 180ms ease,
    transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

@media (min-width: 640px) {
  .subject-layout__main {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 900px) {
  .subject-layout {
    --sidebar-track: 260px;
    grid-template-areas: "sidebar main toc";
    grid-template-columns: var(--sidebar-track) minmax(0, 1fr) var(--toc-track);
  }

  .subject-layout--sidebar-collapsed {
    --sidebar-track: 0px;
  }

  .subject-layout--sidebar-collapsed .subject-layout__sidebar {
    border-color: transparent;
    opacity: 0;
  }

  .subject-layout--sidebar-collapsed .subject-layout__sidebar-inner {
    opacity: 0;
    transform: translateX(-14px);
  }

  .subject-layout__sidebar {
    border-top: 0;
    border-right: 1px solid var(--sidebar-border);
  }

  .subject-layout__sidebar-inner {
    position: sticky;
    top: 4rem;
    max-height: calc(100vh - 4rem);
    padding: 1.5rem 1.25rem;
  }
}

@media (min-width: 1200px) {
  .subject-layout {
    --sidebar-track: 280px;
    --toc-track: 250px;
  }

  .subject-layout--sidebar-collapsed {
    --sidebar-track: 0px;
  }

  .subject-layout--toc-collapsed {
    --toc-track: 0px;
  }

  .subject-layout--sidebar-collapsed.subject-layout--toc-collapsed {
    --sidebar-track: 0px;
    --toc-track: 0px;
  }

  .subject-layout__main {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .subject-layout__toc {
    opacity: 1;
    transform: translateX(0);
  }

  .subject-layout__toc-control {
    display: flex;
  }

  .subject-layout--toc-collapsed .subject-layout__toc {
    border-color: transparent;
    opacity: 0;
    padding-left: 0;
    padding-right: 0;
    transform: translateX(14px);
  }

  .subject-layout--toc-collapsed .subject-layout__toc-inner {
    opacity: 0;
    transform: translateX(14px);
  }

  .subject-layout__toc-inner {
    position: sticky;
    top: 5rem;
    max-height: calc(100vh - 6rem);
  }

  .subject-layout__sidebar-inner {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1280px) {
  .subject-layout {
    column-gap: 0.5rem;
  }

  .subject-layout__main {
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }
}

@media (max-width: 899px) {
  .subject-layout__sidebar-control {
    top: 0.875rem;
  }

  .subject-layout__toc-control,
  .subject-layout__toc {
    display: none;
  }

  .subject-layout__sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 4rem;
    z-index: 50;
    width: min(20rem, 86vw);
    border-right: 1px solid var(--sidebar-border);
    box-shadow: 20px 0 44px rgb(0 0 0 / 0.3);
    opacity: 0;
    transform: translateX(-102%);
  }

  .subject-layout--mobile-sidebar-open .subject-layout__sidebar {
    opacity: 1;
    transform: translateX(0);
  }

  .subject-layout--mobile-sidebar-open .subject-layout__backdrop {
    pointer-events: auto;
    opacity: 1;
  }

  .subject-layout__sidebar-inner {
    height: 100%;
    padding: 1.5rem 1.25rem;
  }

  .subject-layout--sidebar-collapsed .subject-layout__sidebar-inner {
    opacity: 0;
    transform: translateX(-12px);
  }
}
</style>
