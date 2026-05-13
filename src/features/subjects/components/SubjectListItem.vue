<template>
  <RouterLink
    :to="destination"
    class="group block rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-5 transition-colors duration-200 hover:border-[var(--app-text)]/10 hover:bg-[var(--sidebar-active)]"
  >
    <div class="flex items-start gap-4">

      <!-- Icon -->
      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--app-bg)]"
      >
        <component
          :is="iconComponent"
          class="h-5 w-5 text-[var(--app-muted)]"
        />
      </div>

      <!-- Content -->
      <div class="min-w-0 flex-1">

        <div class="flex items-start justify-between gap-3">

          <div class="min-w-0">
            <h3
              class="truncate text-base font-semibold tracking-tight text-[var(--app-text)]"
            >
              {{ label }}
            </h3>

            <p
              class="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--app-muted)]"
            >
              {{ description }}
            </p>
          </div>

          <!-- Arrow -->
          <svg
            class="mt-0.5 h-4 w-4 shrink-0 text-[var(--app-muted)] transition-transform duration-200 group-hover:translate-x-0.5"
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

        <!-- Footer -->
        <div
          class="mt-4 flex items-center justify-between border-t border-[var(--panel-border)] pt-3"
        >
          <span
            class="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--app-muted)]"
          >
            Subject
          </span>

          <span
            class="text-xs text-[var(--app-muted)]"
          >
            View
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