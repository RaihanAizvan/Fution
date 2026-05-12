<template>
  <RouterLink
    :to="destination"
    class="group relative overflow-hidden rounded-3xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[var(--sidebar-active)]"
  >

    <!-- Glow -->
    <div
      class="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
    >
      <div
        class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
      />
    </div>

    <!-- Content -->
    <div class="relative flex items-start gap-4">

      <!-- Icon -->
      <div
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20"
      >
        <component
          :is="iconComponent"
          class="h-7 w-7 text-blue-400 transition group-hover:scale-110"
        />
      </div>

      <!-- Text -->
      <div class="min-w-0 flex-1">

        <div class="flex items-start justify-between gap-4">

          <div>
            <h3
              class="truncate text-lg font-semibold tracking-tight text-[var(--app-text)]"
            >
              {{ label }}
            </h3>

            <p
              class="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--app-muted)]"
            >
              {{ description }}
            </p>
          </div>

          <!-- Arrow -->
          <div
            class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sidebar-active)] text-[var(--app-muted)] transition group-hover:bg-blue-500/10 group-hover:text-blue-400"
          >
            <svg
              class="h-4 w-4 transition group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

        </div>

        <!-- Footer -->
        <div
          class="mt-5 flex items-center justify-between border-t border-[var(--panel-border)] pt-4"
        >
          <span
            class="text-xs font-medium uppercase tracking-[0.2em] text-[var(--app-muted)]"
          >
            Open Subject
          </span>

          <span
            class="text-xs text-blue-400 opacity-0 transition duration-300 group-hover:opacity-100"
          >
            Explore →
          </span>
        </div>

      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { RouterLink } from 'vue-router'

const CodeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  })
])

const DatabaseIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7'
  })
])

const GlobeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M21 12H3m9-9v18'
  })
])

interface Props {
  slug: string
  label: string
  description?: string
}

const props = defineProps<Props>()

const destination = computed(() => `/subjects/${props.slug}`)

const iconComponent = computed(() => {
  const slug = props.slug.toLowerCase()

  if (slug.includes('database') || slug.includes('sql')) {
    return DatabaseIcon
  }

  if (slug.includes('html') || slug.includes('css')) {
    return GlobeIcon
  }

  return CodeIcon
})
</script>