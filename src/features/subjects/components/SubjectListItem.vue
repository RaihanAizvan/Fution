<template>
  <RouterLink
    class="group relative flex flex-col rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-[var(--sidebar-active)] hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
    :to="destination"
  >
    <div class="mb-4 inline-flex h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
      <component :is="iconComponent" class="h-full w-full text-blue-400 group-hover:text-blue-300 transition-colors" />
    </div>
    <span class="text-lg font-semibold text-[var(--app-text)] group-hover:text-white transition-colors">{{ label }}</span>
    <span class="mt-2 text-sm text-[var(--app-muted)] group-hover:text-[var(--app-muted)]/80 transition-colors">
      {{ description }}
    </span>
    <div class="mt-4 flex items-center gap-2 text-sm text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
      <span>Explore topics</span>
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { RouterLink } from 'vue-router'

// Icon components
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
    d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
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
    d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9'
  })
])

const CpuIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  })
])

const ShieldIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  })
])

const PaletteIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
  })
])

interface Props {
  slug: string
  label: string
}

const props = defineProps<Props>()

const destination = computed(() => `/subjects/${props.slug}`)

// Get appropriate icon based on subject
const iconComponent = computed(() => {
  const slug = props.slug.toLowerCase()
  if (slug.includes('javascript') || slug.includes('js')) return CodeIcon
  if (slug.includes('database') || slug.includes('sql')) return DatabaseIcon
  if (slug.includes('html') || slug.includes('css')) return GlobeIcon
  if (slug.includes('backend') || slug.includes('server')) return CpuIcon
  if (slug.includes('security')) return ShieldIcon
  if (slug.includes('design') || slug.includes('ui')) return PaletteIcon
  return CodeIcon // default
})

// Get description based on subject
const description = computed(() => {
  const slug = props.slug.toLowerCase()
  if (slug.includes('javascript') || slug.includes('js')) return 'Master JavaScript fundamentals and advanced concepts'
  if (slug.includes('database') || slug.includes('sql')) return 'Learn database design and SQL querying'
  if (slug.includes('html') || slug.includes('css')) return 'Build beautiful web interfaces with HTML & CSS'
  if (slug.includes('backend') || slug.includes('server')) return 'Develop robust server-side applications'
  if (slug.includes('security')) return 'Secure your applications and protect user data'
  if (slug.includes('design') || slug.includes('ui')) return 'Create stunning user interfaces and experiences'
  return 'Explore this comprehensive learning path'
})
</script>
