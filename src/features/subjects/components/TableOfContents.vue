<template>
  <nav
    v-if="headings.length > 0"
    class="sticky top-8 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] p-4"
  >
    <div class="mb-4 flex items-center gap-2">
      <svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
      <p class="text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">
        Table of Contents
      </p>
    </div>
    <ul class="space-y-1">
      <li v-for="heading in headings" :key="heading.id">
        <button
          type="button"
          @click="scrollToHeading(heading.id)"
          :class="[
            'w-full text-left text-sm transition-all duration-200 hover:text-blue-400 rounded px-2 py-1',
            {
              'font-semibold text-[var(--app-text)] bg-blue-500/10 border-l-2 border-blue-500': activeHeading === heading.id,
              'font-medium text-[var(--app-text)]': heading.level === 2 && activeHeading !== heading.id,
              'text-[var(--app-muted)] pl-4': heading.level === 3,
              'text-[var(--app-muted)] pl-8': heading.level === 4,
            }
          ]"
        >
          {{ heading.text }}
        </button>
      </li>
    </ul>
  </nav>
  <div v-else class="rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] p-4">
    <div class="flex items-center gap-2">
      <svg class="h-4 w-4 text-[var(--app-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
      <p class="text-xs text-[var(--app-muted)]">No table of contents available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Heading {
  id: string
  text: string
  level: number
}

interface Props {
  html: string | null
}

const props = defineProps<Props>()
const headings = ref<Heading[]>([])
const activeHeading = ref<string>('')

const extractHeadings = () => {
  headings.value = []
  if (!props.html) return

  // Create a temporary DOM element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = props.html

  // Extract all headings (h2, h3, h4)
  const elements = temp.querySelectorAll('h2, h3, h4')
  let headingCounter = 0

  elements.forEach((element) => {
    const level = parseInt(element.tagName[1])
    const text = element.textContent || ''

    if (text.trim()) {
      let id = element.id
      if (!id) {
        id = `heading-${headingCounter++}`
        element.id = id
      }

      headings.value.push({
        id,
        text,
        level
      })
    }
  })
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.scrollBy(0, -80) // Adjust for any fixed header
  }
}

const updateActiveHeading = () => {
  const headingElements = headings.value.map(heading => document.getElementById(heading.id)).filter(Boolean)
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]!
    const rect = element.getBoundingClientRect()
    
    // If the heading is above the viewport (with some tolerance), it's active
    if (rect.top <= 100) {
      activeHeading.value = element.id
      return
    }
  }
  
  // If no heading is active, set the first one
  activeHeading.value = headings.value[0]?.id || ''
}

const handleScroll = () => {
  updateActiveHeading()
}

watch(
  () => props.html,
  () => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      extractHeadings()
      updateActiveHeading()
    }, 100)
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
