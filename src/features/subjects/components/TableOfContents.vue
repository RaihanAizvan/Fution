<template>
  <nav
    v-if="headings.length > 0"
    class="sticky top-8 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] p-4"
  >
    <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">
      On this page
    </p>
    <ul class="space-y-2">
      <li v-for="heading in headings" :key="heading.id">
        <button
          type="button"
          @click="scrollToHeading(heading.id)"
          :class="[
            'text-left text-sm transition hover:text-blue-400',
            {
              'font-semibold text-[var(--app-text)]': heading.level === 2,
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
    <p class="text-xs text-[var(--app-muted)]">No headings available</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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

  // Update the HTML in the DOM with the new IDs
  // This is a bit hacky but necessary to ensure headings have IDs for scrolling
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.scrollBy(0, -80) // Adjust for any fixed header
  }
}

watch(
  () => props.html,
  () => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      extractHeadings()
    }, 100)
  },
  { immediate: true }
)
</script>
